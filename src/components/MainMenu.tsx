"use client";
import styled from 'styled-components';
import Link from "next/link";
import { Shop, Magicpen, Profile, Sms, DocumentDownload } from 'iconsax-react';

const DivParent = styled.div`
.main-menu {
    bottom: 62px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1E1D24;
    border-radius: 12px;
    width: 400px;
}
.btn-download-cv {
    border-radius: 16px;
}
`

export default function MainMenu() {
    return (
        <DivParent>
            <nav className="main-menu d-flex justify-content-between p-4 fixed-bottom">
                <Link href="/" className="btn">
                    <Shop size="32" color="#d9e3f0"/>
                </Link>
                <Link href="/portfolio" className="btn">
                    <Magicpen size="32" color="#d9e3f0"/>
                </Link>
                <Link href="/about" className="btn">
                    <Profile size="32" color="#d9e3f0"/>
                </Link>
                <Link href="/about" className="btn">
                    <Sms size="32" color="#d9e3f0"/>
                </Link>
                <Link href="/" className="btn btn-download-cv p-2 border">
                    <DocumentDownload size="32" color="#d9e3f0"/> <span className="text-white">My CV</span>
                </Link>
            </nav>
        </DivParent>
    );
}