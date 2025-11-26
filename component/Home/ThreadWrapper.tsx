"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Pure client component, dynamically imported
const Threads = dynamic(() => import("@/components/Threads"), {
  ssr: false,
  loading: () => null,
});

const ThreadWrapper = () => {
  const [showThreads, setShowThreads] = useState(false);

  useEffect(() => {
    const handler = () => setShowThreads(true);

    // For desktop: mousemove and scroll
    if (window.ontouchstart === undefined) {
      window.addEventListener("mousemove", handler, { once: true });
    }
    // For mobile: touchstart and scroll
    window.addEventListener("touchstart", handler, { once: true });

    window.addEventListener("scroll", handler, { once: true });

    return () => {
      if (window.ontouchstart === undefined) {
        window.removeEventListener("mousemove", handler);
      }
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      {showThreads ? (
        <Threads
          amplitude={2.3}
          distance={0.8}
          enableMouseInteraction={false}
          color={[255, 255, 255]}
        />
      ) : null}
    </div>
  );
};

export default ThreadWrapper;
