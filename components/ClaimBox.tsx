import React from "react";
import Image from "next/image";
import MetaMaskBalanceERC20 from "../components/connectorCards/MetaMaskBalanceERC20";
import MetaMaskBalance from "../components/connectorCards/MetaMaskBalance";
import MetaMaskCardBorder from "../components/connectorCards/MetaMaskCardBorder";

export default function ClaimBox({
  claimedAmount,
  account0,
}: {
  claimedAmount: number;
  account0: string;
}) {
  return (
    <div className="flex w-screen mt-8 justify-center drop-shadow-2xl scale-75 sm:scale-75 md:scale-100 ">
      <div className="bg-gray-50 h-[30rem] w-[36rem] rounded-2xl grid justify-center items-center">
        <h1 className="font-bold text-4xl text-center mt-8 text-gray-700">Claim SDEX</h1>
        <div className="flex items-center justify-center ">
          {" "}
          <p className="w-96 text-xs text-center scale-90 sm:scale-100 my-4 text-gray-800">
            As part of our brand awareness initiative, both loyal and newcomers
            to the AVAX community are eligible to claim free sSDEX tokens
            relative to their AVAX balance.
          </p>
        </div>

        <div className="h-28 w-[28rem] sm:w-[30rem] bg-gray-50 drop-shadow-md  rounded-2xl grid items-center p-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src="/img/sSDEXLogo.svg"
                layout="fixed"
                height={30}
                width={30}
              />
              <p className="font-bold text-xs text-gray-700">sSDEX Balance:</p>
            </div>
            <div>
              <MetaMaskBalanceERC20 />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src="/img/AvaxLogo.svg"
                layout="fixed"
                height={30}
                width={30}
              />
              <p className="font-bold text-xs text-gray-700">AVAX Balance:</p>
            </div>
            <div>
              <MetaMaskBalance />
            </div>
          </div>
        </div>
        <div className="p-3 pr-6 gap-2 flex grow justify-center mb-4 items-center">
          <MetaMaskCardBorder claimedAmount={claimedAmount} />
        </div>
      </div>
    </div>
  );
}
