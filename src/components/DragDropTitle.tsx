"use client";
import styled from "styled-components";

const DivParent = styled.div`
    width: 675px;
    height: 122px;
    border: 1px solid white;
    .shashape-child {
        width: 16px;
        height: 16px;
    }
    .shashape-child:nth-child(1) {
        top: -5%;
        left: -1%;
    }
    .shashape-child:nth-child(2) {
        top: -5%;
        right: -1%;
    }
    .shashape-child:nth-child(3) {
        bottom: -5%;
        left: -1%;
    }
    .shashape-child:nth-child(4) {
        bottom: -5%;
        right: -1%;
    }
    .title {
        font-size: 20px;
    }
`
export default function DragDropTitle() {
    return (
        <DivParent className="position-relative mt-4 d-flex justify-content-center align-items-center">
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <div className="shashape-child position-absolute bg-white"></div>
            <span className="title text-white">Turn ideas into meaningful and impactful design</span>
        </DivParent>
    )
}