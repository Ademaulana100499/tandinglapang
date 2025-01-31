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
    "https://example.com/default-image2.jpg",
    "https://example.com/default-image3.jpg",
    "https://example.com/default-image4.jpg",
    "https://example.com/default-image5.jpg",
  ],
  "sepak bola": [
    "https://images.bisnis.com/posts/2024/11/13/1815710/rooms_inc_sepakbola_1_1731492481.jpg",
    "https://www.radioidola.com/wp-content/uploads/2024/11/2024-11-14_b8f5caae.jpg",
    "https://konisalatiga.or.id/wp-content/uploads/2017/05/HBFC.suratin.jpg",
    "https://awsimages.detik.net.id/community/media/visual/2024/04/26/timnas-indonesia-u-23-vs-korea-selatan-7.jpeg?w=1200",
    "https://akcdn.detik.net.id/community/media/visual/2023/09/28/timnas-indonesia-u-24_169.jpeg?w=1200",
  ],
  basketball: [
    "https://image.jpnn.com/resize/570x380-80/arsip/normal/2023/05/16/pebasket-kaleb-ramot-gemilang-saat-berlaga-pada-sea-games-20-bcl3.jpg",
    "https://image.jpnn.com/resize/570x380-80/arsip/normal/2023/05/16/timnas-basket-indonesia-gagal-melangkah-ke-final-sea-games-2-mwrh.jpg",
    "https://asset.indosport.com/article/image/q/80/345033/australia_v_indonesia_4-169.jpg?w=750&h=423&t=123",
    "https://akcdn.detik.net.id/community/media/visual/2023/05/11/timnas-basket-indonesia_169.jpeg?w=1200",
    "https://akcdn.detik.net.id/visual/2023/05/13/games-sea-1_169.jpeg?w=400&q=90",
  ],
  badminton: [
    "https://cdns.klimg.com/bola.net/resized/810x540/library/upload/21/2023/01/996x664/rian_5c81aa6.jpg",
    "https://image.kemenpora.go.id/images/content/2022/11/06/2783/85Membanggakan--Indonesia-Juara-Umum-Kejuaraan-Dunia-Para-Bulu-Tangkis-di-Jepang.jpeg",
    "https://www.jasapembuatanlapangan.id/wp-content/uploads/2021/11/ilustrasi-permainan-bulutangkis.jpg",
    "https://image.kemenpora.go.id/images/content/2024/06/04/5013/5563Berjuang-Maksimal-di-Final--Tim-Bulu-Tangkis-Beregu-Putri-Indonesia-Sumbang-Medali-Perak-di-ASEAN-Schools-Games-2024.jpg",
    "https://rsbhayangkarabanjarmasin.co.id/wp/wp-content/uploads/2023/11/acs.jpg",
  ],
  volley: [
    "https://imgsrv2.voi.id/ucvqat89eQCqanYLWW3qb3caomUNF7ifJtTJbX7wP-E/auto/970/544/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy80MDU1Ny8yMDIxMDMyNDE5NDgtbWFpbi5jcm9wcGVkXzE2MTY1OTAxMDMuanBlZw.jpg",
    "https://radarbengkulu.bacakoran.co/upload/22c0490b06f31d7eb9b7c69f3efb3745.jpg",
    "https://cdns.klimg.com/bola.net/resized/810x540/library/upload/21/2023/12/996x664/lavani-pdam-tirtaa-p_51a62d2.jpg",
    "https://cdns.klimg.com/bola.net/resized/810x540/library/upload/21/2022/09/996x664/voli_c5de053.jpg",
    "https://imgcdn.espos.id/@espos/images/2023/06/megawati-voli.jpg?quality=60",
  ],
  tenis: [
    "https://cdn.antaranews.com/cache/1200x800/2022/05/15/Final-Tenis-Beregu-SEA-Games-150522-app-14.jpg",
    "https://imgcdn.espos.id/@espos/images/2023/08/tenis.jpg?quality=60",
    "https://ultimagz.com/wp-content/uploads/tim-tenis-putra-indonesia.jpg",
    "https://cdn-assetd.kompas.id/gUTW2OTAB24nfh-Yn4f69wa9rUY=/1024x576/filters:watermark(https://cdn-content.kompas.id/umum/kompas_main_logo.png,-16p,-13p,0)/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2020%2F03%2F07%2Fdb576d4a-00fe-4b34-8a22-d2f1eb207311_jpg.jpg",
    "https://binus.ac.id/wp-content/uploads/2021/09/264-1-mediaindonesiacom-768x512.jpg",
  ],
  billiard: [
    "https://cdn.antaranews.com/cache/1200x800/2012/09/20120910Biliar-PON-090912-Ief-1.jpg",
    "https://asset.kompas.com/crops/OM5tv0sTJLqp_lzSNLId7-osTKg=/0x0:0x0/1200x800/data/photo/2025/01/26/679628ea9b3b6.jpg",
    "https://img.okezone.com/content/2024/01/26/43/2960965/international-indonesia-open-2024-rangsang-kompetisi-biliar-aVZNM8Xpgq.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrThOvyJ8pbrxO5BRSpMhMkYAY2wpCNiVBQ&s",
    "https://asset.ayo.co.id/image/venue/172682576636169.image_cropper_1726825610424_middle.jpg",
  ],
  futsal: [
    "https://imgcdn.espos.id/@espos/images/2024/11/20241103203642-timnas-futsal-indonesia.jpg?quality=60",
    "https://cdn.utakatikotak.com/20210305/20210305_112207Permainan_Futsal.png",
    "https://www.efsworldwide.com/wp-content/uploads/2021/11/Selangor-MAC-1024x683.jpg",
    "https://assets.hmetro.com.my/images/articles/futsal23_1724413085.jpg",
    "https://selangorjournal.my/wp-content/uploads/2024/08/FW1410004_SUKMA135_15082024_FUTSAL-lpr-960x640.jpg.webp",
  ],
  baseball: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/baseball-image2.jpg",
    "https://example.com/baseball-image3.jpg",
    "https://example.com/baseball-image4.jpg",
    "https://example.com/baseball-image5.jpg",
  ],
  "mini soccer": [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/mini-soccer-image2.jpg",
    "https://example.com/mini-soccer-image3.jpg",
    "https://example.com/mini-soccer-image4.jpg",
    "https://example.com/mini-soccer-image5.jpg",
  ],
  "tenis meja": [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/tenis-meja-image2.jpg",
    "https://example.com/tenis-meja-image3.jpg",
    "https://example.com/tenis-meja-image4.jpg",
    "https://example.com/tenis-meja-image5.jpg",
  ],
  golf: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/golf-image2.jpg",
    "https://example.com/golf-image3.jpg",
    "https://example.com/golf-image4.jpg",
    "https://example.com/golf-image5.jpg",
  ],
  padel: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/padel-image2.jpg",
    "https://example.com/padel-image3.jpg",
    "https://example.com/padel-image4.jpg",
    "https://example.com/padel-image5.jpg",
  ],
  squash: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/squash-image2.jpg",
    "https://example.com/squash-image3.jpg",
    "https://example.com/squash-image4.jpg",
    "https://example.com/squash-image5.jpg",
  ],
  hockey: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/hockey-image2.jpg",
    "https://example.com/hockey-image3.jpg",
    "https://example.com/hockey-image4.jpg",
    "https://example.com/hockey-image5.jpg",
  ],
  running: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/running-image2.jpg",
    "https://example.com/running-image3.jpg",
    "https://example.com/running-image4.jpg",
    "https://example.com/running-image5.jpg",
  ],
  fitness: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/fitness-image2.jpg",
    "https://example.com/fitness-image3.jpg",
    "https://example.com/fitness-image4.jpg",
    "https://example.com/fitness-image5.jpg",
  ],
  aerobik: [
    "https://example.com/tenis-image1.jpg",
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
