import banner from "../assets/header_playstation_image.png";

export default function Hero() {
  return (
    <section className="w-full py-10 px-4 sm:px-10">
      <div className="w-full h-[400px] sm:h-[380px] md:h-[400px] bg-[#eef2f7] 
                      flex flex-col md:flex-row items-center justify-between 
                      gap-8 md:gap-20 px-4 md:px-16">

        {/* Text Section */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Discover the Latest Tech & Gadgets
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Shop top-quality electronics, accessories, and gear at unbeatable value.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
            Find more →
          </button>
        </div>

        {/* Image */}
        <img
          src={banner}
          alt="Hero Banner"
          className="h-48 sm:h-60 md:h-[340px] object-contain"
        />
      </div>
    </section>
  );
}
