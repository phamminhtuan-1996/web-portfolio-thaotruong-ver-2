"use client";
import {useState, useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from 'react-bootstrap';
import ModalProject from "@/components/ModalProject";

const DivParent = styled.div`
width: 100%;
height: 100%;
padding: 44px 40px 0 40px;
background-color: #090909;
.title-port {
    font-size: 32px;
}
.title-port:nth-child(2) {
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right,#FAC59F, #6B47AB)!important;
}
.title-port-wrap::after {
    content: "";
    display: block;
    width: 438px;
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
    font-weight: 700;
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
    object-fit: cover;
}
.project-item-col {
    transform: scale(0);
    transition: 0.5s;
}
.off-effect {
    animation: show-off 0.5s forwards;
    transform: scale(0);
}
.show-effect {
    animation: show-on 0.5s forwards;
    transform: scale(1) translate(0, 0);
}
.list-project {
    transition: 0.5s;
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
`
export default function porfolio () {
    const filterDefaultHarcode = [
    { color: 'ALL', isChecked: true, label: "ALL",   },
    { color: '#FAC59F', isChecked: false, label: "UX/UI Design",  },
    { color: '#7E57A9', isChecked: false, label: "Branding",   },
    { color: '#FAC59A',  isChecked: false, label: "Graphic Design",  },
    { color: '#FAC59C', isChecked: false,  label: "Digital Painting",   },
    { color: '#D5FA1B', isChecked: false, label: "2D GAME",   }
  ];
    const [filtersDefault, setFiltersDefault] = useState([...filterDefaultHarcode]);
    const [filter, setFilter] = useState<any>([]);
    const [isShowModalProject, setShowModalProject] = useState(false);
    const [dataPick, setDataPick] = useState({});
      const listProjectItemDefault: any[] = [
        {
            id:'1', 
            img: 'img/dudu-project.png', 
            filter: ['#FAC59F']
        },
        {
            id: '2', 
            img: 'img/game-conga.png', 
            filter: ['#D5FA1B']
        }
      ];

      const handleOnfiler = (index: number) => {
        let arrayCustomer = filtersDefault.map((item, indexs) => ({...item, isChecked: index === indexs }));
        setFiltersDefault(arrayCustomer);
      }
      const getShowOnItem = (item: any) => {
        let result = false;
        if (filter.length === 0) {
            return 'show-effect';
        }
        filter.forEach((items: string) => {
            if (item.filter.includes(items)) {
                result = true;
            }
        })
        return result ? "show-effect" : 'off-effect';
      }

      const handleShowPopup = (data: any) => {
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
                    <Col md={9}>
                        <div className="title-port-wrap d-flex align-items-center">
                            <h1 className="title-port text-white">Design that solve problem</h1>
                        </div>
                        <h1 className="title-port">Where creativity meets functionality. </h1>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </header>
            <div className="list-cate">
                {filtersDefault.map((item, index) => (
                    <button
                        className={`btn ${item.isChecked ? "bg-dark " : ""}`}
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
                                className="project-item overflow-hidden w-100 position-relative bg-dark"
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
                                <img
                                    src={item.img}
                                    alt={item.cate}
                                    className="project-item__img w-100 h-100"
                                />
                            </div>
                        </Col>
                    ))}
                   </Row>
            </div>
            <ModalProject 
                show={isShowModalProject} 
                data={dataPick} 
                handleClose={(val) => setShowModalProject(val)}
            />
        </DivParent>
    )
}