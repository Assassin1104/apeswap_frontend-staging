import { IconButton, Text, Flex } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ApyButton from 'components/ApyCalculator/ApyButton'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import { JungleFarm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { useTranslation } from 'contexts/Localization'
import { useModal } from '@apeswapfinance/uikit'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import InfoContent from '../InfoContent'
import { Container, StyledButton, ActionContainer } from './styles'
import { LiquidityModal } from '../../../components/LiquidityWidget'
import { Field, selectCurrency } from '../../../state/swap/actions'
import { useAppDispatch } from '../../../state'

const DisplayJungleFarms: React.FC<{ jungleFarms: JungleFarm[]; openId?: number }> = ({ jungleFarms, openId }) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = !pathname.includes('history')
  const dispatch = useAppDispatch()

  // TODO: clean up this code
  // Hack to get the close modal function from the provider
  // Need to export ModalContext from uikit to clean up the code
  const [, closeModal] = useModal(<></>)
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <LiquidityModal handleClose={closeModal} />,
    true,
    true,
    'liquidityWidgetModal',
  )

  const showLiquidity = (token, quoteToken) => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token,
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken,
      }),
    )
    onPresentAddLiquidityWidgetModal()
  }

  const jungleFarmsListView = jungleFarms.map((farm) => {
    const [token1, token2] = farm.tokenName.split('-')
    const totalDollarAmountStaked = Math.round(getBalanceNumber(farm?.totalStaked) * farm?.stakingToken?.price)
    const liquidityUrl = `https://apeswap.finance/add/${farm?.lpTokens?.token?.address[chainId]}/${
      farm?.lpTokens?.quoteToken?.symbol === 'BNB' ? 'ETH' : farm?.lpTokens?.quoteToken?.address[chainId]
    }`
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(
      farm?.userData?.pendingReward || new BigNumber(0),
      farm?.rewardToken?.decimals,
    )
    const userEarningsUsd = `$${(userEarnings * farm.rewardToken?.price).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(6)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.stakingTokenBalance || new BigNumber(0)) * farm?.stakingToken?.price
    ).toFixed(2)}`

    return {
      tokens: {
        token1: token1 === 'LC' ? 'LC2' : token1,
        token2,
        token3: farm?.rewardToken?.symbol === 'LC' ? 'LC2' : farm?.rewardToken?.symbol,
      },
      stakeLp: true,
      title: (
        <Text ml={10} weight="bold">
          {farm?.tokenName}
        </Text>
      ),
      id: farm.jungleId,
      infoContent: <InfoContent farm={farm} />,
      infoContentPosition: 'translate(-82%, 28%)',
      open: openId === farm.jungleId,
      cardContent: (
        <>
          <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            {!isMobile && (
              <>
                {farm.projectLink && (
                  <a href={farm.projectLink} target="_blank" rel="noreferrer">
                    <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                  </a>
                )}
                {farm?.twitter && (
                  <a href={farm?.twitter} target="_blank" rel="noreferrer">
                    <IconButton icon="twitter" color="primaryBright" width={20} />
                  </a>
                )}
              </>
            )}
          </Flex>
          <ListViewContent
            title={t('APR')}
            value={`${isActive ? farm?.apr?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 80}
            height={50}
            toolTip={t(
              'APRs are calculated in real time. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
            )}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 38%)"
            aprCalculator={
              <ApyButton
                lpLabel={farm?.stakingToken?.symbol}
                rewardTokenName={farm?.rewardToken?.symbol}
                rewardTokenPrice={farm?.rewardToken?.price}
                apy={farm?.apr / 100}
                addLiquidityUrl={liquidityUrl}
              />
            }
          />
          <ListViewContent
            title={t('Liquidity')}
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 160 : 110}
            height={50}
            toolTip={t('The total value of the LP tokens currently staked in this farm.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 75%)"
          />
          <ListViewContent title={t('Earned')} value={userEarningsUsd} height={50} width={isMobile ? 80 : 150} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {isMobile && (
              <ListViewContent
                title={`${t('Available LP')}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}

            <StyledButton
              onClick={() =>
                showLiquidity(
                  farm?.lpTokens?.token?.address[chainId],
                  farm?.lpTokens?.quoteToken?.symbol === 'BNB' ? 'ETH' : farm?.lpTokens?.quoteToken?.address[chainId],
                )
              }
            >
              {t('GET LP')}
            </StyledButton>

            {!isMobile && (
              <ListViewContent
                title={`${t('Available LP')}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
          </ActionContainer>
          {!isMobile && <NextArrow />}
          <Actions
            allowance={userAllowance?.toString()}
            stakedBalance={farm?.userData?.stakedBalance?.toString()}
            stakedTokenSymbol={farm?.stakingToken?.symbol}
            stakingTokenBalance={farm?.userData?.stakingTokenBalance?.toString()}
            stakeTokenAddress={farm?.stakingToken?.address[chainId]}
            stakeTokenValueUsd={farm?.stakingToken?.price}
            jungleId={farm?.jungleId}
          />
          {!isMobile && <NextArrow />}
          <HarvestAction
            jungleId={farm?.jungleId}
            disabled={userEarnings <= 0}
            userEarnings={userEarnings}
            earnTokenSymbol={farm?.rewardToken?.symbol || farm?.tokenName}
          />
        </>
      ),
    } as ExtendedListViewProps
  })
  return (
    <Container>
      <ListView listViews={jungleFarmsListView} />
    </Container>
  )
}

export default React.memo(DisplayJungleFarms)
