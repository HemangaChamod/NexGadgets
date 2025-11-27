const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createCheckoutSession = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  try {
    const line_items = orderItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty || 1,
    }));

    // Save all required fields in metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      customer_email: req.user.email,
      metadata: {
        userId: req.user._id.toString(),
        orderItems: JSON.stringify(
          orderItems.map(item => ({
            product: item._id,  
            name: item.name,
            qty: item.qty || 1,
            price: item.price,
          }))
        ),
        totalPrice: totalPrice.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Stripe checkout session failed' });
  }
};

// Stripe Webhook to save orders after payment
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const orderItems = JSON.parse(session.metadata.orderItems);
    const totalPrice = session.metadata.totalPrice;

    try {
      await Order.create({
        user: userId,
        orderItems,  
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
      });
      console.log('Order saved successfully via webhook!');
    } catch (err) {
      console.error('Error saving order:', err);
    }
  }

  res.status(200).json({ received: true });
};

