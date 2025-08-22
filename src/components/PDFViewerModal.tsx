"use client";
import { Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

// Dynamic import for react-pdf to avoid SSR issues
const PDFViewer = dynamic(
    () => import('./PDFViewer'),
    { 
        ssr: false,
        loading: () => (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading PDF viewer...</p>
            </div>
        )
    }
);

interface PDFViewerModalProps {
    show: boolean;
    onHide: () => void;
    cvType: 'normal' | 'ats' | null;
}

const ModalWrapper = styled.div`
    .modal-dialog {
        max-width: 900px;
        margin: 30px auto;
    }
    .modal-content {
        background: #1E1D24;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: 90vh;
    }
    .modal-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 24px;
    }
    .modal-title {
        color: white;
        font-size: 20px;
        font-weight: 600;
    }
    .modal-body {
        padding: 0;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        background: #0a0a0a;
        height: calc(90vh - 60px);
    }
    
    .loading-container {
        color: white;
        padding: 40px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    }

    @media (max-width: 990px) {
        .modal-dialog {
            margin: 0;
            max-width: 100%;
            .modal-content {
                height: 100vh;
                border-radius: 0;
            }
            .modal-body {
                height: calc(100vh - 60px);
            }
        }
    }
`;

export default function PDFViewerModal({ show, onHide, cvType }: PDFViewerModalProps) {

    return (
        <ModalWrapper>
            <Modal 
                show={show} 
                onHide={onHide}
                size="lg"
                className="pdf-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cvType === 'normal' ? 'Creative CV' : 'ATS-Friendly CV'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cvType && (
                        <PDFViewer 
                            cvType={cvType}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </ModalWrapper>
    );
}