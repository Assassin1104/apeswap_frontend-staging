import styled from 'styled-components'
import { Button, ArrowDropUpIcon, Flex } from '@apeswapfinance/uikit'

export const StyledButton = styled(Button)<{ buttonSize?: number }>`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: ${({ buttonSize }) => buttonSize || 200}px;
  height: 44px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: ${({ buttonSize }) => buttonSize || 190}px;
  }
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const Container = styled(Flex)`
  position: relative;
  flex-direction: column;
  margin-top: 20px;
`
