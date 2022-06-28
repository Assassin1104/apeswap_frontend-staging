import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout, Text, Card } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import { useFetchStats, useFetchStatsOverall, useStats } from 'state/statsOverall/hooks'
import BananaStats from 'views/Stats/components/BananaStats'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { usePollFarms } from 'state/farms/hooks'
import { usePollPools } from 'state/hooks'
import UnlockButton from 'components/UnlockButton'
import CardStats from './components/CardStats'
import PageLoader from '../../components/PageLoader'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/stats-night.svg)' : 'url(/images/banners/stats.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const PaddedCard = styled(Card)`
  padding: 26px;
  margin-bottom: 10px;
`

const Stats: React.FC = () => {
  usePollPools()
  usePollFarms()
  useFetchStatsOverall()
  useFetchStats()
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const yourStats = useStats()
  const stats = yourStats?.stats

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" color="white" style={{ marginBottom: '8px' }}>
            {t('Ape Stats')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <Page>
        <PaddedCard>
          <Heading color="warning">{t('HEADS UP, APES!')}</Heading>
          <Text>
            {t(
              'The data on this page is not always up to date. Please do not rely on it for an accurate representation of your holdings. For similar services, consider our partners such as',
            )}{' '}
            <a href="https://www.yieldwatch.net/" target="_blank" rel="noopener noreferrer">
              yieldwatch
            </a>
            ,{' '}
            <a href="https://jdiyield.com" target="_blank" rel="noopener noreferrer">
              {t('JDI')}
            </a>
            , or{' '}
            <a href="https://pacoca.io/" target="_blank" rel="noopener noreferrer">
              {t('Pacoca')}
            </a>{' '}
            {t('for alternative dashboards!')}
          </Text>
        </PaddedCard>
        {!account ? (
          <UnlockButton fullWidth fontSize="14px" />
        ) : (
          <div>
            {stats !== null ? (
              <div>
                <Cards>
                  <BananaStats stats={stats} />
                  {stats?.pools[0] && <CardStats data={stats.pools[0]} type="pool" forceDetails />}
                </Cards>
                <Cards>
                  {[...stats.incentivizedPools]
                    .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                    .map((pool) => {
                      return <CardStats data={pool} type="pool" />
                    })}
                  {[...stats.farms]
                    .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                    .map((farm) => {
                      return <CardStats data={farm} type="farm" />
                    })}
                </Cards>
              </div>
            ) : (
              <PageLoader />
            )}
          </div>
        )}
      </Page>
    </>
  )
}

export default Stats
