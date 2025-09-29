"use client";
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.15s ease-out, opacity 0.15s ease;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  
  &.cursor-hover {
    transform: translate(-50%, -50%) scale(2);
    background: rgba(65, 110, 194, 0.8);
    border-color: rgba(65, 110, 194, 0.5);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorTrail = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;
    
    if (!cursorDot || !cursorTrail) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move the dot immediately
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
      
      // Move the trail with delay
      setTimeout(() => {
        cursorTrail.style.left = `${clientX}px`;
        cursorTrail.style.top = `${clientY}px`;
      }, 50);
    };
    
    // Add hover effect for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.style.cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.project-item') ||
        target.closest('.btn')
      ) {
        cursorDot.classList.add('cursor-hover');
      }
    };
    
    const handleMouseOut = () => {
      cursorDot.classList.remove('cursor-hover');
    };
    
    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      cursorDot.style.opacity = '0';
      cursorTrail.style.opacity = '0';
    };
    
    const handleMouseEnter = () => {
      cursorDot.style.opacity = '1';
      cursorTrail.style.opacity = '1';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add styles to hide default cursor on all elements
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Cleanup
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
      style.remove();
    };
  }, []);
  
  return (
    <>
      <CursorDot ref={cursorDotRef} />
      <CursorTrail ref={cursorTrailRef} />
    </>
  );
}