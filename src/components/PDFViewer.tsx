"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface PDFViewerProps {
    cvType: 'normal' | 'ats';
    pageNumber: number;
    setPageNumber: (page: number) => void;
}

const ViewerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    
    .pdf-container {
        flex: 1;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow-y: auto;
        
        .react-pdf__Document {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .react-pdf__Page {
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            
            canvas {
                max-width: 100% !important;
                height: auto !important;
            }
        }
    }
    
    .pdf-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 16px;
        background: rgba(0, 0, 0, 0.5);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        
        button {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            
            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.2);
            }
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
        
        .page-info {
            color: white;
            font-size: 14px;
        }
        
        .download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            margin-left: 20px;
            
            &:hover {
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                transform: translateY(-1px);
            }
        }
    }
    
    .loading-container, .error-container {
        color: white;
        padding: 40px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
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
`;

export default function PDFViewer({ cvType, pageNumber, setPageNumber }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPdfError(null);
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('PDF Load Error:', error);
        setPdfError('Failed to load PDF. Please try again.');
    };

    const changePage = (offset: number) => {
        setPageNumber(pageNumber + offset);
    };

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    const downloadPDF = () => {
        const link = document.createElement('a');
        link.href = `/my-cv/cv-${cvType}.pdf`;
        link.download = `cv-${cvType}.pdf`;
        link.click();
    };

    // Construct the PDF URL
    const pdfUrl = `/my-cv/cv-${cvType}.pdf`;

    return (
        <ViewerContainer>
            <div className="pdf-container">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading PDF...</p>
                        </div>
                    }
                    error={
                        <div className="error-container">
                            <p>{pdfError || 'Failed to load PDF'}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    background: '#667eea',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Retry
                            </button>
                        </div>
                    }
                    options={{
                        cMapUrl: 'cmaps/',
                        cMapPacked: true,
                        standardFontDataUrl: 'standard_fonts/',
                    }}
                >
                    <Page 
                        pageNumber={pageNumber} 
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={typeof window !== 'undefined' ? (window.innerWidth > 768 ? 800 : window.innerWidth - 40) : 800}
                    />
                </Document>
            </div>
            
            {numPages && (
                <div className="pdf-controls">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        className="download-btn"
                        onClick={downloadPDF}
                    >
                        Download
                    </button>
                </div>
            )}
        </ViewerContainer>
    );
}