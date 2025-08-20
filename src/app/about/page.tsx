"use client";
import { useEffect, useState } from 'react';
import { Row, Col, Button } from "react-bootstrap";
import {linkCv} from '@/utils/constants';
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import ExpItem from "@/components/ExpItem";
import {TickCircle, Sms, Call, SmsTracking, Crown1} from 'iconsax-react';
import { isMobileOrSmallScreen } from '../../utils/helper';
import TrainClientV2 from '@/components/TrainClientV2';
import DragDropTitleAbout from '@/components/DragDropTitleAbout';
const DivParent = styled.div`
  // padding-bottom: 150px;
  .header {
    background-color: #0a0a0a;
    height: 591px;
    padding-top: 81px;
  }
  .header__content {
    width: 647px;
    height: 362px;
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
  .header__content .about-content {
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
  .experience {
    padding-top: 84px;
  }
  .experience__title {
    font-size: 48px;
    margin-bottom: 44px;
  }
  .link-cv {
    font-size: 24px;
    font-weight: 400;
    color: #171616;
    text-decoration: none;
  }
  .link-cv:hover {
    text-decoration: underline;
  }
  .education {
    padding-top: 107px;
    padding-bottom: 47px;
  }
  .title-school {
    font-size: 20px;
    font-weight: 700;
  }
  .title-major {
    font-size: 16px;
  }
  .education-item img{
    width: 91px;
    height: 79px;
    object-fit: contain;
  }
  .footer {
    background-color: #0A0A0A;
    padding-bottom: 150px;
    padding-top: 89px;
  }
  .footer__title--wrap h1 {
    font-size: 32px;
    margin-right: 68px;
  }
  .footer__title--down {
    font-size: 32px;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right,#FAC59F, #6B47AB)!important;
}
.footer__title--down h1 {
  white-space: nowrap;
  font-size: 32px;
}
  .footer__title--wrap::after {
    content: "";
    display: block;
    width: 438px;
    height: 1px;
    background-color: white;
}

.list-skill {
  padding-top: 59px;
  padding-bottom: 86px;
}

.list-skill__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  display: block;
}

.circle-skill__parent {
  width: 300px;
  height: 300px;
  border: 1px solid #FFFFFF52;
  border-radius: 50%;
  transition: 0.5s;
  // animation: circle 15s linear infinite;
}

.circle-skill__parent--child {
  width: 210px;
  height: 210px;
  border: 1px solid #FFFFFF52;
  border-radius: 50%;
  // animation: circle 15s infinite;
}

.satellite {
  position: absolute;
  transform: rotate(360deg);
  // animation: circle-reverse 16s infinite;
}

.satellite-child {
  position: absolute;
  transform: rotate(360deg);
  // animation: circle-reverse 16s infinite;
}

.satellite:nth-child(1) { 
  top:0;
  right:0;
}
.satellite:nth-child(2) { 
  top:0;
  left:0;
}
.satellite:nth-child(3) { 
  bottom:0;
  left:0;
}
.satellite:nth-child(4) { 
  bottom:0;
  right:0;
}

.satellite-child:nth-child(1) {
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.satellite-child:nth-child(2) { 
  bottom: -15px;
  right: 50%;
  transform: translateX(-50%);
}

@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
 }
@keyframes circle-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
 }




 .message {
  padding-top: 76px;
 }
 .message__input {
  width: 832px;
  height: 86px;
  border: 1px solid white;
  border-radius: 20px; 
  padding-left: 14px;
 }
 .message__input input {
  width: calc(100% - 32px - 16px);
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 20px;
  height: 100%;
  margin-left: 1rem;
 }
 .message__title {
  margin-bottom: 71px;
 }
 .message__input--wrap {
  width: 80%;
 }
 .message__input--wrap-right {
  width: 20%;
  padding: 10px 0;
 }
 .message__input--wrap-right .btn {
    width: 130px;
    background-color: #6229CC!important;
    border-radius: 16px;
    border-color: #6229CC!important;
 }
 .message-contact {
  width: 770px;
 }
 .list-client {
  padding-bottom: 111px;
 }
 .list-client__title {
  margin-bottom: 57px;
 }

 .slogan-mobile {
  display: none;
 }
 .slogan-desktop {
  display: block;
 }

 .content-about {
  font-weight: 200;
}

.education__title--mobile {
  display: none!important;
}

.education__title--desktop {
  display: flex;
}
.message__input--wrap textarea {
  display: none;
}
 @media (max-width: 990px) {
    .header__content .row {
      margin: 0;
      padding: 0;
    }
    .header__content {
      width: calc(100vw - 32px);
      height: auto;
    }
    .header {
        height: auto;
        position: relative;
        padding-bottom: 186px;
    }
    .slogan-mobile {
      display: block;
      font-size: 10px!important;
    }
    .slogan-desktop {
      display: none;
     }
    .content-about {
      font-size: 12px;
      margin: 0;
    }
    .header__content .col-md-5 {
      order: 2;
      display: flex;
    }
    .header__content .col-md-5 img {
      width: 50%;
      height: 100%;
    }
    .header .col-md-7 {
      padding: 0 3rem;
    }
    .apostrophe-left {
      top: 0;
      left: -15%;
  }
  .title-school {
    font-size: 14px;
  }
  .title-major {
    font-size: 12px;
  }
  .education {
    padding-top: 1rem;
  }
  .education__title--mobile {
    display: flex!important;
  }
  .education__title--desktop {
    display: none;
  }
  .education__img {
    width: 100%;
    height: auto;
    margin-top: 1rem;
  }
  .wrap-cv {
    display: none!important;
  }
  .experience__title {
    font-size: 36px;
  }
  .message-contact {
    flex-direction: column;
  }
  .message-contact__item { 
    margin-bottom: 1rem;
  }
  
  .message__input {
    width: 100%;
    height: auto;
    padding: 1rem;
    flex-direction: column;
  }
  .message__input--wrap {
    width: 100%;
    display: flex;
  }
  .message__input--wrap svg{
    margin-right: 5px;
  }
  .message__input--wrap input {
    display: none;
  }
  
  .message__input--wrap textarea {
    display: block;
    outline: none;
    border: none;
    color: white;
    background-color: #00800000;
  }
  .message__input--wrap-right {
    width: 100%;
  }
  .message__input--wrap-right .btn {
    width: 100%;
  }
  .footer__title--wrap h1 {
    font-size: 16px;
    margin-right: 1rem;
  }
  .footer__title--down h1 {
    font-size: 16px;
    white-space: wrap!important;
  }
  .footer__title--wrap::after {
    width: 50%;
  }
  .footer { 
    padding-top: 1rem;
  }

  .list-skill__title {
    text-align: center;
    margin: 1rem 0;
    font-size: 16px;
  }
  .list-skill {
    padding-top: 44px;
  }
  .education__list {
    padding: 0 1rem;
  }
  img[alt="tools_details"] {
    width: 80%;
    display: block;
    margin: auto;
  }
  .skill-item__title {
    font-size: 14px;
    margin-left: 12px!important;
  }
  .skill-item svg {
      width: 20px;
  }
}
`;
type ListExp = {
  rangeTime: string;
  companyName: string;
  role: string;
}

type ListEducation = {
  name: string;
  major: string;
  thumbnail: string;
}

type ListTitleAboutDragDrop = {
  titleBig: string;
  title: string;
  x: number;
  y: number;
  xMobile: number;
  yMobile: number;
}


export default function About() {
  const [isMobile, setMobile] = useState<boolean>(false);
  const listExp: ListExp[] = [
    {rangeTime: "6/2022 - Now", companyName: "AEMI LIMITED LIABILITY COMPANY", role: "Product Designer"},
    {rangeTime: "3/2021 - 6/2022", companyName: "CDN - FABOSHOP COMPUTER SOFTWARE COMPANY", role: "UX/UI Designer"},
    {rangeTime: "10/2020 - 10/2024", companyName: "FREELANCE", role: "Product Designer"},
    {rangeTime: "11/2017 - 10/2020", companyName: "ICHIP TECHNOLOGY & YOURTV MEDIA GROUP", role: "Digital Marketing - SEO"},
  ]
  const listEducation: ListEducation[] = [
    {name: 'Banking University', major: "Major: Marketing", thumbnail: '/img/banking-university-logo.png'},
    {name: 'Nordic Coder', major: "Major: Digital Product Design", thumbnail: '/img/nordic-coder-logo.png'},
    {name: 'NHAT NGHE EDU JSC', major: "Major: Search Engine Optimization", thumbnail: '/img/nhatnghe-logo.png'},
    {name: 'TOEIC Certificate', major: "Band score: 735", thumbnail: '/img/toeic-logo.png'},
  ];

  const listTitleAboutDragDrop: ListTitleAboutDragDrop[] = [
    { titleBig: '2000+', title: 'screens', x: -390, y: 485, xMobile: 28, yMobile: 3},
    { titleBig: 'ထ', title: 'ideas', x: -171, y: 520, xMobile: 5, yMobile: 10 },
    { titleBig: '4+', title: 'years experience', x: -657, y: -550, xMobile: 52, yMobile: 10 },
    { titleBig: '10+', title: 'projects', x: -488, y: -472, xMobile: 76, yMobile: 5 },
  ]

  const listHardSkill: string[] = [
    "User research, Design Thinking",
    "Personas, Journey maps, User Flows",
    "Graphic Design, Branding, Keyvisual",
    "Wire-framing, Prototyping",
    "Usability Testing",
    "Mockups, Responsive, Adaptive",
    "Illustration, 2D game painting",
    "Google Analytics, Clarity, Search console",
    "Agile/Scrum, Slack, Jira, Confluence",
  ]
  const listSoftSkill: string[] = [
    "Empathetic",
    "Problem-solving",
    "Meticulous",
    "Collaborative",
    "Self-learning",
    "Critical thinking",
  ]
  const listClients: string[] = [
    '/img/list-clients/aemi-client.png',
    '/img/list-clients/piano-client.png',
    '/img/list-clients/cdn.png',
    '/img/list-clients/du-du.png',
    '/img/list-clients/halo-tea.png',
    '/img/list-clients/happy-mind.png',
    '/img/list-clients/tarocha.png',
    '/img/list-clients/zo-skin.png',
  ];
useEffect(() => {
    setMobile(isMobileOrSmallScreen());
}, [])

  return (
    <DivParent>
      <div className="header d-flex flex-column align-items-center overflow-hidden">
        <Image src="img/about-me.svg" alt="about me" width={169} height={29} />
        <div className="header__content">
          <Row className="w-100">
            <Col xs={12} md={5} className="d-flex justify-content-center">
              <Image
                src="/img/avt-thaotruong.png"
                alt="avt-thaotruong"
                width={264}
                height={332}
              />
            </Col>
            <Col xs={12} md={7} className="d-flex align-items-center">
              <p className="content-about text-white position-relative">
              <Image
                src="/img/apostrophe-left.svg"
                alt="avt-thaotruong"
                width={27}
                height={24}
                className="apostrophe-left position-absolute"
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
            </Col>
          </Row>
        </div>
        {listTitleAboutDragDrop.map((item, index) => (
          <DragDropTitleAbout key={index} {...item}/>
        ))}
      </div>
      <div className="experience">
        <div className="container">
          <Image src="/img/creative_field.svg" width={149} height={20} alt="creative_field" />
          <h1 className="experience__title">Experiences</h1>
          <Row>
            <Col md={9}>
              {listExp.map((item, index) => (
                <ExpItem {...item} key={index}/>
              ))}
              
            </Col>
            <Col md={3} className="wrap-cv d-flex justify-content-end">
              <Image
                src="/img/right-carousel-cv.svg"
                alt="right-carousel-cv"
                width={46} 
                height={32} 
                className="me-2"
              />
              <Link href={linkCv} className="link-cv" target="_blank" >See more in my CV</Link>
            </Col>
          </Row>
        </div>
      </div>
      <div className="education">
        <div className="education__title--mobile pe-4 flex-column justify-content-end align-items-end">
          <Image src="/img/proudly.svg" alt="proudly" width={85} height={25}/>
          <h1 className="experience__title">Education</h1>
        </div>
      
        <div className="container">
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <Row className="education__list">
                {listEducation.map((item,index) => (
                  <Col xs={6} md={6} className="education-item d-flex flex-column mb-4" key={index}>
                    <Image src={item.thumbnail} alt="education logo" width={91} height={79} style={{objectFit: 'contain'}}/>
                    <span className="title-school">{item.name}</span>
                    <span className="title-major">{item.major}</span>
                </Col>
                )) }
                

              </Row>
            </Col>
            <Col md={6} className="d-flex flex-column align-items-end">
              <div className="education__title--desktop flex-column align-items-end">
                <Image src="/img/proudly.svg" alt="proudly" width={85} height={25}/>
                <h1 className="experience__title">Education</h1>
              </div>
              <Image src="/img/list-education.png" alt="education" className="education__img" width={561} height={370} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer overflow-hidden">
        <div className="container">
          <div className="footer__title">
            <div className="footer__title--wrap d-flex align-items-center">
              <h1 className="text-white">Learning is a journey</h1>
            </div>
            <div className="footer__title--down">
              <h1>Each step shapes who we are and leads us closer to our potential.</h1>
            </div>
          </div>
          <div className="list-skill">
            <Row>
              <Col md={4}>
                <span className="list-skill__title text-white">Tools</span>
                <div className="circle-skill d-none">
                  <div className="circle-skill__parent position-relative d-flex justify-content-center align-items-center">
                  <Image src="/img/skill/Adobe_Illustrator_CC_icon.png" alt="Adobe Illustrator" className="satellite" width={50} height={50}/>
                    <Image src="/img/skill/Tool icon-1.png" alt="Tool icon" className="satellite" width={50} height={50}/>
                    <Image src="/img/skill/Tool icon.png" alt="Tool icon" className="satellite" width={50} height={50}/>
                    <Image src="/img/skill/Wordpress.png" alt="Wordpress"  className="satellite" width={50} height={50}/>
                    <div className="circle-skill__parent--child position-relative d-flex justify-content-center align-items-center">
                     <Image src="/img/skill/AdobeXD.png" alt="Adobe XD" className="satellite-child" width={40} height={40}/>
                     <Image src="/img/skill/Tool icon-2.png" alt="Tool icon" className="satellite-child" width={40} height={40}/>
                      <div className="child-core">
                        <Image src="/img/skill/figma.png" alt="Figma" width={60} height={60}/>
                      </div>
                    </div>
                  </div>
                </div>
                <Image src="/img/tools_details.png" alt="tools_details" width={300} height={300} style={{width: '80%', height: 'auto', display: 'block', margin: 'auto'}}/>
              </Col>
              <Col md={4}>
                <span className="list-skill__title text-start text-white">Skills</span>
                {listHardSkill.map((item, index) => (
                  <div className="skill-item mb-2" key={index}>
                    <TickCircle size="32" color="#FFF"/>
                    <span className="skill-item__title ms-3 text-white">{item}</span>
                  </div>
                ))}
                
              </Col>
              <Col md={4}>
                <span className="list-skill__title text-start text-white">Soft skills</span>
                {listSoftSkill.map((item, index) => (
                  <div className="skill-item mb-2" key={index}>
                    <TickCircle size="32" color="#FFF"/>
                    <span className="skill-item__title ms-3 text-white">{item}</span>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
          </div>
          <div className="list-client">
            <div className="list-client__title d-flex flex-column justify-content-center align-items-center">
              <Image src="/img/clients.svg" alt="lets-discuss" width={263} height={36} className="mb-3 d-block"/>
              <h1 className="text-uppercase text-center text-white mb-4">I WORK WITH</h1>
            </div>
            <TrainClientV2 data={listClients}/>
          </div>
          <div className="container">
          <div className="message" id="message">
            <div className="message__title  d-flex flex-column align-items-center justify-content-center">
              <h1 className="text-uppercase text-center text-white mb-4">Have an Awesome Project Idea?</h1>
              <Image src="/img/lets-discuss.svg" alt="lets-discuss" width={263} height={36}/>
            </div>
            <form
              action="https://docs.google.com/forms/d/e/1FAIpQLSd5UeS35O2bRd9JyTZH6PR4Cj3pH7ehq_4bhUPmucl16HL-uQ/formResponse"
              className="message__input mx-auto d-flex justify-content-between"
              method="POST"
              target="_blank"
            >
              <div className="message__input--wrap">
                {!isMobile && (
                  <Sms size="32" color="#6229CC"/>
                )}
                <input type="text" name="entry.604871011" placeholder="Message here"/>
                <textarea name="entry.604871011" cols={50} rows={8} placeholder="Message here"></textarea>
              </div>
              <div className="message__input--wrap-right d-flex justify-content-center align-items-center">
                <Button type="submit" className="d-block h-100">Send</Button>
              </div>
            </form>
            <div className="message-contact mx-auto mt-4 d-flex justify-content-between">
              <div className="message-contact__item">
                <Call size={isMobile ? 24 : 32} color="#FFF"/>
                <span className="text-white ms-3 text-decoration-none">038 679 8487</span>
              </div>
              <div className="message-contact__item">
                <SmsTracking size={isMobile ? 24 : 32}  color="#FFF"/>
                <span className="text-white ms-3 text-decoration-none">thaotruongdesign@gmail.com</span>
              </div>
              <div className="message-contact__item">
                <Crown1 size={isMobile ? 24 : 32}  color="#FFF"/>
                <span className="text-white ms-3">Certified Product Designer</span>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </DivParent>  
  ); 
}
