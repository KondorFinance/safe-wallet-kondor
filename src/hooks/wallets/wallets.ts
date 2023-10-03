import type { RecommendedInjectedWallets, WalletInit } from '@web3-onboard/common/dist/types.d'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'

import { LOGIN_PROVIDER } from '@toruslabs/openlogin-utils'
import { ProviderLabel } from '@web3-onboard/injected-wallets'
import { WALLET_ADAPTERS, type LoginMethodConfig } from '@web3auth/base'
import web3authModule, { type Web3AuthModuleOptions } from './web3authModule'
import { CGW_NAMES, WALLET_KEYS } from './consts'
import { WEB3AUTH_CLIENT_ID } from '@/config/constants'

const prefersDarkMode = (): boolean => {
  return window?.matchMedia('(prefers-color-scheme: dark)')?.matches
}

const loginMethods: LoginMethodConfig = {}

Object.values(LOGIN_PROVIDER)
  .filter((lm) => lm !== LOGIN_PROVIDER.GOOGLE)
  .map((lm) => {
    const result = {
      name: lm,
      showOnModal: false,
      showOnDesktop: false,
      showOnMobile: false,
    }
    loginMethods[lm] = result
  })

const web3authOptions: Web3AuthModuleOptions = {
  authMode: 'WALLET',
  clientId: WEB3AUTH_CLIENT_ID,
  uiConfig: {
    modalZIndex: '1302',
    appName: 'Kondor[TMP]',
    primaryButton: 'emailLogin',
    logoDark: '/images/kondor-logo.png',
  },
  modalConfig: {
    // eslint-disable-next-line prettier/prettier
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: 'openlogin',
      loginMethods,
      showOnModal: true,
    },
  },
}

const WALLET_MODULES: { [key in WALLET_KEYS]: (chain: ChainInfo) => WalletInit } = {
  [WALLET_KEYS.WEB3AUTH]: () => web3authModule(web3authOptions),
}

export const getAllWallets = (chain: ChainInfo): WalletInit[] => {
  return Object.values(WALLET_MODULES).map((module) => module(chain))
}

export const getRecommendedInjectedWallets = (): RecommendedInjectedWallets[] => {
  return [{ name: ProviderLabel.MetaMask, url: 'https://metamask.io' }]
}

export const isWalletSupported = (disabledWallets: string[], walletLabel: string): boolean => {
  const legacyWalletName = CGW_NAMES?.[walletLabel.toUpperCase() as WALLET_KEYS]
  return !disabledWallets.includes(legacyWalletName || walletLabel)
}

export const getSupportedWallets = (chain: ChainInfo): WalletInit[] => {
  const enabledWallets = Object.entries(WALLET_MODULES).filter(([key]) => isWalletSupported(chain.disabledWallets, key))
  return enabledWallets.map(([, module]) => module(chain))
}
