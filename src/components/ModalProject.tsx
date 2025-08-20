"use client";
import {Modal} from 'react-bootstrap';
import Image from 'next/image';
import styled from "styled-components";
import { CloseCircle } from 'iconsax-react';
import {isMobileOrSmallScreen} from '@/utils/helper';

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
    @media (max-width: 990px) {
        top: 10px;
        right: 10px;
    }
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
                    <CloseCircle size={ isMobileOrSmallScreen() ? "52" :"90"} color={isMobileOrSmallScreen() ? "#000" : "#FFF"}/>
                </DivClose>
            )}

            <Modal
                show={show} 
                dialogClassName="modal-project"
                onHide={() => handleClose(false)}
            >
            <Modal.Body className="p-0">
            {!data?.content && data?.img && (
                <Image src={data.img} alt="Project image" className="w-100" width={1200} height={800} style={{width: '100%', height: 'auto'}}/>
            )}

            {data?.content && (
                 <Image src={data.content} alt="Project content" className="w-100" width={1200} height={800} style={{width: '100%', height: 'auto'}}/>
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