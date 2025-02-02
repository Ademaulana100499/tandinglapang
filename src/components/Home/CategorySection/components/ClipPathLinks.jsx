import React from "react";
import LinkBox from "./LinkBox";
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

const ClipPathLinks = () => {
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
          <LinkBox Icon={GiSoccerBall} href="/explore?sport_category_id=1">
            <p className="text-sm mt-2 ">Sepak Bola</p>
          </LinkBox>
          <LinkBox Icon={GiShuttlecock} href="/explore?sport_category_id=4">
            <p className="text-sm mt-2">Bulu Tangkis</p>
          </LinkBox>
        </div>
        <div className="grid grid-cols-4 divide-x divide-neutral-900">
          <LinkBox
            Icon={MdSportsBasketball}
            href="/explore?sport_category_id=5">
            <p className="text-sm mt-2">Basket</p>
          </LinkBox>
          <LinkBox
            Icon={MdOutlineSportsVolleyball}
            href="/explore?sport_category_id=13">
            <p className="text-sm mt-2">Voli</p>
          </LinkBox>
          <LinkBox
            Icon={MdOutlineSportsTennis}
            href="/explore?sport_category_id=6">
            <p className="text-sm mt-2">Tenis</p>
          </LinkBox>
          <LinkBox Icon={MdSportsGolf} href="/explore?sport_category_id=9">
            <p className="text-sm mt-2">Golf</p>
          </LinkBox>
        </div>
        <div className="grid grid-cols-3 divide-x divide-neutral-900">
          <LinkBox Icon={MdSportsSoccer} href="/explore?sport_category_id=2">
            <p className="text-sm mt-2">Futsal</p>
          </LinkBox>
          <LinkBox
            Icon={MdOutlineSportsMma}
            href="/explore?sport_category_id=10">
            <p className="text-sm mt-2">Tinju</p>
          </LinkBox>
          <LinkBox Icon={RiBilliardsFill} href="/explore?sport_category_id=8">
            <p className="text-sm mt-2">Billiards</p>
          </LinkBox>
        </div>
      </div>
    </div>
  );
};

export default ClipPathLinks;
