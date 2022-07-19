import { useEffect } from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
import { ConnectWithSelect } from "../ConnectWithSelect";
import { Status } from "../Status";
import React from "react";

const {
  useError,
  useIsActivating,
  useIsActive,
} = hooks;

export default function MetaMaskCard() {
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <div className="flex ">
      <ConnectWithSelect
        connector={metaMask}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </div>
  );
}
