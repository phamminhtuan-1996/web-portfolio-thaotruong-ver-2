"use client";
import {useState, useEffect} from 'react';
import styled from "styled-components";

const DivParent = styled.div`
    flex-wrap: nowrap;
    max-width: 100vw;
    .train-client__item {
        width: 200px;
        height: 112px;
        border-radius: 14px;
        margin-right: 30px;
    }
`;

export default function TrainClients({data = ['']}) {

    const [listItem, setListItem] = useState<string[]>([...data, ...data, ...data]);
    const [tranSlate, setTranslate] = useState<number>(0);
    useEffect(() => {
        console.log(listItem.length);
        if (listItem.length >= 200) {
            setListItem((prev) => prev.slice(24));
        }
    }, [listItem])
    
    useEffect(() => {
        let count = 0;
        let countLifeCycle = 70;
        const interval = setInterval(() => {
            count += 1;
            setTranslate(count);
            if (countLifeCycle === count) {
                countLifeCycle += 70;
                setListItem((prev) => [...prev, ...data, ...data, ...data]);
            }   
        }, 200);
        return () => clearInterval(interval);
    }, [])
    return (
        <DivParent className="d-flex overflow-hidden">
             <div className="d-flex justify-content-between" style={{transform: `translateX(-${tranSlate}%)`, transition: `0.5s`}}>
                {listItem.map((item, index) => (
                    <div className="train-client__item bg-dark pa-4 d-flex justify-content-center align-items-center" key={index}>
                        <img src={item} alt="clients" />
                    </div>
                    
                ))}
            </div>
            
        </DivParent>
    )
}