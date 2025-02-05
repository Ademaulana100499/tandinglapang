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
    "https://awsimages.detik.net.id/community/media/visual/2024/04/26/timnas-indonesia-u-23-vs-korea-selatan-7.jpeg?w=1200",
    "https://www.jasapembuatanlapangan.id/wp-content/uploads/2021/11/ilustrasi-permainan-bulutangkis.jpg",
    "https://asset.indosport.com/article/image/q/80/345033/australia_v_indonesia_4-169.jpg?w=750&h=423&t=123",
    "https://cdn.antaranews.com/cache/1200x800/2022/05/15/Final-Tenis-Beregu-SEA-Games-150522-app-14.jpg",
  ],
  "sepak bola": [
    "https://www.radioidola.com/wp-content/uploads/2024/11/2024-11-14_b8f5caae.jpg",
    "https://images.bisnis.com/posts/2024/11/13/1815710/rooms_inc_sepakbola_1_1731492481.jpg",
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
    "https://cdn.utakatikotak.com/20210305/20210305_112207Permainan_Futsal.png",
    "https://imgcdn.espos.id/@espos/images/2024/11/20241103203642-timnas-futsal-indonesia.jpg?quality=60",
    "https://www.efsworldwide.com/wp-content/uploads/2021/11/Selangor-MAC-1024x683.jpg",
    "https://assets.hmetro.com.my/images/articles/futsal23_1724413085.jpg",
    "https://selangorjournal.my/wp-content/uploads/2024/08/FW1410004_SUKMA135_15082024_FUTSAL-lpr-960x640.jpg.webp",
  ],
  baseball: [
    "https://img.okezone.com/content/2022/09/20/43/2671641/ini-alasan-mengapa-baseball-sangat-populer-di-jepang-xeaNP24MqX.jpg",
    "https://asset-2.tstatic.net/wartakota/foto/bank/images/timnas-baseball-putra-jepang.jpg",
    "https://mislanguageschool.co.id/assets/img/artikel/641de2f08fcb8d27729aee28ab97883f.jpg",
    "https://cdn.antaranews.com/cache/asiangames/800x533/2018/8/27/Baseball-Putra-Penyisihan-Jepang-vs-Cina-270818-kye-6.jpg",
    "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/zonabandung/200131220259-tim-b.jpg",
  ],
  "mini soccer": [
    "https://www.efsworldwide.com/wp-content/uploads/2021/11/Selangor-MAC-1024x683.jpg",
    "https://assets.hmetro.com.my/images/articles/futsal23_1724413085.jpg",
    "https://selangorjournal.my/wp-content/uploads/2024/08/FW1410004_SUKMA135_15082024_FUTSAL-lpr-960x640.jpg.webp",
    "https://imgcdn.espos.id/@espos/images/2024/11/20241103203642-timnas-futsal-indonesia.jpg?quality=60",
    "https://cdn.utakatikotak.com/20210305/20210305_112207Permainan_Futsal.png",
  ],
  "tenis meja": [
    "https://asset-2.tstatic.net/tribunnews/foto/bank/images/20140504_212859_tenis-meja-dunia.jpg",
    "https://cdn.antaranews.com/cache/1200x800/2021/08/28/david-jacobs2.jpg",
    "https://www.beritadaerah.co.id/wp-content/uploads/2023/07/WhatsApp_Image_2023-07-16_at_10_03_19_compressed-750x400.jpeg",
    "https://image.kemenpora.go.id/images/content/2021/08/23/886/8085Hadapi-Unggulan-Pertama--Atlet-Para-Tenis-Meja-Indonesia-Komet-dan-Adyos-Akan-Tampil-Maksimal.jpeg",
    "https://image.kemenpora.go.id/images/content/2024/09/20/5479/3451Menpora-Dito-Bangga-Atlet-Tenis-Meja-Bersaing-Ketat-di-PON-XXI-Aceh-Sumut-2024.jpg",
  ],
  golf: [
    "https://bogoronline.com/wp-content/uploads/2024/06/IMG-20240629-WA0041.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7UeMUu3K40ScwpFlPaX94kpFpB_tQ5FQ1A&s",
    "https://golfjoy.co.id/wp-content/uploads/2022/10/Jonathan-Xavier-Hartono.jpg",
    "https://asset-2.tstatic.net/bali/foto/bank/images/Tribun-Network-X-Sinarmas-Land-Sukses-Gelar-Turnamen-Golf-2023-Menhub-Semoga-Bisa-Digelar-Rutin.jpg",
    "https://cdn.antaranews.com/cache/1200x800/2024/06/29/IMG-20240629-WA0026_2.jpg.webp",
  ],
  padel: [
    "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/57/2024/05/31/padel-3222395611.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAeRSvwugJfBFd9bDrtv7gnWuY-lmTkvlWF8zx3n2_U3PB8z6n6qWQ93ClRwuAmqCgkE&usqp=CAU",
    "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/824/2024/06/10/WhatsApp-Image-2024-06-10-at-111504_d5775ce4-773364736.jpg",
    "https://www.latercera.com/resizer/Y2RtovCCmAVUEguauny0dmtQ7kA=/arc-anglerfish-arc2-prod-copesa/public/V52OU5VV4BB4ZHVBG4Z2UDMLLQ.jpg",
    "https://img.20mn.fr/RitlJKzNSMywEQ9kJNJLMCk/1444x920_derive-du-tennis-du-squash-et-du-badminton-le-padel-se-joue-exclusivement-a-4-joueurs-sur-un-court-plus-petit-et-encadre-de-murs-et-grillages-dimanche-12-juin-2022-forest-hill-marnes-la-coquette-qualifications-departementales-de-padel-04reynaudtristan-padel0638-2207191520-credit-tristan-reynaud-sipa-2207191526",
  ],
  squash: [
    "https://example.com/tenis-image1.jpg",
    "https://example.com/squash-image2.jpg",
    "https://example.com/squash-image3.jpg",
    "https://example.com/squash-image4.jpg",
    "https://example.com/squash-image5.jpg",
  ],
  hockey: [
    "https://mediaindonesia.com/cdn-cgi/image/width=800,quality=80,format=webp/https://asset.mediaindonesia.com/news/2022/08/e407347fe44c18bc2eb09b7cc4ecbce6.jpg",
    "https://cdn.rri.co.id/berita/Bandar_Lampung/o/1721883628729-Tim_Hockey_Lampung/q0nmc98h8jgg8i7.jpeg",
    "https://pict.sindonews.net/dyn/850/pena/news/2022/12/03/51/959265/kejurnas-hoki-2022-ajang-mengukur-kemampuan-atlet-hoki-tanah-air-menuju-pon-2024-fsd.jpg",
    "https://statik.tempo.co/data/2018/08/15/id_726177/726177_720.jpg",
    "https://cdn.rri.co.id/berita/52/images/1695612182343-h/1695612182343-h.jpeg",
  ],
  running: [
    "https://cloud.jpnn.com/photo/galeri/normal/2022/08/21/ketua-dpr-puan-maharani-didampingi-sekjen-pdip-hasto-kristiy-yuvh.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlxnnUvlFoPFEVwZpdyiXrfne_V-JhjdpYA&s",
    "https://cdn.antaranews.com/cache/1200x800/2019/04/23/2019-04-22T172625Z_1716269350_RC14C4620F90_RTRMADP_3_ASIAN-ATHLETICS.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmFGWW12v6GvU5DvEOPtyaoNocNfuO5-Xyg&s",
    "https://kabarsdgs.com/wp-content/uploads/2024/02/IMG-20240219-WA0009.jpg",
  ],
  fitness: [
    "https://tribratanews.polri.go.id/web/image/blog.post/64327/image",
    "https://ca.musclecheff.com/wp-content/uploads/2023/05/key-differences-between-fitness-and-bodybuilding.webp",
    "https://www.suarasurabaya.net/wp-content/uploads/2022/05/VAYO8054-840x493.jpg",
    "https://www.origym.ie/wp-content/uploads/2023/03/How-to-Become-A-Fitness-Instructor-UK.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3H684SVT4DL6WQL3b3HgpmJOmj0rMmZkSlvTUbfbuI4asg-kP3DM9DJolfy0pYiDg274&usqp=CAU",
  ],
  aerobik: [
    "https://www.goldsgym.co.id/assets/img/content/gbr.jpeg",
    "https://hawagym.com/wp-content/uploads/2016/10/Advantages-of-aerobic-fitness-1.jpg",
    "https://www.asviva.de/media/5e/19/7b/1690347420/80er_aerobicsa37de.jpg",
    "https://i.ytimg.com/vi/KPX5ljIRQVA/maxresdefault.jpg",
    "https://www.myfitfoods.com/cdn/shop/articles/ebb195917f526a8d4056528183c7ac64.jpg?v=1721967439&width=1100",
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
