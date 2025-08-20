"use client";
import {useState, useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from 'react-bootstrap';
import Image from 'next/image';
import ModalProject from "@/components/ModalProject";
import catePort from '@/data/cate-port.json';
import dataContent from '@/data/data-content.json';
import {isMobileOrSmallScreen} from '@/utils/helper';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const DivParent = styled.div`
width: 100%;
min-height: 100vh;
padding: 44px 40px 0 40px;
background-color: #090909;
padding-bottom: 150px;
.title-port {
    font-size: 32px;
    white-space: nowrap;
}
.title-port:nth-child(2) {
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right,#FAC59F, #6B47AB)!important;
}
.title-port-wrap::after {
    content: "";
    display: block;
    width: 60%;
    height: 1px;
    background-color: white;
}
.title-port-wrap .title-port {
    margin-right: 32px;
}
.list-cate {
    margin-top: 21px;
}
.list-cate .btn {
    color: white;
    font-size: 20px;
    margin-right: 32px;

}

.list-cate .btn:hover {
    background-color: #6229CC!important;
}

.project-item {
    height: 284px;
    border-radius: 20px;
    transition: 0.5s;
}
.project-item__label--tag {
    width: 10px;
    height: 10px;
    margin-right: 8px;
}
.project-item__label {
    padding: 7.5px 16px;
    background-color: #00000033;
    top: 25px;
    left: 17px;
    border-radius: 8px;
}
.project-item__label--title {
    font-size: 12px;
    font-weight: 700;
}
.project-item__img {
    width: 100%!important;
    height: 100%!important;
    object-fit: cover;
}
.project-item-col {
    transform: scale(0);
    transition: 0.5s;
}
.off-effect {
    animation: show-off 0.5s forwards;
    transform: scale(0);
    display:block
}
.show-effect {
    animation: show-on 0.5s forwards;
    transform: scale(1) translate(0, 0);
}
.list-project {
    transition: 0.5s;
}
.project-item:hover .project-item__shield {
    opacity: 1;
}
.project-item__shield {
    width: 100%;
    height: 100%;
    background-color: #000000a1;
    opacity: 0;
    transition: 0.5s;
}
.project-item__shield--title {
    font-size: 16px;
    font-weight: 600;
}
@keyframes show-off {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0);
        display: none;
    }
  }
@keyframes show-on {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1) translate(0, 0);
        display: block;
    }
  }
  .img-port-top {
    width: 50%;
    height: calc(100% + 190px);
    object-fit: cover;
    top: -60%;
    right: 0;
  }
  .img-port-top:first-child {
    left: 0;
  }
  @media (max-width: 990px) {
    padding: 16px 16px 64px 16px;
    .project-item {
        height: 224px;
    }
    .title-port {
        font-size: 16px;
    }
    .title-port {
        margin-right: 16px!important;
    }
    .title-port-wrap::after {
        width: 30%;
    }
    .list-cate {
        max-width: calc(100vw -(16px* 2));
        overflow: auto;
        display: flex;
    }
    .list-cate .btn {
        width: auto!important;
        font-size: 14px;
        padding: 8px;
        margin: 0px;
        white-space: nowrap;
        margin-right: 1rem;
    }
    .list-cate .btn:hover {
        background-color: #212529!important;
    }
  }
`
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
export default function Portfolio () {
    const filterDefaultHarcode: FilterDefaultHarcode[] = catePort.map((item) => ({...item, isChecked: item.label === 'All'}))
    const [filtersDefault, setFiltersDefault] = useState<FilterDefaultHarcode[]>([...filterDefaultHarcode]);
    const [filter, setFilter] = useState<string[]>([]);
    const [isShowModalProject, setShowModalProject] = useState<boolean>(false);
    const [dataPick, setDataPick] = useState<ListProjectItemDefault | null>({id: 0, img: '', filter: [], content: ''});

    const listProjectItemDefault: ListProjectItemDefault[] = dataContent.map((item) => ({...item, filter: [item.filter]}))

      const handleOnfiler = (index: number) => {
        const arrayCustomer = [...filtersDefault.map((item, indexs) => ({...item, isChecked: index === indexs }))];
        setFiltersDefault(arrayCustomer);
      }
      const getShowOnItem = (item: ListProjectItemDefault) => {
        let result = false;
        if (filter.length === 0) {
            return 'show-effect';
        }
        filter.forEach((items: string) => {
            if (item.filter.includes(items)) {
                result = true;
            }
        })
        return result ? "show-effect" : isMobileOrSmallScreen() ? 'd-none' : 'off-effect';
      }

      const handleShowPopup = (data: ListProjectItemDefault) => {
        setDataPick({...data});
        setShowModalProject(true);
      }

      useEffect(() => {
        const customFilter = filtersDefault.filter((item) => item.isChecked).map((item) => item.color);
        if (customFilter[0] !== 'ALL') {
            setFilter(customFilter);
            return;
        }
        setFilter([]);
      }, [filtersDefault])
    return (
        <DivParent>
            <header>
                
                    <Row>
                        <Col md={10}>
                            <div className="title-port-wrap d-flex align-items-center">
                                <h1 className="title-port text-white">Design that solve problem</h1>
                            </div>
                            <h1 className="title-port">Where creativity meets functionality. </h1>
                        </Col>
                        <Col md={2} className="position-relative">
                            {!isMobileOrSmallScreen() && (
                                <>
                                    <Image src="/img/animation-port.gif" alt="Animation port" className="img-port-top position-absolute" width={100} height={100}/>
                                    <Image src="/img/animation-port.gif" alt="Animation port" className="img-port-top position-absolute" width={100} height={100}/>
                                </>
                            )} 
                        </Col>
                    </Row>
                
            </header>
          
                <div className="list-cate">
                    {filtersDefault.map((item, index) => (
                        <button
                            className={`btn ${item.isChecked ? "bg-dark" : ""}`}
                            key={index}
                            onClick={() => handleOnfiler(index)}
                        >
                            {item.label}
                        </button> 
                    ))}
                </div>
            <div className="list-project mt-4">
                   <Row>
                   {listProjectItemDefault.map((item, index) => (
                        <Col
                            md="4"
                            key={index}
                            className={`project-item-col ${getShowOnItem(item)}`}
                            onClick={() => handleShowPopup(item)}
                        >
                            <div
                                className="project-item overflow-hidden w-100 position-relative bg-dark mb-4"
                            >
                                <div className="project-item__label position-absolute d-flex align-items-center">
                                    <div
                                        className="project-item__label--tag rounded-circle"
                                        style={{ backgroundColor: filterDefaultHarcode.find((items) => items.color === item.filter[0])?.color }}
                                    ></div>
                                    <div className="project-item__label--title text-white">
                                        {filterDefaultHarcode.find((items) => items.color === item.filter[0])?.label}
                                    </div>
                                </div>
                                {!item.content && (
                                    <div className="project-item__shield position-absolute  d-flex align-items-center justify-content-center">
                                        <span className="project-item__shield--title text-white"
                                          // eslint-disable-next-line react/no-unescaped-entities
                                        >Oops! I'm still working on it</span>
                                    </div>
                                )}
                                <Image
                                    src={item.img.startsWith('http') ? item.img : (item.img.startsWith('/') ? item.img : '/' + item.img)}
                                    alt={item.nameProject || "Project image"}
                                    width={421}
                                    height={272}
                                    className="project-item__img"
                                />
                            </div>
                        </Col>
                    ))}
                   </Row>
            </div>
            <ModalProject 
                show={isShowModalProject} 
                data={dataPick  as ListProjectItemDefault | null | undefined} 
                handleClose={(val) => setShowModalProject(val)}
            />
        </DivParent>
    )
}