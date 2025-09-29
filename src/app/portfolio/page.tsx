"use client";
import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import Image from 'next/image';
import ModalProject from "@/components/ModalProject";
import ButtonViewPort from "@/components/ButtonViewPort";
import catePort from '@/data/cate-port.json';
import dataContent from '@/data/data-content.json';
import anime from 'animejs';
import { useLoading } from '@/components/LoadingProvider';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DivParent = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: calc(84px + 1rem) 0 0 0;
`;

const HeroSection = styled.section`
    text-align: center;
    padding: 32px 0 0;
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
    font-size: 64px;
    
    @media (max-width: 768px) {
        font-size: clamp(2rem, 10vw, 3rem);
        letter-spacing: -1px;
    }
`;

const HeroSubtitle = styled.p`
    font-size: 1.2rem;
    color: #9ca3af;
    margin-bottom: 8px;
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
    height: 100px;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: end;
    margin-bottom: 60px;
    flex-wrap: wrap;
    overflow: hidden;
    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

const FilterTabs = styled.div<{$isSticky?: boolean}>`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;
    padding: 0 20px;
    transition: all 0.3s ease;
    
    ${props => props.$isSticky ? `
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%)!important;
        z-index: 1000;
        
        /* Liquid glass effect - same as MainMenu */
        background: rgba(26, 26, 26, 0.4);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        
        /* Multiple layered shadows for depth */
        box-shadow: 
            0 0 40px rgba(255, 255, 255, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 2px 3px rgba(255, 255, 255, 0.2),
            inset 0 -2px 3px rgba(0, 0, 0, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
        
        /* Glass border effect */
        border: 1px solid rgba(255, 255, 255, 0.18);
        
        border-radius: 1000px;
        padding: 16px 24px;
        margin-bottom: 0;
        width: auto;
        height: auto;
        
        &:hover {
            background: rgba(26, 26, 26, 0.5);
            box-shadow: 
                0 0 50px rgba(255, 255, 255, 0.08),
                0 10px 40px rgba(0, 0, 0, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.25),
                inset 0 -2px 4px rgba(0, 0, 0, 0.25),
                inset 0 0 25px rgba(255, 255, 255, 0.08);
        }
    ` : ''}
    
    @media (max-width: 768px) {
        gap: 8px;
        // margin-bottom: 40px;
        overflow-x: auto;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding: 0 16px;
        -webkit-overflow-scrolling: touch;
        
        ${props => props.$isSticky && `
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
            border-radius: 0;
            width: 100%;
            padding: 12px 16px;
            transform: unset!important;
        `}
        
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

const FilterTabsPlaceholder = styled.div<{$isSticky: boolean}>`
    height: ${props => props.$isSticky ? '60px' : '0'};
    transition: height 0.3s ease;
    @media (max-width: 768px) {
        height: ${props => props.$isSticky ? '48px' : '0'};
    }
`;

export default function Portfolio() {
    const { isLoading } = useLoading();
    const filterDefaultHarcode: FilterDefaultHarcode[] = catePort.map((item) => ({...item, isChecked: item.label === 'All'}))
    const [filtersDefault, setFiltersDefault] = useState<FilterDefaultHarcode[]>([...filterDefaultHarcode]);
    const [isShowModalProject, setShowModalProject] = useState<boolean>(false);
    const [dataPick, setDataPick] = useState<ListProjectItemDefault | null>({id: 0, img: '', filter: [], content: ''});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isotope = useRef<any>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const filterTabsRef = useRef<HTMLDivElement | null>(null);
    const [passedFilterTabs, setPassedFilterTabs] = useState(false);
    const filterTabsInitialTop = useRef<number>(0);
    
    // Keep the original listProjectItemDefault unchanged
    const listProjectItemDefault: ListProjectItemDefault[] = dataContent.map((item) => ({...item, filter: [item.filter]}))
    
    // Initialize Isotope
    useEffect(() => {
        // Dynamic import Isotope only on client side
        const initIsotope = async () => {
            if (typeof window !== 'undefined' && gridRef.current) {
                const Isotope = (await import('isotope-layout')).default;
                
                isotope.current = new Isotope(gridRef.current, {
                    itemSelector: '.project-item',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.4s',
                    fitRows: {
                        gutter: 0
                    }
                });
                
                // Don't animate here - will be handled by hero animation
            }
        };
        
        initIsotope();
        
        return () => {
            isotope.current?.destroy();
        };
    }, []);
    
    // Handle scroll event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = (event: any) => {
        // Use the stored initial position instead of current offsetTop
        const positionScroll = event.target.scrollTop || 0;
        setPassedFilterTabs(positionScroll >= (filterTabsInitialTop.current - 48));
    };
    
    // Add scroll event listener and store initial position
    useEffect(() => {
        // Store the initial position of FilterTabs when component mounts
        if (filterTabsRef.current && filterTabsInitialTop.current === 0) {
            filterTabsInitialTop.current = filterTabsRef.current.offsetTop;
        }
        
        const bodyElement = document.body;
        bodyElement.addEventListener('scroll', handleScroll);
        
        // Cleanup function to remove event listener
        return () => {
            bodyElement.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Hide elements initially for animation
    const hideHeroElements = () => {
        const elements = [
            '.hero-title',
            '.hero-subtitle',
            '.cta-section',
            '.filter-tabs',
            '.portfolio-grid'
        ];
        
        elements.forEach(selector => {
            const el = document.querySelector(selector) as HTMLElement;
            if (el) el.style.opacity = '0';
        });
        
        // Also hide project items
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item) => {
            const el = item as HTMLElement;
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
    };

    // Hero animation function
    const animateHero = () => {
        anime.timeline({loop: false})
            .add({
                targets: '.hero-title',
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 1200,
                easing: 'easeOutExpo'
            })
            .add({
                targets: '.hero-subtitle',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            }, '-=800')
            .add({
                targets: '.cta-section',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            }, '-=600')
            .add({
                targets: '.filter-tabs',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 900,
                easing: 'easeOutExpo'
            }, '-=500')
            .add({
                targets: '.portfolio-grid',
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo'
            }, '-=400')
            .add({
                targets: '.project-item',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            }, '-=800');
    };

    // Animation on load
    useEffect(() => {
        // Hide elements on mount
        hideHeroElements();
        
        // Only run animation after loading is complete
        if (!isLoading) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                // Call hero animation function
                animateHero();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    // Check URL for portfolio ID on load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get('id');
        
        if (portfolioId) {
            const portfolioItem = listProjectItemDefault.find(item => item.id.toString() === portfolioId);
            if (portfolioItem) {
                handleShowPopup(portfolioItem);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        
        // Update URL with portfolio ID and remove cv param if present
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('cv'); // Remove cv query param if it exists
        currentUrl.searchParams.set('id', data.id.toString());
        window.history.pushState({}, '', currentUrl.toString());
    };
    
    const handleCloseModal = (val: boolean) => {
        setShowModalProject(val);
        
        // Remove portfolio ID from URL when closing modal
        if (!val) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('id');
            window.history.pushState({}, '', currentUrl.toString());
        }
    };
    useEffect(() => {
        const mainMenu = document.querySelector('.main-menu');
        if (passedFilterTabs) {
            mainMenu?.classList.add('d-none');
        } else {
            mainMenu?.classList.remove('d-none');
        }
    }, [passedFilterTabs]);
    
    return (
        <DivParent>
            <HeroSection>
                <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px' }}>
                    <HeroTitle className="hero-title">Projects</HeroTitle>
                    <HeroSubtitle className="hero-subtitle">
                        Design that solves problems - where creativity meets functionality
                    </HeroSubtitle>
                    <CTASection className="cta-section">
                        <ButtonViewPort 
                            label="Contact Now" 
                            hireText="Let's talk"
                            href="/contact"
                        />
                    </CTASection>
                </div>
            </HeroSection>
            
            <FilterTabsPlaceholder $isSticky={passedFilterTabs} />
            <div style={{ maxWidth: passedFilterTabs ? '100%' : '1320px', margin: '0 auto', padding: passedFilterTabs ? '0' : '0 20px' }}>
                <FilterTabs ref={filterTabsRef} $isSticky={passedFilterTabs} className="filter-tabs">
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
                <IsotopeGrid ref={gridRef} className="portfolio-grid">
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
                handleClose={handleCloseModal}
            />
        </DivParent>
    );
}