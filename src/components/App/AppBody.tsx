import React from 'react'
import { Card } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  z-index: 1;
  width: 360px;
  margin-bottom: 80px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white2};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
    margin-bottom: 0px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
