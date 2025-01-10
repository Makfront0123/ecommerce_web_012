"use client";

import BannerBody from "@/app/(routes)/home/components/BannerBody";
import CategoriesContent from "@/app/(routes)/home/components/CategoriesContent";
import ExploreContent from "@/app/(routes)/home/components/ExploreContent";
import FeatureContent from "@/app/(routes)/home/components/FeatureContent";
import Hero from "@/app/(routes)/home/components/Hero";
import SectionBody from "@/components/SectionBody";
import TodayContent from "@/app/(routes)/home/components/TodayContent";

export default function Home() {

  return (
    <main className="mx-auto container overflow-hidden  flex flex-col items-center justify-center" id="home">
      <Hero />
      <SectionBody title="Today`s">
        <TodayContent />
      </SectionBody>
      <SectionBody title="Categories">
        <CategoriesContent />
      </SectionBody>
      <SectionBody title="Our Products">
        <ExploreContent />
      </SectionBody>
      <BannerBody />
      <SectionBody title="Feature">
        <FeatureContent />
      </SectionBody>
    </main>
  );
}