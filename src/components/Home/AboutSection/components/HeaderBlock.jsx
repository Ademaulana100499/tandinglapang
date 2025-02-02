import React from "react";
import Block from "./Block";

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <h1 className="mb-12 text-lg sm:text-2xl lg:text-3xl md:text-3xl font-medium leading-tight">
      <span>TandingLapang</span>{" "}
      <span className="text-zinc-600">
        adalah platform yang memudahkan Anda untuk mencari lawan sparring
        olahraga di berbagai jenis cabang olahraga.
      </span>
    </h1>
  </Block>
);

export default HeaderBlock;
