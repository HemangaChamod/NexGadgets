const jwt = require('jsonwebtoken'); //library to sign, verify, and decode JWT tokens
const User = require('../models/User');


const protect = async (req, res, next) => { //protect middleware checks if the request has a valid JWT token and attaches the authenticated user to req.user.
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') //Checks if req.headers.authorization exists and starts with 'Bearer'.
    ? req.headers.authorization.split(' ')[1] //extracts the token part after 'Bearer'.
    : null;//If header doesn’t exist, token is set to null.
    try {
    if (!token) return res.status(401).json({ message: 'Not authorized' }); //If no token is provided, respond with 401 Unauthorized.
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verifies the token using a secret key (JWT_SECRET) from environment variables.
    //decoded will contain the payload data stored in the token, usually { id: user._id }.
    req.user = await User.findById(decoded.id).select('-password');//Finds the user in the database by decoded.id. .select('-password') excludes the password field for security.
    next();//Calls next() to pass control to the next middleware or route handler.
    } catch (err) {
    res.status(401).json({ message: 'Token failed' });//If token verification fails (expired, invalid, etc.), respond with 401 Unauthorized.
    }
};

//This checks if the logged-in user is an admin.
const admin = (req, res, next) => {
if (req.user && req.user.isAdmin) next();
else res.status(403).json({ message: 'Admin only' });
};


module.exports = { protect, admin }; //Makes the protect and admin functions available to other files, like your routes.



/*

What is a Bearer Token?

A Bearer token is a type of access token used in HTTP authentication.

The client (like your browser or mobile app) sends this token to the server in the Authorization header.

The server uses the token to verify that the client is allowed to access a protected resource.

The key idea: “Whoever bears (has) this token is authorized.”

“Bearer” literally means the one who carries it.

If someone has this token, they are considered authorized.

No username/password is required in each request; the token itself is proof of identity.


Format: Authorization: Bearer <token>



What generates the token?

In your application, the token is usually generated when a user logs in or signs up.

Typical flow:

User sends email/username and password to the server.

Server checks the credentials in the database.

If credentials are valid, the server creates a JWT token and sends it back to the client.


*/