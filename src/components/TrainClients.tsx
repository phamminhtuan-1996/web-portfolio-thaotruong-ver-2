"use client";
import {useState, useEffect} from 'react';
import Image from 'next/image';
import styled from "styled-components";

const DivParent = styled.div`
    flex-wrap: nowrap;
    max-width: 100vw;
    scroll-behavior: smooth;
    .train-client__item {
        width: 200px;
        height: 112px;
        border-radius: 14px;
        margin-right: 30px;
    }
`;

type LitItem = {
    img: string;
    value: number;
}

export default function TrainClients({data = ['']}) {
    const dataCustom: LitItem[] = data.map((item) => ({img: item, value: 0}));
    const [listItem, setListItem] = useState<LitItem[]>([...dataCustom, ...dataCustom,]);
    const [tranSlate, setTranslate] = useState<number>(0);
    const [countCyper, setCountCyber] = useState<number>(600);
    useEffect(() => {
        if (listItem.length >= 1000) {
            const customData = listItem.splice(600);
            setListItem(customData);
        }
    }, [listItem])
    useEffect(() => {
        if (tranSlate === countCyper) {
            setCountCyber((prev) => prev + 600);
            setListItem((prev) => [...prev, ...prev]);
        }
    }, [tranSlate, countCyper])
    useEffect(() => {
        const interval = setInterval(() => {
            setTranslate(((prev) => prev + 5))
            setListItem((prev) => prev.map((item) => ({...item, value: item.value + 5})));
        }, 100)
        return () => clearInterval(interval);
    }, [])
    return (
        <DivParent className="d-flex overflow-hidden">
             <div className="d-flex justify-content-between">
                {listItem.map((item, index) => (
                    <div
                        className="train-client__item bg-dark pa-4 d-flex justify-content-center align-items-center" 
                        key={index}
                        style={{transform: `translateX(-${item.value}%)`, transition: `0.5s`}}
                    >
                        <Image src={item.img} alt="clients" width={150} height={80} style={{objectFit: 'contain'}}/>
                    </div>
                ))}
            </div>
            
        </DivParent>
    )
}