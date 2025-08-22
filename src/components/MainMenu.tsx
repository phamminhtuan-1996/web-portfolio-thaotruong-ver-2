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
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1E1D24;
    border-radius: 16px;
    width: 610px;
    height: 84px;
    justify-content: space-around;
    padding: 0 21px;
    border: 1px solid #FFFFFF1F;
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
    border-radius: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #FFFFFF59!important;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    
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
                <Link href="/about#message" className={`btn  ${getActive('contact')}`} onClick={() => { setActive('contact'); }}>
                    Contact
                </Link>
                <div className="btn btn-download-cv p-2 border" onClick={handleCVClick}>
                    <ImportCurve size="24" color="#d9e3f0" className="me-2" /> 
                    <span className="text-white">My CV</span>
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