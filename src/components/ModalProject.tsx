"use client";
import {Modal, Button} from 'react-bootstrap';
import styled from "styled-components";
import { CloseCircle } from 'iconsax-react';
interface ModalProjectProps {
    show?: boolean; 
    data?: any; 
    handleClose: (state: boolean) => void;
  }


  const DivClose = styled.div`
    position: fixed;
    z-index: 1000;
    top: 58px;
    right: 76px;
  `

export default function ModalProject({
        show = false, 
        data = null, 
        handleClose
    }: ModalProjectProps) {
    
    return (
        <>
            {show && (
                <DivClose onClick={() => handleClose(false)}>
                    <CloseCircle size="90" color="#FFF"/>
                </DivClose>
            )}

            <Modal
                show={show} 
                dialogClassName="modal-project"
                onHide={handleClose}
            >
            {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="p-0">
                <img src="img/capy_01.png" className="w-100"/>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleClose(false)}>
                Save Changes
            </Button>
            </Modal.Footer> */}
        </Modal>
        </>
    )
}