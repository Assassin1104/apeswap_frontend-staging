import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetchIazos, useIazos } from 'state/hooks'
import useCurrentTime from 'hooks/useTimer'
import TextInput from 'components/TextInput'
import useTheme from 'hooks/useTheme'
import { Flex, Spinner, useMatchBreakpoints } from '@apeswapfinance/uikit'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import IconButton from './components/IconButton'
import IazoCard from './components/IazoCard/IazoCard'
import {
  PageWrapper,
  LaunchPadWrapper,
  TopNavWrapper,
  HeaderWrapper,
  StyledHeader,
  StyledButton,
  SettingsWrapper,
  SpinnerHolder,
  IlosWrapper,
  PresaleText,
} from './styles'

const Iazos: React.FC = () => {
  useFetchIazos()
  const { iazos, isInitialized } = useIazos()
  const { isDark } = useTheme()
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const registeredIazos = iazos?.filter((iazo) => iazo.isRegistered)
  const currentTime = useCurrentTime() / 1000
  const [sort, setSort] = useState(null)
  const [searchQuery, setSearchQuery] = useState(null)
  const { t } = useTranslation()
  const currentIazos = registeredIazos?.filter(
    (iazo) =>
      parseInt(iazo.timeInfo.startTime) < currentTime &&
      currentTime < parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime) &&
      iazo.iazoState !== 'HARD_CAP_MET' &&
      iazo.iazoState !== 'FAILED',
  )
  const upcomingIazos = registeredIazos?.filter(
    (iazo) => parseInt(iazo.timeInfo.startTime) > currentTime && iazo.iazoState !== 'FAILED',
  )
  const pastIAzos = registeredIazos?.filter(
    (iazo) =>
      currentTime > parseInt(iazo.timeInfo.startTime) + parseInt(iazo.timeInfo.activeTime) ||
      iazo.iazoState === 'HARD_CAP_MET' ||
      iazo.iazoState === 'FAILED',
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const renderIazos = () => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filteredIazos = registeredIazos?.filter(
        (iazo) =>
          iazo.iazoToken.name.toLowerCase().includes(lowercaseQuery) || iazo.iazoToken.address.includes(searchQuery),
      )
      return filteredIazos
    }
    switch (sort) {
      case 'upcoming':
        return upcomingIazos
      case 'live':
        return currentIazos
      case 'done':
        return pastIAzos
      default:
        return [...currentIazos, ...upcomingIazos]
    }
  }

  return (
    <>
      <PageWrapper>
        <Flex flexDirection="column">
          <Banner
            banner="ssiao"
            title={t('Self Serve Offerings')}
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/self-serve-iao-ss-iao"
            maxWidth={856}
            listViewBreak
            margin="30px 0 0 0"
          />
          <LaunchPadWrapper>
            <TopNavWrapper />
            <HeaderWrapper>
              <StyledHeader>{t('Self - Serve Launchpad')}</StyledHeader>
              <Link to="/ss-iao/create">
                <StyledButton> {t('CREATE')} </StyledButton>
              </Link>
            </HeaderWrapper>
            <SettingsWrapper>
              <IconButton
                icon="calendar"
                text="Upcoming"
                active={sort === 'upcoming'}
                onClick={() => setSort('upcoming')}
              />
              <IconButton icon="graph" text={t('Current')} active={sort === 'live'} onClick={() => setSort('live')} />
              <IconButton icon="check" text={t('Past')} active={sort === 'done'} onClick={() => setSort('done')} />
              <TextInput
                placeholderText={t('Search token name or address....')}
                backgroundColor={isDark ? '#0B0B0B' : '#FDFBF5'}
                onChange={handleChangeQuery}
                size={isMobile ? 'sm' : 'md'}
                margin={isMobile ? '30px 0px 0px 0px;' : ''}
              />
            </SettingsWrapper>
            <IlosWrapper>
              <PresaleText>{(isInitialized || iazos) && `${renderIazos()?.length} Presales`}</PresaleText>
              {isInitialized || iazos ? (
                renderIazos()?.map((iazo) => {
                  return (
                    <Link to={`/ss-iao/${iazo.iazoContractAddress}`} key={iazo.iazoContractAddress}>
                      <IazoCard iazo={iazo} key={iazo.iazoContractAddress} />
                    </Link>
                  )
                })
              ) : (
                <SpinnerHolder>
                  <Spinner />
                </SpinnerHolder>
              )}
            </IlosWrapper>
          </LaunchPadWrapper>
        </Flex>
      </PageWrapper>
    </>
  )
}

export default Iazos
