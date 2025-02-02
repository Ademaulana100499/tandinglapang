import React from "react";
import Block from "./Block";
import { FiMapPin } from "react-icons/fi";

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center md:col-span-3">
    <div className="text-center mb-3">
      <p className="font-semibold text-lg">Jam Operasional</p>
      <p className="text-zinc-600">
        Senin - Jumat: <br /> 08.00 - 17.00
      </p>
      <p className="text-zinc-600">
        Sabtu - Minggu: <br /> 09.00 - 15.00
      </p>
    </div>

    <p className="text-center text-lg font-semibold mb-1">Lokasi Kami</p>
    <FiMapPin className="text-2xl mb-1" />
    <p className="text-center text-zinc-600">
      Jl. Pasir Awi No.9, Ps. Kemis, Kec. Ps. Kemis, Kabupaten Tangerang, Banten
      15560
    </p>
  </Block>
);

export default LocationBlock;
