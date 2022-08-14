<img src="https://user-images.githubusercontent.com/33762147/155625647-55c69f06-e0ea-44a8-a425-7aa086c329c5.png" style="border-radius:50%;width:72px;">

# Claim Bot (Airdrop)

## Summary
<em>Sigmadex is proposing an optimal token distribution model for allowing individuals to claim free sSDEX tokens. Claiming will be available to anybody who possessed AVAX in their wallet leading up to the AVAX snapshot on December 31st, 2021. Anybody who has qualified for the early claim will be able to provide a referral link for anybody to claim a smaller amount of sSDEX. All claimers will be required to pay the gas fees.</em>

# Next.js + Tailwind CSS

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploying

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
# or
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


# Specifications

#### Claim will be seperated into 2 types:

* Claim with AVAX in wallet before snapshot on Dec 31st 2021
* Claim after Dec 31st 2021 with referral link

## Process
### Proposed Data Storage

* Claim data is to be stored on-chain through [event logs]
* Interface should query event logs to verify whether a wallet has made a claim or not and send them to the appropriate landing page

### Outlined below is the process in which the user qualifies for a claim

1. User interacts with claim bot interface using a wallet address that has a positive AVAX balance based on the Dec 31st 2021 snapshot
2. User interface displays the amount which can be claimed based on the specification table below:

|AVAX Balance|sSDEX Reward|
|------------|------------|
|< 1 |250|
|1  < 10 |1000|
|> 10 < 100 |5000|
|> 100 |12,500|

*Parameters subject to change*

3. User confirms with metamask the amount claimable, user pays the gas fees

### User already made a claim

* User interacts with claim bot interface using a wallet address that has already made a claim
* User interface displays an exception explaining that a claim has already occured

### User makes a claim with a referral link

* User interacts with claim bot interface using a referral wallet address that has already made a claim:
eg. `https://claim.sigmadex.org/0xf289752B420e10444f0d271267192a1e824977cd`
* User interface displays the amount which can be claimed (100 sSDEX)
* User confirms with metamask the amount claimable
* Referred user gets credited 50 sSDEX and referral user receives 10 sSDEX

### Other requirements

* Use lightboxes to render error messages

#### Admin Panel Backend

Backend UI displaying all claims made in a table with the following data:

<div align="center">

|TxID|Timestamp|Wallet Address|AVAX Balance at Snapshot|Claim Amount|
|----|---------|--------------|------------|------------------------|

</div>

* Button to call `pause` and `unpause` function in the smart contract

## Dependencies

* Archive node for mainnet (Ankr)
* Archive node for fuji testnet (Quicknode)

## Workflow

![index](https://user-images.githubusercontent.com/33762147/173891450-07c2a432-c158-4a26-b25f-9119d3dc1171.png)

## Figma

![2022-06-28_19-25-27](https://user-images.githubusercontent.com/33762147/176331255-476f6e9d-1c57-4504-879d-1c879e856e22.jpg)

[event logs]: https://consensys.net/blog/developers/guide-to-events-and-logs-in-ethereum-smart-contracts/
