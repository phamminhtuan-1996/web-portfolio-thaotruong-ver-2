"use client";
import styled from 'styled-components';
import Link from 'next/link';

interface ButtonViewPortProps {
    href?: string;
    label?: string;
    hireText?: string;
    onClick?: () => void;
}

const DivParent = styled.div`
     transition: 0.5s;
     .btn-view-port__hire-me {
      width: 76px;
      height: 76px;
      background: white;
      font-size: 14px;
      border-radius: 11px;
      text-align: center;
      top: -70%;
      left: 50%;
      transform: translateX(-50%) rotate(270deg);
      transform-origin: 100% 100%;
      cursor: pointer;
      transition: transform 0.3s ease;
      opacity: 0;
      overflow: hidden;
      
    }
     &:hover .btn-view-port__hire-me {
        overflow: unset;
        transform: translateX(-50%) rotate(350deg);
        opacity: 1;
      }
    .skeleton__left {
       width: 7px;
      height: 7px;
      background: #D9D9D9;
      margin-right: 4px;
    }
    .skeleton__right {
      width: 46px;
      height: 7px;
      background: #D9D9D9;
    }
`;

const ButtonGradient = styled(Link)`
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


export default function ButtonViewPort({href = '', label = '', hireText='Hire me' }) {
    return (
        <DivParent className='position-relative'>
        <div className="btn-view-port__hire-me position-absolute">
                <span>{hireText}</span>
                <div className="skeleton d-flex justify-content-center mb-2">
                  <div className="skeleton__left"></div>
                  <div className="skeleton__right"></div>
                </div>
                <div className="skeleton d-flex justify-content-center mb-2">
                  <div className="skeleton__left"></div>
                  <div className="skeleton__right"></div>
                </div>
                <div className="skeleton d-flex justify-content-center mb-2">
                  <div className="skeleton__left"></div>
                  <div className="skeleton__right"></div>
                </div>
            </div>
              <ButtonGradient href={href}>
                <span>{label}</span>
                <span>→</span>
              </ButtonGradient>
        </DivParent>
    )
}