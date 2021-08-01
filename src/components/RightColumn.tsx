import React from 'react'
import {
    ColumHeader,
    ColumnContainer,
    ColumnBody,
} from './sideColumn/SideColumnCommon'
import { HeaderButton } from './sideColumn/SideHeaderButton'
import { LeaderBoard } from './LeaderBoard'

const RightColumn = (): JSX.Element => {
    return (
        <ColumnContainer>
            <ColumHeader>
                <HeaderButton flex={1}>B</HeaderButton>
                <HeaderButton flex={15} mL={1}>
                    CRYPTOASTROAPES
                </HeaderButton>
            </ColumHeader>
            <ColumnBody>
                <LeaderBoard />
            </ColumnBody>
        </ColumnContainer>
    )
}

export default RightColumn
