"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';
import { SearchZoomIn, SearchZoomOut, Maximize, ArrowLeft2, ArrowRight2, DocumentDownload } from 'iconsax-react';
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
        overflow: auto;
        background: #0a0a0a;
        position: relative;
        
        .pdf-scroll-wrapper {
            display: inline-block;
            min-width: 100%;
            text-align: center;
        }
        
        .react-pdf__Document {
            display: inline-block;
        }
        
        .react-pdf__Page {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            background: white;
            margin: 0 auto;
            
            canvas {
                display: block !important;
            }
        }
    }
    
    .pdf-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        padding: 16px;
        background: rgba(0, 0, 0, 0.8);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        flex-wrap: wrap;
        
        .control-group {
            display: flex;
            align-items: center;
            gap: 10px;
            
            &.separator {
                padding: 0 10px;
                border-left: 1px solid rgba(255, 255, 255, 0.2);
                border-right: 1px solid rgba(255, 255, 255, 0.2);
            }
        }
        
        button {
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            
            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-1px);
            }
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            &.icon-btn {
                padding: 8px;
                width: 36px;
                height: 36px;
                justify-content: center;
            }
        }
        
        .page-info {
            color: white;
            font-size: 14px;
            padding: 0 10px;
            white-space: nowrap;
        }
        
        .zoom-info {
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            padding: 4px 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            min-width: 60px;
            text-align: center;
        }
        
        .download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            
            &:hover {
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
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
    
    @media (max-width: 768px) {
        .pdf-controls {
            gap: 8px;
            padding: 12px;
            
            .control-group {
                gap: 6px;
                
                &.separator {
                    padding: 0 6px;
                }
            }
            
            button {
                padding: 6px 10px;
                font-size: 13px;
                
                &.icon-btn {
                    width: 32px;
                    height: 32px;
                }
            }
            
            .page-info, .zoom-info {
                font-size: 12px;
            }
        }
    }
`;

export default function PDFViewer({ cvType, pageNumber, setPageNumber }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);
    const [scale, setScale] = useState(1.0);

    // Zoom levels
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 3.0;
    const SCALE_STEP = 0.25;
    
    // Preset zoom levels
    const ZOOM_LEVELS = [
        { value: 0.5, label: '50%' },
        { value: 0.75, label: '75%' },
        { value: 1.0, label: '100%' },
        { value: 1.25, label: '125%' },
        { value: 1.5, label: '150%' },
        { value: 2.0, label: '200%' },
        { value: 2.5, label: '250%' },
        { value: 3.0, label: '300%' }
    ];

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

    // Zoom functions
    const zoomIn = () => {
        setScale(prevScale => {
            const newScale = Math.min(prevScale + SCALE_STEP, MAX_SCALE);
            // Maintain scroll position ratio when zooming
            maintainScrollPosition(prevScale, newScale);
            return newScale;
        });
    };

    const zoomOut = () => {
        setScale(prevScale => {
            const newScale = Math.max(prevScale - SCALE_STEP, MIN_SCALE);
            // Maintain scroll position ratio when zooming
            maintainScrollPosition(prevScale, newScale);
            return newScale;
        });
    };

    const resetZoom = () => {
        maintainScrollPosition(scale, 1.0);
        setScale(1.0);
    };
    
    const fitToWidth = () => {
        if (typeof window !== 'undefined') {
            const container = document.querySelector('.pdf-container');
            if (container) {
                const containerWidth = container.clientWidth - 40; // Subtract padding
                const baseWidth = 800;
                const newScale = containerWidth / baseWidth;
                setScale(Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE));
            }
        }
    };

    // Maintain scroll position when zooming
    const maintainScrollPosition = (oldScale: number, newScale: number) => {
        const container = document.querySelector('.pdf-container');
        if (container) {
            const scrollRatioX = container.scrollLeft / container.scrollWidth;
            const scrollRatioY = container.scrollTop / container.scrollHeight;
            
            setTimeout(() => {
                container.scrollLeft = container.scrollWidth * scrollRatioX;
                container.scrollTop = container.scrollHeight * scrollRatioY;
            }, 0);
        }
    };

    // Calculate page width - always use base width, scale is applied via CSS transform
    const getPageWidth = () => {
        if (typeof window === 'undefined') return 800;
        return window.innerWidth > 768 ? 800 : window.innerWidth - 40;
    };

    // Construct the PDF URL
    const pdfUrl = `/my-cv/cv-${cvType}.pdf`;

    return (
        <ViewerContainer>
            <div className="pdf-container">
                <div className="pdf-scroll-wrapper" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
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
                            width={getPageWidth()}
                        />
                    </Document>
                </div>
            </div>
            
            {numPages && (
                <div className="pdf-controls">
                    {/* Navigation Controls */}
                    <div className="control-group">
                        <button
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                            className="icon-btn"
                            title="Previous Page"
                        >
                            <ArrowLeft2 size="18" />
                        </button>
                        <span className="page-info">
                            Page {pageNumber} of {numPages}
                        </span>
                        <button
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                            className="icon-btn"
                            title="Next Page"
                        >
                            <ArrowRight2 size="18" />
                        </button>
                    </div>
                    
                    {/* Zoom Controls */}
                    <div className="control-group separator">
                        <button
                            type="button"
                            onClick={zoomOut}
                            disabled={scale <= MIN_SCALE}
                            className="icon-btn"
                            title="Zoom Out"
                        >
                            <SearchZoomOut size="18" />
                        </button>
                        <span className="zoom-info">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            type="button"
                            onClick={zoomIn}
                            disabled={scale >= MAX_SCALE}
                            className="icon-btn"
                            title="Zoom In"
                        >
                            <SearchZoomIn size="18" />
                        </button>
                        <button
                            type="button"
                            onClick={resetZoom}
                            className="icon-btn"
                            title="Reset Zoom (100%)"
                        >
                            <Maximize size="18" />
                        </button>
                        <button
                            type="button"
                            onClick={fitToWidth}
                            className="icon-btn"
                            title="Fit to Width"
                            style={{ marginLeft: '4px' }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>FIT</span>
                        </button>
                    </div>
                    
                    {/* Download Button */}
                    <button
                        type="button"
                        className="download-btn"
                        onClick={downloadPDF}
                    >
                        <DocumentDownload size="18" />
                        Download
                    </button>
                </div>
            )}
        </ViewerContainer>
    );
}