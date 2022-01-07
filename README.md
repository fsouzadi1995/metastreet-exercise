# Metastreet Exercise

## Objective

Build a SPA that allows the user to connect to Metamask and allow them to visualize a grid of their currently held NFTs (ERC-720 and ERC-1155) in their wallets.
Each NFT should be represented by its picture, token address pointing to [Etherscan.io](https://etherscan.io) and the minted token id. 
NFT metadata has to be fetched through the tokenURI contract function.
The wallet handling should be similar to common dApps such as [Uniswap](https://uniswap.org).

Wallet information can be obtained through some of the [Covalent API](https://www.covalenthq.com) endpoints. If you don't own any NFTs in the Mainnet, you can simulate any other address.

Tech requirements are React, Typescript and Ethers.js

## Technologies/libs used

* Vite
* React
* Typescript
* Ethers.js as the Web3 provider
* Web3-React for Web3 integrations
* Axios for classic REST API requests
* SWR for request caching & easy status management
* TailwindCSS for inline styles
* HeadlessUI for generic components (dialog)
* React Loading Skeleton for loading indicators
* React Toastify for notifications
