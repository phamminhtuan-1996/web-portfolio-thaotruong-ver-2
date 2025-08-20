"use client";
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import styled from 'styled-components';

const LoadingContainer = styled.div<{ $isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${props => props.$isLoading ? 1 : 0};
  visibility: ${props => props.$isLoading ? 'visible' : 'hidden'};
  pointer-events: ${props => props.$isLoading ? 'all' : 'none'};
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 30px rgba(74, 144, 226, 0.5));
  }
`;

const LoadingText = styled.p`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 14px;
  letter-spacing: 3px;
  opacity: 0;
  display:none;
`;

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 2500 
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Create timeline for coordinated animations
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      complete: () => {
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete?.();
        }, 300);
      }
    });

    // Animate SVG path drawing effect
    timeline
      .add({
        targets: logoRef.current.querySelector('path'),
        strokeDashoffset: [anime.setDashoffset, 0],
        stroke: '#ffffff',
        fill: 'none',
        strokeWidth: 1,
        duration: 1500,
        easing: 'easeInOutSine',
      })
      .add({
        targets: logoRef.current.querySelector('path'),
        fill: '#ffffff',
        stroke: 'none',
        duration: 500,
        easing: 'easeInOutQuad',
      }, '-=200')
      .add({
        targets: logoRef.current,
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        duration: 600,
        easing: 'easeInOutElastic(1, .6)',
      }, '-=300')
      .add({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        easing: 'easeOutQuad',
      }, '-=400')
      .add({
        targets: [logoRef.current, textRef.current],
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 400,
        easing: 'easeInQuad',
      }, `+=${duration - 2000}`);

    // Pulse animation while loading
    anime({
      targets: logoRef.current,
      filter: [
        'drop-shadow(0 0 30px rgba(74, 144, 226, 0.5))',
        'drop-shadow(0 0 50px rgba(74, 144, 226, 0.8))',
        'drop-shadow(0 0 30px rgba(74, 144, 226, 0.5))',
      ],
      duration: 1500,
      loop: true,
      easing: 'easeInOutSine',
    });

    return () => {
      anime.remove(logoRef.current);
      anime.remove(textRef.current);
    };
  }, [duration, onLoadingComplete]);

  return (
    <LoadingContainer $isLoading={isLoading}>
      <LogoWrapper>
        <svg 
          ref={logoRef}
          width="35" 
          height="31" 
          viewBox="0 0 35 31" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M34.5139 28.082C34.5139 29.6679 33.2301 30.9547 31.6441 30.9583L13.4653 31C4.42361 31 4.611e-07 25.8816 0 15.4034C-3.76095e-07 6.8567 4.18056 2.26947 9.625 2.26947C14.875 2.26947 16.1389 5.93925 16.1389 9.12617L16.6736 9.12617C16.6736 5.93925 17.3056 3.14496e-07 24.5486 0C30.0903 -2.40611e-07 35 4.29751 35 13.9548C35 20.1355 32.2778 24.6745 28.7292 24.6745H28.2917L28.2431 25.2056H31.6375C33.2261 25.2056 34.5139 26.4934 34.5139 28.082ZM19.4444 17.1417H14.3403V15.0654C14.3403 12.9408 13.9028 7.919 10.0625 7.919C7.34028 7.919 5.44444 10.5265 5.44444 15.7414C5.44444 21.9704 7.58333 25.1573 13.4653 25.1573H20.0764C26.4444 25.1573 29.5069 20.715 29.5069 13.9065C29.5069 9.80218 28.1944 5.50467 24.1111 5.50467C19.6389 5.50467 19.4444 10.5748 19.4444 12.9891V17.1417Z" 
          />
        </svg>
        <LoadingText ref={textRef}>LOADING...</LoadingText>
      </LogoWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;