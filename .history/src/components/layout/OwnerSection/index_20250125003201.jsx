import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const OwnerSection = () => {
  return (
    <div className="bg-black">
      <section className="w-full  px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-green-300 font-medium">
            Bergabunglah bersama kami
          </span>
          <h3 className="text-4xl md:text-6xl  text-white font-semibold">
            Daftarkan Lapangan Anda Sekarang
          </h3>
          <p className="text-base md:text-lg text-white my-4 md:my-6">
            Sebagai pemilik lapangan, Anda dapat mengelola dan memasarkan
            lapangan Anda dengan mudah kepada para pengguna.
          </p>
          <button className="bg-green-400 text-white font-medium py-2 px-4 rounded transition-all hover:bg-green-500 active:scale-95">
            Daftar Sebagai Pemilik
          </button>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://www.dailysports.id/upload/xlarge/c8f976da413050fa5cd376b956a9fda2.jpg",
  },
  {
    id: 2,
    src: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1631597155/dpnkwabotttfihp7gf3r.jpg",
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
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
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
      }}></motion.div>
  ));
};

const ShuffleGrid = () => {
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
      {squares.map((sq) => sq)}
    </div>
  );
};
