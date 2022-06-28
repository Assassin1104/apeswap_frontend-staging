import styled from 'styled-components'
import { Heading, Text, WarningIcon, Button } from '@apeswapfinance/uikit'
import { Box } from 'theme-ui'

interface ContentProps {
  readingMore: boolean
}

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.navbar};
    padding: 15px;
    border-radius: 20px;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  color: white;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/gnana-mobile-dark.svg)' : 'url(/images/banners/gnana-mobile-light.svg)'};
  height: 278px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/banners/gnana-dark-968.svg)' : 'url(/images/banners/gnana-light-968.svg)'};
    height: 300px;
    justify-content: center;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/banners/gnana-dark-bg.svg)' : 'url(/images/banners/gnana-light-bg.svg)'};
  }
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  position: absolute;
  z-index: 999;
  margin-left: 1em;
  align-self: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    position: relative;
    margin-left: 3em;
    transform: translate(-200px);
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    position: relative;
    transform: translate(-300px);
  }
`
export const StyledHeading = styled(Heading)`
  font-size: 32px;
  font-weight: 700;
  max-width: 240px !important;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 42px;
    font-weight: 800;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`
export const PaddedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme.isDark ? `${theme.colors.yellow}26` : theme.colors.yellow)};
  padding: 10px;
  border-radius: 10px;
`
export const TopCon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
export const WarningHeader = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.primaryBright)};
  font-size: 30px;
  font-weight: 700;
`
export const Warning = styled(WarningIcon)`
  fill: #fff;
  width: 70px;
`
export const ReadMore = styled(Button)`
  background: none;
  padding: 0;
  margin: 0;
  text-decoration-line: underline;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryBright};
  border-radius: 0;
  box-shadow: unset;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`
export const CenterCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const InnerContent = styled(Box)<ContentProps>`
  padding: 0px 20px;
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    display: unset;
  }
`
export const InnerContentText = styled(Text)`
  letter-spacing: 5%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaryBright};
  text-align: center;
  max-width: 800px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`
export const OuterContent = styled(InnerContent)<ContentProps>`
  padding: 10px 20px;
  display: ${({ readingMore }) => (readingMore ? 'unset' : 'none')};

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`
export const OuterContentText = styled(InnerContentText)`
  ${({ theme }) => theme.mediaQueries.sm} {
  }
`
