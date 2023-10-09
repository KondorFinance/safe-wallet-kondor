import { useEffect } from 'react'
import { type ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import useAsync, { type AsyncResult } from '../useAsync'
import { logError, Errors } from '@/services/exceptions'
import { chains } from '@/utils/availableChains'
import { IS_TEST_CHAINS } from '@/config/constants'

const getConfigs = async (): Promise<ChainInfo[]> => {
  // const data = await getChainsConfig()
  // return data.results || []
  const testChains = chains.filter((c) => c.chainId === '5')
  const mainChains = chains.filter((c) => c.chainId === '1' || c.chainId === '137')

  return IS_TEST_CHAINS ? testChains : mainChains
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
