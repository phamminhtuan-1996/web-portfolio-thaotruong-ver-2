"use client";
import {useState} from 'react';
import styled from "styled-components";
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
`
type StartPosition = {
    x: number;
    y: number;
}
export default function DragDropTitle({title="", titleBig="", y = 0, x = 0}) {
    const [positionX, setPositionX] = useState<number>(x);
    const [positionY, setPositionY] = useState<number>(y);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<StartPosition>({ x: 0, y: 0 });

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
    return (
        <DivParent 
            className="position-relative d-flex flex-column justify-content-center align-items-center"
            style={{transform: `translate(${positionY}px, ${positionX}px)`}}
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