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
  MdOutlineSports,
} from "react-icons/md";
import { PiSoccerBall, PiSpadeLight } from "react-icons/pi";
import { RiBilliardsFill } from "react-icons/ri";
import { TbPingPong, TbStretching2 } from "react-icons/tb";

export const imageMap = {
  default:
    "https://img-cdn.medkomtek.com/1UDy5Oqu-0MLZ6euD8WDQixueJM=/0x0/smart/filters:quality(100):format(webp)/article/2IkVR6nR8uwlt_srzOfB6/original/070686200_1640338403-Cara-Memilih-Olahraga-yang-Cocok-2.jpg",
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
  default: MdOutlineSports,
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
  aerobik: TbStretching2,
};
