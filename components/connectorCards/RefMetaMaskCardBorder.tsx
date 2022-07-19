import { useEffect } from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
import { ConnectWithSelect } from "../RefConnectWithSelectBorder";
import React from "react";

const {
  useChainId,
  useError,
  useIsActivating,
  useIsActive,
} = hooks;

export default function MetaMaskCard({refWallet, claimedAmount}: {refWallet: string, claimedAmount: number}) {
  const chainId = useChainId();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (

      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
        refWallet={refWallet}
        claimedAmount={claimedAmount}
      />

  );
}
