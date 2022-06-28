import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import CardValue from 'components/CardValue'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({ farmStats, bscScanAddress }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Text fontSize="24px">{t('Earnings')}</Text>
      <Flex justifyContent="space-between">
        <Text>{t('Daily')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerDay} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Weekly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerWeek} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Monthly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerMonth} prefix="$" />
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Yearly')}:</Text>
        <CardValue fontSize="14px" decimals={2} value={farmStats.dollarsEarnedPerYear} prefix="$" />
      </Flex>
      <Flex justifyContent="center">
        <StyledLinkExternal href={bscScanAddress}>{t('View on BscScan')}</StyledLinkExternal>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
