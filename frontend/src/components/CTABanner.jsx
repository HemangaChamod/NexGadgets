import leftImg from "../assets/jbl_soundbox_image.png"; 
import rightImg from "../assets/sm_controller_image.png";

export default function Hero() {
  return (
    <section className="w-full py-10 px-4 sm:px-10">
      <div className="w-full h-[300px] bg-[#e8ecf4] rounded-2xl flex flex-col md:flex-row items-center justify-center relative overflow-hidden gap-10 md:gap-16 px-4 md:px-10">

        {/* Left Image */}
        <img
          src={leftImg}
          alt="Product Left"
          className="h-36 sm:h-44 md:h-[260px] object-contain md:absolute md:left-0 md:ml-20"
        />

        {/* Center Text */}
        <div className="text-center md:text-left max-w-xl mx-auto z-10">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
            Level Up Your <br /> Gaming Experience
          </h1>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            From immersive sound to precise controls— <br />
            everything you need to win
          </p>

          <button className="mt-6 px-6 py-3 bg-[#f97316] text-white rounded-md hover:bg-[#ea6a0d] transition">
            Buy now →
          </button>
        </div>

        {/* Right Image */}
        <img
          src={rightImg}
          alt="Product Right"
          className="h-36 sm:h-44 md:h-[260px] object-contain md:absolute md:right-0 md:mr-20"
        />
      </div>
    </section>
  );
}
