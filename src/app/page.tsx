import { HeaderMenu } from "../../components/header-menu";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeaderMenu />
      <div className="relative">
        <Image
          src="/banner.png"
          alt="Logo"
          width={1563}
          height={658}
          className="w-full h-[658px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <p className="text-2xl uppercase text-white mb-4">
                Giảm giá ngay 30%
              </p>
              <h1 className="text-6xl font-bold text-white mb-4">
                Thuê VietMap Live Pro
              </h1>
              <p className="text-xl text-white max-w-[700px]">
                Dịch vụ cho thuê VietMap Live Pro theo ngày, giá chỉ 
                <span className="font-bold"> 10.000đ/ngày</span>, không cần thiết bị. Theo dõi hành trình xe
                real-time
              </p>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
