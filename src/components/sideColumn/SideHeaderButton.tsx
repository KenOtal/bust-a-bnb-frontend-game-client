import styled from 'styled-components'
import { TEAL } from '../../constants/styleConstants'

type HeaderButtonProps = {
    afterContent?: string
    mR?: number
    mL?: number
    flex?: number
    background?: string
    border?: number
    h?: number
}

export const HeaderButton = styled.button<HeaderButtonProps>`
    width: 62px;
    height: ${({ h }): string => (h ? `${h}px` : '100%')};
    background: ${({ background }): string => background || '#1a1a1a'};
    outline: none;
    margin: ${({ mL, mR }): string => {
        return `0px ${mR || 0}px 0px ${mL || 0}px`
    }};
    flex: ${({ flex }): number => flex};
    padding: 1em;
    &:focus {
        color: ${TEAL};
    }
    font-weight: bold;
    ${({ border }): string => `border-radius: ${border}px;`}

    &:disabled {
        opacity: 0.5;
    }
    background: ${({ afterContent }): string => afterContent || ''};
    background-size: contain;
    background-position-x: right;
    background-repeat: no-repeat;
`
