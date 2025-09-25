"use client";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const DivParent = styled.div`
    margin-bottom: 32px;
    .range-time {
        font-size: 18px;
        font-weight: 400;
        color: #7E7D7D;
    }
    .company-name {
        font-size: 20px;
        font-weight: 600;
        color: #FFFFFF;
        margin-bottom: 4px;
    }
    .role-title {
        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
    }

    @media (max-width: 990px) {
        .range-time {
            font-size: 12px;
            font-weight: 600;
            text-align: left!important;
        }
        .company-name {
            font-size: 14px;
            font-weight: 600;
            margin: 4px 0;
        }
        .role-title {
            font-size: 12px;
        }
        .exp-item-row {
            align-content: flex-start!important;
            flex-direction: column-reverse;
            &__range-time {
                width: 100%;
                text-align: left!important;
            }
            &__info {
                width: 100%;
                text-align: left!important;
            }
        }
    } 
`;

export default function ExpItem({rangeTime = "6/2022 - Now", companyName = "AEMI LIMITED LIABILITY COMPANY ", role = "Product Designer" }) {
    return (
        <DivParent>
            <Row className="exp-item-row align-items-center">
                <Col xs={8} md={8} className="exp-item-row__info d-flex flex-column">
                    <span className="company-name">{companyName}</span> 
                    <span className="role-title">{role}</span>
                </Col>
                <Col xs={4} md={4} className="exp-item-row__range-time text-end">
                    <span className="range-time">{rangeTime}</span>
                </Col>
            </Row>
        </DivParent>
    )
}