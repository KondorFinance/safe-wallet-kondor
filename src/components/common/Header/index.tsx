import type { Dispatch, SetStateAction } from 'react'
import { type ReactElement } from 'react'
import { useRouter } from 'next/router'
import { IconButton, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import MenuIcon from '@mui/icons-material/Menu'
import classnames from 'classnames'
import css from './styles.module.css'
import ConnectWallet from '@/components/common/ConnectWallet'
import NetworkSelector from '@/components/common/NetworkSelector'
// import NotificationCenter from '@/components/notification-center/NotificationCenter'
import { AppRoutes } from '@/config/routes'
import useChainId from '@/hooks/useChainId'
import KondorLogo from '@/public/images/kondor_logo.svg'
import Link from 'next/link'
import useSafeAddress from '@/hooks/useSafeAddress'

type HeaderProps = {
  onMenuToggle?: Dispatch<SetStateAction<boolean>>
  onBatchToggle?: Dispatch<SetStateAction<boolean>>
}

const Header = ({ onMenuToggle, onBatchToggle }: HeaderProps): ReactElement => {
  const chainId = useChainId()
  const safeAddress = useSafeAddress()
  const router = useRouter()

  // Logo link: if on Dashboard, link to Welcome, otherwise to the root (which redirects to either Dashboard or Welcome)
  const logoHref = router.pathname === AppRoutes.home ? AppRoutes.welcome : AppRoutes.index

  const handleMenuToggle = () => {
    if (onMenuToggle) {
      onMenuToggle((isOpen) => !isOpen)
    } else {
      router.push(logoHref)
    }
  }

  const handleBatchToggle = () => {
    if (onBatchToggle) {
      onBatchToggle((isOpen) => !isOpen)
    }
  }

  return (
    <Paper className={css.container}>
      <div className={classnames(css.element, css.menuButton, !onMenuToggle ? css.hideSidebarMobile : null)}>
        <IconButton onClick={handleMenuToggle} size="large" edge="start" color="default" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </div>

      <div className={classnames(css.element, css.hideMobile, css.logo)}>
        <Link href={logoHref} passHref>
          <Grid container spacing={1}>
            <Grid>
              <KondorLogo alt="Safe logo" />
            </Grid>
            <Grid>
              <Typography>Kondor[TMP]</Typography>
            </Grid>
          </Grid>
        </Link>
      </div>

      {/* {safeAddress && (
        <div className={classnames(css.element, css.hideMobile)}>
          <BatchIndicator onClick={handleBatchToggle} />
        </div>
      )}

      <div className={css.element}>
        <NotificationCenter />
      </div> */}

      <div className={classnames(css.element, css.connectWallet)}>
        <ConnectWallet />
      </div>

      <div className={classnames(css.element, css.networkSelector)}>
        <NetworkSelector />
      </div>
    </Paper>
  )
}

export default Header
