import React from 'react'
import MetaMaskCard from './connectorCards/MetaMaskCard'
import Image from "next/image";

export default function Header() {
    

    return (
        <div className="">
          <div className="flex justify-between w-screen">
            <div className="flex items-end pl-10">
              <Image
                src="/img/Logo.svg"
                layout="fixed"
                height={80}
                width={150}
              />
            </div>

            <div className="flex justify-end items-center p-3 pr-6 gap-2 text-white border-gray-50">
              <Image
                src="/img/avax.svg"
                layout="fixed"
                height={30}
                width={30}
              />
              <MetaMaskCard />
            </div>
          </div>
        </div>
    )
}
