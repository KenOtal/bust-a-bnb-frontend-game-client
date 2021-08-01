import React, { ReactElement } from 'react'
import { Modal as RsuiteModal } from 'rsuite'
import styled from 'styled-components'

const Container = styled.div`
    height: 50vh;
`

const Modal = ({ isOpen, setOpen, content }): ReactElement => {
    return (
        <>
            <Container>
                <RsuiteModal show={isOpen} onHide={(): void => setOpen(false)}>
                    {content}
                </RsuiteModal>
            </Container>
        </>
    )
}

export default Modal
