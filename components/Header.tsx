import React from 'react'
import MetaMaskCard from './connectorCards/MetaMaskCard'
import Image from "next/image";

export default function Header() {
    

    return (
        <div className="">
          <div className="sm:flex justify-between">
            <div className="flex justify-center sm:justify-start items-end sm:px-10">
              <Image
                src="/img/Logo.svg"
                layout="fixed"
                height={96}
                width={156}
              />
            </div>

            <div className="flex justify-center sm:justify-end items-center p-3 pr-10 gap-5 text-white border-gray-50">
              <Image
                src="/img/avax.svg"
                layout="fixed"
                height={32}
                width={32}
              />
              <MetaMaskCard />
            </div>
          </div>
        </div>
    )
}
