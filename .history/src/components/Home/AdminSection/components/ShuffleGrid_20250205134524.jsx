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
    src: "https://cdn-assetd.kompas.id/gUTW2OTAB24nfh-Yn4f69wa9rUY=/1024x576/filters:watermark(https://cdn-content.kompas.id/umum/kompas_main_logo.png,-16p,-13p,0)/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2020%2F03%2F07%2Fdb576d4a-00fe-4b34-8a22-d2f1eb207311_jpg.jpg",
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
  return shuffle([...squareData]).map((sq) => (
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
