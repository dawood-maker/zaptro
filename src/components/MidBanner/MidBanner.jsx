import banner from "../../assets/banner.jpg";
import BannerTitle from "./BannerTitle";
import BannerSubtitle from "./BannerSubtitle";
import BannerButton from "./BannerButton";

function MidBanner() {
  return (
    <div className="bg-gray-100 md:py-24">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6 max-w-3xl">
            <BannerTitle />
            <BannerSubtitle />
            <BannerButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidBanner;
