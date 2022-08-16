import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import React from "react";

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))
