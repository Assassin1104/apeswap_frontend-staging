import React, { useCallback, useState, useRef } from 'react'
import styled from 'styled-components'
import { Skeleton, Button } from '@apeswapfinance/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  padding: 0px 10px;
`

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const rewardRefReward = useRef(null)
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { t } = useTranslation()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      } else {
        rewardRefReward.current?.rewardMe()
      }
    } catch (e) {
      rewardRefReward.current?.rewardMe()
      console.warn(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <StyledButton size="md" disabled={requestedApproval} onClick={handleApprove}>
          {t('ENABLE')}
        </StyledButton>
      )}
    </>
  )
}

export default ApprovalAction
