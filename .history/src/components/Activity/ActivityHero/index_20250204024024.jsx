import React from "react";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { imageMap } from "../../../utils/imageIconData";
import { useScroll } from "framer-motion";
import { useRef } from "react";
const SECTION_HEIGHT = 1500;
export const HeroSectionActivity = ({ activityData }) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <BackgroundImage activityData={activityData} />
      <ParallaxEffect activityData={activityData} />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const BackgroundImage = ({ activityData }) => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${
          imageMap[activityData?.sport_category.name?.toLowerCase()]?.[0] ||
          imageMap["default"]?.[0]
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxEffect = ({ activityData }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImage
        imageSrc={
          imageMap[activityData?.sport_category.name?.toLowerCase()][1] ||
          imageMap["default"][1]
        }
        altText="And example of a space launch"
        startPosition={-200}
        endPosition={200}
        imageClass="w-1/3"
      />
      <ParallaxImage
        imageSrc={
          imageMap[activityData?.sport_category.name?.toLowerCase()][2] ||
          imageMap["default"][2]
        }
        altText="An example of a space launch"
        startPosition={200}
        endPosition={-250}
        imageClass="mx-auto w-2/3"
      />
      <ParallaxImage
        imageSrc={
          imageMap[activityData?.sport_category.name?.toLowerCase()][3] ||
          imageMap["default"][3]
        }
        altText="Orbiting satellite"
        startPosition={-200}
        endPosition={200}
        imageClass="ml-auto w-1/3"
      />
      <ParallaxImage
        imageSrc={
          imageMap[activityData?.sport_category.name?.toLowerCase()][4] ||
          imageMap["default"][4]
        }
        altText="Orbiting satellite"
        startPosition={0}
        endPosition={-500}
        imageClass="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImage = ({
  imageClass,
  altText,
  imageSrc,
  startPosition,
  endPosition,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${startPosition}px end`, `end ${endPosition * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [startPosition, endPosition]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={imageSrc}
      alt={altText}
      className={imageClass}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
