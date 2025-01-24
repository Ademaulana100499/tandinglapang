// import { useAnimate } from "framer-motion";
// import React, { useRef } from "react";

// export const CategorySport = () => {
//   return (
//     <MouseImageTrail
//       renderImageBuffer={60}
//       rotationRange={25}
//       images={[
//         "https://plus.unsplash.com/premium_photo-1664303119944-4cf5302bb701?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1685366445883-709973744248?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1685303469251-4ee0ea014bb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1664304753883-923c28de6b85?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1501450626433-39bbf117090e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1552209841-d2dc5fd68a30?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1485313260896-6e6edf486858?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1708696216222-2b83f0320446?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       ]}>
//       <section className="grid h-screen w-full place-content-center bg-white">
//         <p className="flex items-center  text-7xl font-bold uppercase text-black">
//           <span>Beragam Kategori Olahraga</span>
//         </p>
//       </section>
//     </MouseImageTrail>
//   );
// };

// const MouseImageTrail = ({
//   children,
//   // List of image sources
//   images,
//   // Will render a new image every X pixels between mouse moves
//   renderImageBuffer,
//   // images will be rotated at a random number between zero and rotationRange,
//   // alternating between a positive and negative rotation
//   rotationRange,
// }) => {
//   const [scope, animate] = useAnimate();

//   const lastRenderPosition = useRef({ x: 0, y: 0 });
//   const imageRenderCount = useRef(0);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;

//     const distance = calculateDistance(
//       clientX,
//       clientY,
//       lastRenderPosition.current.x,
//       lastRenderPosition.current.y
//     );

//     if (distance >= renderImageBuffer) {
//       lastRenderPosition.current.x = clientX;
//       lastRenderPosition.current.y = clientY;

//       renderNextImage();
//     }
//   };

//   const calculateDistance = (x1, y1, x2, y2) => {
//     const deltaX = x2 - x1;
//     const deltaY = y2 - y1;

//     // Using the Pythagorean theorem to calculate the distance
//     const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     return distance;
//   };

//   const renderNextImage = () => {
//     const imageIndex = imageRenderCount.current % images.length;
//     const selector = `[data-mouse-move-index="${imageIndex}"]`;

//     const el = document.querySelector(selector);

//     el.style.top = `${lastRenderPosition.current.y}px`;
//     el.style.left = `${lastRenderPosition.current.x}px`;
//     el.style.zIndex = imageRenderCount.current.toString();

//     const rotation = Math.random() * rotationRange;

//     animate(
//       selector,
//       {
//         opacity: [0, 1],
//         transform: [
//           `translate(-50%, -25%) scale(0.5) ${
//             imageIndex % 2
//               ? `rotate(${rotation}deg)`
//               : `rotate(-${rotation}deg)`
//           }`,
//           `translate(-50%, -50%) scale(1) ${
//             imageIndex % 2
//               ? `rotate(-${rotation}deg)`
//               : `rotate(${rotation}deg)`
//           }`,
//         ],
//       },
//       { type: "spring", damping: 15, stiffness: 200 }
//     );

//     animate(
//       selector,
//       {
//         opacity: [1, 0],
//       },
//       { ease: "linear", duration: 0.5, delay: 5 }
//     );

//     imageRenderCount.current = imageRenderCount.current + 1;
//   };

//   return (
//     <div
//       ref={scope}
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}>
//       {children}

//       {images.map((img, index) => (
//         <img
//           className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
//           src={img}
//           alt={`Mouse move image ${index}`}
//           key={index}
//           data-mouse-move-index={index}
//         />
//       ))}
//     </div>
//   );
// };

import React from "react";
import { GiSoccerBall, GiShuttlecock } from "react-icons/gi";
import {
  MdOutlineSportsTennis,
  MdOutlineSportsVolleyball,
  MdOutlineSportsMma,
  MdSportsSoccer,
  MdSportsBaseball,
  MdSportsBasketball,
  MdSportsGolf,
} from "react-icons/md";
import { useAnimate } from "framer-motion";

export const CategorySport = () => {
  return (
    <div className="bg-neutral-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <div className="grid grid-cols-2 divide-x divide-neutral-900">
        <LinkBox Icon={GiSoccerBall} href="#">
          <p className="text-sm mt-2 text-Black">Sepak Bola</p>
        </LinkBox>
        <LinkBox Icon={GiShuttlecock} href="#">
          <p className="text-sm mt-2 text-Black">Bulu Tangkis</p>
        </LinkBox>
      </div>
      <div className="grid grid-cols-4 divide-x divide-neutral-900">
        <LinkBox Icon={MdSportsBasketball} href="#">
          <p className="text-sm mt-2 text-Black">Basket</p>
        </LinkBox>

        <LinkBox Icon={MdOutlineSportsVolleyball} href="#">
          <p className="text-sm mt-2 text-Black">Voli</p>
        </LinkBox>
        <LinkBox Icon={MdOutlineSportsTennis} href="#">
          <p className="text-sm mt-2 text-Black">Tenis</p>
        </LinkBox>
        <LinkBox Icon={MdSportsGolf} href="#">
          <p className="text-sm mt-2 text-Black">Golf</p>
        </LinkBox>
      </div>
      <div className="grid grid-cols-3 divide-x divide-neutral-900">
        <LinkBox Icon={MdSportsSoccer} href="#">
          <p className="text-sm mt-2 text-Black">Futsal</p>
        </LinkBox>
        <LinkBox Icon={MdOutlineSportsMma} href="#" />
        <p className="text-sm mt-2 text-Black">Tinju</p>
        </LinkBox>
        <LinkBox Icon={MdSportsBaseball} href="#" />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, children }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="relative flex flex-col items-center justify-center h-20 w-full sm:h-28 md:h-36">
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />
      <span className="mt-2">{children}</span>

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white">
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
        <span className="mt-2">{children}</span>
      </div>
    </a>
  );
};
