import React from 'react'
import {useRouter} from'next/router'
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import ClaimBox from "../components/RefClaimBox";
import Footer from "../components/Footer";
import Web3 from "web3";
import DisplayBox from "../components/DisplayBox";

export default function UserId() {

    const router = useRouter()
    const url = router.asPath
    const refWallet = url.slice(-42)
    const [claimedAmount, setClaimedAmount] = React.useState<number>(0);
    const [hasClaimed, setHasClaimed] = React.useState<boolean>(false);
    const [account0, setAccount0] = React.useState<string>("");


    async function renderClaims() {
      const web3 = new Web3((window as any).ethereum);
      const claimAddress = "0x1c2DF96399d826C9949F9d5D5fF68Abf08cAf755";
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAccount0(account);
      const claimContract = new web3.eth.Contract(
        [
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
            name: "approveWithdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_ref",
                type: "address",
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
            name: "withdrawTokens",
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
            ],
            stateMutability: "view",
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
              {
                internalType: "uint256",
                name: "withdrawnTokens",
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
        ],
        claimAddress
      );
      const claimed = await claimContract.methods.claimedTokens(account).call();
      setHasClaimed(claimed);
      const tokenBalance = await claimContract.methods.claims(account).call();
      const number = (tokenBalance.amount / (10 ** 18));
      setClaimedAmount(number);
    }
  
    React.useEffect(() => {
      renderClaims();
    }, []);
    return (
      <div className="relative w-full h-screen bg-[#EC6263]">
      <div className="overflow-x-hidden h-[33rem] w-full absolute">
        <Image src="/img/bgpattern.png" layout="fill" />
      </div>
      <div className="overflow-x-hidden">
        <Image src="/img/endless.png" layout="fill" />
      </div>

      <Head>
        <title>ClaimBot App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid z-20 relative h-full overflow-hidden">
        <Header />
        {hasClaimed === true ? (
          <DisplayBox claimedAmount={claimedAmount} account0={account0} />
        ) : (
          <ClaimBox refWallet={refWallet} claimedAmount={claimedAmount} />
        )}

        <Footer />
      </main>
    </div>
    )
}
