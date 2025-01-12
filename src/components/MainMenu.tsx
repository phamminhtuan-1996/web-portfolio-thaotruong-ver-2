"use client";
import {useState, useEffect} from 'react';
import {linkCv} from '@/utils/constants';
import { usePathname } from "next/navigation";
import styled from 'styled-components';
import Link from "next/link";
import { Shop, Magicpen, Profile, Sms, ImportCurve } from 'iconsax-react';
const DivParent = styled.div`
.main-menu {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1E1D24;
    border-radius: 12px;
    width: 382px;
    height: 84px;
    justify-content: space-around;
    padding: 0 21px;
}
.btn {
    width: 40px;
    height: 40px;
    padding: 0px!important;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-download-cv {
    width: 116px;
    height: 52px;
    border-radius: 16px;
    display: flex;
    align-items: center;
}
.btn:hover {
    background-color: #373737;
}
.btn.active {
    background-color: #8E8E8E;
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

    return (
        <DivParent>
            <nav className="main-menu d-flex align-items-center fixed-bottom">
                <Link href="/" className={`btn  ${getActive('home')}`} onClick={() => { setActive('home'); }}>
                    <Shop size="24" color="#d9e3f0"/>
                </Link>
                <Link href="/portfolio" className={`btn  ${getActive('portfolio')}`} onClick={() => { setActive('portfolio'); }}>
                    <Magicpen size="24" color="#d9e3f0"/>
                </Link>
                <Link href="/about" className={`btn  ${getActive('about')}`} onClick={() => { setActive('about'); }}>
                    <Profile size="24" color="#d9e3f0"/>
                </Link>
                <Link href="/about#message" className={`btn  ${getActive('contact')}`} onClick={() => { setActive('contact'); }}>
                    <Sms size="24" color="#d9e3f0"/>
                </Link>
                <Link href={linkCv} className="btn btn-download-cv p-2 border" target="_blank">
                    <ImportCurve size="24" color="#d9e3f0" className="me-2" /> <span className="text-white">My CV</span>
                </Link>
            </nav>
        </DivParent>
    );
}