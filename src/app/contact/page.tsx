"use client";
import { useEffect, useRef } from 'react';
import ContactForm from '@/components/ContactForm';
import { Row, Col, Container } from "react-bootstrap";
import styled from 'styled-components';
import BlockInforContact from '@/components/BlockInforContact';
import Image from "next/image";
import anime from 'animejs';
import { useLoading } from '@/components/LoadingProvider';

type BlockInfo = {
    title: string,
    des: string
}
const DivParent = styled.div`
  width: 100%;
  padding: 120px 0 80px;
  .contact-title {
        font-size: 4rem;
        font-weight: 900;
        text-transform: uppercase;
        background: linear-gradient(135deg, rgb(65, 110, 194), rgb(32, 103, 198), rgb(84, 185, 244)) text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-align: center;
        margin-bottom: 3rem;
    }
    .img-contact-wrap {
        filter: grayscale(100%);
        transition: all 0.3s ease-in-out;
        &:hover {
            filter: grayscale(0%);
        }
    }
        @media (max-width: 990px) {
            .img-contact-wrap {
             margin-bottom: 1rem;
            img {
                width: 100%;
            }
           
            }
        }
`

export default function Contact() {
    const { isLoading } = useLoading();
    const blockInfoRef = useRef<HTMLDivElement | null>(null);
    const blockImgRef = useRef<HTMLDivElement | null>(null);
    
    const blockInfoAnimatedRef = useRef(false);
    const blockImgAnimatedRef = useRef(false);
    
    const listBlockInfo: BlockInfo[] = [
        {
            title: '4+',
            des: 'years experience'
        },
        {
            title: '10+',
            des: 'projects'
        },
        {
            title: '2000+',
            des: 'screens'
        },
        {
            title: '5+',
            des: 'Brands & companies'
        },
     ]
     
    // Header animation function similar to About page
    const animateHeader = () => {
        anime.timeline({loop: false})
            .add({
                targets: '.contact-title',
                opacity: [0, 1],
                scale: [0.85, 1],
                duration: 1200,
                easing: 'easeOutExpo'
            })
            .add({
                targets: '.contact-form',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            }, '-=800');
    };
    
    // Hide block-info elements
    const hideBlockInfoElements = () => {
        const blocks = document.querySelectorAll('.block-info-contact .col-md-3');
        blocks.forEach((block) => {
            const el = block as HTMLElement;
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
    };
    
    // Animate block-info
    const animateBlockInfo = () => {
        anime({
            targets: '.block-info-contact .col-md-3',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
        });
    };
    
    // Hide block-img elements
    const hideBlockImgElements = () => {
        const images = document.querySelectorAll('.block-img .img-contact-wrap');
        images.forEach((img) => {
            const el = img as HTMLElement;
            el.style.opacity = '0';
            el.style.transform = 'scale(0.9)';
        });
    };
    
    // Animate block-img
    const animateBlockImg = () => {
        anime({
            targets: '.block-img .img-contact-wrap',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
    };
    
    // Scroll handler
    const handleScrollAnimate = () => {
        // Hide elements initially
        hideBlockInfoElements();
        hideBlockImgElements();
        
        const bodyElement = document.body;
        const scrollHandler = function(event: Event) {
            const target = event.target as HTMLElement;
            const positionScroll = target.scrollTop || 0;
            const windowHeight = window.innerHeight;
            const triggerOffset = windowHeight * 0.7;
            
            // Check block-info-contact
            const blockInfoTop = blockInfoRef.current?.offsetTop || 0;
            const blockInfoTrigger = blockInfoTop - triggerOffset;
            
            if (positionScroll >= blockInfoTrigger && !blockInfoAnimatedRef.current) {
                blockInfoAnimatedRef.current = true;
                animateBlockInfo();
            }
            
            // Check block-img
            const blockImgTop = blockImgRef.current?.offsetTop || 0;
            const blockImgTrigger = blockImgTop - triggerOffset;
            
            if (positionScroll >= blockImgTrigger && !blockImgAnimatedRef.current) {
                blockImgAnimatedRef.current = true;
                animateBlockImg();
            }
        };
        
        bodyElement.addEventListener('scroll', scrollHandler);
        
        // Return cleanup function
        return () => {
            bodyElement.removeEventListener('scroll', scrollHandler);
            blockInfoAnimatedRef.current = false;
            blockImgAnimatedRef.current = false;
        };
    };
    
    useEffect(() => {
        // Hide header elements initially
        const contactTitle = document.querySelector('.contact-title') as HTMLElement;
        const contactForm = document.querySelector('.contact-form') as HTMLElement;
        if (contactTitle) contactTitle.style.opacity = '0';
        if (contactForm) contactForm.style.opacity = '0';
        
        // Only run animation after loading is complete
        if (!isLoading) {
            const timer = setTimeout(() => {
                animateHeader();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [isLoading]);
    
    useEffect(() => {
        const cleanup = handleScrollAnimate();
        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <DivParent>
            <div className="wrap-contact-form">
                <h1 className="contact-title text-uppercase text-center">Contact</h1>
                <div className="contact-form">
                    <ContactForm/>
                </div>
            </div>
            <Container className='mt-5'>
                 <Row className='block-info-contact' ref={blockInfoRef}>  
                    {listBlockInfo.map((item, index) => (
                        <Col key={index} xs={12} md={3}>
                            <BlockInforContact title={item.title} des={item.des}/>
                        </Col>
                    ))}
                </Row>
                <Row className='mt-5 block-img' ref={blockImgRef}>
                    <Col xs={12} md={4}>
                        <div className="img-contact-wrap">
                            <Image src='/img/list-img-contact/1.png' alt='img-contact' width={421} height={271}/>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="img-contact-wrap">
                            <Image src='/img/list-img-contact/2.png' alt='img-contact' width={421} height={271}/>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="img-contact-wrap">
                            <Image src='/img/list-img-contact/3.png' alt='img-contact' width={421} height={271}/>
                        </div>
                    </Col>
                </Row>
            </Container>
           
        </DivParent>
    )
}