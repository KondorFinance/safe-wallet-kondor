import type { ReactElement } from 'react'
import React from 'react'
import { AppRoutes } from '@/config/routes'
import HomeIcon from '@/public/images/sidebar/home.svg'
import AssetsIcon from '@/public/images/sidebar/assets.svg'
import TransactionIcon from '@/public/images/sidebar/transactions.svg'
import ABIcon from '@/public/images/sidebar/address-book.svg'
import SettingsIcon from '@/public/images/sidebar/settings.svg'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import HubIcon from '@mui/icons-material/Hub'
import PaymentsIcon from '@mui/icons-material/Payments'
import { SvgIcon } from '@mui/material'

export type NavItem = {
  label: string
  icon?: ReactElement
  href: string
  badge?: boolean
}

// multiple lists by category

export const dashboardNavItem: NavItem = {
  label: 'Dashboard',
  icon: <SvgIcon component={HomeIcon} inheritViewBox />,
  href: AppRoutes.home,
}

export const settingsNavItem: NavItem = {
  label: 'Settings',
  icon: <SvgIcon component={SettingsIcon} inheritViewBox />,
  href: AppRoutes.settings.setup,
}

export const paymentsNavItems: NavItem[] = [
  {
    label: 'Assets',
    icon: <SvgIcon component={AssetsIcon} inheritViewBox />,
    href: AppRoutes.balances.index,
  },
  {
    label: 'Batch Payments',
    icon: <SvgIcon component={PaymentsIcon} inheritViewBox />,
    href: AppRoutes.batch.index,
  },
  {
    label: 'History',
    icon: <SvgIcon component={TransactionIcon} inheritViewBox />,
    href: AppRoutes.transactions.history,
  },
  {
    label: 'Address book',
    icon: <SvgIcon component={ABIcon} inheritViewBox />,
    href: AppRoutes.addressBook,
  },
]

export const fiatNavItems: NavItem[] = [
  {
    label: '[coming soon]',
    icon: <CurrencyExchangeIcon />,
    href: '#',
  },
]

export const defiNavItems: NavItem[] = [
  // {
  //   label: 'Apps',
  //   icon: <SvgIcon component={AppsIcon} inheritViewBox />,
  //   href: AppRoutes.apps.index,
  // },
  {
    label: '[coming soon]',
    icon: <HubIcon />,
    href: '#',
  },
]

export const transactionNavItems = [
  {
    label: 'Queue',
    href: AppRoutes.transactions.queue,
  },
  {
    label: 'History',
    href: AppRoutes.transactions.history,
  },
  {
    label: 'Messages',
    href: AppRoutes.transactions.messages,
  },
]

export const batchPaymentsNavItems = [
  {
    label: 'Create',
    href: AppRoutes.batch.index,
  },
  {
    label: 'History',
    href: AppRoutes.batch.index,
  },
]

export const balancesNavItems = [
  {
    label: 'Tokens',
    href: AppRoutes.balances.index,
  },
  {
    label: 'NFTs',
    href: AppRoutes.balances.nfts,
  },
]

export const settingsNavItems = [
  {
    label: 'Setup',
    href: AppRoutes.settings.setup,
  },
  {
    label: 'Appearance',
    href: AppRoutes.settings.appearance,
  },
  {
    label: 'Modules',
    href: AppRoutes.settings.modules,
  },
  {
    label: 'Spending limits',
    href: AppRoutes.settings.spendingLimits,
  },
  {
    label: 'Safe Apps',
    href: AppRoutes.settings.safeApps.index,
  },
  {
    label: 'Data',
    href: AppRoutes.settings.data,
  },
  {
    label: 'Environment variables',
    href: AppRoutes.settings.environmentVariables,
  },
]

export const generalSettingsNavItems = [
  {
    label: 'Cookies',
    href: AppRoutes.settings.cookies,
  },
  {
    label: 'Appearance',
    href: AppRoutes.settings.appearance,
  },
  {
    label: 'Data',
    href: AppRoutes.settings.data,
  },
  {
    label: 'Environment variables',
    href: AppRoutes.settings.environmentVariables,
  },
]

export const safeAppsNavItems = [
  {
    label: 'All apps',
    href: AppRoutes.apps.index,
  },
  {
    label: 'Bookmarked apps',
    href: AppRoutes.apps.bookmarked,
  },
  {
    label: 'My custom apps',
    href: AppRoutes.apps.custom,
  },
]
