import React, { useCallback, useState } from 'react'
import { Currency, Token } from '@apeswapfinance/sdk'
import { ModalProps, Button, Modal, ModalFooter } from '@apeswapfinance/uikit'
import useIsMobile from 'hooks/useIsMobile'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from 'contexts/Localization'
import CurrencySearch from './CurrencySearch'
import ImportToken from './ImportToken'
import Manage from './Manage'
import ImportList from './ImportList'
import { CurrencyModalView } from './types'

const StyledModalBody = styled(Modal)`
  overflow-y: auto;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

interface CurrencySearchModalProps extends ModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss()
      onCurrencySelect(currency)
    },
    [onDismiss, onCurrencySelect],
  )
  const isMobile = useIsMobile()
  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>()

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>()
  const [listURL, setListUrl] = useState<string | undefined>()
  const { t } = useTranslation()

  const modalProps = {
    title: t('Tokens'),
    maxWidth: isMobile ? '320px' : '480px',
    ...(isMobile
      ? {
          style: {
            height: 'calc(100vh - 30px)',
            overflowY: 'auto',
          },
        }
      : {}),
  }
  return (
    <StyledModalBody onDismiss={onDismiss} {...modalProps}>
      {modalView === CurrencyModalView.search ? (
        <CurrencySearch
          onCurrencySelect={handleCurrencySelect}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
          showImportView={() => setModalView(CurrencyModalView.importToken)}
          setImportToken={setImportToken}
        />
      ) : modalView === CurrencyModalView.importToken && importToken ? (
        <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect} />
      ) : modalView === CurrencyModalView.importList && importList && listURL ? (
        <ImportList list={importList} listURL={listURL} onImport={() => setModalView(CurrencyModalView.manage)} />
      ) : modalView === CurrencyModalView.manage ? (
        <Manage
          setModalView={setModalView}
          setImportToken={setImportToken}
          setImportList={setImportList}
          setListUrl={setListUrl}
        />
      ) : (
        ''
      )}
      {modalView === CurrencyModalView.search && (
        <ModalFooter onDismiss={onDismiss}>
          <Button
            variant="primary"
            onClick={() => setModalView(CurrencyModalView.manage)}
            className="list-token-manage-button"
            margin="10px 0 10px 0"
          >
            {t('Manage Tokens')}
          </Button>
        </ModalFooter>
      )}
    </StyledModalBody>
  )
}
