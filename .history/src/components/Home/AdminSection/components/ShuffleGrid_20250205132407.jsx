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
