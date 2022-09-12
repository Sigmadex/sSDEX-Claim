import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { useEffect} from "react";
import { hooks, metaMask } from "../connectors/metaMask";
import { Balance } from "./Balance";
import React from "react";

export function ConnectForBalance({
  connector,
  error,
  isActive,
}: {
  connector: MetaMask;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;

  // attempt to connect eagerly on mount
  const {

    useAccounts,
    useProvider,

  } = hooks;
  const provider = useProvider();

  const accounts = useAccounts();
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
        <Balance accounts={accounts} provider={provider} />
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
