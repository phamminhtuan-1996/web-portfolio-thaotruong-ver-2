"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Row, Col, Button, Container, Card, Form } from "react-bootstrap";
import { Sms, Call } from 'iconsax-react';
import styled from "styled-components";
import anime from 'animejs';

const ContactSection = styled.div`
    // padding: 120px 0 80px;
    
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
    
    .contact-title__left {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 2rem;
    }
    
    .contact-info {
        color: #7CA3EE;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .contact-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
    }
    
    .form-label {
        color: #7CA3EE;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .form-control {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(124, 163, 238, 0.3);
        color: #fff;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: #7CA3EE;
            box-shadow: 0 0 0 0.2rem rgba(124, 163, 238, 0.25);
            color: #fff;
        }
        
        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
    }
    
    .submit-btn {
        background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        text-transform: uppercase;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
    }
    
    @media (max-width: 768px) {
        padding: 80px 0 60px;
        
        .contact-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
        
        .contact-title__left {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
        }
        
        .contact-card {
            margin-top: 2rem;
            padding: 1.5rem;
        }
        
        .contact-info {
            font-size: 0.9rem;
        }
    }
`;

interface FormData {
    fullName: string;
    email: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        // Hide elements initially
        const leftContent = document.querySelector('.contact-form-left') as HTMLElement;
        const rightCard = document.querySelector('.contact-form-right') as HTMLElement;
        if (leftContent) leftContent.style.opacity = '0';
        if (rightCard) rightCard.style.opacity = '0';
        
        // Animate ContactForm content
        const timer = setTimeout(() => {
            anime.timeline({loop: false})
                .add({
                    targets: '.contact-form-left',
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 1000,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: '.contact-form-right',
                    opacity: [0, 1],
                    translateX: [50, 0],
                    duration: 1000,
                    easing: 'easeOutExpo'
                }, '-=700')
                .add({
                    targets: '.contact-form-right .form-group',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                }, '-=500');
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formUrl = 'https://docs.google.com/forms/d/13jnk2HdGmDi5EEVQpsZ-xuUYf1kdHWmmLYo63qjvkdQ/formResponse';
        
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('entry.757988162', formData.fullName);
        formDataToSubmit.append('entry.969857882', formData.email);
        formDataToSubmit.append('entry.174016111', formData.message);
        
        try {
            await fetch(formUrl, {
                method: 'POST',
                body: formDataToSubmit,
                mode: 'no-cors'
            });
            
            alert('Thank you for your message! I will get back to you soon.');
            setFormData({
                fullName: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ContactSection>
            <Container>
                <Row className='contact'>
                    {/* <Col xs={12}>
                        <h1 className="contact-title text-uppercase text-center">Contact</h1>
                    </Col> */}
                    <Col xs={12} md={5} className='contact-form-left'>
                        <h2 className='text-white contact-title__left text-uppercase'>
                            Have an Awesome Project Idea? Let&apos;s Discuss
                        </h2>
                        <p className='text-white'>
                            I&apos;m always excited to collaborate and exchange ideas! 
                            If you&apos;re passionate about design and eager to connect, 
                            feel free to reach out. Let&apos;s create, innovate, and inspire together!
                        </p>
                        <div className='d-flex flex-column'>
                            <span className='contact-info mb-4'>
                                <Call size={24} color="#7CA3EE"/> 
                                038 679 8487
                            </span> 
                            <span className='contact-info'>
                                <Sms size={24} color="#7CA3EE"/> 
                                thaotruongdesign@gmail.com
                            </span>
                        </div>
                    </Col>
                    <Col xs={12} md={7} className='contact-form-right'>
                        <Card className="contact-card bg-dark" bg="Dark" text="light">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4 form-group">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Enter your message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        className="submit-btn w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </ContactSection>
    );
}