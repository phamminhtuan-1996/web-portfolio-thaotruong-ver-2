"use client";
import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import Image from 'next/image';
import ModalProject from "@/components/ModalProject";
import ButtonViewPort from "@/components/ButtonViewPort";
import catePort from '@/data/cate-port.json';
import dataContent from '@/data/data-content.json';
import anime from 'animejs';
import Isotope from 'isotope-layout';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DivParent = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
    // padding-bottom: 150px;
    padding: calc(84px + 5rem) 0 0 0;
`;

const HeroSection = styled.section`
    text-align: center;
    padding: 80px 0 60px;
    background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    
    @media (max-width: 768px) {
        padding: 40px 0 30px;
    }
`;

const HeroTitle = styled.h1`
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    background: linear-gradient(135deg, #416EC2, #2067C6, #54B9F4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
    letter-spacing: -2px;
    text-transform: uppercase;
    line-height: 1.1;
    
    @media (max-width: 768px) {
        font-size: clamp(2rem, 10vw, 3rem);
        letter-spacing: -1px;
    }
`;

const HeroSubtitle = styled.p`
    font-size: 1.2rem;
    color: #9ca3af;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0 20px;
        margin-bottom: 30px;
    }
`;

const CTASection = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

const FilterTabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;
    padding: 0 20px;
    
    @media (max-width: 768px) {
        gap: 8px;
        margin-bottom: 40px;
        overflow-x: auto;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding: 0 16px;
        -webkit-overflow-scrolling: touch;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

const FilterTab = styled.button<{$isActive: boolean}>`
    background: ${props => props.$isActive 
        ? 'rgba(59, 130, 246, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.$isActive 
        ? 'rgba(59, 130, 246, 0.5)' 
        : 'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.$isActive ? '#3b82f6' : '#9ca3af'};
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    white-space: nowrap;
    
    &:hover {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
        border-color: rgba(59, 130, 246, 0.5);
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
        flex-shrink: 0;
    }
`;

const ProjectsGrid = styled.div`
    padding: 0 40px 80px;
    max-width: 1440px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        padding: 0 16px 60px;
    }
`;

const ProjectItem = styled.div`
    width: 33.333333%;
    padding: 12px;
    
    @media (max-width: 990px) {
        width: 50%;
    }
    
    @media (max-width: 767px) {
        width: 100%;
    }
`;

const ProjectCategory = styled.span<{$color?: string}>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #00000033;
    color: #f4f4f4ff;
    padding: 6px 12px;
    border-radius: 7.65px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    z-index: 1;
    position: relative;
    width: fit-content;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

const ProjectCard = styled.div`
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    height: 280px;
    display: flex;
    flex-direction: column;
    
    &:hover {
        transform: translateY(-8px);
        border-color: rgba(59, 130, 246, 0.5);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        
        &::before {
            opacity: 1;
        }
        
        .project-shield {
            opacity: 1;
        }
        
        ${ProjectCategory} {
            opacity: 1;
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.1) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    @media (max-width: 768px) {
        height: 240px;
        padding: 16px;
    }
`;

const ProjectImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProjectShield = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
    
    span {
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
    }
`;
const CircleLabel = styled.div`
        width: 10px;
        height: 10px;
        border-radius: 100%;
`

// Keep the original data structure
type ListProjectItemDefault = {
    id: number;
    img: string;
    filter: string[];
    content: string | null;
    nameProject?: string;
}

type FilterDefaultHarcode = {
    color: string, 
    isChecked: boolean, 
    label: string,  
}


const IsotopeGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
`;

export default function Portfolio() {
    const filterDefaultHarcode: FilterDefaultHarcode[] = catePort.map((item) => ({...item, isChecked: item.label === 'All'}))
    const [filtersDefault, setFiltersDefault] = useState<FilterDefaultHarcode[]>([...filterDefaultHarcode]);
    const [isShowModalProject, setShowModalProject] = useState<boolean>(false);
    const [dataPick, setDataPick] = useState<ListProjectItemDefault | null>({id: 0, img: '', filter: [], content: ''});
    const isotope = useRef<Isotope | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    
    // Keep the original listProjectItemDefault unchanged
    const listProjectItemDefault: ListProjectItemDefault[] = dataContent.map((item) => ({...item, filter: [item.filter]}))
    
    // Initialize Isotope
    useEffect(() => {
        if (gridRef.current) {
            isotope.current = new Isotope(gridRef.current, {
                itemSelector: '.project-item',
                layoutMode: 'fitRows',
                transitionDuration: '0.4s',
                fitRows: {
                    gutter: 0
                }
            });
            
            // Animate cards on load
            anime({
                targets: '.project-item',
                translateY: [30, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: 'easeOutExpo',
                duration: 800
            });
        }
        
        return () => {
            isotope.current?.destroy();
        };
    }, []);
    
    // Handle filter with Isotope
    useEffect(() => {
        if (isotope.current) {
            const activeFilter = filtersDefault.find(item => item.isChecked);
            
            if (activeFilter?.label === 'All') {
                isotope.current.arrange({ filter: '*' });
            } else if (activeFilter) {
                isotope.current.arrange({ 
                    filter: `[data-filter="${activeFilter.color}"]` 
                });
            }
        }
    }, [filtersDefault]);
    
    const handleOnFilter = (index: number) => {
        const arrayCustomer = [...filtersDefault.map((item, indexs) => ({...item, isChecked: index === indexs }))];
        setFiltersDefault(arrayCustomer);
        
        // Animate filter button
        anime({
            targets: `.filter-tab-${index}`,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    };
    
    
    const handleShowPopup = (data: ListProjectItemDefault) => {
        setDataPick({...data});
        setShowModalProject(true);
    };
    
    
    return (
        <DivParent>
            <HeroSection>
                <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px' }}>
                    <HeroTitle>Projects</HeroTitle>
                    <HeroSubtitle>
                        Design that solves problems - where creativity meets functionality
                    </HeroSubtitle>
                    <CTASection>
                        <ButtonViewPort 
                            label="Contact Now" 
                            hireText="Let's talk"
                            href="/about#message"
                        />
                    </CTASection>
                </div>
            </HeroSection>
            
            <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px' }}>
                <FilterTabs>
                    {filtersDefault.map((item, index) => (
                        <FilterTab
                            key={index}
                            className={`filter-tab-${index}`}
                            $isActive={item.isChecked}
                            onClick={() => handleOnFilter(index)}
                        >
                            {item.label}
                        </FilterTab>
                    ))}
                </FilterTabs>
            </div>
            
            <ProjectsGrid>
                <IsotopeGrid ref={gridRef}>
                    {listProjectItemDefault.map((item, index) => {
                        const categoryInfo = filterDefaultHarcode.find((items) => items.color === item.filter[0]);
                        
                        return (
                            <ProjectItem
                                key={index}
                                className="project-item"
                                data-filter={item.filter[0]}
                                onClick={() => handleShowPopup(item)}
                            >
                                <ProjectCard>
                                                {item.img && (
                                                    <ProjectImage>
                                                        <Image
                                                            src={item.img.startsWith('http') ? item.img : (item.img.startsWith('/') ? item.img : '/' + item.img)}
                                                            alt={item.nameProject || "Project image"}
                                                            width={400}
                                                            height={280}
                                                        />
                                                    </ProjectImage>
                                                )}
                                                
                                                <ProjectCategory $color={item.filter[0]}>
                                                    <CircleLabel style={{backgroundColor: item.filter[0]}}/>
                                                    {categoryInfo?.label || 'Project'}
                                                </ProjectCategory>
                                                
                                                {!item.content && (
                                                    <ProjectShield className="project-shield">
                                                        <span>Oops! I&apos;m still working on it</span>
                                                    </ProjectShield>
                                                )}
                                </ProjectCard>
                            </ProjectItem>
                        );
                    })}
                </IsotopeGrid>
            </ProjectsGrid>
            
            <ModalProject 
                show={isShowModalProject} 
                data={dataPick as ListProjectItemDefault | null | undefined} 
                handleClose={(val) => setShowModalProject(val)}
            />
        </DivParent>
    );
}