"use client";
import ContactForm from '@/components/ContactForm';
import { Row, Col, Container } from "react-bootstrap";
import styled from 'styled-components';
import BlockInforContact from '@/components/BlockInforContact';
import Image from "next/image";

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
        background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
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
`

export default function Contact() {
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
    return (
        <DivParent>
             <h1 className="contact-title text-uppercase text-center">Contact</h1>
            <ContactForm/>
            <Container className='mt-5'>
                 <Row>  
                    {listBlockInfo.map((item, index) => (
                        <Col key={index} xs={12} md={3}>
                            <BlockInforContact title={item.title} des={item.des}/>
                        </Col>
                    ))}
                </Row>
                <Row className='mt-5'>
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