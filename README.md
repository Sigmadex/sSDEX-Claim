<img src="https://user-images.githubusercontent.com/33762147/155625647-55c69f06-e0ea-44a8-a425-7aa086c329c5.png" style="border-radius:50%;width:72px;">

# Claim Bot (Airdrop)

## Summary
<em>Sigmadex is proposing an optimal token distribution model for allowing individuals to claim free sSDEX tokens. Claiming will be available to anybody who possessed AVAX in their wallet leading up to the AVAX snapshot on December 31st, 2021. Anybody who has qualified for the early claim will be able to provide a referral link for anybody to claim a smaller amount of sSDEX. All claimers will be required to pay the gas fees.</em>

#### Claim will be seperated into 2 types:

* Claim with AVAX in wallet before snapshot on Dec 31st 2021
* Claim after Dec 31st 2021 with referral link

## Motivation
The idea of the claim drop is to leverage an efficent way and provide additional incentives for spreading the word about obtaining free sSDEX. We are looking to achieve over 20,000 independent sSDEX wallet holders and the event is primarily for marketing and Sigmadex brand awareness purposes.

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

3. User confirms with metamask the amount claimable, bot collects a small fixed amount for gas

### User already made a claim

* User interacts with claim bot interface using a wallet address that has already made a claim
* User interface displays an exception explaining that a claim has already occured

### User makes a claim with a referral link

* User interacts with claim bot interface using a referral wallet address that has already made a claim:
eg. `https://claim.sigmadex.org/ref=0xf289752B420e10444f0d271267192a1e824977cd`
* User interface displays the amount which can be claimed (100 sSDEX)
* User confirms with metamask the amount claimable, bot collects a small fixed amount for gas
* Referred user gets credited 100 sSDEX and referral user receives 10 sSDEX

### Other requirements
#### Backend

We will require a backend UI which will display all claims made in a table with the following data:

<div align="center">

|TX ID|Timestamp|Wallet Address|AVAX Balance at Snapshot|Claim Amount|
|-----|---------|--------------|------------|------------------------|

</div>

## Workflow

![index](https://user-images.githubusercontent.com/33762147/160181887-df879218-0dbc-4f9c-9dbf-cfbdfa54dc0e.png)

## Proposed Deployment Locations

|Desc|Domain|
|-------|-----------|
|sSDEX Faucet|https://claim.sigmadex.org|
|Claim History|https://claim.sigmadex.org/history|

[event logs]: https://consensys.net/blog/developers/guide-to-events-and-logs-in-ethereum-smart-contracts/
