"use client";
import styled from "styled-components";
const DivParent = styled.div`
    background: #1E1E1E;
    height: 142px;
    border-radius: 10px;
    .block-title {
        color: #416EC2;
        font-weight: 700;

    }
`;
export default function BlockInforContact({title = '', des = ''}) {
    return (
        <DivParent className="d-flex flex-column align-items-center justify-content-center p-3 m-2">
            <h1 className="block-title">{title}</h1>
            <span className="block-des text-white">{des}</span>
        </DivParent>
    )
}
