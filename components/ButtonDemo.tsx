import { Button } from "./ui/button";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function ButtonDemo() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] w-full sm:w-auto">
      <Link href={`${APP_URL}/signin`} target="_blank">
        <Button
          className="group w-full sm:w-[120px] h-12 sm:h-[45px] bg-[#1b0c25] hover:bg-[#1b0c25]
          rounded-[8px] text-sm sm:text-[15px] leading-normal sm:leading-[26px]
          shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]
          backdrop-blur-[6px]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
          </span>
        </Button>
      </Link>

      <Link href="/contact">
        <Button
          className="group w-full sm:w-[120px] h-12 sm:h-[45px] border border-gray-100 bg-white hover:bg-white
          text-black text-sm sm:text-[15px] leading-normal sm:leading-[26px] rounded-[8px]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Demo
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Demo
            </span>
          </span>
        </Button>
      </Link>
    </div>
  );
}

export function ButtonDemoBlur() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] w-full sm:w-auto">
      <Link href={`${APP_URL}/signin`} target="_blank">
        <Button
          className="group w-full sm:w-[120px] h-12 sm:h-[45px] bg-[#1b0c25] hover:bg-[#1b0c25]
          rounded-[8px] text-sm sm:text-[15px] leading-normal sm:leading-[26px]
          shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]
          backdrop-blur-[6px]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
          </span>
        </Button>
      </Link>

      <Link href="/contact">
        <Button
          className="group w-full sm:w-[120px] h-12 sm:h-[45px] hover:bg-white/90 border border-white
          text-black text-sm sm:text-[15px] leading-normal sm:leading-[26px]
          rounded-[8px] bg-white backdrop-blur-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Demo
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Demo
            </span>
          </span>
        </Button>
      </Link>
    </div>
  );
}

export function ButtonDemoVarient() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] w-full sm:w-auto">
      <Link href={`${APP_URL}/signin`} target="_blank">
        <Button
          className="group w-full sm:w-[120px] h-12 sm:h-[45px] bg-[#1b0c25] hover:bg-[#1b0c25]
          rounded-[8px] text-sm sm:text-[15px] leading-normal sm:leading-[26px]
          shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]
          backdrop-blur-[6px]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Get Started
            </span>
          </span>
        </Button>
      </Link>

      <Link href="/contact">
        <Button
          variant="outline"
          className="group w-full bg-white hover:bg-white sm:w-[130px] h-12 sm:h-[45px]
          text-black text-sm sm:text-[15px] leading-normal sm:leading-[26px]
          rounded-[8px]"
        >
          <span className="flex flex-col items-center h-[26px] overflow-hidden">
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Book a Demo
            </span>
            <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
              Book a Demo
            </span>
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default ButtonDemo;
