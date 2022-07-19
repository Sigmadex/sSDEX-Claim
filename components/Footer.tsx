import React, { ReactNode } from "react";
import Image from "next/image";
import Web3 from "web3";

export default function Footer() {
  const [block, setBlock] = React.useState<ReactNode>(0);

  async function getBlock() {
    const web3 = new Web3("https://rpc.ankr.com/avalanche");
    const bn = await web3.eth.getBlock("latest");
    setBlock(bn.number);
  }

  React.useEffect(() => {
    getBlock();
  }, []);

  return (
    <div className="flex justify-between items-end text-xs p-6 mt-3">

        <p className="text-xs">© 2022 Sigma Labs.</p>

      <div className="flex gap-2 items-center">
        {block === undefined && <div>...Loading</div>}
        {block != undefined && <div>{block}</div>}
        <Image src="/img/Block.svg" layout="fixed" height={20} width={20} />
      </div>
    </div>
  );
}
