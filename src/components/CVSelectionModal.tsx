"use client";
import { Modal, Button, Badge, Card, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DocumentText, Award, Eye, MagicStar, ShieldTick, TickCircle } from 'iconsax-react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SVGIcon from './SVGIcon';

interface CVSelectionModalProps {
    show: boolean;
    onHide: () => void;
    onSelect: (type: 'thaotruong' | 'ats') => void;
}

const StyledModal = styled(Modal)`
    .modal-dialog {
        max-width: 900px;
    }

    .modal-content {
        background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1.5rem;
        overflow: hidden;
        box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
    }

    .modal-header {
        padding: 2rem 2.5rem 0;
        background: transparent;
    }

    .btn-close {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        opacity: 1;
        transition: all 0.3s;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e");

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
    }

    h2, h3, h4 {
        color: white;
    }

    .text-muted {
        color: rgba(255, 255, 255, 0.5) !important;
    }

    .text-light {
        color: rgba(255, 255, 255, 0.7) !important;
    }

    @media (max-width: 768px) {
        .modal-dialog {
            margin: 1.25rem;
            max-width: calc(100% - 2.5rem);
        }
        
        .modal-header {
            padding: 1.5rem 1.5rem 0;
        }
        
        h2 {
            font-size: 1.5rem;
        }
    }
`;

const TextGradient = styled.h2`
    background: linear-gradient(135deg, #fff 0%, #ccc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const CVCard = styled(Card)<{ variant: 'creative' | 'ats', $isVisible: boolean }>`
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: ${props => props.$isVisible ? 1 : 0};
    transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
    animation: ${props => props.$isVisible ? 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'};
    animation-delay: ${props => props.variant === 'creative' ? '0.1s' : '0.2s'};

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.15);
        transform: translateY(-4px);

        &::before {
            opacity: 1;
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        filter: blur(80px);
        z-index: 0;
        background: ${props => props.variant === 'creative' 
            ? 'radial-gradient(circle at center, rgba(102, 126, 234, 0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(72, 187, 120, 0.4) 0%, transparent 70%)'
        };
    }

    .card-body {
        position: relative;
        z-index: 1;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        margin-bottom: 1rem;
    }
`;

const CardHeader = styled.div<{ variant: 'creative' | 'ats' }>`
    position: relative;
    z-index: 1;
    background: ${props => props.variant === 'creative'
        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
        : 'linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(56, 178, 172, 0.2) 100%)'
    };
    border: 1px solid ${props => props.variant === 'creative'
        ? 'rgba(102, 126, 234, 0.3)'
        : 'rgba(72, 187, 120, 0.3)'
    };
`;

const IconWrapper = styled.div<{ variant: 'creative' | 'ats' }>`
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: ${props => props.variant === 'creative'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)'
    };
`;

const PreviewBox = styled.div`
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.02) 10px,
            rgba(255, 255, 255, 0.02) 20px
        );
        pointer-events: none;
    }
`;

const FeatureTag = styled(Badge)<{ variant: 'creative' | 'ats' }>`
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.625rem;
    background: ${props => props.variant === 'creative'
        ? 'rgba(102, 126, 234, 0.1) !important'
        : 'rgba(72, 187, 120, 0.1) !important'
    };
    color: ${props => props.variant === 'creative'
        ? '#8b9dff !important'
        : '#6ee7b7 !important'
    };
    border: 1px solid ${props => props.variant === 'creative'
        ? 'rgba(102, 126, 234, 0.2)'
        : 'rgba(72, 187, 120, 0.2)'
    };
`;

const BadgePopular = styled(Badge)`
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%) !important;
    color: #000 !important;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
`;

const ViewButton = styled(Button)<{ variant: 'creative' | 'ats' }>`
    background: ${props => props.variant === 'creative'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)'
    };
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.875rem;
    transition: all 0.3s;

    &:hover {
        background: ${props => props.variant === 'creative'
            ? 'linear-gradient(135deg, #5a6fd6 0%, #6a428e 100%)'
            : 'linear-gradient(135deg, #3ea968 0%, #2f9e99 100%)'
        };
        transform: translateY(-2px);
        box-shadow: ${props => props.variant === 'creative'
            ? '0 8px 24px rgba(102, 126, 234, 0.4)'
            : '0 8px 24px rgba(72, 187, 120, 0.4)'
        };
        color: white;
    }
`;

const DownloadButton = styled(Button)`
    width: 3rem;
    height: 3rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.2);
    }
`;

export default function CVSelectionModal({ show, onHide, onSelect }: CVSelectionModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        if (show) {
            setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false);
        }
    }, [show]);
    
    const handleDownload = (type: 'thaotruong' | 'ats') => {
        const link = document.createElement('a');
        link.href = `/my-cv/cv-${type}.pdf`;
        link.download = `cv-${type}.pdf`;
        link.click();
    };
    
    return (
        <StyledModal 
            show={show} 
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Container fluid className="text-center w-100">
                    <Modal.Title className="w-100">
                        <TextGradient className="fw-bold mb-2">Choose Your CV Format</TextGradient>
                        <p className="text-muted fs-6 fw-normal">Select the perfect format for your needs</p>
                    </Modal.Title>
                </Container>
            </Modal.Header>
            
            <Modal.Body className="p-4">
                <Row className="g-4">
                    {/* Creative CV */}
                    <Col lg={6}>
                        <CVCard variant="creative" $isVisible={isVisible} className="h-100">
                            <Card.Body className="p-4">
                                <CardHeader variant="creative" className="mb-4 p-3 rounded-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <IconWrapper variant="creative">
                                            <MagicStar size="24" color="#fff" variant="Bold"/>
                                        </IconWrapper>
                                        <div className="flex-grow-1">
                                            <h4 className="mb-1 d-flex align-items-center gap-2">
                                                Creative CV
                                                <BadgePopular>Popular</BadgePopular>
                                            </h4>
                                            <p className="text-muted mb-0 small">Stand out with stunning design</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <PreviewBox className="mb-4 rounded-3 p-5 text-center">
                                    <DocumentText size="48" color="#667eea" variant="Bulk" className="mb-3 opacity-50"/>
                                    <p className="text-muted small mb-0">Preview available after selection</p>
                                </PreviewBox>
                                
                                <div className="features mb-4">
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#667eea" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">Modern & eye-catching design</span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#667eea" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">Perfect for creative industries</span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#667eea" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">Showcases personality & style</span>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-2 mt-3">
                                        <FeatureTag variant="creative">Visual Impact</FeatureTag>
                                        <FeatureTag variant="creative">Portfolio Ready</FeatureTag>
                                        <FeatureTag variant="creative">2 Pages</FeatureTag>
                                    </div>
                                </div>
                                
                                <div className="d-flex gap-2">
                                    <ViewButton 
                                        variant="creative"
                                        className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => onSelect('thaotruong')}
                                    >
                                        <Eye size="20" color="#fff" variant="Bold"/>
                                        View This CV
                                    </ViewButton>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-download-creative">
                                                Quick Download
                                            </Tooltip>
                                        }
                                    >
                                        <DownloadButton 
                                            variant="outline-light"
                                            onClick={() => handleDownload('thaotruong')}
                                        >
                                            <SVGIcon name="download-cv" size={20} color="white"/>
                                        </DownloadButton>
                                    </OverlayTrigger>
                                </div>
                            </Card.Body>
                        </CVCard>
                    </Col>
                    
                    {/* ATS CV */}
                    <Col lg={6}>
                        <CVCard variant="ats" $isVisible={isVisible} className="h-100">
                            <Card.Body className="p-4">
                                <CardHeader variant="ats" className="mb-4 p-3 rounded-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <IconWrapper variant="ats">
                                            <ShieldTick size="24" color="#fff" variant="Bold"/>
                                        </IconWrapper>
                                        <div className="flex-grow-1">
                                            <h4 className="mb-1">ATS-Friendly CV</h4>
                                            <p className="text-muted mb-0 small">Optimized for tracking systems</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <PreviewBox className="mb-4 rounded-3 p-5 text-center">
                                    <Award size="48" color="#48bb78" variant="Bulk" className="mb-3 opacity-50"/>
                                    <p className="text-muted small mb-0">Preview available after selection</p>
                                </PreviewBox>
                                
                                <div className="features mb-4">
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#48bb78" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">ATS-compliant formatting</span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#48bb78" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">Keyword optimized structure</span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        <TickCircle size="20" color="#48bb78" variant="Bold" className="flex-shrink-0 mt-1"/>
                                        <span className="text-light small">Clean & professional layout</span>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-2 mt-3">
                                        <FeatureTag variant="ats">ATS Ready</FeatureTag>
                                        <FeatureTag variant="ats">Clean Format</FeatureTag>
                                        <FeatureTag variant="ats">2 Pages</FeatureTag>
                                    </div>
                                </div>
                                
                                <div className="d-flex gap-2">
                                    <ViewButton 
                                        variant="ats"
                                        className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => onSelect('ats')}
                                    >
                                        <Eye size="20" color="#fff" variant="Bold"/>
                                        View This CV
                                    </ViewButton>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-download-ats">
                                                Quick Download
                                            </Tooltip>
                                        }
                                    >
                                        <DownloadButton 
                                            variant="outline-light"
                                            onClick={() => handleDownload('ats')}
                                        >
                                            <SVGIcon name="download-cv" size={20} color="white"/>
                                        </DownloadButton>
                                    </OverlayTrigger>
                                </div>
                            </Card.Body>
                        </CVCard>
                    </Col>
                </Row>
            </Modal.Body>
        </StyledModal>
    );
}