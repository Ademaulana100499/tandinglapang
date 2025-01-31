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
  default: [
    "https://img-cdn.medkomtek.com/1UDy5Oqu-0MLZ6euD8WDQixueJM=/0x0/smart/filters:quality(100):format(webp)/article/2IkVR6nR8uwlt_srzOfB6/original/070686200_1640338403-Cara-Memilih-Olahraga-yang-Cocok-2.jpg",
    "https://example.com/default-image2.jpg", // Gambar ke-2
    "https://example.com/default-image3.jpg", // Gambar ke-3
    "https://example.com/default-image4.jpg", // Gambar ke-4
    "https://example.com/default-image5.jpg", // Gambar ke-5
  ],
  "sepak bola": [
    GiSoccerBall,
    "https://example.com/soccer-image2.jpg",
    "https://example.com/soccer-image3.jpg",
    "https://example.com/soccer-image4.jpg",
    "https://example.com/soccer-image5.jpg",
  ],
  basketball: [
    MdOutlineSportsBasketball,
    "https://example.com/basketball-image2.jpg",
    "https://example.com/basketball-image3.jpg",
    "https://example.com/basketball-image4.jpg",
    "https://example.com/basketball-image5.jpg",
  ],
  badminton: [
    GiShuttlecock,
    "https://example.com/badminton-image2.jpg",
    "https://example.com/badminton-image3.jpg",
    "https://example.com/badminton-image4.jpg",
    "https://example.com/badminton-image5.jpg",
  ],
  volley: [
    MdOutlineSportsVolleyball,
    "https://example.com/volley-image2.jpg",
    "https://example.com/volley-image3.jpg",
    "https://example.com/volley-image4.jpg",
    "https://example.com/volley-image5.jpg",
  ],
  tenis: [
    MdOutlineSportsTennis,
    "https://example.com/tenis-image2.jpg",
    "https://example.com/tenis-image3.jpg",
    "https://example.com/tenis-image4.jpg",
    "https://example.com/tenis-image5.jpg",
  ],
  billiard: [
    RiBilliardsFill,
    "https://example.com/billiard-image2.jpg",
    "https://example.com/billiard-image3.jpg",
    "https://example.com/billiard-image4.jpg",
    "https://example.com/billiard-image5.jpg",
  ],
  futsal: [
    MdSportsSoccer,
    "https://example.com/futsal-image2.jpg",
    "https://example.com/futsal-image3.jpg",
    "https://example.com/futsal-image4.jpg",
    "https://example.com/futsal-image5.jpg",
  ],
  baseball: [
    MdSportsBaseball,
    "https://example.com/baseball-image2.jpg",
    "https://example.com/baseball-image3.jpg",
    "https://example.com/baseball-image4.jpg",
    "https://example.com/baseball-image5.jpg",
  ],
  "mini soccer": [
    PiSoccerBall,
    "https://example.com/mini-soccer-image2.jpg",
    "https://example.com/mini-soccer-image3.jpg",
    "https://example.com/mini-soccer-image4.jpg",
    "https://example.com/mini-soccer-image5.jpg",
  ],
  "tenis meja": [
    TbPingPong,
    "https://example.com/tenis-meja-image2.jpg",
    "https://example.com/tenis-meja-image3.jpg",
    "https://example.com/tenis-meja-image4.jpg",
    "https://example.com/tenis-meja-image5.jpg",
  ],
  golf: [
    MdSportsGolf,
    "https://example.com/golf-image2.jpg",
    "https://example.com/golf-image3.jpg",
    "https://example.com/golf-image4.jpg",
    "https://example.com/golf-image5.jpg",
  ],
  padel: [
    PiSpadeLight,
    "https://example.com/padel-image2.jpg",
    "https://example.com/padel-image3.jpg",
    "https://example.com/padel-image4.jpg",
    "https://example.com/padel-image5.jpg",
  ],
  squash: [
    GiTennisRacket,
    "https://example.com/squash-image2.jpg",
    "https://example.com/squash-image3.jpg",
    "https://example.com/squash-image4.jpg",
    "https://example.com/squash-image5.jpg",
  ],
  hockey: [
    GiHockey,
    "https://example.com/hockey-image2.jpg",
    "https://example.com/hockey-image3.jpg",
    "https://example.com/hockey-image4.jpg",
    "https://example.com/hockey-image5.jpg",
  ],
  running: [
    GiRunningShoe,
    "https://example.com/running-image2.jpg",
    "https://example.com/running-image3.jpg",
    "https://example.com/running-image4.jpg",
    "https://example.com/running-image5.jpg",
  ],
  fitness: [
    MdFitnessCenter,
    "https://example.com/fitness-image2.jpg",
    "https://example.com/fitness-image3.jpg",
    "https://example.com/fitness-image4.jpg",
    "https://example.com/fitness-image5.jpg",
  ],
  aerobik: [
    TbStretching2,
    "https://example.com/aerobik-image2.jpg",
    "https://example.com/aerobik-image3.jpg",
    "https://example.com/aerobik-image4.jpg",
    "https://example.com/aerobik-image5.jpg",
  ],
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
