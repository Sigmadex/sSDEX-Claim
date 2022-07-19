import { useEffect } from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
import { ConnectForBalance } from "../ConnectForBalance";
import React from "react";

const {
  useError,
  useIsActive,
} = hooks;

export default function MetaMaskCard() {
  const error = useError();
  const isActive = useIsActive();
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <div>
      <ConnectForBalance
        connector={metaMask}
        error={error}
        isActive={isActive}
      />
    </div>
  );
}
