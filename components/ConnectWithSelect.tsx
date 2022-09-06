import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { useEffect, useState } from "react";
import { getAddChainParameters } from "../chains";
import {  metaMask } from "../connectors/metaMask";
import { Accounts } from "./Accounts";
import { useRouter } from 'next/router'
import React from "react";


export function ConnectWithSelect({
  connector,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  const isNetwork = connector instanceof Network;

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
    
  }, []);
  
  const [desiredChainId, setDesiredChainId] = useState<number>(43113);
  const router = useRouter()

  if (error) {
    return (
      <div>
        <div />
        <button className="connectButton border border-gray-50"
          onClick={() =>
            void connector.activate(
              desiredChainId === -1
                ? undefined
                : getAddChainParameters(desiredChainId) 
            )
          }
        >
          Try Again?
        </button>
      </div>
    );
  } else if (isActive) {
    return (
      <div>
        <div />
        <button 
        className="connectButtonActive"
        onClick={() => ((void connector.deactivate() && router.reload()))}>
          <Accounts/>
          </button>
      </div>
    );
  } else {
    return (
      <div>
        <div />
        <button className="connectButton2 border w-138 rounded-[10px] h-9 border border-gray-400 focus:border-gray-100 hover:border-lime-800 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector.activate(
getAddChainParameters(desiredChainId)
                  )
          }
          disabled={isActivating}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
}
