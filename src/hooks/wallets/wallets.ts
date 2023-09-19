import { CYPRESS_MNEMONIC, TREZOR_APP_URL, TREZOR_EMAIL, WC_PROJECT_ID } from '@/config/constants'
import type { RecommendedInjectedWallets, WalletInit } from '@web3-onboard/common/dist/types.d'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'

import coinbaseModule from '@web3-onboard/coinbase'
import injectedWalletModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import keystoneModule from '@web3-onboard/keystone/dist/index'
import ledgerModule from '@web3-onboard/ledger/dist/index'
import trezorModule from '@web3-onboard/trezor'
import walletConnect from '@web3-onboard/walletconnect'
import web3authModule from '@web3-onboard/web3auth'

import pairingModule from '@/services/pairing/module'
import e2eWalletModule from '@/tests/e2e-wallet'
import { CGW_NAMES, WALLET_KEYS } from './consts'
import { WEB3AUTH_CLIENT_ID } from '@/config/constants'

const prefersDarkMode = (): boolean => {
  return window?.matchMedia('(prefers-color-scheme: dark)')?.matches
}

const walletConnectV2 = (chain: ChainInfo): WalletInit => {
  // WalletConnect v2 requires a project ID
  if (!WC_PROJECT_ID) {
    return () => null
  }

  return walletConnect({
    version: 2,
    projectId: WC_PROJECT_ID,
    qrModalOptions: {
      themeVariables: {
        '--wcm-z-index': '1302',
      },
      themeMode: prefersDarkMode() ? 'dark' : 'light',
    },
    requiredChains: [parseInt(chain.chainId)],
    dappUrl: location.origin,
  })
}

const WALLET_MODULES: { [key in WALLET_KEYS]: (chain: ChainInfo) => WalletInit } = {
  [WALLET_KEYS.INJECTED]: () => injectedWalletModule(),
  [WALLET_KEYS.WALLETCONNECT_V2]: (chain) => walletConnectV2(chain),
  [WALLET_KEYS.COINBASE]: () => coinbaseModule({ darkMode: prefersDarkMode() }),
  [WALLET_KEYS.PAIRING]: () => pairingModule(),
  [WALLET_KEYS.LEDGER]: () => ledgerModule(),
  [WALLET_KEYS.TREZOR]: () => trezorModule({ appUrl: TREZOR_APP_URL, email: TREZOR_EMAIL }),
  [WALLET_KEYS.KEYSTONE]: () => keystoneModule(),
  [WALLET_KEYS.WEB3AUTH]: () => web3authModule({ clientId: WEB3AUTH_CLIENT_ID }),
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
  if (window.Cypress && CYPRESS_MNEMONIC) {
    return [e2eWalletModule(chain.rpcUri)]
  }
  // const enabledWallets = Object.entries(WALLET_MODULES).filter(([key]) => isWalletSupported(chain.disabledWallets, key))
  const enabledWallets = Object.entries([WALLET_MODULES.WEB3AUTH])

  if (enabledWallets.length === 0) {
    return [WALLET_MODULES.INJECTED(chain)]
  }

  return enabledWallets.map(([, module]) => module(chain)) // TODO: Evaluate wich wallets will be available
}
