import React, { useCallback } from 'react'
import { Trade } from '@apeswapfinance/sdk'
import { ModalProps } from '@apeswapfinance/uikit'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import SwapModalFooter from './SwapModalFooter'
import SwapModalHeader from './SwapModalHeader'

interface ConfirmSwapModalProps {
  trade?: Trade
  attemptingTxn: boolean
  txHash?: string
  recipient: string | null
  allowedSlippage: number
  onAcceptChanges: () => void
  onConfirm: () => void
  swapErrorMessage?: string
  customOnDismiss?: () => void
  realSwapPrice?: string
  realOutputAmount?: string
}

const ConfirmSwapModal: React.FC<ModalProps & ConfirmSwapModalProps> = ({
  trade,
  allowedSlippage,
  onConfirm,
  onDismiss,
  customOnDismiss,
  recipient,
  swapErrorMessage,
  attemptingTxn,
  txHash,
  realSwapPrice,
  realOutputAmount,
}) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const modalHeader = useCallback(() => {
    return trade ? (
      <SwapModalHeader
        trade={trade}
        allowedSlippage={allowedSlippage}
        recipient={recipient}
        realOutputAmount={realOutputAmount}
      />
    ) : null
  }, [allowedSlippage, recipient, trade, realOutputAmount])

  const modalBottom = useCallback(() => {
    return trade ? (
      <SwapModalFooter
        onConfirm={onConfirm}
        trade={trade}
        swapErrorMessage={swapErrorMessage}
        allowedSlippage={allowedSlippage}
        realSwapPrice={realSwapPrice}
      />
    ) : null
  }, [allowedSlippage, onConfirm, swapErrorMessage, trade, realSwapPrice])

  // text to show while loading
  const pendingText = t('Placing order of %tradeInputAmt%%tradeInputSymbol% for %tradeOutputAmt%%tradeOutputSymbol%', {
    tradeInputAmt: trade?.inputAmount?.toSignificant(6) ?? '',
    tradeInputSymbol: trade?.inputAmount?.currency?.getSymbol(chainId) ?? '',
    tradeOutputAmt: realOutputAmount || (trade?.outputAmount?.toSignificant(6) ?? ''),
    tradeOutputSymbol: trade?.outputAmount?.currency?.getSymbol(chainId) ?? '',
  })

  const confirmationContent = useCallback(
    () =>
      swapErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [onDismiss, modalBottom, modalHeader, swapErrorMessage],
  )

  return (
    <TransactionConfirmationModal
      title={t('Confirm Order')}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={confirmationContent}
      pendingText={pendingText}
      currencyToAdd={trade?.outputAmount.currency}
    />
  )
}

export default React.memo(ConfirmSwapModal)
