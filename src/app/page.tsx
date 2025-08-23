"use client";
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ButtonViewPort from '@/components/ButtonViewPort'
const Global = createGlobalStyle`
  :root {
    --primary-blue: #4A90E2;
    --dark-bg: #0A0A0A;
    --dark-secondary: #1A1A1A;
    --text-gray: #808080;
    --text-light: #B0B0B0;
    --grid-color: rgba(255, 255, 255, 0.03);
  }
`;

const S = {
  HeroSection: styled.section`
    min-height: 100vh;
    background: var(--dark-bg);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(var(--grid-color) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }
  `,
  
  ContentWrapper: styled.div`
    position: relative;
    z-index: 10;
    min-height: 100vh;    
    padding: calc(84px + 5rem) 0 0 0;
  `,
  
  GreetingText: styled.p`
    color: var(--text-light);
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 0.2s;
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
      from {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `,
  
  MainTitle: styled.h1`
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 0.4s;
  `,
  
  TitleProduct: styled.span`
    display: block;
    color: #FFFFFF;
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
  `,
  
  TitleDesigner: styled.span`
    display: block;
    color: var(--text-gray);
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
  `,
  
  TagsContainer: styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 0.6s;
  `,
  
  Tag: styled.span`
    padding: 0.5rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    color: var(--text-light);
    font-size: 0.875rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary-blue);
      color: var(--primary-blue);
      transform: translateY(-2px);
    }
  `,
  
  CharacterPlaceholder: styled.div`
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 450px;
    margin: 0 auto;
    opacity: 0;
    animation: scaleIn 0.8s ease forwards;
    animation-delay: 0.5s;
    
    @keyframes scaleIn {
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
      }
    }
    
    @media (min-width: 768px) {
      max-width: 400px;
      height: 500px;
    }
  `,
  
  PlaceholderBox: styled.div`
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(74, 144, 226, 0.15) 0%, transparent 70%);
      z-index: -1;
    }
  `,
  
  PlaceholderText: styled.span`
    color: var(--text-gray);
    text-align: center;
    padding: 1rem;
  `,
  
  FloatingIcon: styled.div<{ $size?: string; $rounded?: boolean; $delay?: string }>`
    position: absolute;
    width: ${props => props.$size || '48px'};
    height: ${props => props.$size || '48px'};
    background: var(--dark-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: ${props => props.$rounded ? '50%' : '12px'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    font-size: 1.25rem;
    animation: float 3s ease-in-out infinite;
    animation-delay: ${props => props.$delay || '0s'};
    &.cursor-floating-icon {
      top: 50%!important;
      right: 0!important;
      left: unset!important;
    }
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `,
  
  SloganSection: styled.div`
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 0.8s;
    
    @media (min-width: 992px) {
      text-align: right;
    }
  `,
  
  SloganTitle: styled.h2`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
  `,
  
  SloganHighlight: styled.span`
    color: var(--primary-blue);
    display: block;
  `,
  
  SloganNormal: styled.span`
    color: #FFFFFF;
    display: block;
  `,
  
  CTASection: styled.div`
    position: relative;
    // margin-top: 0rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: 1s;
  `,
  
  ButtonPrimary: styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: var(--dark-secondary);
    color: #FFFFFF;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-2px);
      color: #FFFFFF;
    }
    
    &:focus-visible {
      outline: 3px solid rgba(74, 144, 226, 0.5);
      outline-offset: 2px;
    }
  `,
  
  ButtonGradient: styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #416EC2 0%, #2067C6 50%, #54B9F4 100%);
    color: #FFFFFF;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #5BA3F5 0%, #8E7FFF 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      color: #FFFFFF;
      
      &::before {
        opacity: 1;
      }
    }
    
    &:focus-visible {
      outline: 3px solid rgba(74, 144, 226, 0.5);
      outline-offset: 2px;
    }
    
    span {
      position: relative;
      z-index: 1;
    }
  `
};

export default function Home() {
  return (
    <>
      <Global />
      <S.HeroSection>
        <S.ContentWrapper className="container">
          <div className="row align-items-center">
            {/* Left Column - Main Text */}
            <div className="col-12 col-lg-4 mb-5 mb-lg-0">
              <S.GreetingText>Hello, I&apos;m Thao Truong</S.GreetingText>
              
              <S.MainTitle>
                <S.TitleProduct>PRODUCT</S.TitleProduct>
              </S.MainTitle>
              
              <S.TagsContainer>
                <S.Tag>#UXUI</S.Tag>
                <S.Tag>#2DArtist</S.Tag>
                <S.Tag>#4+yrsExp</S.Tag>
              </S.TagsContainer>
            </div>
            
            {/* Center - Character Placeholder */}
            <div className="col-12 col-lg-4 mb-5 mb-lg-0">
              <S.CharacterPlaceholder>
                <S.PlaceholderBox>
                  <Image 
                    src="/img/avt-owner-port.png" 
                    alt="Thao Truong - Product Designer" 
                    width={320}
                    height={400}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 20px 40px rgba(74, 144, 226, 0.2))'
                    }}
                    priority
                  />
                </S.PlaceholderBox>
                
                {/* Floating Icons */}
                <S.FloatingIcon style={{ top: '-20px', left: '-20px' }} $delay="0s">
                  <Image src="/img/skill/figma.png" alt="Figma" width={73} height={73} />
                </S.FloatingIcon>
                
                <S.FloatingIcon style={{ top: '-20px', right: '-20px', background: 'white' }} $rounded $size="40px" $delay="0.5s">
                  <Image src="/img/plus.png" alt="Figma" width={58} height={58} />
                </S.FloatingIcon>
                
                <S.FloatingIcon style={{ bottom: '-20px', left: '-20px', background: 'transparent', border: 'none' }} className="cursor-floating-icon" $size="64px" $delay="1s">
                  <Image src="/img/11.png" alt="Figma" width={120} height={120} />
                </S.FloatingIcon>
              </S.CharacterPlaceholder>
            </div>
            
            {/* Right Column - Slogan */}
            <div className="col-12 col-lg-4">
              <S.SloganSection>
                <S.SloganTitle>
                  <S.SloganHighlight>I Design Products</S.SloganHighlight>
                  <S.SloganNormal>That Bewitch And Inspire People.</S.SloganNormal>
                </S.SloganTitle>
              </S.SloganSection>
               <S.MainTitle>
                <S.TitleDesigner>DESIGNER</S.TitleDesigner>
              </S.MainTitle>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <S.CTASection>
            <S.ButtonPrimary href="/about" aria-label="Learn more about me">
              About me
            </S.ButtonPrimary>
            <ButtonViewPort label="Jump to my works" href="/portfolio"/>
          </S.CTASection>
        </S.ContentWrapper>
      </S.HeroSection>
    </>
  );
}
