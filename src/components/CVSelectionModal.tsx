"use client";
import { Modal } from 'react-bootstrap';
import { DocumentText, Award, Eye, ArrowDown, Star1, ShieldTick, MagicStar, TickCircle } from 'iconsax-react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

interface CVSelectionModalProps {
    show: boolean;
    onHide: () => void;
    onSelect: (type: 'normal' | 'ats') => void;
}

const ModalWrapper = styled.div`
    .modal-dialog {
        max-width: 900px;
    }
    
    .modal-content {
        background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
    }
    
    .modal-header {
        border: none;
        padding: 32px 40px 0;
        background: transparent;
        
        .btn-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            opacity: 1;
            transition: all 0.3s;
            
            &:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
        }
    }
    
    .modal-body {
        padding: 20px 40px 40px;
    }
    
    .header {
        text-align: center;
        margin-bottom: 40px;
        
        h2 {
            font-size: 32px;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #fff 0%, #ccc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        p {
            color: rgba(255, 255, 255, 0.5);
            font-size: 16px;
        }
    }
    
    .cv-container {
        display: flex;
        gap: 24px;
        
        .cv-group {
            flex: 1;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 24px;
            position: relative;
            transition: all 0.3s;
            
            &:hover {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.15);
                transform: translateY(-4px);
                
                .group-glow {
                    opacity: 1;
                }
            }
            
            &.creative {
                .group-header {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
                    border-color: rgba(102, 126, 234, 0.3);
                }
                
                .group-icon {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                
                .feature-tag {
                    background: rgba(102, 126, 234, 0.1);
                    color: #8b9dff;
                }
                
                .view-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    
                    &:hover {
                        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                    }
                }
                
                .group-glow {
                    background: radial-gradient(circle at center, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
                }
            }
            
            &.ats {
                .group-header {
                    background: linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(56, 178, 172, 0.2) 100%);
                    border-color: rgba(72, 187, 120, 0.3);
                }
                
                .group-icon {
                    background: linear-gradient(135deg, #48bb78 0%, #38b2ac 100%);
                }
                
                .feature-tag {
                    background: rgba(72, 187, 120, 0.1);
                    color: #6ee7b7;
                }
                
                .view-btn {
                    background: linear-gradient(135deg, #48bb78 0%, #38b2ac 100%);
                    
                    &:hover {
                        box-shadow: 0 8px 24px rgba(72, 187, 120, 0.4);
                    }
                }
                
                .group-glow {
                    background: radial-gradient(circle at center, rgba(72, 187, 120, 0.4) 0%, transparent 70%);
                }
            }
            
            .group-glow {
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
            }
            
            .group-header {
                padding: 20px;
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                gap: 16px;
                
                .group-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                
                .group-info {
                    flex: 1;
                    
                    h3 {
                        font-size: 20px;
                        font-weight: 600;
                        color: white;
                        margin-bottom: 4px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .badge {
                        padding: 3px 8px;
                        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                        border-radius: 6px;
                        font-size: 10px;
                        font-weight: 700;
                        color: #000;
                        text-transform: uppercase;
                    }
                    
                    p {
                        margin: 0;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.5);
                    }
                }
            }
            
            .group-features {
                margin-bottom: 24px;
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                    
                    svg {
                        flex-shrink: 0;
                    }
                    
                    span {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 14px;
                    }
                }
                
                .feature-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 16px;
                    
                    .feature-tag {
                        padding: 4px 10px;
                        border-radius: 6px;
                        font-size: 12px;
                        font-weight: 500;
                    }
                }
            }
            
            .group-preview {
                height: 200px;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                
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
                }
                
                .preview-content {
                    text-align: center;
                    z-index: 1;
                    
                    svg {
                        opacity: 0.3;
                        margin-bottom: 12px;
                    }
                    
                    p {
                        color: rgba(255, 255, 255, 0.3);
                        font-size: 13px;
                        margin: 0;
                    }
                }
            }
            
            .group-action {
                display: flex;
                gap: 12px;
                
                .view-btn {
                    flex: 1;
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-weight: 600;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    
                    &:hover {
                        transform: translateY(-2px);
                    }
                }
                
                .download-btn {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    
                    &:hover {
                        background: rgba(255, 255, 255, 0.1);
                        transform: translateY(-2px);
                    }
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        .modal-dialog {
            margin: 20px;
            max-width: calc(100% - 40px);
        }
        
        .cv-container {
            flex-direction: column;
        }
        
        .header h2 {
            font-size: 24px;
        }
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
    
    const handleDownload = (type: 'normal' | 'ats') => {
        const link = document.createElement('a');
        link.href = `/my-cv/cv-${type}.pdf`;
        link.download = `cv-${type}.pdf`;
        link.click();
    };
    
    return (
        <ModalWrapper>
            <Modal 
                show={show} 
                onHide={onHide}
                centered
                className="cv-modal"
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <div className="header">
                        <h2>Choose Your CV Format</h2>
                        <p>Select the perfect format for your needs</p>
                    </div>
                    
                    <div className="cv-container">
                        {/* Creative CV */}
                        <div 
                            className="cv-group creative"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.1s'
                            }}
                        >
                            <div className="group-glow" />
                            
                            <div className="group-header">
                                <div className="group-icon">
                                    <MagicStar size="24" color="#fff" variant="Bold"/>
                                </div>
                                <div className="group-info">
                                    <h3>
                                        Creative CV
                                        <span className="badge">Popular</span>
                                    </h3>
                                    <p>Stand out with stunning design</p>
                                </div>
                            </div>
                            
                            <div className="group-preview">
                                <div className="preview-content">
                                    <DocumentText size="48" color="#fff" variant="Bulk"/>
                                    <p>Preview available after selection</p>
                                </div>
                            </div>
                            
                            <div className="group-features">
                                <div className="feature-item">
                                    <TickCircle size="20" color="#667eea" variant="Bold"/>
                                    <span>Modern & eye-catching design</span>
                                </div>
                                <div className="feature-item">
                                    <TickCircle size="20" color="#667eea" variant="Bold"/>
                                    <span>Perfect for creative industries</span>
                                </div>
                                <div className="feature-item">
                                    <TickCircle size="20" color="#667eea" variant="Bold"/>
                                    <span>Showcases personality & style</span>
                                </div>
                                <div className="feature-tags">
                                    <span className="feature-tag">Visual Impact</span>
                                    <span className="feature-tag">Portfolio Ready</span>
                                    <span className="feature-tag">2 Pages</span>
                                </div>
                            </div>
                            
                            <div className="group-action">
                                <button 
                                    className="view-btn"
                                    onClick={() => onSelect('normal')}
                                >
                                    <Eye size="20" color="#fff" variant="Bold"/>
                                    View This CV
                                </button>
                                <button 
                                    className="download-btn"
                                    onClick={() => handleDownload('normal')}
                                    title="Quick Download"
                                >
                                    <ArrowDown size="20" color="#fff"/>
                                </button>
                            </div>
                        </div>
                        
                        {/* ATS CV */}
                        <div 
                            className="cv-group ats"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.2s'
                            }}
                        >
                            <div className="group-glow" />
                            
                            <div className="group-header">
                                <div className="group-icon">
                                    <ShieldTick size="24" color="#fff" variant="Bold"/>
                                </div>
                                <div className="group-info">
                                    <h3>ATS-Friendly CV</h3>
                                    <p>Optimized for tracking systems</p>
                                </div>
                            </div>
                            
                            <div className="group-preview">
                                <div className="preview-content">
                                    <Award size="48" color="#fff" variant="Bulk"/>
                                    <p>Preview available after selection</p>
                                </div>
                            </div>
                            
                            <div className="group-features">
                                <div className="feature-item">
                                    <TickCircle size="20" color="#48bb78" variant="Bold"/>
                                    <span>ATS-compliant formatting</span>
                                </div>
                                <div className="feature-item">
                                    <TickCircle size="20" color="#48bb78" variant="Bold"/>
                                    <span>Keyword optimized structure</span>
                                </div>
                                <div className="feature-item">
                                    <TickCircle size="20" color="#48bb78" variant="Bold"/>
                                    <span>Clean & professional layout</span>
                                </div>
                                <div className="feature-tags">
                                    <span className="feature-tag">ATS Ready</span>
                                    <span className="feature-tag">Clean Format</span>
                                    <span className="feature-tag">2 Pages</span>
                                </div>
                            </div>
                            
                            <div className="group-action">
                                <button 
                                    className="view-btn"
                                    onClick={() => onSelect('ats')}
                                >
                                    <Eye size="20" color="#fff" variant="Bold"/>
                                    View This CV
                                </button>
                                <button 
                                    className="download-btn"
                                    onClick={() => handleDownload('ats')}
                                    title="Quick Download"
                                >
                                    <ArrowDown size="20" color="#fff"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </ModalWrapper>
    );
}