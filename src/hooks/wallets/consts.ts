export const enum WALLET_KEYS {
  WEB3AUTH = 'WEB3AUTH',
}

export const CGW_NAMES: { [key in WALLET_KEYS]: string | undefined } = {
  [WALLET_KEYS.WEB3AUTH]: 'web3auth',
}
