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
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
  
  .header {
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
    padding: 120px 0 80px;
    position: relative;
    overflow: visible;
  }
  
  .about-title {
    font-size: 4rem;
    font-weight: 900;
    text-transform: uppercase;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .about-paragraph {
    font-family: Poppins;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #9ca3af;
    margin-bottom: 2rem;
    vertical-align: middle;
  }
  
  .design-title {
    font-family: Poppins;
    font-weight: 600;
    font-size: 32px;
    line-height: 47px;
    color: #ffffff;
    text-transform: uppercase;
    vertical-align: middle;
    margin-bottom: 1rem;
  }
  
  .design-description {
    font-family: Poppins;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #9ca3af;
    vertical-align: middle;
  }
  
  .character-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 500px;
    margin: 0 auto;
  }
  
  .character-image {
    width: 100%;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    z-index: 1;
  }
  .experience {
    padding: 80px 0;
    background: #2A2A2A;
  }
  
  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.2);
    padding-bottom: 1rem;
  }
  
  .creative-field {
    font-family: Poppins;
    font-weight: 400;
    font-size: 24px;
    line-height: 138%;
    letter-spacing: 3.5%;
    background: linear-gradient(90deg, #416EC2 0%, #2067C6 50%, #54B9F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .experience__title {
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    text-transform: capitalize;
  }
  
  .link-cv {
    font-size: 1rem;
    font-weight: 400;
    color: #3b82f6;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #8b5cf6;
      transform: translateX(5px);
    }
  }
  
  .education {
    padding: 80px 0;
    background: #2A2A2A;
  }
  
  .proudly-text {
    font-family: Poppins;
    font-weight: 400;
    font-size: 24px;
    line-height: 138%;
    letter-spacing: 3.5%;
    background: linear-gradient(90deg, #416EC2 0%, #2067C6 50%, #54B9F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: right;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .education__title {
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 2rem;
    text-transform: capitalize;
    text-align: right;
  }
  
  .education-content {
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    max-width: 1320px;
    margin: 0 auto;
  }
  
  .education-left {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .education-right {
    flex: 1;
  }
  
  .education-header {
    margin-bottom: 2rem;
  }
  
  .education-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: translateY(-8px);
      border-color: #3b82f6;
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
    }
    
    &.certificate {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
      border-color: rgba(245, 158, 11, 0.3);
      
      &:hover {
        border-color: #f59e0b;
        box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
      }
    }
    
    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 1rem;
    }
  }
  
  .education-image {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
  
  .title-school {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .title-major {
    font-size: 0.9rem;
    color: #9ca3af;
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
    background-image: linear-gradient(90deg, #416EC2 0%, #2067C6 50%, #54B9F4 100%)!important;
}
.footer__title--down h1 {
  white-space: nowrap;
  font-size: 32px;
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
    .header {
        padding: 80px 0 60px;
    }
    .about-title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .about-paragraph {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 1.5rem;
    }
    .design-title {
      font-size: 24px;
      line-height: 36px;
    }
    .design-description {
      font-size: 16px;
      line-height: 24px;
    }
    .character-wrapper {
      height: 400px;
      margin-top: 2rem;
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
      <div className="header">
        <div className="container">
          <h1 className="about-title">ABOUT ME</h1>
          <Row className="align-items-center">
            <Col xs={12} md={7} lg={8}>
              <p className="about-paragraph">
                Hi there, I&apos;m Thao, also known as Menaul. As a UI/UX designer with 4+ years of experience and a background in marketing, 
                I channel my creativity and emotions into crafting impactful designs. My expertise lies in creating intuitive user 
                experiences that resonate deeply with users while leveraging marketing insights to drive engagement and conversions.
              </p>
              
              <h2 className="design-title">Design, to me, is more than aesthetics</h2>
              
              <p className="design-description">
                It&apos;s about solving problems, telling stories, and creating products that fascinate and inspire. 
                I believe in a user-centered approach, where understanding the end user&apos;s needs and desires is 
                the foundation of every design decision.
              </p>
            </Col>
            
            <Col xs={12} md={5} lg={4}>
              <div className="character-wrapper">
                <Image
                  src="/img/ava_about.png"
                  alt="Character"
                  width={300}
                  height={375}
                  className="character-image d-block mx-auto"
                />
                {/* Reuse DragDropTitleAbout for stat boxes - matches the design */}
                {listTitleAboutDragDrop.map((item, index) => (
                  <DragDropTitleAbout 
                    key={index} 
                    {...item}
                    x={index === 0 ? -150 : index === 1 ? 150 : index === 2 ? -150 : 150}
                    y={index === 0 ? -180 : index === 1 ? -180 : index === 2 ? 180 : 180}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
  
      <div className="experience">
        <div className="container">
          <div>
            <span className="creative-field">Creative Field</span>
            <div className="experience-header">
              <h1 className="experience__title">Experiences</h1>
              <Link href={linkCv} className="link-cv" target="_blank">
                See more in my CV →
              </Link>
            </div>
          </div>
          <div style={{marginTop: '2rem'}}>
            {listExp.map((item, index) => (
              <ExpItem {...item} key={index}/>
            ))}
          </div>
        </div>
      </div>
      
      <div className="education">
        <div className="container">
          <div className="education-content">
            <div className="education-left">
              {/* First 4 education items from existing data */}
              {listEducation.map((item, index) => (
                <div key={index} className="education-card">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <h3 className="title-school">{item.name}</h3>
                  <p className="title-major">{item.major}</p>
                </div>
              ))}
            </div>
            <div className="education-right">
              <div className="education-header">
                <span className="proudly-text">Proudly</span>
                <h1 className="education__title">Education</h1>
              </div>
              <Image
                src="/img/list-education.png"
                alt="Education achievements"
                width={500}
                height={400}
                className="education-image"
              />
            </div>
          </div>
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
          <div className="list-client container">
            <div className="list-client__title">
              <span className="creative-field">Creative Field</span>
              <h1 className="text-uppercase text-white mb-4">I WORK WITH</h1>
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
