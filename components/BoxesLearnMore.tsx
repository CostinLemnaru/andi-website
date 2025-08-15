"use client";

import React from "react";
import SectionCard from "@/components/section-card";
import ScrollReveal from "@/components/scroll-reveal";
import { getLucideIcon } from "@/lib/icons-map";

type BoxItem = {
  id: number;
  Title: string;
  Description: string;
  Icon: string;
  Url: string;
};

type BoxesLearnMoreData = {
  __component?: string;
  id?: number;
  Boxes?: BoxItem[];
};

type Props = {
  data: BoxesLearnMoreData;
};

export default function BoxesLearnMore({ data }: Props) {
  const boxes = data?.Boxes ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {boxes.map((box, idx) => {
          const Icon = getLucideIcon(box.Icon);
          const delay = idx * 100;

          return (
            <ScrollReveal key={box.id ?? `${box.Title}-${idx}`} delay={delay}>
              <SectionCard
                title={box.Title}
                description={box.Description}
                icon={
                  Icon ? (
                    <Icon className="h-6 w-6 text-white" />
                  ) : (
                    <div className="h-6 w-6 rounded-sm bg-white/30" />
                  )
                }
                link={box.Url}
              />
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
