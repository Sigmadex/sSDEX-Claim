import React, { useState } from "react";
import Image from "next/image";
import MetaMaskBalanceERC20 from "./connectorCards/MetaMaskBalanceERC20";
import MetaMaskBalance from "./connectorCards/MetaMaskBalance";
import Link from "next/link";

export default function DisplayBox({
  claimedAmount,
  account0,
}: {
  claimedAmount: number;
  account0: string;
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  function closeModal() {
    setLinkCopied(false);
  }

  return (
    <div className="flex w-screen mt-8 justify-center drop-shadow-2xl scale-75 sm:scale-75 md:scale-100">
      <div className="bg-gray-50 h-[25rem] w-[33rem] rounded-2xl grid justify-center items-center">
        <h1 className="font-bold text-4xl text-center mt-4 text-gray-600">Claim sSDEX</h1>
        <div className="flex w-96 text-xs text-center scale-90 sm:scale-100 items-center justify-center gap-2">
          <p className="text-gray-700">This wallet already has claimed</p>
          <p className="font-bold text-xs">{claimedAmount} sSDEX!</p>
        </div>

        <div className="h-28 w-[28rem] sm:w-[30rem] bg-gray-50 drop-shadow-md rounded-2xl grid items-center p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src="/img/sSDEXLogo.svg"
                layout="fixed"
                height={30}
                width={30}
              />
              <p className="font-bold text-xs text-gray-700">sSDEX Balance:</p>
            </div>
            <div className="text-xs  font-bold text-gray-700">{claimedAmount}</div>
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
        <hr />
        <div className="gap-2 flex justify-center mb-4 text-center">
          <div>
            <p className="text-sm text-gray-700">
              Earn more sSDEX when you refer other users:
            </p>
            <div className="flex justify-center items-center text-sm">
              {linkCopied ? (
                <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10">
                  <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4">
                    <div>
                      <p className="font-bold text-center text-gray-700">Successfully Copied!</p>
                    </div>
                    <div className="h-full text-center scale-90">
                      <p className="text-xs text-gray-700">
                        Your referral link has been copied to the clipboard. Feel free to share it and get a bonus.
                      </p>
                    </div>
                    <div className="flex justify-center text-xs mt-3 scale-90">
                      <button
                        className="text-slate-800 border border-gray-900 px-4 p-2 rounded-lg text-xs"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className="truncate w-56 text-blue-500 underline underline-offset-0 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `ref.sigmadex.org/${account0}`
                      );
                      setLinkCopied(true);
                    }}
                  >
                    {`ref.sigmadex.org/${account0}`}
                  </button>
                  <Image
                    src="/img/arrow.svg"
                    layout="fixed"
                    height={12}
                    width={12}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
