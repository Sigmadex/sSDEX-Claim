import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'AVAX',
  symbol: 'AVAX',
  decimals: 18,
}


export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
    return chainId
  }

