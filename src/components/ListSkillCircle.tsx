
import Image from "next/image";

import styled from "styled-components";

const DivParent = styled.div`
position: relative;
.circle-skill__parent {
  width: 300px;
  height: 300px;
  border: 1px solid #FFFFFF52;
  border-radius: 50%;
  transition: 0.5s;
  animation: orbit 20s linear infinite;
  
 
}
.circle-skill__parent--child__wrap {
  position: absolute;
  top: 50%;
  left: calc(50% - 55px);
  transform: translate(-50%, -50%);
}
.circle-skill__parent--child {
  transform: translate(-50%, -50%);
  width: 210px;
  height: 210px;
  border: 1px solid #FFFFFF52;
  border-radius: 50%;
  animation: orbit 15s linear infinite;
  
  @media (max-width: 768px) {
    width: 168px;
    height: 168px;
  }
  
  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
}

.satellite {
  position: absolute;
  width: 50px;
  height: 50px;
  animation: counter-rotate 20s linear infinite;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
}

.satellite-child {
  position: absolute;
  width: 40px;
  height: 40px;
  animation: counter-rotate 15s linear infinite;
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
}

.satellite:nth-child(1) { 
  top: -25px;
  left: calc(50% - 25px);
  
  @media (max-width: 768px) {
    top: -20px;
    left: calc(50% - 20px);
  }
  
  @media (max-width: 480px) {
    top: -17.5px;
    left: calc(50% - 17.5px);
  }
}
.satellite:nth-child(2) { 
  top: calc(50% - 25px);
  right: -25px;
  
  @media (max-width: 768px) {
    top: calc(50% - 20px);
    right: -20px;
  }
  
  @media (max-width: 480px) {
    top: calc(50% - 17.5px);
    right: -17.5px;
  }
}
.satellite:nth-child(3) { 
  bottom: -25px;
  left: calc(50% - 25px);
  
  @media (max-width: 768px) {
    bottom: -20px;
    left: calc(50% - 20px);
  }
  
  @media (max-width: 480px) {
    bottom: -17.5px;
    left: calc(50% - 17.5px);
  }
}
.satellite:nth-child(4) { 
  top: calc(50% - 25px);
  left: -25px;
  
  @media (max-width: 768px) {
    top: calc(50% - 20px);
    left: -20px;
  }
  
  @media (max-width: 480px) {
    top: calc(50% - 17.5px);
    left: -17.5px;
  }
}

.satellite-child:nth-child(1) {
  top: -20px;
  left: calc(50% - 20px);
  
  @media (max-width: 768px) {
    top: -16px;
    left: calc(50% - 16px);
  }
  
  @media (max-width: 480px) {
    top: -14px;
    left: calc(50% - 14px);
  }
}

.satellite-child:nth-child(2) { 
  bottom: -20px;
  left: calc(50% - 20px);
  
  @media (max-width: 768px) {
    bottom: -16px;
    left: calc(50% - 16px);
  }
  
  @media (max-width: 480px) {
    bottom: -14px;
    left: calc(50% - 14px);
  }
}

.child-core {
  position: relative;
  z-index: 10;
  animation: orbit-reverse 15s linear infinite;
}
  .figma {
    position: absolute;
    top: 50%;
    left: calc(50% - 55px);
    z-index: 20;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  }

@keyframes orbit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes orbit-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes counter-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

&:hover .circle-skill__parent {
  animation-play-state: paused;
}

&:hover  .satellite {
  animation-play-state: paused;
}

&:hover .circle-skill__parent--child {
  animation-play-state: paused;
}

&:hover .satellite-child {
  animation-play-state: paused;
}
@media (max-width: 990px) {
  display: flex;
  justify-content: center;
  .circle-skill__parent--child__wrap, .figma  {
    left: 50%;
    
  }
}
`;
export default function ListSkillCircle() {
    return (
        <DivParent>
            <div className="circle-skill__parent position-relative d-flex justify-content-center align-items-center">
                <Image src="/img/skill/Adobe_Illustrator_CC_icon.png" alt="Adobe Illustrator" className="satellite" width={50} height={50}  />
                <Image src="/img/skill/Tool icon-1.png" alt="Tool icon" className="satellite" width={50} height={50}  />
                <Image src="/img/skill/Tool icon.png" alt="Tool icon" className="satellite" width={50} height={50}  />
                <Image src="/img/skill/ChatGPT.png" alt="ChatGPT" className="satellite" width={50} height={50}  />
                
            </div>
            <div className="circle-skill__parent--child__wrap">
                <div className="circle-skill__parent--child position-relative d-flex justify-content-center align-items-center">
                    <Image src="/img/skill/AdobeXD.png" alt="Adobe XD" className="satellite-child" width={40} height={40}  />
                    <Image src="/img/skill/Tool icon-2.png" alt="Tool icon" className="satellite-child" width={40} height={40}  />
                    <div className="child-core">
                        
                    </div>
                </div>
            </div>
            
             <Image src="/img/skill/figma.png" alt="Figma" className="figma" width={60} height={60}  />
        </DivParent>
    )
}