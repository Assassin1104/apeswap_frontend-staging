import { Button, Flex } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 227px;
  height: 44px;
`

export const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 227px;
  height: 44px;
`

export const SmallButton = styled(Button)`
  max-width: 44px;
  height: 44px;
`

export const ActionContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`

export const CenterContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    justify-content: auto;
  }
`
