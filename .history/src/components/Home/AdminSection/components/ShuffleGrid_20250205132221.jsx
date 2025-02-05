import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { imageMap } from "@/utils/imageIconData";

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
    src: "https://gelora-public-storage.s3-ap-southeast-1.amazonaws.com/upload/public-20240723075247.jpg",
  },
  {
    id: 4,
    src: "https://premiuminterindo.com/wp-content/uploads/2023/12/Haed364d2df7241b88c3e54688ba0daf2t.webp",
  },
  {
    id: 5,
    src: "https://vendors.id/wp-content/uploads/2024/03/ezgif-3-639eb0bef5.webp",
  },
  {
    id: 6,
    src: "https://sportteknologi.id/wp-content/uploads/2024/01/20231213_043121207_iOS-scaled.jpg",
  },
  {
    id: 7,
    src: "https://www.jasapembuatanlapangan.id/wp-content/uploads/2019/08/lapangan-bola-voli.jpg",
  },
  {
    id: 8,
    src: "https://asset.ayo.co.id/image/venue/170263756570393.image_cropper_1702637527469_large.jpg",
  },
  {
    id: 9,
    src: "https://chatpajak.com/uploads/gambar/1685335463_a1d4d1b083203ea2c4fd.jpg",
  },
  {
    id: 10,
    src: "https://img.inews.co.id/media/1200/files/inews_new/2019/08/20/Golf.jpg",
  },
  {
    id: 11,
    src: "https://cdn.rri.co.id/berita/Manado/o/1737680251360-Gambar_WhatsApp_2025-01-23_pukul_13.44.27_883f1a48/pcqfy32ez7iofmr.jpeg",
  },
  {
    id: 12,
    src: "https://s.alicdn.com/@sc04/kf/Hbd768c32140a4e76bf0c9fa51ef32461D.jpg_300x300.jpg",
  },
  {
    id: 13,
    src: "https://asset.ayo.co.id/image/venue/172690845287104.image_cropper_056FCB7E-5ED2-44E3-8CAF-EE0142227D71-27435-00000D0EFDF310AD_medium.jpg",
  },
  {
    id: 14,
    src: "https://down-id.img.susercontent.com/file/sg-11134201-23010-o3xc1gpm6cmv25",
  },
  {
    id: 15,
    src: "https://mertajayamandiri.id/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-12-at-12.47.39.jpeg",
  },
  {
    id: 16,
    src: "https://saraga.id/blog/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-30-at-10.23.13.jpeg",
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
