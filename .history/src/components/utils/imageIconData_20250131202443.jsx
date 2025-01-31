import {
  GiSoccerBall,
  GiShuttlecock,
  GiTennisRacket,
  GiHockey,
  GiRunningShoe,
} from "react-icons/gi";
import {
  MdOutlineSportsTennis,
  MdOutlineSportsVolleyball,
  MdOutlineSportsBasketball,
  MdSportsSoccer,
  MdSportsBaseball,
  MdSportsGolf,
  MdFitnessCenter,
} from "react-icons/md";
import { PiSoccerBall, PiSpadeLight } from "react-icons/pi";
import { RiBilliardsFill } from "react-icons/ri";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { TbPingPong } from "react-icons/tb";

export const imageMap = {
  default: "https://siakad.itbwigalumajang.ac.id/img/default.jpg",
  "sepak bola":
    "https://www.dailysports.id/upload/xlarge/c8f976da413050fa5cd376b956a9fda2.jpg",
  basketball:
    "https://i0.wp.com/abouttng.com/wp-content/uploads/2022/06/gambar-01-6.jpg?fit=2251%2C1252&ssl=1",
  badminton:
    "https://i0.wp.com/abouttng.com/wp-content/uploads/2022/06/gambar-01-6.jpg?fit=2251%2C1252&ssl=1",
  volleyball: "/images/volleyball.jpg",
  tennis: "/images/tennis.jpg",
  swimming: "/images/swimming.jpg",
};

export const iconMap = {
  default: MdOutlineDisabledByDefault,
  "sepak bola": GiSoccerBall,
  basketball: MdOutlineSportsBasketball,
  badminton: GiShuttlecock,
  volley: MdOutlineSportsVolleyball,
  tenis: MdOutlineSportsTennis,
  billiard: RiBilliardsFill,
  futsal: MdSportsSoccer,
  baseball: MdSportsBaseball,
  "mini soccer": PiSoccerBall,
  "tenis meja": TbPingPong,
  golf: MdSportsGolf,
  padel: PiSpadeLight,
  squash: GiTennisRacket,
  hockey: GiHockey,
  running: GiRunningShoe,
  fitness: MdFitnessCenter,
};
