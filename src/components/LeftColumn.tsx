import React from 'react'
import { ColumHeader, ColumnContainer } from './sideColumn/SideColumnCommon'
import { HeaderButton } from './sideColumn/SideHeaderButton'

const LeftColumn = (): JSX.Element => {
    return (
        <ColumnContainer>
            <ColumHeader>
                <HeaderButton flex={2}>CHAT</HeaderButton>
                <HeaderButton flex={2} mR={1} mL={1}>
                    HISTORY
                </HeaderButton>
                <HeaderButton>B</HeaderButton>
            </ColumHeader>
        </ColumnContainer>
    )
}

export default LeftColumn
