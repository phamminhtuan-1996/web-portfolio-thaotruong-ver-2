"use client";
import {Modal} from 'react-bootstrap';
import Image from 'next/image';
import styled from "styled-components";
import { CloseCircle } from 'iconsax-react';
import {isMobileOrSmallScreen} from '@/utils/helper';
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

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

  const LoadingContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  `

  const LoadingDot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    margin: 0 10px;
    opacity: 0;
  `

  const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    opacity: 0;
  `

export default function ModalProject({
        show = false, 
        data = {id: 0, img: '', filter: [], content: ''}, 
        handleClose
    }: ModalProjectProps) {
    const [isImageLoading, setIsImageLoading] = useState(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (show && isMounted) {
            setIsImageLoading(true);
        }
    }, [show, data, isMounted]);

    useEffect(() => {
        if (isImageLoading && loadingRef.current) {
            // Animate loading dots
            anime({
                targets: loadingRef.current.querySelectorAll('.loading-dot'),
                opacity: [0, 1],
                translateY: [-20, 0],
                delay: anime.stagger(100),
                duration: 600,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutQuad'
            });
        }
    }, [isImageLoading]);

    const handleImageLoad = () => {
        setIsImageLoading(false);
        
        // Fade in the image
        if (imageRef.current) {
            anime({
                targets: imageRef.current,
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuad'
            });
        }
    };
    
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
            {isMounted && isImageLoading && (
                <LoadingContainer ref={loadingRef}>
                    <LoadingDot className="loading-dot" />
                    <LoadingDot className="loading-dot" />
                    <LoadingDot className="loading-dot" />
                </LoadingContainer>
            )}
            
            <ImageWrapper ref={imageRef} style={{ display: isImageLoading && isMounted ? 'none' : 'block' }}>
                {!data?.content && data?.img && (
                    <Image 
                        src={data.img.startsWith('http') ? data.img : (data.img.startsWith('/') ? data.img : '/' + data.img)} 
                        alt="Project image" 
                        className="w-100" 
                        width={1200} 
                        height={800} 
                        style={{width: '100%', height: 'auto'}}
                        onLoad={handleImageLoad}
                        priority
                    />
                )}

                {data?.content && (
                     <Image 
                        src={data.content.startsWith('http') ? data.content : (data.content.startsWith('/') ? data.content : '/' + data.content)} 
                        alt="Project content" 
                        className="w-100" 
                        width={1200} 
                        height={800} 
                        style={{width: '100%', height: 'auto'}}
                        onLoad={handleImageLoad}
                        priority
                     />
                )}
            </ImageWrapper>
               
                
            </Modal.Body>
        </Modal>
        </>
    )
}