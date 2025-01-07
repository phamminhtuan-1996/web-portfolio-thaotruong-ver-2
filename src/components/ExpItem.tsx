"use client";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const DivParent = styled.div`
    margin-bottom: 24px;
    .circle-time {
        width: 20px;
        height: 20px;
        background-color: #9F70E0;
        border-radius: 50%;
        margin-right: 20px;
    }
    .range-time {
        font-size: 24px;
        font-weight: 700;
    }
    .company-name {
        font-size: 24px;
        font-weight: 700;
    }
    .role-title {
        font-size: 18px;
    }
`;

export default function ExpItem({rangeTime = "6/2022 - Now", companyName = "AEMI LIMITED LIABILITY COMPANY ", role = "Product Designer" }) {
    return (
        <DivParent>
            <Row>
                <Col md={4} className="d-flex align-items-center justify-conten-center">
                    <div className="circle-time"></div>
                    <span className="range-time">{rangeTime}</span>
                </Col>
                <Col md={8} className="d-flex flex-column">
                    <span className="company-name">{companyName}</span> 
                    <span className="role-title">{role}</span>
                </Col>
            </Row>
        </DivParent>
    )
}