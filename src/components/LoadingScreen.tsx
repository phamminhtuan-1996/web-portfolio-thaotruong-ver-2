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
  width: 175px;
  height: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .logo-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 30px rgba(74, 144, 226, 0.5));
  }
  
  .logo-outline {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  
  .logo-fill {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    
    path {
      fill: url(#waterGradient);
    }
  }
  
  .water-mask {
    clip-path: url(#logoClip);
  }
`;


interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 3500 
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!logoRef.current || !waterRef.current) return;

    const outlinePath = logoRef.current.querySelector('.logo-outline path');
    const fillPath = logoRef.current.querySelector('.logo-fill path');
    
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

    // Animate logo outline drawing
    timeline
      .add({
        targets: outlinePath,
        strokeDashoffset: [anime.setDashoffset, 0],
        stroke: '#ffffff',
        fill: 'none',
        strokeWidth: 1,
        duration: 1500,
        easing: 'easeInOutSine',
      })
      // Animate water filling effect
      .add({
        targets: waterRef.current,
        y: [31, 0],
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: () => {
          // Start bubble animation after water is filled
          const bubbles = document.querySelectorAll('.bubble');
          bubbles.forEach((bubble, index) => {
            anime({
              targets: bubble,
              // Rise from bottom (35) to top of logo (0)
              translateY: [0, -35],
              // Slight horizontal drift
              translateX: anime.random(-2, 2),
              // Fade in and out  
              opacity: [0, 0.6, 0.6, 0],
              // Natural bubble growth
              scale: [0, 1, 1, 0.5],
              duration: 2000,
              delay: index * 150,
              loop: 2,
              easing: 'linear'
            });
          });
        }
      }, '-=500')
      // Fade out everything
      .add({
        targets: logoRef.current,
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 400,
        easing: 'easeInQuad',
      }, '+=1500');


    return () => {
      anime.remove(outlinePath);
      anime.remove(fillPath);
      anime.remove(waterRef.current);
      anime.remove(logoRef.current);
      anime.remove('.bubble');
    };
  }, [duration, onLoadingComplete]);

  return (
    <LoadingContainer $isLoading={isLoading}>
      <LogoWrapper ref={logoRef}>
        <div className="logo-container">
          {/* SVG with gradient and mask definitions */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <clipPath id="logoClip">
                <path d="M34.5139 28.082C34.5139 29.6679 33.2301 30.9547 31.6441 30.9583L13.4653 31C4.42361 31 4.611e-07 25.8816 0 15.4034C-3.76095e-07 6.8567 4.18056 2.26947 9.625 2.26947C14.875 2.26947 16.1389 5.93925 16.1389 9.12617L16.6736 9.12617C16.6736 5.93925 17.3056 3.14496e-07 24.5486 0C30.0903 -2.40611e-07 35 4.29751 35 13.9548C35 20.1355 32.2778 24.6745 28.7292 24.6745H28.2917L28.2431 25.2056H31.6375C33.2261 25.2056 34.5139 26.4934 34.5139 28.082ZM19.4444 17.1417H14.3403V15.0654C14.3403 12.9408 13.9028 7.919 10.0625 7.919C7.34028 7.919 5.44444 10.5265 5.44444 15.7414C5.44444 21.9704 7.58333 25.1573 13.4653 25.1573H20.0764C26.4444 25.1573 29.5069 20.715 29.5069 13.9065C29.5069 9.80218 28.1944 5.50467 24.1111 5.50467C19.6389 5.50467 19.4444 10.5748 19.4444 12.9891V17.1417Z" />
              </clipPath>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#54B9F4" stopOpacity="0.9">
                  <animate attributeName="stopColor" values="#54B9F4;#416EC2;#2067C6;#54B9F4" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#2067C6" stopOpacity="1">
                  <animate attributeName="stopColor" values="#2067C6;#54B9F4;#416EC2;#2067C6" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#416EC2" stopOpacity="1">
                  <animate attributeName="stopColor" values="#416EC2;#2067C6;#54B9F4;#416EC2" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Water fill layer */}
          <svg 
            className="logo-fill"
            width="35" 
            height="31" 
            viewBox="-2 -2 39 35" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <g clipPath="url(#logoClip)">
              <rect 
                ref={waterRef}
                x="-20" 
                y="31" 
                width="75" 
                height="40" 
                fill="url(#waterGradient)"
              />
              {/* Bubbles - inside clip path to stay within logo shape */}
              <g className="bubble-group">
                <circle className="bubble" cx="10" cy="35" r="1" fill="rgba(255,255,255,0.6)" />
                <circle className="bubble" cx="18" cy="35" r="1.3" fill="rgba(255,255,255,0.6)" />
                <circle className="bubble" cx="25" cy="35" r="0.8" fill="rgba(255,255,255,0.6)" />
                <circle className="bubble" cx="14" cy="35" r="1.1" fill="rgba(255,255,255,0.6)" />
                <circle className="bubble" cx="22" cy="35" r="0.9" fill="rgba(255,255,255,0.6)" />
              </g>
            </g>
          </svg>
          
          {/* Logo outline */}
          <svg 
            className="logo-outline"
            width="35" 
            height="31" 
            viewBox="-2 -2 39 35" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M34.5139 28.082C34.5139 29.6679 33.2301 30.9547 31.6441 30.9583L13.4653 31C4.42361 31 4.611e-07 25.8816 0 15.4034C-3.76095e-07 6.8567 4.18056 2.26947 9.625 2.26947C14.875 2.26947 16.1389 5.93925 16.1389 9.12617L16.6736 9.12617C16.6736 5.93925 17.3056 3.14496e-07 24.5486 0C30.0903 -2.40611e-07 35 4.29751 35 13.9548C35 20.1355 32.2778 24.6745 28.7292 24.6745H28.2917L28.2431 25.2056H31.6375C33.2261 25.2056 34.5139 26.4934 34.5139 28.082ZM19.4444 17.1417H14.3403V15.0654C14.3403 12.9408 13.9028 7.919 10.0625 7.919C7.34028 7.919 5.44444 10.5265 5.44444 15.7414C5.44444 21.9704 7.58333 25.1573 13.4653 25.1573H20.0764C26.4444 25.1573 29.5069 20.715 29.5069 13.9065C29.5069 9.80218 28.1944 5.50467 24.1111 5.50467C19.6389 5.50467 19.4444 10.5748 19.4444 12.9891V17.1417Z" 
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </LogoWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;