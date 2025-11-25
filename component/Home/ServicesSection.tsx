"use client";
import { useState } from "react";
import tick from "@/app/assets/service/tick.png";
import Image from "next/image";
import image1 from "@/app/assets/service/s-image1.png";
import image2 from "@/app/assets/service/s-image2.png";
import image3 from "@/app/assets/service/s-image3.png";
import image4 from "@/app/assets/service/s-image4.png";

const services = [
  {
    title: "UI UX Design",
    subtitle: "Creating user-friendly UI/UX designs",
    features: [
      "User Research & Analysis",
      "Visual Interface Design",
      "Wireframing & Prototyping",
    ],
    image: image1.src, // Replace with your actual asset
  },
  {
    title: "Website Design",
    subtitle: "Designing responsive, user-friendly websites",
    features: [
      "Web design",
      "UI/UX design /responsive design",
      "Landing page design",
    ],
    image: image2.src,
  },
  {
    title: "Web Development",
    subtitle: "Designing responsive, user-friendly websites",
    features: [
      "HTML5, CSS3, & JavaScript",
      "Frontend (React, Vue, Angular)",
      "Backend (Node.js, Nest.js)",
      "WordPress, Shopify",
      "Optimization & Performance",
    ],
    image: image3.src,
  },
  {
    title: "Graphic Design",
    subtitle: "Designing all kind of graphic design content",
    features: [
      "Brand Identity",
      "Logo",
      "Van Wrap design",
      "T-shirt design",
      "Advertisement design",
    ],
    image: image4.src,
  },
];

export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="bg-[#07364a] py-12 px-4 md:px-8 rounded-3xl max-w-7xl  mt-11 mx-auto">
      <h2 className="text-lg text-white font-normal mb-6">Services</h2>
      {/* Card container with transitions */}
      <div className=" flex flex-col gap-6 transition-all duration-500">
        {(showAll ? services : [services[0]]).map((service, idx) => (
          <div
            key={service.title}
            className="flex items-stretch justify-between bg-white rounded-2xl  pl-6 min-h-[250px] overflow-hidden transition-all duration-500"
            style={{
              // Simple fade-in/stagger could be done with CSS/animation library if needed
              transitionDelay: `${idx * 0.08}s`,
            }}
          >
            {/* Text Side */}
            <div className="flex-1 py-8 pr-4">
              <h3 className="text-[32px] text-text-blue font-normal mb-1">
                {service.title}
              </h3>
              <p className="text-[20px] font-light text-text-blue mb-4">
                {service.subtitle}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center font-light text-lg text-text-blue"
                  >
                    <span className="inline-block text-[#98c73d] mr-2">
                      <Image src={tick.src} width={20} height={20} alt="tick" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* Image Side */}
            <div className="shrink-0  h-auto  w-fit rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={service.image}
                alt={`${service.title} illustration`}
                width={1000}
                height={1600}
                className="object-cover w-full h-full transition"
              />
            </div>
          </div>
        ))}
      </div>
      {/* See More Button */}
      <div className="flex justify-center mt-6">
        {!showAll && (
          <button
            className="text-xl px-6 py-2 rounded-lg text-white font-medium   transition-all duration-400 "
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
}
