"use client";
import styled from "styled-components";
import {Col, Row} from 'react-bootstrap';

const DivParent = styled.div`
width: 100vw;
height: 100vh;
padding: 44px 40px 0 40px;
background-color: #090909;
.title-port {
    font-size: 32px;
}
.title-port:nth-child(2) {
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right,#FAC59F, #6B47AB)!important;
}
.title-port-wrap::after {
    content: "";
    display: block;
    width: 438px;
    height: 1px;
    background-color: white;
}
.title-port-wrap .title-port {
    margin-right: 32px;
}
`
export default function porfolio () {
    return (
        <DivParent>
            <header>
                <Row>
                    <Col md={9}>
                        <div className="title-port-wrap d-flex align-items-center">
                            <h1 className="title-port text-white">Design that solve problem</h1>
                        </div>
                        <h1 className="title-port">Where creativity meets functionality. </h1>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </header>
        </DivParent>
    )
}