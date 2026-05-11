import { NumberTicker } from "@/components/ui/number-ticker";
import React, { Suspense } from "react";

const stats = [
  {
    label: "Project Complete",
    value: 351,
  },
  {
    label: "Satisfied Clients",
    value: 325,
  },
];

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex h-[140px] w-[140px] flex-col rounded-[18px] border border-[#e6e3dc] bg-white px-[20px] pt-[30px] pb-[20px] shadow-[0_0_0_1px_rgba(5,54,74,0.01),0_4px_12px_rgba(5,54,74,0.03)] sm:h-[205px] sm:w-[205px] sm:px-[46px] sm:pt-[50px] sm:pb-[38px] lg:h-[186px] lg:w-[214px] lg:px-[43px] lg:pt-[46px] lg:pb-[34px]">
      <p className="whitespace-nowrap text-[14px] font-normal leading-none text-text-blue">
        {label}
      </p>
      <div className="mt-auto flex items-end gap-[6px] text-text-blue">
        <Suspense
          fallback={
            <span className="text-[32px] leading-none font-medium tracking-[-0.04em] text-text-blue sm:text-[52px] lg:text-[41px]">
              {value}
            </span>
          }
        >
          <NumberTicker
            value={value}
            className="text-[32px] leading-none font-medium tracking-[-0.04em] text-text-blue sm:text-[52px] lg:text-[41px]"
          />
        </Suspense>
        <span className="pb-[2px] text-[32px] leading-none font-medium sm:text-[52px] lg:text-[41px]">
          +
        </span>
      </div>
    </div>
  );
}

const AboutSection = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto mt-11 max-w-7xl overflow-x-hidden rounded-[24px] bg-[#f7f7f5] px-7 py-9 sm:px-10 sm:py-11 lg:px-16 lg:py-8"
    >
      <div className="lg:relative lg:min-h-[414px]">
        <p className="mb-10 text-[16px] font-normal leading-none text-text-blue sm:mb-12 lg:mb-0 lg:pt-[3px]">
          About Us
        </p>

        <div className="space-y-8 lg:space-y-0">
          <h2
            id="about-heading"
            className="max-w-[515px] text-[18px] leading-[1.46] font-normal tracking-[-0.03em] text-text-blue sm:text-[34px] lg:mt-[61px] lg:max-w-[353px] lg:text-[21px] lg:leading-[1.52]"
          >
            We&apos;re A Small Creative Agency Helping
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            Brands Grow Through Strategy, Design,
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            And Innovation.
          </h2>

          <p className="max-w-[690px] text-[18px] leading-[1.58] font-normal tracking-[-0.03em] text-text-blue sm:text-[30px] lg:mt-[53px] lg:max-w-[521px] lg:text-[20px] lg:leading-[1.6]">
            We Provide UI/UX design, build websites,
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            We design and build scalable SaaS platforms, mobile apps,
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            and custom software that solve real business problems
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            from product strategy and UX to development and launch.
          </p>
        </div>

        <div className="flex flex-row gap-4 pt-1 lg:absolute lg:top-[0px] lg:right-[214px] lg:pt-0 lg:gap-0">
          <StatCard {...stats[0]} />
          <StatCard {...stats[1]} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
