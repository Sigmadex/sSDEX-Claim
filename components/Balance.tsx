import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";
import { formatEther } from '@ethersproject/units'
import { useEffect, useState } from "react";
import React from "react";
function useBalances(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account)) // USE 8973570 after FOR Last Block of 2021
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
    console.log(balances)
  }, [provider, accounts]);
  return balances;
}



export function Balance({
  accounts,
  provider,
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>;
  provider: ReturnType<Web3ReactHooks["useProvider"]>;
}) {
  const balances = useBalances(provider, accounts);
  
  if (accounts === undefined) return null;

  return (
    <div className="flex items-center">
      {balances?.[0] ?
      <div className=" truncate text-xs font-bold text-gray-700"> {formatEther(balances[0])}</div>
      : <p className=" truncate text-xs font-bold text-gray-700">Loading...</p>}
    </div>
  );
}
