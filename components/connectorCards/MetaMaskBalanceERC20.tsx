import { useEffect } from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
import { ConnectForBalance } from "../ConnectForBalanceERC20";
import React from "react";

const {
  useError,
  useIsActive,
} = hooks;

export default function MetaMaskCardERC20() {
  const error = useError();
  const isActive = useIsActive();

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <div>
      <ConnectForBalance
        error={error}
        isActive={isActive}
      />
    </div>
  );
}
