"use client";
import {useState, useEffect} from 'react';
import { usePathname } from "next/navigation";
import styled from 'styled-components';
import Link from "next/link";
import Image from "next/image";
import { ImportCurve } from 'iconsax-react';
import CVSelectionModal from './CVSelectionModal';
import PDFViewerModal from './PDFViewerModal';

const DivParent = styled.div`
.main-menu {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    
    /* Liquid glass effect */
    background: rgba(26, 26, 26, 0.4);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    
    /* Multiple layered shadows for depth */
    box-shadow: 
        /* Outer glow */
        0 0 40px rgba(255, 255, 255, 0.05),
        /* Main shadow */
        0 8px 32px rgba(0, 0, 0, 0.3),
        /* Inner light from top */
        inset 0 2px 3px rgba(255, 255, 255, 0.2),
        /* Inner shadow from bottom */
        inset 0 -2px 3px rgba(0, 0, 0, 0.2),
        /* Subtle inner glow */
        inset 0 0 20px rgba(255, 255, 255, 0.05);
    
    /* Glass border effect */
    border: 1px solid rgba(255, 255, 255, 0.18);
    
    /* Pseudo glass refraction */
    overflow: hidden;
    
    border-radius: 1000px;
    width: 610px;
    height: 84px;
    justify-content: space-around;
    padding: 0 10px 0 21px;
    
    /* Smooth transitions */
    transition: all 0.3s ease;
    
    /* Add subtle animation on hover */
    &:hover {
        background: rgba(26, 26, 26, 0.5);
        box-shadow: 
            0 0 50px rgba(255, 255, 255, 0.08),
            0 10px 40px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.25),
            inset 0 -2px 4px rgba(0, 0, 0, 0.25),
            inset 0 0 25px rgba(255, 255, 255, 0.08);
    }
    
    /* Glass shine effect */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
        );
        transition: left 0.5s ease;
    }
    
    &:hover::before {
        left: 100%;
    }
}
.btn {
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d9e3f0;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
}
.btn-download-cv {
    width: 116px;
    height: 52px;
    border-radius: 36px;
    display: flex;
    align-items: center;
    border: 1px solid #FFFFFF59!important;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #141212;
    font-size: 16px;
    &:hover {
        background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    }
}
.btn:hover {
    background-color: #373737;
}
.btn.active {
    border: none;
    color: #416EC2;
}

@media (max-width: 990px) {
    .main-menu {
        width: 100%;
        bottom: 0;
        border-radius: 0;
    }
}
`

export default function MainMenu() {
    const pathname = usePathname();
    const [isActive, setActive] = useState('');
    const [showCVModal, setShowCVModal] = useState(false);
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [selectedCV, setSelectedCV] = useState<'normal' | 'ats' | null>(null);

    const getActive = (value: string) => {
        return isActive.search(value) > -1 ? "active" : '';
    }

    useEffect(() => {
        const url = pathname === "/" ? "home" : pathname.replace('/', '');
        setActive(url);
    }, [pathname])
    
    useEffect(() => {
        const url = window.location.pathname === "/" ? "home" : window.location.pathname.replace('/', '');
        setActive(url);
    }, [])

    const handleCVClick = () => {
        // Add query parameter to URL to trigger CV popup
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('cv', 'normal-cv');
        window.history.pushState({}, '', currentUrl.toString());
        
        // Trigger a popstate event to notify AutoOpenCV component
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    const handleCVSelection = (type: 'normal' | 'ats') => {
        setSelectedCV(type);
        setShowCVModal(false);
        setShowPDFModal(true);
    }

    const handleClosePDF = () => {
        setShowPDFModal(false);
        setSelectedCV(null);
    }

    return (
        <DivParent>
            <nav className="main-menu d-flex align-items-center fixed-bottom">
                <Link href="/" onClick={() => { setActive('home'); }}>
                    <Image src="/img/logo.svg" alt="Logo" width={24} height={24} />
                </Link>
                <Link href="/" className={`btn  ${getActive('home')}`} onClick={() => { setActive('home'); }}>
                    Home
                </Link>
                <Link href="/portfolio" className={`btn  ${getActive('portfolio')}`} onClick={() => { setActive('portfolio'); }}>
                    Portfolio
                </Link>
                <Link href="/about" className={`btn  ${getActive('about')}`} onClick={() => { setActive('about'); }}>
                    About
                </Link>
                <Link href="/contact" className={`btn  ${getActive('contact')}`} onClick={() => { setActive('contact'); }}>
                    Contact
                </Link>
                <div className="btn btn-download-cv p-2 border" onClick={handleCVClick}>
                    <ImportCurve size="24" color="#141212" className="me-2" /> 
                    <span>My CV</span>
                </div>
            </nav>
            {/* CV Selection Modal */}
            <CVSelectionModal
                show={showCVModal}
                onHide={() => setShowCVModal(false)}
                onSelect={handleCVSelection}
            />

            {/* PDF Viewer Modal */}
            <PDFViewerModal
                show={showPDFModal}
                onHide={handleClosePDF}
                cvType={selectedCV}
            />
        </DivParent>
    );
}