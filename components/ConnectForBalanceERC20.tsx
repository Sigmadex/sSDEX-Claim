
import type { Web3ReactHooks } from "@web3-react/core";
import { useEffect } from "react";
import {  metaMask } from "../connectors/metaMask";
import { BalanceERC20 } from "./BalanceERC20";
import React from "react";

export function ConnectForBalance({
  error,
  isActive,
}: {
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {


  // attempt to connect eagerly on mount


  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);




  if (error) {
    return (
      <div>
        <p>N/A</p>
      </div>
    );
  } else if (isActive) {
    return (
      <div className="">
        <BalanceERC20 isActive={isActive}/>
      </div>
    );
  } else {
    return (
      <div className="font-semibold text-sm">

          N/A

      </div>
    );
  }
}
