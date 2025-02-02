import React from "react";
import Block from "./Block";

const AboutBlock = () => (
  <Block className="col-span-12 text-lg sm:text-2xl lg:text-3xl md:text-3xl leading-snug">
    <p>
      <span className="text-black">Misi kami </span>
      <span className="text-zinc-600">
        adalah untuk memfasilitasi para atlet dan penggemar olahraga agar dapat
        menemukan partner sparring yang sesuai untuk meningkatkan keterampilan
        dan daya saing.
      </span>
    </p>
  </Block>
);

export default AboutBlock;
