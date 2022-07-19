import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useEffect, useState } from "react";
import { hooks, metaMask } from "../connectors/metaMask";
import Image from "next/image";
import React from "react";
import { getAddChainParameters } from "../chains";
import Web3 from "web3";
import { ethErrors } from "eth-rpc-errors";
import Link from "next/link";

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
  claimedAmount,
}: {
  claimedAmount: number;
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  // attempt to connect eagerly on mount
  const { useAccounts, useProvider } = hooks;
  const provider = useProvider();
  const accountsMetamask = useAccounts();
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  function useClaims(
    provider?: ReturnType<Web3ReactHooks["useProvider"]>,
    accountsMetamask?: string[]
  ): Number | undefined {
    const [claim, setClaim] = useState<Number | undefined>(0);

    useEffect(() => {
      if (provider && accountsMetamask?.length) {
        let stale = false;
        
        void Promise.all(
          accountsMetamask.map((account) => provider.getBalance(account)) // USE 8973570 after FOR Last AVAX Block of 2021
        ).then((balances) => {
          if (stale) return;
          const yourNumber = parseInt(balances[0]._hex, 16) / 10 ** 18;
          setClaim(yourNumber);
          
          // calculteAmount()
        });

        return () => {
          stale = true;
        };
      }
    }, [provider, accountsMetamask]);
    

    return claim;
    
  }
  const [desiredChainId, setDesiredChainId] = useState<number>(43113);
  const [whitelisted, setWhitelisted] = useState<boolean>(false);
  const [setResponse, getResponse] = useState<any>();
  const [refInput, setRefInput] = useState<string>("");
  const [claimError, setClaimError] = useState<String>("");
  const [errorModal, setErrorModal] = useState<Boolean>(false);
  const [loadingTx, setLoadingTx] = useState<Boolean>(false);
  const [validation, setValidation] = useState<any>();
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);
  const [claimAmount, setClaimAmout] = useState<any>();

  async function claimFunction() {
    const web3 = new Web3((window as any).ethereum);
    const claimAddress = "0x1c2DF96399d826C9949F9d5D5fF68Abf08cAf755";
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const claimContract = new web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "contract ClaimToken",
              name: "_token",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "txId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timeStamp",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "avaxAmount",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "claimedTokens",
              type: "uint256",
            },
          ],
          name: "LogClaim",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bool",
              name: "withdrawalStatus",
              type: "bool",
            },
          ],
          name: "LogStatus",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "LogUserAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "LogUserRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogWithdrawal",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "reset",
              type: "uint256",
            },
          ],
          name: "claimReset",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "users",
              type: "address[]",
            },
          ],
          name: "addManyUsers",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "addUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "admin",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "allTokensClaimed",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "approveWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "canWithdraw",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_ref",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_avaxAmount",
              type: "uint256",
            },
          ],
          name: "claimRef",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_avaxAmount",
              type: "uint256",
            },
          ],
          name: "claimTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "claimedTokens",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "claims",
          outputs: [
            {
              internalType: "uint256",
              name: "transaction",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "holdAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "withdrawnTokens",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "withdrew",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "disableWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "finishClaim",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "removeUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "resetTokenCount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [
            {
              internalType: "contract ClaimToken",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tokensClaimed",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "transaction",
          outputs: [
            {
              internalType: "uint256",
              name: "transaction",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "holdAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "transactionCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "whitelisted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      claimAddress
    );
    const tokenAddress = "0x0559B352748d2CE1B492c640fE03721e333968db";
    const tokenContract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_from",
              type: "address",
            },
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
            {
              name: "_spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          payable: true,
          stateMutability: "payable",
          type: "fallback",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
      ],
      tokenAddress
    );
    const claimed = await claimContract.methods.claimedTokens(account).call();
    const allTokensClaimed = await claimContract.methods.tokensClaimed().call();
    const allClaimed = allTokensClaimed / 10 ** 18;
    const contractBalance = await tokenContract.methods
      .balanceOf(claimAddress)
      .call();
    const contBalance = contractBalance / 10 ** 18;
    const balan = await web3.eth.getBalance(account);

    const big = BigInt(balan);
    const myNumber = Math.floor(Number(big) / 10 ** 15);

    if (whitelisted === false) {
      setClaimError("This wallet is not whitelisted");
      setErrorModal(true);
    } else if (claimed === true) {
      setClaimError("This wallet has already claimed sSDEX");
      setErrorModal(true);
    } else if (contBalance < allClaimed) {
      setClaimError("We have distribute all tokens");
      setErrorModal(true);
    } else if (myNumber == 0) {
      setClaimError("This wallet  at 12/31/2021 was 0");
      setErrorModal(true);
    } else {
      setLoadingTx(true);
      await claimContract.methods
        .claimTokens(myNumber)
        .send({ from: account })
        .then((validatedTransaction: any) => {
          // We alert the user that transaction was successfully validated
          setLoadingClaim(true);
        })
        .catch((e: { message: any }) => {
          setErrorModal(true);
          setClaimError(e.message);
        });
      setLoadingTx(false);
    }
  }

  function closeModal() {
    setErrorModal(false);
    setLoadingTx(false);
    setLoadingClaim(false);
    setClaimAmout(claimAmount);
    setDesiredChainId(43113);
  }

  const claim = useClaims(provider, accountsMetamask);
  async function calculteAmount() {
    setClaimAmout(0);
    const web3 = new Web3((window as any).ethereum);
    const claimAddress = "0x1c2DF96399d826C9949F9d5D5fF68Abf08cAf755";
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const claimContract = new web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "contract ClaimToken",
              name: "_token",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "txId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timeStamp",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "avaxAmount",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "claimedTokens",
              type: "uint256",
            },
          ],
          name: "LogClaim",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bool",
              name: "withdrawalStatus",
              type: "bool",
            },
          ],
          name: "LogStatus",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "LogUserAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "LogUserRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogWithdrawal",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "reset",
              type: "uint256",
            },
          ],
          name: "claimReset",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "users",
              type: "address[]",
            },
          ],
          name: "addManyUsers",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "addUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "admin",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "allTokensClaimed",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "approveWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "canWithdraw",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_ref",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_avaxAmount",
              type: "uint256",
            },
          ],
          name: "claimRef",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_avaxAmount",
              type: "uint256",
            },
          ],
          name: "claimTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "claimedTokens",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "claims",
          outputs: [
            {
              internalType: "uint256",
              name: "transaction",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "holdAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "withdrawnTokens",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "withdrew",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "disableWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "finishClaim",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "removeUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "resetTokenCount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [
            {
              internalType: "contract ClaimToken",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tokensClaimed",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "transaction",
          outputs: [
            {
              internalType: "uint256",
              name: "transaction",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "holdAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "transactionCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "whitelisted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      claimAddress
    );

   
    const whitelist = await claimContract.methods.whitelisted(account).call();
    setWhitelisted(whitelist);
    if (claim === undefined) {
      setClaimAmout(0);
    } else if (claim >= 100) {
      setClaimAmout(12500);
    } else if (claim < 100 && claim >= 10) {
      setClaimAmout(5000);
    } else if (claim < 10 && claim >= 1) {
      setClaimAmout(1000);
    } else if (claim < 1 && claim > 0) {
      setClaimAmout(250);
    } else if (claim === 0) {
      setClaimAmout(0);
    } else {
      setClaimAmout(0);
    }
    return claim;
  }

  if (loadingClaim === true) {
    return (
      <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10 text-xs text-gray-700 ">
        <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4 text-center">
          <div>
            <p className="font-bold text-center">Success!</p>
          </div>
          <div className="h-full">
            <p className="text-xs text-gray-900 font-bold scale-90">
              {claimAmount} sSDEX
            </p>
            <p className="text-xs text-slate-800 scale-90">
              has been added to your wallet.
            </p>
          </div>
          <div className="h-full flex items-center justify-center">
            <p className="text-xs scale-90 text-gray-900 font-semibold">
              Make sure to follow the Sigmadex socials below
            </p>
          </div>
          <div className="h-full flex items-center justify-center gap-2">
            <Link href="/">
              <Image
                src="/img/Twitter.png"
                layout="fixed"
                width={10}
                height={10}
              />
            </Link>
            <Link href="/">
              <Image
                src="/img/Telegram.png"
                layout="fixed"
                width={10}
                height={10}
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              className="text-slate-800 border border-gray-900 px-3 p-2 rounded-lg text-xs mt-3"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else if (loadingTx === true) {
    return (
      <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10 text-xs text-gray-700">
        <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4">
          <div className="h-full">
            <p className="text-sm font-bold text-gray-900">
              Confirming transaction...
            </p>
            <p className="text-xs text-center text-slate-800 mt-1 scale-90 font-bold">
              Please wait
            </p>
          </div>
        </div>
      </div>
    );
  } else if (errorModal === true) {
    return (
      <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10 text-xs text-gray-700">
        <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4">
          <div>
            <div className="flex items-center justify-center">
              <Image
                src="/img/Warning.svg"
                layout="fixed"
                height={28}
                width={33}
              />
            </div>
            <p className="font-bold text-center">Oops!</p>
          </div>
          <div className="h-full text-center scale-90">
            <p className="text-xs text-gray-900">Something went wrong.</p>
            <p className="text-xs text-slate-800">{claimError}</p>
          </div>
          <div className="flex justify-center text-xs mt-3 scale-90">
            <button
              className="text-slate-800 border border-gray-900 px-4 p-2 rounded-lg "
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else if (claimAmount == 0 && whitelisted == false) {
    return (
      <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10 text-gray-700">
        <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4">
          <div>
            <div className="flex items-center justify-center">
              <Image
                src="/img/Warning.svg"
                layout="fixed"
                height={28}
                width={33}
              />
            </div>
            <p className="font-bold text-center">Oops!</p>
          </div>
          <div className="h-full text-center scale-90">
            <p className="text-xs text-gray-900">Something went wrong.</p>
            <p className="text-xs text-slate-800">
              You can only make a claim if you use a referral link
            </p>
          </div>
          <div className="flex justify-center text-xs mt-3 scale-90">
            <button
              className="text-slate-800 border border-gray-900 px-4 p-2 rounded-lg "
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else if (desiredChainId != 43113) {
    return (
      <div className="absolute flex bg-black items-center justify-center h-screen w-screen -top-1/3 scale-150 bg-opacity-10 text-gray-700">
        <div className="h-48 w-80 bg-slate-50 rounded-xl grid items-center justify-center relative p-4">
          <div>
            <div className="flex items-center justify-center">
              <Image
                src="/img/Warning.svg"
                layout="fixed"
                height={28}
                width={33}
              />
            </div>
            <p className="font-bold text-center">Oops!</p>
          </div>
          <div className="h-full text-center scale-90">
            <p className="text-xs text-gray-900">Something went wrong.</p>
            <p className="text-xs text-slate-800">Change Network to 43114</p>
          </div>
          <div className="flex justify-center">
            <button
              className="text-slate-800 border border-gray-900 px-3 p-2 rounded-lg text-xs mt-3"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else if (isActive) {
    return (
      <div className="gris justify-center text-gray-700">
        <p className="text-xs text-center">This wallet is eligible to claim:</p>
        <div className="flex gap-2 items-center justify-center mt-1 mb-3">
          <div className="flex items-center gap-2">
            <Image
              src="/img/sSDEXLogo.svg"
              layout="fixed"
              height={20}
              width={20}
            />

            <div className=" truncate text-xs font-bold flex">
              {claimAmount}
              {claimAmount ? (
                <p className=" truncate text-xs font-bold">.00</p>
              ) : (
                <div></div>
              )}
            </div>

            <p className="text-xs font-bold my-2">sSDEX</p>
          </div>
        </div>
        {chainId == 43113 && (
          <div className="grid items-center justify-center">
            <hr className="w-96"></hr>

            <div className="flex justify-center">
              
              {claimAmount
                ? (
                  (whitelisted === false) && chainId === 43113 ? (
                    <div className="grid items-center justify-center">
                      <hr className="w-96"></hr>
                      <div className="flex justify-center my-4 gap-4">
                        <Image
                          src="/img/alert.png"
                          layout="fixed"
                          height={15}
                          width={15}
                        />
                        <p className="text-xs text-gray-700">You may be eligible to claim with a Referral Link.</p>
                      </div>
      
                      <div className="flex justify-center">
                        <p className="text-[#CCCCCC] text-xs font-semibold w-28 h-10 rounded-xl bg-[#E5E5E5] text-center drop-shadow-lg flex items-center justify-center cursor-pointer">
                          Claim Tokens
                        </p>
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    chainId === 43113 && (
                      <button
                      className=" text-white text-xs font-base p-3 px-8 rounded-lg bg-[#404C55] text-center mt-4"
                        onClick={claimFunction}
                      >
                        Claim Tokens
                      </button>
                    )
                  )
                )
                : chainId === 43113 && (
                    <button
                      className=" text-white text-xs font-base p-3 px-8 rounded-lg bg-[#404C55] text-center mt-4"
                      onClick={calculteAmount}
                    >
                      Calculate
                    </button>
                  )}
              {chainId != 43113 && <button>Connect to Avalanche</button>}
            </div>
            <div></div>
          </div>
        )}
        <div className="flex justify-center">
          {chainId != 43113 && <button>Connect to Avalanche</button>}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div />

        <button
          className="connectButton border border-gray-700 drop-shadow-md font-light text-sm text-gray-700"
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
