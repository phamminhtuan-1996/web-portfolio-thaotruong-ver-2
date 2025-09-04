"use client";
import {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {isMobileOrSmallScreen} from '@/utils/helper';
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #FAC59F, #6B47AB) !important;
  color: #fff !important;
  border: none !important;
  padding: 10px 20px !important;
`;

export default function PopupWarningReponsive() {
    const router = useRouter();
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const handleAccept = () => {
        setShow(false);
        router.push("/portfolio"); 
    }
    const checkMobileAndPage = () => {
        const listShow = ['/portfolio', '/about'];
        if (isMobileOrSmallScreen() && !listShow.includes(pathname)) {
            setShow(true);
        }
    }
    useEffect(() => {
        console.log('pathname useEffect', pathname);
        checkMobileAndPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])
    useEffect(() => {
        console.log('usePathname', pathname);
        checkMobileAndPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
                <Modal
                    show={show} 
                    dialogClassName="modal-project"
                    centered
                >
                <Modal.Body className="p-5">
                    <Image src="/img/warning-construction.png" width={200} height={200} alt="warning" className="mx-auto d-block"/>
                    <p className="text-center">Currently, only the Project page is optimized for mobile devices. Please visit the Project page or switch to a desktop for a complete experience</p>
                    <StyledButton variant="primary" onClick={handleAccept} className="mx-auto d-block">Jump to my works <Image src="img/jump-to-works-icon.svg" alt="button" width={20} height={20}/></StyledButton>
                </Modal.Body>
            </Modal>
        </>
    )
}