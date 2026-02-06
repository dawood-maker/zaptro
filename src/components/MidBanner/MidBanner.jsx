import banner from "../../assets/banner.jpg";
import BannerTitle from "./BannerTitle";
import BannerSubtitle from "./BannerSubtitle";
import BannerButton from "./BannerButton";

function MidBanner() {
  return (
    <section className="bg-gray-100 md:py-24">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-24 md:pt-28 bg-cover bg-center h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6">
          <div className="text-center text-white max-w-3xl">
            <BannerTitle />
            <BannerSubtitle />
            <BannerButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MidBanner;
