import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const productHighlights = [
  "Property, unit, owner and worker management",
  "Tickets, recurring tasks and inspections",
  "Payments, notices, files and vendor workflow",
  "Role-based dashboard for daily operations",
];

const productStack = ["Next.js", "NestJS", "MongoDB", "MinIO"];

export default function OurProductSection() {
  return (
    <section
      id="products"
      aria-labelledby="our-product-heading"
      className="mx-auto mt-11 max-w-7xl"
    >
      <div className="rounded-[24px] bg-[#f7f7f5] px-6 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
        <div className="max-w-3xl border-b border-text-blue/10 pb-8">
          <p className="text-[16px] font-normal leading-none text-text-blue">
            Our Product
          </p>
          <h2
            id="our-product-heading"
            className="mt-5 max-w-2xl text-[28px] leading-[1.2] font-normal tracking-[-0.03em] text-text-blue sm:text-[38px] lg:text-[42px]"
          >
            We build software products with same care as client work.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] tracking-[-0.02em] text-text-blue/80 sm:text-[20px]">
            First product focuses on property operations management for owners,
            admins, and workers.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px] border border-text-blue/10 bg-white">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col border-b border-text-blue/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f7f5] px-3 py-2 text-sm text-text-blue">
                  <span className="h-2 w-2 rounded-full bg-soft-green" />
                  Product 01
                </div>
                <Link
                  href="https://others-frontend-proparty.slsqyw.easypanel.host/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-blue transition-colors hover:text-soft-green"
                >
                  Visit Product
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <h3 className="mt-6 max-w-xl text-[30px] leading-[1.15] font-normal tracking-[-0.03em] text-text-blue sm:text-[36px]">
                Property Operation Management
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.65] text-text-blue/78 sm:text-[18px]">
                One platform for daily property workflow, task tracking,
                payment follow-up, inspection flow, worker coordination, and
                document handling.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {productHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] bg-[#f7f7f5] px-4 py-4 text-[15px] leading-[1.55] text-text-blue"
                  >
                    <span className="mr-2 text-soft-green">+</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {productStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-text-blue/10 px-4 py-2 text-sm text-text-blue"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#05364a] p-4 sm:p-5 lg:p-6">
              <div className="overflow-hidden rounded-[22px] bg-white/4 p-3">
                <Image
                  src="/project/propartmng.png"
                  alt="Property operation management dashboard preview"
                  width={1536}
                  height={1024}
                  className="h-auto w-full rounded-[18px]"
                />
              </div>

              <div className="mt-4 flex items-end gap-4">
                <div className="flex-1 rounded-[20px] border border-white/10 bg-white/6 px-5 py-5 text-white">
                  <p className="text-sm text-white/65">Why it works</p>
                  <p className="mt-3 text-[24px] leading-[1.2] font-normal tracking-[-0.03em]">
                    Less calling. Less chasing. More control.
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.7] text-white/75">
                    Notices, tickets, inspections, recurring work, payments,
                    files, and vendors in one system.
                  </p>
                </div>

                <div className="hidden w-[170px] shrink-0 lg:block">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/6 p-2">
                    <Image
                      src="/project/proprat mng2.png"
                      alt="Property operation management mobile preview"
                      width={1536}
                      height={1024}
                      className="h-auto w-full rounded-[16px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:hidden">
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/6 p-2">
                  <Image
                    src="/project/proprat mng2.png"
                    alt="Property operation management mobile preview"
                    width={1536}
                    height={1024}
                    className="mx-auto h-auto w-full max-w-[260px] rounded-[16px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
