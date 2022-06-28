import React from 'react'
import { PFarmingIcon, XPoolsIcon, GovernanceIcon, IaoIcon } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'

import OptionCard from './OptionCard'

import OpDetails from './OpDetails'
import {
  UtilityCon,
  UtilityTitle,
  UtilityHeading,
  Section,
  Section2,
  PlusIcon,
  OtherOpStyle,
  OtherOptions,
  FirstOption,
  Options,
} from './styles'

export const GnanaUtility: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const exploreGovernance = () => {
    return window.open('https://vote.apeswap.finance/', '_blank')
  }
  const goToPools = () => {
    return window.open('https://apeswap.finance/pools', '_blank')
  }
  const goToIAOs = () => {
    return window.open('https://apeswap.finance/iao', '_blank')
  }

  return (
    <UtilityCon>
      <UtilityTitle>
        <UtilityHeading>{t('GNANA UTILITY')}</UtilityHeading>
      </UtilityTitle>
      <Options>
        <FirstOption>
          <OptionCard type="1" title={t('Option 1')} desc={t('Hold in Wallet')}>
            <Section>
              <OpDetails
                Icon={
                  <PFarmingIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#383838' : '#F1EADA'}
                    color={theme.isDark ? '#FAFAFA' : '#4D4040'}
                  />
                }
                Title={t('Passive Farming')}
                Desc={t('Collect a 2% Reflect Fee on all GNANA Transactions')}
                ActionTitle={t('CONVERT')}
                actionHref="#convert"
                OpStyle={OtherOpStyle}
                type="1"
              />
              <PlusIcon>+</PlusIcon>
              <OpDetails
                Icon={
                  <GovernanceIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#383838' : '#F1EADA'}
                    color={theme.isDark ? '#FAFAFA' : '#4D4040'}
                  />
                }
                Title={t('Governance Proposals')}
                Desc={t('Propose and Vote on platform decisions')}
                ActionTitle={t('EXPLORE')}
                onAction={exploreGovernance}
                OpStyle={OtherOpStyle}
                type="1"
              />
            </Section>
          </OptionCard>
        </FirstOption>

        <OtherOptions>
          <OptionCard type="2" title={t('Option 2')} desc={t('Stake')}>
            <Section2>
              <OpDetails
                Icon={
                  <XPoolsIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#383838' : '#F1EADA'}
                    color={theme.isDark ? '#FAFAFA' : '#4D4040'}
                  />
                }
                Title={t('Exclusive Pools')}
                Desc={t('Access unique pools with higher APRs')}
                ActionTitle={t('GO TO POOLS')}
                onAction={goToPools}
                OpStyle={OtherOpStyle}
                type="2"
              />
            </Section2>
          </OptionCard>

          <OptionCard type="3" title={t('Option 3')} desc={t('Commit')}>
            <Section2>
              <OpDetails
                Icon={
                  <IaoIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#383838' : '#F1EADA'}
                    color={theme.isDark ? '#FAFAFA' : '#4D4040'}
                  />
                }
                Title={t('Exclusive Offerings')}
                Desc={t('Access to secondary offerings for a higher token allocations')}
                ActionTitle={t('GO TO IAOs')}
                onAction={goToIAOs}
                OpStyle={OtherOpStyle}
                type="3"
              />
            </Section2>
          </OptionCard>
        </OtherOptions>
      </Options>
    </UtilityCon>
  )
}

export default GnanaUtility
