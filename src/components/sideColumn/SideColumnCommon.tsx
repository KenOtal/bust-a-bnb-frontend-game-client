import styled from 'styled-components'
import { BLACK } from '../../constants/styleConstants'

export const ColumHeader = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
`
export const ColumnContainer = styled.div`
    flex: 1;
    background-color: ${BLACK};
`

export const ColumnBody = styled.div`
    height: 100%;
`
