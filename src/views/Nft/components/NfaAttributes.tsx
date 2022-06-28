import React from 'react'
import { Nft } from 'config/constants/types'
import styled from 'styled-components'
import nfaAttributes from 'config/constants/nfaAttributes'
import { useTranslation } from 'contexts/Localization'

const AttributesHolder = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 350px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 450px;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
`
const Attribute = styled.div`
  height: 30px;
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 0px 2px ${(props) => props.theme.colors.text};
  margin: 7px;
  padding: 0px 5px 0 5px;
  font-size: 15px;
  line-height: 30px;
  font-family: ${(props) => props.theme.fontFamily.poppins};
`

const ToolTipText = styled.span`
  visibility: hidden;
  width: 110px;
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.gray};
  box-shadow: 0px 0px 2px ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontFamily.poppins};
  text-align: center;
  border-radius: 6px;
  padding: 6.5px;
  position: absolute;
  z-index: 100;
`

const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${ToolTipText} {
    visibility: visible;
  }
`

export interface Nfa {
  nfa: Nft
}

const NfaAttributes: React.FC<Nfa> = ({ nfa }) => {
  const { baseColor, faceColor, frames, mouths, eyes, hats } = nfa.attributes
  const { t } = useTranslation()
  const base = nfaAttributes(t).find((attrib) => attrib.id === baseColor)
  const face = nfaAttributes(t).find((attrib) => attrib.id === faceColor)
  const frame = nfaAttributes(t).find((attrib) => attrib.id === frames)
  const mouth = nfaAttributes(t).find((attrib) => attrib.id === mouths)
  const eye = nfaAttributes(t).find((attrib) => attrib.id === eyes)
  const hat = nfaAttributes(t).find((attrib) => attrib.id === hats)

  return (
    <AttributesHolder>
      <ToolTip>
        <Attribute>
          {base.category}: {base.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: base.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
      <ToolTip>
        <Attribute>
          {face.category}: {face.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: face.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
      <ToolTip>
        <Attribute>
          {frame.category}: {frame.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: frame.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
      <ToolTip>
        <Attribute>
          {mouth.category}: {mouth.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: mouth.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
      <ToolTip>
        <Attribute>
          {eye.category}: {eye.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: eye.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
      <ToolTip>
        <Attribute>
          {hat.category}: {hat.id}
          <ToolTipText>{t('Occurance %occurance% of 1000', { occurance: hat.occurance })}</ToolTipText>
        </Attribute>
      </ToolTip>
    </AttributesHolder>
  )
}

export default NfaAttributes
