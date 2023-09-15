import type { NextPage } from 'next'
import Head from 'next/head'

import Batch from '@/components/batched/Batch'

const Balances: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Kondor[TMP] – Batch Payments'}</title>
      </Head>

      <main>
        <Batch />
      </main>
    </>
  )
}

export default Balances
