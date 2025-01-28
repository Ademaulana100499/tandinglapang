import React from "react";
import { GiSoccerBall, GiShuttlecock } from "react-icons/gi";
import {
  MdOutlineSportsTennis,
  MdOutlineSportsVolleyball,
  MdOutlineSportsMma,
  MdSportsSoccer,
  MdSportsBasketball,
  MdSportsGolf,
} from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { useAnimate } from "framer-motion";

export const CategorySport = () => {
  return (
    <div id="category" className="bg-neutral-50 px-4  py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div>
      <p className="flex items-center justify-center text-3xl sm:text-4xl  lg:text-6xl  md:text-6xl font-bold uppercase mb-3  text-black">
        <span>Cari Kategori Olahraga Favoritmu</span>
      </p>
      <p className="flex items-center justify-center text-xl sm:text-xl md:text-1xl lg:text-2xl mb-10 text-black">
        <span>
          Jelajahi pilihan olahraga yang menantang dan temukan lawan sparring
          terbaik untuk adu skill di lapangan bersama teman!
        </span>
      </p>

      <div className="divide-y divide-neutral-900 border text-black border-neutral-900">
        <div className="grid grid-cols-2 divide-x  divide-neutral-900">
          <LinkBox Icon={GiSoccerBall} href="#">
            <p className="text-sm mt-2 ">Sepak Bola</p>
          </LinkBox>
          <LinkBox Icon={GiShuttlecock} href="#">
            <p className="text-sm mt-2">Bulu Tangkis</p>
          </LinkBox>
        </div>
        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox Icon={MdSportsBasketball} href="#">
            <p className="text-sm mt-2">Basket</p>
          </LinkBox>

          <LinkBox Icon={MdOutlineSportsVolleyball} href="#">
            <p className="text-sm mt-2">Voli</p>
          </LinkBox>
          <LinkBox Icon={MdOutlineSportsTennis} href="#">
            <p className="text-sm mt-2">Tenis</p>
          </LinkBox>
          <LinkBox Icon={MdSportsGolf} href="#">
            <p className="text-sm mt-2">Golf</p>
          </LinkBox>
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox Icon={MdSportsSoccer} href="#">
            <p className="text-sm mt-2">Futsal</p>
          </LinkBox>
          <LinkBox Icon={MdOutlineSportsMma} href="#">
            <p className="text-sm mt-2">Tinju</p>
          </LinkBox>
          <LinkBox Icon={RiBilliardsFill} href="#">
            <p className="text-sm mt-2">Billiards</p>
          </LinkBox>
        </div>
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, categoryId, children, onCategoryClick }) => {
  const [scope, animate] = useAnimate();
  const handleClick = () => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick} // Trigger category click handler
      className="relative flex flex-col items-center justify-center h-20 w-full sm:h-28 md:h-36">
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />
      <span>{children}</span>
    </a>
  );

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="relative flex flex-col items-center justify-center h-20 w-full sm:h-28 md:h-36">
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />
      <span>{children}</span>

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white">
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
        <span>{children}</span>
      </div>
    </a>
  );
};
