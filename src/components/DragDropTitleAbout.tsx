"use client";
import {useEffect, useState} from 'react';
import styled from "styled-components";
import { isMobileOrSmallScreen } from '../utils/helper';
const DivParent = styled.div`
    width: 138px;
    height: 114px;
    border: 1px solid white;
    padding: 21px 15px;
    .shashape-child {
        width: 16px;
        height: 16px;
    }
    .shashape-child:nth-child(1) {
        top: -10%;
        left: -5%;
    }
    .shashape-child:nth-child(2) {
        top: -10%;
        right: -5%;
    }
    .shashape-child:nth-child(3) {
        bottom: -10%;
        left: -5%;
    }
    .shashape-child:nth-child(4) {
        bottom: -10%;
        right: -5%;
    }
    .title-big {
        font-size: 35px;
        font-weight: 700;
    }
    .title {
        font-size: 16px;
    }
    @media(min-width: 991px) {
        bottom: unset!important;
        left: unset!important;
    }
    @media (max-width: 990px) {
        width: 70px;
        height: 70px;
        position: absolute!important;
        transform: unset!important;
        bottom:0;
        left:0;
        .title-big {
            font-size: 16px;
        }
        .title {
            font-size: 10px;
        }
        .shashape-child {
            width: 8px;
            height: 8px;
        }
        .shashape-child:nth-child(1) {
            top: -7%;
            left: -5%;
        }
        .shashape-child:nth-child(2) {
            top: -7%;
            right: -5%;
        }
        .shashape-child:nth-child(3) {
            bottom: -5%;
            left: -5%;
        }
        .shashape-child:nth-child(4) {
            bottom: -5%;
            right: -5%;
        }
    }
`
type StartPosition = {
    x: number;
    y: number;
}
export default function DragDropTitle({title="", titleBig="", y = 0, x = 0, xMobile = 0, yMobile = 0 }) {
    const [positionX, setPositionX] = useState<number>(x);
    const [positionY, setPositionY] = useState<number>(y);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<StartPosition>({ x: 0, y: 0 });
    const [isMobile, setMobile] = useState<boolean>(false);


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - positionY,
            y: e.clientY - positionX,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragging) {
            setPositionY(e.clientX - startPosition.x);
            setPositionX(e.clientY - startPosition.y);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    useEffect(() => {
        console.log('isMobile', isMobile);
    }, [isMobile])
    useEffect(() => {
        setMobile(isMobileOrSmallScreen());
    }, [])
    return (
        <DivParent 
            className={`position-relative d-flex flex-column justify-content-center align-items-center ${isMobile ? 'mobile' : ''}`}
            style={{transform: `translate(${positionY}px, ${positionX}px)`, bottom: yMobile+'%', left: xMobile+'%' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <span className="title-big text-white">{titleBig}</span>
            <span className="title text-center text-white">{title}</span>
        </DivParent>
    )
}