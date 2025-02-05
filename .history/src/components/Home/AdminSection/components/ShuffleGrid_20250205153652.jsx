import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const squareData = [
  {
    id: 1,
    src: "https://www.radioidola.com/wp-content/uploads/2024/11/2024-11-14_b8f5caae.jpg",
  },
  {
    id: 2,
    src: "https://image.jpnn.com/resize/570x380-80/arsip/normal/2023/05/16/pebasket-kaleb-ramot-gemilang-saat-berlaga-pada-sea-games-20-bcl3.jpg",
  },
  {
    id: 3,
    src: "https://image.kemenpora.go.id/images/content/2024/06/04/5013/5563Berjuang-Maksimal-di-Final--Tim-Bulu-Tangkis-Beregu-Putri-Indonesia-Sumbang-Medali-Perak-di-ASEAN-Schools-Games-2024.jpg",
  },
  {
    id: 4,
    src: "https://imgsrv2.voi.id/ucvqat89eQCqanYLWW3qb3caomUNF7ifJtTJbX7wP-E/auto/970/544/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy80MDU1Ny8yMDIxMDMyNDE5NDgtbWFpbi5jcm9wcGVkXzE2MTY1OTAxMDMuanBlZw.jpg",
  },
  {
    id: 5,
    src: "https://cdn.antaranews.com/cache/1200x800/2018/08/ag-bola-voli-indonesia-vs-kyrgystan-1.jpg",
  },
  {
    id: 6,
    src: "https://img.okezone.com/content/2024/01/26/43/2960965/international-indonesia-open-2024-rangsang-kompetisi-biliar-aVZNM8Xpgq.jpg",
  },
  {
    id: 7,
    src: "https://selangorjournal.my/wp-content/uploads/2024/08/FW1410004_SUKMA135_15082024_FUTSAL-lpr-960x640.jpg.webp",
  },
  {
    id: 8,
    src: "https://image.kemenpora.go.id/images/content/2021/08/23/886/8085Hadapi-Unggulan-Pertama--Atlet-Para-Tenis-Meja-Indonesia-Komet-dan-Adyos-Akan-Tampil-Maksimal.jpeg",
  },
  {
    id: 9,
    src: "https://img.20mn.fr/RitlJKzNSMywEQ9kJNJLMCk/1444x920_derive-du-tennis-du-squash-et-du-badminton-le-padel-se-joue-exclusivement-a-4-joueurs-sur-un-court-plus-petit-et-encadre-de-murs-et-grillages-dimanche-12-juin-2022-forest-hill-marnes-la-coquette-qualifications-departementales-de-padel-04reynaudtristan-padel0638-2207191520-credit-tristan-reynaud-sipa-2207191526",
  },
  {
    id: 10,
    src: "https://hawagym.com/wp-content/uploads/2016/10/Advantages-of-aerobic-fitness-1.jpg",
  },
  {
    id: 11,
    src: "https://waspadaaceh.com/wp-content/uploads/2022/10/Screenshot_20221023-100402_WhatsApp.jpg",
  },
  {
    id: 12,
    src: "https://asset-2.tstatic.net/bali/foto/bank/images/Tribun-Network-X-Sinarmas-Land-Sukses-Gelar-Turnamen-Golf-2023-Menhub-Semoga-Bisa-Digelar-Rutin.jpg",
  },
  {
    id: 13,
    src: "https://cdn.antaranews.com/cache/asiangames/800x533/2018/8/27/Baseball-Putra-Penyisihan-Jepang-vs-Cina-270818-kye-6.jpg",
  },
  {
    id: 14,
    src: "https://asset-2.tstatic.net/tribunnews/foto/bank/images/20140504_212859_tenis-meja-dunia.jpg",
  },
  {
    id: 15,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3H684SVT4DL6WQL3b3HgpmJOmj0rMmZkSlvTUbfbuI4asg-kP3DM9DJolfy0pYiDg274&usqp=CAU",
  },
  {
    id: 16,
    src: "https://cdn.antaranews.com/cache/1200x800/2019/04/23/2019-04-22T172625Z_1716269350_RC14C4620F90_RTRMADP_3_ASIAN-ATHLETICS.jpg",
  },
];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}></motion.div>
  ));
};

export const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares}
    </div>
  );
};
