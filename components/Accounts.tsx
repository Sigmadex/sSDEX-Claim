import { useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import React from "react";


export function Accounts() {
  
  const [address, setAddress] = useState<any>();
  const [addressEnd, setAddressEnd] = useState<any>();
  if (typeof window.ethereum !== 'undefined') {
    
  }
  async function getAddress() {
    const provider = await detectEthereumProvider();
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const end = accounts[0].slice(-4);
      const start = accounts[0].slice(0, 8);
      setAddress(start);
      setAddressEnd(end);
    } else {
      console.log('Please install MetaMask!');
    }

  }

  getAddress();

  return (
    <div className="flex">
      <div className="">{address}...</div>
      <div> {addressEnd}</div>
    </div>
  );
}
