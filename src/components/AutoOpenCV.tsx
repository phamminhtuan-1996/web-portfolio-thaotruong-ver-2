"use client";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import PDFViewerModal
const PDFViewerModal = dynamic(() => import('./PDFViewerModal'), { ssr: false });

export default function AutoOpenCV() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [cvType, setCvType] = useState<'normal' | 'ats'>('normal');

    useEffect(() => {
        // Check if URL has cv query parameter
        const cvParam = searchParams.get('cv');
        
        if (cvParam) {
            // Determine CV type based on parameter value
            if (cvParam === 'normal-cv' || cvParam === 'creative-cv') {
                setCvType('normal');
                setShowPDFModal(true);
            } else if (cvParam === 'ats-cv') {
                setCvType('ats');
                setShowPDFModal(true);
            }
            
            // Remove the query parameter from URL without refreshing page
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('cv');
            const newUrl = newSearchParams.toString() 
                ? `${pathname}?${newSearchParams.toString()}`
                : pathname;
            
            // Replace URL to remove cv parameter
            router.replace(newUrl, { scroll: false });
        }
    }, [searchParams, router, pathname]);

    const handleClosePDF = () => {
        setShowPDFModal(false);
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