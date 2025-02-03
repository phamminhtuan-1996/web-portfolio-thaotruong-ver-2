"use client";
import {useState, useEffect, useCallback} from 'react';
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { isMobileOrSmallScreen } from '../utils/helper';
import DragDropTitle from '@/components/DragDropTitle';
import TrainSkill from '@/components/TrainSkill';
const DivParent = styled.div`
width: 100%;
height: 100%;
background-color: #090909;
padding: 1rem 32px 1rem 32px;
.home-frame {
  width: calc(100vw - 64px);
  height: calc(100vh - 32px - 84px - 40px - 1.5rem);
  border: 1px solid white;
  border-radius: 20px;
  background: url('img/background-home.png');
  background-size: cover;
  padding: 1rem 0 1rem 0;
}
.home-frame__name--effect {
  width: 395px;
  height: 78px;
}
.effect {
  transition: 0.5s;
  position: absolute;
}
.effect-one {
  transform: translateY(-100%);
  top: 0;
  left:0;
}
.effect.active {
  transform: translateY(0%);
}
.effect-two {
  transform: translateX(100%);
  top: 0;
  left:0;
}
.effect-three {
  transform: translateY(100%);
  top: 0;
  left:0;
}
.btn-home .btn {
  height: 52px!important;
  border-color: white!important;
  font-size: 14px;
  border-radius: 12px;
}
.btn-home .btn:nth-child(2) {
  background-image: linear-gradient(to right,#FAC59F, #6B47AB)!important;
}
.btn:hover {
  background-color: #6229CC!important;
  background-image: none!important;
}
@media (max-width: 990px) {
  overflow: auto;
  padding: 0 0 140px 0;
  .home-frame__name--title {
    margin-right: 5px!important;
  }
   .home-frame__name--effect {
    width: 100%;
  }
  .home-frame__name--effect img:first-child{
    width: 100%;
  }
  .home-frame__name--effect img{
    width: 400px;
  }
  .btn-home {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .btn-home .btn:first-child {
    width: 182px;
    margin-right: 0!important;
    margin-bottom: 20px;
  }
  .home-frame__hello:first-child {
    width: calc(100% - 32px);
  }
  .home-frame__name {
    flex-direction: column;
    align-items: center;
  }
  .home-frame {
    width: 100%;
    height: auto;
    border: none;
    border-radius: unset;
    background-position: 50% 50%;
    padding: 38px 0;
  }
 }
`

export default function Home() {
  const listSkill = ['digital painting', 'Ux research', 'UI design', 'graphic design', 'branding', 'digital marketing', 'seo'];
  const [isMobile, setMobile] = useState<boolean>(false);
  const [isActiveEffect, setActiveEffect] = useState('1');
  const getEffect = (value: string) => {
    return isActiveEffect === value ? 'active' : '';
  }

  const ImgMinzie = useCallback(() => {
    if (!isMobile) {
      return (
        <>
          <Image 
            src='img/im-minzie.svg'
            alt="123"
            width={257}
            height={78}
            priority
            className="home-frame__name--title me-4"
          />
        </>
      )
    }
    return (
      <>
        <Image 
          src='img/im-minzie-mobile.svg'
          alt="123"
          width={110}
          height={37}
          priority
          className="home-frame__name--title me-4"
        />
      </>
    )
  }, [isMobile])

  const ImgHello = useCallback(() => {
    if (!isMobile) {
      return (
        <>
          <Image 
            src='img/hello-stroke.svg'
            alt="123"
            width={350}
            height={116}
            priority
            className="mt-2"
          />
        </>
      )
    }
    return (
      <>
       <Image 
          src='img/hello-stroke-mobile.svg'
          alt="123"
          width={250}
          height={116}
          priority
          className="mt-2"
        />
      </>
    )
  }, [isMobile])
  const ImgBaseHCM = useCallback(() => {
    if (!isMobile) {
      return (
        <>
          <Image 
            src='img/base-in-hcmc.svg'
            alt="123"
            width={227}
            height={48}
            priority
            className="mt-2"
          /> 
        </>
      )
    }
    return (
      <>
       <Image 
            src='img/base-in-hcmc.svg'
            alt="123"
            width={144}
            height={48}
            priority
            className="mt-2"
          /> 
      </>
    )
  }, [isMobile])

  useEffect(() => {
    setMobile(isMobileOrSmallScreen());
    let count = 1;
    const interval = setInterval(() => {
      if (count === 3) {
        count = 1;
        setActiveEffect('1');
        return;
      }
      count += 1;
      setActiveEffect(String(count));
    }, 3000)
    return () => clearInterval(interval);
  }, [])
  return (
    <DivParent>
      <div className="home-frame d-flex align-items-center flex-column justify-content-center">
        <ImgHello />
        <div className="home-frame__name d-flex">
        <ImgMinzie />
        <div className="home-frame__name--effect position-relative overflow-hidden">
        <Image 
          src='img/product-des.svg'
          alt="123"
          width={isMobile ? 244 : 395}
          height={isMobile ? 48 : 78}
          priority
          className={`effect effect-one ${getEffect('1')}`}
        />
        <Image 
          src='img/ux-ui-designer.svg'
          alt="123"
          width={isMobile ? 244 : 551}
          height={isMobile ? 48 : 78}
          priority
          className={`effect effect-two ${getEffect('2')}`}
        />
        <Image 
          src='img/2d-game-artist.svg'
          alt="123"
          width={isMobile ? 244 : 551}
          height={isMobile ? 48 : 78}
          priority
          className={`effect effect-three ${getEffect('3')}`}
        />
        </div>
        </div>
        {/* <Image 
          src='img/base-in-hcmc.svg'
          alt="123"
          width={227}
          height={48}
          priority
          className="mt-2"
        /> */}
        <ImgBaseHCM/>
        <DragDropTitle/>
        <div className="btn-home d-flex mt-5">
          <Link href="/about" className="btn btn-outline-primary text-white me-4 btn-lg d-flex justify-content-center align-items-center"> About me </Link>
          <Link href="/portfolio" className="btn btn-outline-primary text-white btn-lg d-flex justify-content-center align-items-center"> Jump to my works <Image src="img/jump-to-works-icon.svg" alt="button" width={20} height={20}/></Link>
        </div>
      </div>
      <TrainSkill data={listSkill}/>
    </DivParent>
  );
}
