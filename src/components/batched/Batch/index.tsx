import { Box, Container, Divider, SvgIcon, Typography } from '@mui/material'
import css from './styles.module.css'
import EmptyBatchIcon from '@/public/images/common/empty-batch.svg'

// import EmptyBatch from './EmptyBatch'
import { TxBuilderButton } from '@/components/tx-flow/common/TxButton'

const Batch = () => {
  return (
    <Container className={css.batchedContainer}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Batch payments
      </Typography>
      <Divider />
      <Box display="flex" flexWrap="wrap" justifyContent="center" textAlign="center" mt={3} px={4}>
        <SvgIcon component={EmptyBatchIcon} inheritViewBox sx={{ fontSize: 110 }} />
        <Typography variant="body2" mt={2} mb={4} px={8} sx={{ textWrap: 'balance' }}>
          Save gas and signatures by adding multiple transactions to a single batch transaction. You can reorder and
          delete individual transactions in a batch.
        </Typography>
        <TxBuilderButton />
      </Box>
    </Container>
  )
}

export default Batch
