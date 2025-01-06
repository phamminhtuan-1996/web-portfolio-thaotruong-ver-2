"use client";

import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import styled from "styled-components";

import DragDropTitleAbout from '@/components/DragDropTitleAbout';
const DivParent = styled.div`
  .header {
    background-color: #0a0a0a;
    height: 591px;
    padding-top: 81px;
  }
  .header__content {
    width: 647px;
    height: 369px;
    border-radius: 20px;
    background-image: url("img/background-home.png");
    background-size: cover;
    background-position: 50% 50%;
    margin-top: 24px;
    padding-top: 30px;
  }
  .header__content img {
    // width: 100%;
    // height: 100%;
  }
  .header__content p {
    font-size: 16px;
  }
  .header__content span {
    font-size: 12px;
    color: #8F8F8F
  }
  .apostrophe-left {
    top:0;
    left: -10%;
  }
`;
export default function about() {
  return (
    <DivParent>
      <div className="header d-flex flex-column align-items-center overflow-hidden">
        <Image src="img/about-me.svg" alt="about me" width={169} height={29} />
        <div className="header__content">
          <Row>
            <Col md={5}>
              <Image
                src="/img/avt-thaotruong.png"
                alt="avt-thaotruong"
                width={264}
                height={332}
              />
            </Col>
            <Col md={7}>
              <p className="text-white position-relative">
              <Image
                src="/img/apostrophe-left.svg"
                alt="avt-thaotruong"
                width={27}
                height={24}
                className="apostrophe-left position-absolute "
              />        
                Hi there, I’m Thao, also known as Minzie! <br/> As a UX/UI designer
                with 4+ years of <br/> experience and a background in <br/> marketing, I
                channel my creativity and <br/> emotions into crafting impactful
                designs. My expertise lies in creating intuitive user <br/>
                experiences that resonate deeply with users while leveraging
                marketing insights <br/> to drive measurable results 
                <Image
                    src="/img/apostrophe-right.svg"
                    alt="avt-thaotruong"
                    width={27}
                    height={24}
                    className="ms-2"
                />
              </p>
              <span>I am currently working at Aemi with my <br/> beloved colleagues.</span>
            </Col>
          </Row>
        </div>
        
        <DragDropTitleAbout titleBig="2000+" title="screens" y={485} x={-390}/>
        <DragDropTitleAbout titleBig="ထ" title="ideas" y={520} x={-171}/>
        <DragDropTitleAbout titleBig="4+" title="years experience" y={-490} x={-496}/>
        <DragDropTitleAbout titleBig="10+" title="projects" y={-444} x={-343}/>
      </div>
      <div className="experience"></div>
      <div className="footer"></div>
    </DivParent>
  );
}
