import Head from "next/head";
import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "urql";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Link from "next/link";

export default function Test() {
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [queryState, setQueryState] = useState<String>("xId");
  const [queryTxId, setQueryTxId] = useState<String>("1");
  const [queryTxId2, setQueryTxId2] = useState<String>("1000");
  const [queryTimestamp, setQueryTimestamp] = useState<String>("1654748812");
  const [queryTimestamp2, setQueryTimestamp2] = useState<String>("1654832706");
  const [queryUser, setQueryUser] = useState<String>(
    "0x0582fb623317d4b711da3d7658cd6f834b508417"
  );
  const [queryAvaxAmount, setQueryAvaxAmount] = useState<String>("0");
  const [queryAvaxAmount2, setQueryAvaxAmount2] = useState<String>("1000");
  const [queryClaimedTokens, setQueryClaimedtokens] = useState<String>(
    "1000000000000000000000"
  );
  const [queryClaimedTokens2, setQueryClaimedtokens2] = useState<String>(
    "50000000000000000000"
  );

  const [render, setRender] = useState<number>(7);
  const [query, setQuery] = useState<any>(`
  query {
    sigmadexGraphs(first: 100){
      id
      count
      txId
      timeStamp
      user
      avaxAmount
      claimedTokens
      refAddress
      refTokens
    }
  }
`);

  const APIURL =
    "https://api.thegraph.com/subgraphs/name/luiscmogrovejo/claimv16"
  const onChangeQuery = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectId = e.target.value;
    if (selectId === queryId) {
      setQuery(queryId);
      setRender(1);
    } else if (selectId === queryDate) {
      setQuery(queryDate);
      setRender(2);
    } else if (selectId === queryClaimer) {
      setQuery(queryClaimer);
      setRender(3);
    } else if (selectId === queryAvax) {
      setQuery(queryAvax);
      setRender(4);
    } else if (selectId === queryClaimed) {
      setQuery(queryClaimed);
      setRender(5);
    } else if (selectId === queryReferrer) {
      setQuery(queryReferrer);
      setRender(6);
    }
  
  };

  const queryAll = `
  query {
    sigmadexGraphs(
      first: 100
      sort:{
        field: txId,
        order: ASC
        }
      )
      {
      id
      count
      txId
      timeStamp
      user
      avaxAmount
      claimedTokens
      refAddress
      refTokens
    }
  }
`
  
  
  const queryId = `
    query {
      sigmadexGraphs(
        orderBy: "${queryState}"
        where: { 
          txId_gte: "${queryTxId}"
          txId_lte: "${queryTxId2}"
        }
       ){
        id
        count
        txId
        timeStamp
        user
        avaxAmount
        claimedTokens
        refAddress
        refTokens
      }
    }
  `;

  const queryDate = `
  query {
    sigmadexGraphs(
      orderBy: "${queryState}"
      where: { 
        timeStamp_gte: "${queryTimestamp}"
        timeStamp_lte: "${queryTimestamp2}"
      }
     ){
      id
      count
      txId
      timeStamp
      user
      avaxAmount
      claimedTokens
      refAddress
      refTokens
    }
  }
`;

  const queryClaimer = `
query {
  sigmadexGraphs(
    orderBy: "${queryState}"
    where: { 
      user: "${queryUser}"
    }
   ){
    id
    count
    txId
    timeStamp
    user
    avaxAmount
    claimedTokens
    refAddress
    refTokens
  }
}
`;

  const queryAvax = `
query {
  sigmadexGraphs(
    orderBy: "${queryState}"
    where: { 
      avaxAmount_gte: "${queryAvaxAmount}"
      avaxAmount_lte: "${queryAvaxAmount2}"
    }
   ){
    id
    count
    txId
    timeStamp
    user
    avaxAmount
    claimedTokens
    refAddress
    refTokens
  }
}
`;

  const queryClaimed = `
query {
  sigmadexGraphs(
    orderBy: "${queryState}"
    where: { 
      claimedTokens_gte: "${queryClaimedTokens}"
      claimedTokens_lte: "${queryClaimedTokens2}"
    }
   ){
    id
    count
    txId
    timeStamp
    user
    avaxAmount
    claimedTokens
    refAddress
    refTokens
  }
}
`;

const queryReferrer = `
query {
  sigmadexGraphs(
    orderBy: "${queryState}"
    where: { 
      refAddress: "${queryUser}"
    }
   ){
    id
    count
    txId
    timeStamp
    user
    avaxAmount
    claimedTokens
    refAddress
    refTokens
  }
}
`;

  const client = createClient({
    url: APIURL,
  });

  async function fetchData() {
    const response = await client.query(query).toPromise();
    setData(response.data.sigmadexGraphs);
  }
  const claimAddress = "0x7d9430c4a79fa8B4aB61133DbD0185b435b4f071";
  useEffect(() => {
    fetchData();
    renderClaims()
  }, []);

  async function renderClaims() {
    const web3 = new Web3(
      "https://api.avax-test.network/ext/bc/C/rpc"
    );
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const claimContract = new web3.eth.Contract(
      [
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "users",
              "type": "address[]"
            }
          ],
          "name": "addManyUsers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "addUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "approveWithdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_ref",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_avaxAmount",
              "type": "uint256"
            }
          ],
          "name": "claimRef",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_avaxAmount",
              "type": "uint256"
            }
          ],
          "name": "claimTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "disableWithdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "finishClaim",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ClaimToken",
              "name": "_token",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "txId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timeStamp",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "avaxAmount",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "claimedTokens",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "refAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "refTokens",
              "type": "uint256"
            }
          ],
          "name": "LogClaim",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bool",
              "name": "withdrawalStatus",
              "type": "bool"
            }
          ],
          "name": "LogStatus",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "LogUserAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "LogUserRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogWithdrawal",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "reset",
              "type": "uint256"
            }
          ],
          "name": "claimReset",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "removeUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "resetTokenCount",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "allTokensClaimed",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "canWithdraw",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "claimedTokens",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "claims",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "transaction",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "holdAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "withdrawnTokens",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "withdrew",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "contract ClaimToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokensClaimed",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "transaction",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "transaction",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "holdAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "transactionCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "whitelisted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      claimAddress
    );
    const tCount: number = await claimContract.methods
      .transactionCount()
      .call();
    const transactionCount = tCount;
    const transactions = [];
    var j = 0;
    for (var i = transactionCount; i >= 1 && j < 10000; i--) {
      const t = await claimContract.methods.transaction(i).call();
      const address = t.user
      const c = await claimContract.methods.claims(address).call();
      j++;
      transactions.push(c);
    }
    setTransactions(transactions);
  }

  async function createCSV() {
    await renderClaims()
    const JSONToCSV = await require("json2csv").parse;
    var csv = await JSONToCSV(transactions, {
      fields: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "transaction",
        "time",
        "user",
        "holdAmount",
        "amount",
        "withdrawnTokens",
      ],
    });
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "SigmadexClaimAPI.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }



  return (
    <div className="relative w-full h-screen bg-[#EC6263] text-gray-700">
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
        <div>
          <div className="flex justify-end items-end gap-4 m-10 w-9/12">
            {render == 1 && (
              <div className="flex">
                <input
                  className="inputSelect mr-4"
                  placeholder="Greater than"
                  onChange={(e) => setQueryTxId(e.target.value)}
                />
                <input
                  className="inputSelect"
                  placeholder="Lower than"
                  onChange={(e) => setQueryTxId2(e.target.value)}
                />
              </div>
            )}
            {render == 2 && (
              <div className="flex">
                <input
                  className="inputSelect mr-4"
                  placeholder="Greater than"
                  onChange={(e) => setQueryTimestamp(e.target.value)}
                />
                <input
                  className="inputSelect"
                  placeholder="Lower than"
                  onChange={(e) => setQueryTimestamp2(e.target.value)}
                />
              </div>
            )}
            {render == 3 && (
              <input
                className="inputSelect"
                placeholder="Address"
                onChange={(e) => setQueryUser(e.target.value)}
              />
            )}
            {render == 4 && (
              <div className="flex">
                <input
                  className="inputSelect mr-4"
                  placeholder="Greater than"
                  onChange={(e) => setQueryAvaxAmount(e.target.value)}
                />
                <input
                  className="inputSelect"
                  placeholder="Lower than"
                  onChange={(e) => setQueryAvaxAmount2(e.target.value)}
                />
              </div>
            )}
            {render == 5 && (
              <div className="flex">
                <input
                  className="inputSelect mr-4"
                  placeholder="Greater than"
                  onChange={(e) =>
                    setQueryClaimedtokens(
                      e.target.value.concat("000000000000000000")
                    )
                  }
                />
                <input
                  className="inputSelect"
                  placeholder="Lower than"
                  onChange={(e) =>
                    setQueryClaimedtokens2(
                      e.target.value.concat("000000000000000000")
                    )
                  }
                />
              </div>
            )}

                                    {render == 6 && (
              <input
              className="inputSelect"
              placeholder="Address"
              onChange={(e) => setQueryUser(e.target.value)}
            />
            )}
            <select
              className="relative h-10 rounded-md  text-xs font-semibold pl-1 outline-0 placeholder-indigo-900"
              onChange={(e) => {
                onChangeQuery(e);
              }}
            >
              <option key={queryAll} value={queryAll}>
                Show All
              </option>
              <option key={queryId} value={queryId}>
                ID
              </option>
              <option key={queryDate} value={queryDate}>
                TimeStamp
              </option>
              <option key={queryClaimer} value={queryClaimer}>
                User
              </option>
              <option key={queryAvax} value={queryAvax}>
                Avax Amount
              </option>

              <option key={queryClaimed} value={queryClaimed}>
                Claimed Amount
              </option>
              <option key={queryReferrer} value={queryReferrer}>
                Referrer Address
              </option>
            </select>
            <button
              className="p-3 bg-white rounded-md text-xs font-semibold flex items-center "
              onClick={fetchData}
            >
              <div className="scale-90">Search</div>
            </button>
            <button
              className="p-3 bg-white rounded-md text-xs font-semibold flex items-center"
              onClick={createCSV}
            >
              <div className="mr-1 scale-90">Export CSV </div>
              <Image src="/img/DownloadIcon.png" layout="fixed" height={10} width={10}/>
            </button>
          </div>

          <div className="text-black relative flex items-center justify-center scale-90 md:scale-100">
            <div className="p-4 rounded-lg bg-white">
              <div className="flex bg-white text-xs font-bold text-black my-1">
                <div className="drop-shadow-lg  w-12 ">
                  <p className="  text-black">
                    TxID
                  </p>
                </div>
                <div className="drop-shadow-lg  w-20 ">
                  <p className="  ">
                    Timestamp
                  </p>
                </div>
                <div className="drop-shadow-lg  w-72 pl-4">
                  <p className=" ">
                    User
                  </p>
                </div>
                <div className="drop-shadow-lg  w-12 ">
                  <p className="">
                    Avax
                  </p>
                </div>
                <div className="drop-shadow-lg w-16 ">
                  <p className=" ">
                    Claim
                  </p>
                </div>
                <div className="drop-shadow-lg w-72 ">
                  <p className=" ">
                    ref Address
                  </p>
                </div>
                <div className="drop-shadow-lg w-16 ">
                  <p className=" ">
                    ref Amount
                  </p>
                </div>
              </div>
              <hr/>
              {data.map((d: any, i) => (
                <div key={i} className="flex text-xs my-2">
                  <div className="drop-shadow-lg  w-12 scale-90">
                    <p className=" ">
                      {d.txId || "No"}
                    </p>
                  </div>
                  <div className="drop-shadow-lg  w-20 scale-90">
                    <p className=" ">
                      {d.timeStamp || "No"}
                    </p>
                  </div>
                  <div className="drop-shadow-lg  w-72 scale-90 cursor-pointer">
                    <Link href={`https://testnet.snowtrace.io/address/${d.user}`}>
                                        <p className=" ">
                      {d.user || "No"}
                    </p>
                    </Link>

                  </div>
                  <div className="drop-shadow-lg  w-12 scale-90">
                    <p className=" ">
                      {d.avaxAmount/1000 || "No"}
                    </p>
                  </div>
                  <div className="drop-shadow-lg w-12 scale-90">
                    <p className=" ">
                      {d.claimedTokens / 10 ** 18 || "No"}
                    </p>
                  </div>
                  <div className="drop-shadow-lg  w-80 scale-90 cursor-pointer">
                  <Link href={`https://testnet.snowtrace.io/address/${d.refAddress}`}>

                    <p className=" ">
                      {d.refAddress || "No"}
                    </p>
                    </Link>
                  </div>
                  <div className="drop-shadow-lg w-16 scale-90">
                    <p className=" ">
                      {d.refTokens / 10 ** 18 || "No"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
