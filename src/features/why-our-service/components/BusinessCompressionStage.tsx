"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CardPosition = "left" | "right" | "bottom";

type Business = {
  readonly id: string;
  readonly name: string;
  readonly asset: string;
  readonly background: string;
  readonly position: CardPosition;
};

type BusinessCompressionStageProps = {
  businesses: readonly Business[];
  genericAsset: string;
};

type StageSize = { width: number; height: number };

function useStageSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<StageSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function initialPosition(position: CardPosition, width: number) {
  if (width < 640) {
    if (position === "left") return { x: -42, y: -176 };
    if (position === "right") return { x: 46, y: -2 };
    return { x: -34, y: 172 };
  }

  if (width < 1024) {
    if (position === "left") return { x: -210, y: -150 };
    if (position === "right") return { x: 205, y: -12 };
    return { x: -72, y: 168 };
  }

  if (position === "left") return { x: -380, y: -160 };
  if (position === "right") return { x: 360, y: -8 };
  return { x: -118, y: 178 };
}

function BusinessCard({
  business,
  progress,
  stageWidth,
}: {
  business: Business;
  progress: MotionValue<number>;
  stageWidth: number;
}) {
  const start = initialPosition(business.position, stageWidth);
  const x = useTransform(progress, [0, 0.8, 1], [start.x, 0, 0]);
  const y = useTransform(progress, [0, 0.8, 1], [start.y, 0, 0]);
  const cardOpacity = useTransform(progress, [0, 0.68, 0.78, 0.88, 1], [1, 1, 0.58, 0, 0]);
  const detailMaskOpacity = useTransform(progress, [0, 0.28, 0.58, 1], [0, 0, 1, 1]);
  const neutralOpacity = useTransform(progress, [0, 0.5, 0.72, 1], [0, 0, 0.86, 0.86]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <motion.article
        className="relative w-[min(82vw,320px)] will-change-transform sm:w-[300px] lg:w-[320px]"
        data-testid={`business-card-${business.id}`}
        style={{ x, y, opacity: cardOpacity }}
      >
        <Image
          className="block h-auto w-full"
          src={business.asset}
          alt={`${business.name}의 구체적인 운영 특성을 보여주는 카드`}
          width={360}
          height={260}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 82vw"
          unoptimized
        />
        <motion.span
          className="pointer-events-none absolute top-[28%] right-[5.5%] left-[5.5%] h-[30%] rounded-[4px]"
          data-testid={`business-detail-mask-${business.id}`}
          style={{ backgroundColor: business.background, opacity: detailMaskOpacity }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute right-[5.5%] bottom-[17%] left-[5.5%] h-[20%] rounded-full"
          style={{ backgroundColor: business.background, opacity: detailMaskOpacity }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute inset-[6%] rounded-[18px] bg-[#F3F4F6]"
          style={{ opacity: neutralOpacity }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}

function GenericRestaurantCard({
  asset,
  progress,
}: {
  asset: string;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.74, 0.96, 1], [0, 0, 1, 1]);
  const scale = useTransform(progress, [0, 0.74, 0.96, 1], [0.94, 0.94, 1, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <motion.article
        className="w-[min(86vw,350px)] will-change-transform sm:w-[330px] lg:w-[350px]"
        data-testid="generic-restaurant-card"
        style={{ opacity, scale }}
      >
        <Image
          className="block h-auto w-full"
          src={asset}
          alt="개별 특징이 사라진 전형적인 레스토랑 카드"
          width={360}
          height={280}
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 330px, 86vw"
          unoptimized
        />
      </motion.article>
    </div>
  );
}

function ReducedMotionComparison({ businesses, genericAsset }: BusinessCompressionStageProps) {
  return (
    <div className="mx-auto hidden w-full max-w-[1100px] px-5 py-14 motion-reduce:block sm:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {businesses.map((business) => (
          <Image
            key={business.id}
            className="mx-auto h-auto w-full max-w-[300px]"
            src={business.asset}
            alt={`${business.name} 카드`}
            width={360}
            height={260}
            unoptimized
          />
        ))}
      </div>
      <Image
        className="mx-auto mt-16 h-auto w-full max-w-[340px]"
        src={genericAsset}
        alt="세 비즈니스가 일반화된 전형적인 레스토랑 카드"
        width={360}
        height={280}
        unoptimized
      />
      <div className="mt-8 grid gap-5 text-center sm:grid-cols-2 sm:items-end sm:text-left">
        <p className="text-[17px] leading-[1.35] font-bold text-navy-muted sm:text-[20px]">
          같은 업종이라는 이유만으로,
          <br />
          비즈니스의 차이까지 같아져서는 안 됩니다.
        </p>
        <p className="text-[26px] leading-[1.08] font-bold text-navy-ink sm:text-right sm:text-[34px]">
          우리는 업종이 아니라,
          <br />
          비즈니스를 이해한 뒤 디자인합니다.
        </p>
      </div>
    </div>
  );
}

export function BusinessCompressionStage({
  businesses,
  genericAsset,
}: BusinessCompressionStageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: stageRef, size } = useStageSize<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const storyProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1], { clamp: true });
  const conclusionOpacity = useTransform(storyProgress, [0, 0.76, 0.96, 1], [0, 0, 1, 1]);
  const conclusionY = useTransform(storyProgress, [0, 0.76, 0.96, 1], [18, 18, 0, 0]);

  return (
    <div
      ref={sectionRef}
      className="relative h-[240dvh] motion-reduce:h-auto"
      data-testid="business-compression-stage"
    >
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden motion-reduce:hidden">
        <div
          ref={stageRef}
          className="relative mx-auto h-[720px] w-full max-w-[1280px] motion-reduce:h-[720px] sm:h-[760px] lg:h-[800px]"
        >
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              progress={storyProgress}
              stageWidth={size.width}
            />
          ))}
          <GenericRestaurantCard asset={genericAsset} progress={storyProgress} />
          <motion.div
            className="absolute top-1/2 right-5 left-5 mt-[220px] grid gap-4 text-center opacity-0 sm:right-8 sm:left-8 sm:mt-[225px] sm:grid-cols-2 sm:items-end sm:text-left lg:right-12 lg:left-12 lg:mt-[230px]"
            data-testid="problem-two-conclusion"
            style={{ opacity: conclusionOpacity, y: conclusionY }}
          >
            <p className="text-[16px] leading-[1.35] font-bold text-navy-muted sm:text-[18px] lg:text-[20px]">
              같은 업종이라는 이유만으로,
              <br />
              비즈니스의 차이까지 같아져서는 안 됩니다.
            </p>
            <p className="text-[24px] leading-[1.08] font-bold text-navy-ink sm:text-right sm:text-[28px] lg:text-[34px]">
              우리는 업종이 아니라,
              <br />
              비즈니스를 이해한 뒤 디자인합니다.
            </p>
          </motion.div>
        </div>
      </div>
      <ReducedMotionComparison businesses={businesses} genericAsset={genericAsset} />
    </div>
  );
}
