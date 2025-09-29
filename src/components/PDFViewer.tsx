"use client";
import { useState } from 'react';
import styled from 'styled-components';

interface PDFViewerProps {
    cvType: 'thaotruong' | 'ats';
}

const ViewerContainer = styled.div`
    width: 100%;
    height: calc(100vh - (16px * 2));
    background: #0a0a0a;
    position: relative;
    
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: white;
    }
    
    .pdf-error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #ef4444;
        font-size: 1.1rem;
        text-align: center;
        padding: 40px;
    }
`;


const PDFViewer: React.FC<PDFViewerProps> = ({ cvType }) => {
    const [pdfError, setPdfError] = useState<string | null>(null);

    // Construct the PDF URL with parameters to hide sidebar
    // navpanes=0: hides navigation panes (sidebar)
    // toolbar=0: hides toolbar
    // scrollbar=1: shows scrollbar
    const pdfUrl = `/my-cv/cv-${cvType}.pdf#navpanes=0`;

    return (
        <ViewerContainer>
            {pdfError ? (
                <div className="pdf-error">
                    {pdfError}
                </div>
            ) : (
                <iframe
                    src={pdfUrl}
                    title={`CV ${cvType}`}
                    onError={() => setPdfError('Failed to load PDF. Please try again.')}
                />
            )}
        </ViewerContainer>
    );
};

export default PDFViewer;