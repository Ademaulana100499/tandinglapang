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
import { useRouter } from "next/router";

export const CategorySport = ({ setSelectedCategory }) => {
  return (
    <div id="category" className="bg-neutral-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks setSelectedCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

const ClipPathLinks = ({ setSelectedCategory }) => {
  return (
    <div>
      <p className="flex items-center justify-center text-3xl sm:text-4xl lg:text-6xl md:text-6xl font-bold uppercase mb-3 text-black">
        <span>Cari Kategori Olahraga Favoritmu</span>
      </p>
      <p className="flex items-center justify-center text-xl sm:text-xl md:text-1xl lg:text-2xl mb-10 text-black">
        <span>
          Jelajahi pilihan olahraga yang menantang dan temukan lawan sparring
          terbaik untuk adu skill di lapangan bersama teman!
        </span>
      </p>

      <div className="divide-y divide-neutral-900 border text-black border-neutral-900">
        <div className="grid grid-cols-2 divide-x divide-neutral-900">
          <LinkBox
            Icon={GiSoccerBall}
            href="#"
            category="Soccer"
            setSelectedCategory={setSelectedCategory}>
            Sepak Bola
          </LinkBox>
          <LinkBox
            Icon={GiShuttlecock}
            href="#"
            category="Badminton"
            setSelectedCategory={setSelectedCategory}>
            Bulu Tangkis
          </LinkBox>
        </div>
        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox
            Icon={MdSportsBasketball}
            href="#"
            category="Basketball"
            setSelectedCategory={setSelectedCategory}>
            Basket
          </LinkBox>

          <LinkBox
            Icon={MdOutlineSportsVolleyball}
            href="#"
            category="Volleyball"
            setSelectedCategory={setSelectedCategory}>
            Voli
          </LinkBox>
          <LinkBox
            Icon={MdOutlineSportsTennis}
            href="#"
            category="Tennis"
            setSelectedCategory={setSelectedCategory}>
            Tenis
          </LinkBox>
          <LinkBox
            Icon={MdSportsGolf}
            href="#"
            category="Golf"
            setSelectedCategory={setSelectedCategory}>
            Golf
          </LinkBox>
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox
            Icon={MdSportsSoccer}
            href="#"
            category="Futsal"
            setSelectedCategory={setSelectedCategory}>
            Futsal
          </LinkBox>
          <LinkBox
            Icon={MdOutlineSportsMma}
            href="#"
            category="Boxing"
            setSelectedCategory={setSelectedCategory}>
            Tinju
          </LinkBox>
          <LinkBox
            Icon={RiBilliardsFill}
            href="#"
            category="Billiards"
            setSelectedCategory={setSelectedCategory}>
            Billiards
          </LinkBox>
        </div>
      </div>
    </div>
  );
};

const LinkBox = ({ Icon, href, category, setSelectedCategory, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center h-20 w-full sm:h-28 md:h-36">
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />
      <span>{children}</span>
    </a>
  );
};
