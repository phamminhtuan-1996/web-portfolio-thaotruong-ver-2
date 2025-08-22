"use client";
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import PDFViewerModal
const PDFViewerModal = dynamic(() => import('./PDFViewerModal'), { ssr: false });

export default function AutoOpenCV() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [cvType, setCvType] = useState<'normal' | 'ats'>('normal');

    useEffect(() => {
        const checkAndOpenCV = () => {
            // Check if URL has cv query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const cvParam = urlParams.get('cv');
            
            if (cvParam) {
                // Determine CV type based on parameter value
                if (cvParam === 'normal-cv' || cvParam === 'creative-cv') {
                    setCvType('normal');
                    setShowPDFModal(true);
                } else if (cvParam === 'ats-cv') {
                    setCvType('ats');
                    setShowPDFModal(true);
                }
                
                // Keep the query parameter in URL for sharing
                // Don't remove it
            }
        };

        // Check on mount and when searchParams change
        checkAndOpenCV();

        // Listen for popstate events (when URL changes programmatically)
        window.addEventListener('popstate', checkAndOpenCV);
        
        return () => {
            window.removeEventListener('popstate', checkAndOpenCV);
        };
    }, [searchParams, pathname]);

    const handleClosePDF = () => {
        setShowPDFModal(false);
        // Keep the cv parameter in URL even after closing
    };

    if (!showPDFModal) return null;

    return (
        <PDFViewerModal
            show={showPDFModal}
            onHide={handleClosePDF}
            cvType={cvType}
        />
    );
}