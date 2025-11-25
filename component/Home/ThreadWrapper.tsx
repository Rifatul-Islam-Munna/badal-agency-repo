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
    // Only load after user interacts (mouse or scroll)
    const handler = () => setShowThreads(true);
    window.addEventListener("mousemove", handler, { once: true });
    window.addEventListener("scroll", handler, { once: true });

    // Clean up event listeners
    return () => {
      window.removeEventListener("mousemove", handler);
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
