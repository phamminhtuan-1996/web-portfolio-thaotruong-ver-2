"use client";
import {Modal} from 'react-bootstrap';
import styled from "styled-components";
import { CloseCircle } from 'iconsax-react';

type ListProjectItemDefault = {
    id: number;
    img: string;
    filter: string[];
    content: string | null;
}

interface ModalProjectProps {
    show?: boolean; 
    data?: ListProjectItemDefault | null; 
    handleClose: (state: boolean) => void;
  }


  const DivClose = styled.div`
    position: fixed;
    z-index: 2000;
    top: 58px;
    right: 76px;
  `

export default function ModalProject({
        show = false, 
        data = {id: 0, img: '', filter: [], content: ''}, 
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
                onHide={() => handleClose(false)}
            >
            <Modal.Body className="p-0">
            {data && (
                <img src={data.img} className="w-100"/>
            )}

            {data?.content && (
                 <img src={data.content} className="w-100"/>
            )}
               
                
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