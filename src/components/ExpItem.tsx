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

    @media (max-width: 990px) {
        .circle-time {
            width: 8px;
            height: 8px;
            margin-right: 15px;
        }
    .range-time {
        font-size: 11px;
        // white-space: nowrap;
        font-weight: 600;
      }
      .company-name {
        font-size: 11px;
        font-weight: 600;
      }
      .role-title {
        font-size: 11px;
      }
    } 
`;

export default function ExpItem({rangeTime = "6/2022 - Now", companyName = "AEMI LIMITED LIABILITY COMPANY ", role = "Product Designer" }) {
    return (
        <DivParent>
            <Row>
                <Col  xs={5} md={4} className="d-flex align-items-center justify-conten-center">
                    <div className="circle-time"></div>
                    <span className="range-time">{rangeTime}</span>
                </Col>
                <Col xs={7} md={8} className="d-flex flex-column">
                    <span className="company-name">{companyName}</span> 
                    <span className="role-title">{role}</span>
                </Col>
            </Row>
        </DivParent>
    )
}