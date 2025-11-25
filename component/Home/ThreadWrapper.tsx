"use client";
import dynamic from "next/dynamic";

import React, { Suspense } from "react";
const Threads = dynamic(() => import("@/components/Threads"), { ssr: false });

const ThreadWrapper = () => {
  return (
    <Suspense fallback={null}>
      <Threads
        amplitude={2.3}
        distance={0.8}
        enableMouseInteraction={false}
        color={[255, 255, 255]}
      />
    </Suspense>
  );
};

export default ThreadWrapper;
