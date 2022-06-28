import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text as UIKitText, ArrowForwardIcon } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledHowItWorks = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 24px 0;
`

const Section = styled.div`
  margin-bottom: 24px;
`

const Icon = styled.div`
  text-align: center;
`

const Text = styled(UIKitText)`
  flex: 1;
  padding: 0 8px;
`

const Row = styled.div`
  align-items: start;
  display: flex;
  margin-bottom: 16px;
`

const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <StyledHowItWorks>
      <Section>
        <Heading id="how-it-works" color="secondary" mb="16px">
          {t('How it works')}
        </Heading>
        <Row>
          <Icon>
            <ArrowForwardIcon />
          </Icon>
          <Text>{t('Winners will be able to claim an NFT on this page once the claiming period starts.')}</Text>
        </Row>
        <Row>
          <Icon>
            <ArrowForwardIcon />
          </Icon>
          <Text>{t('If you’re not selected, you won’t be able to claim. Better luck next time!')}</Text>
        </Row>
        <Row>
          <Icon>
            <ArrowForwardIcon />
          </Icon>
          <Text>
            {t(
              "Winners can trade in their NFTs for a BANANA value until the expiry date written below. If you don't trade in your NFT by then, don’t worry: you’ll still keep it in your wallet!",
            )}
          </Text>
        </Row>
      </Section>
      <Section>
        <Heading color="secondary" mb="16px">
          {t('How are winners selected?')}
        </Heading>
        <Row>
          <Icon>
            <ArrowForwardIcon />
          </Icon>
          <Text>{t('Winners are selected at random! Good luck!')}</Text>
        </Row>
      </Section>
      <div>
        <Button
          as="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfToBNlovtMvTZFSwOhk0TBiDPMGasLxqG0RB-kJN85HR_avA/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Register for a chance to win')}
        </Button>
      </div>
    </StyledHowItWorks>
  )
}

export default HowItWorks
