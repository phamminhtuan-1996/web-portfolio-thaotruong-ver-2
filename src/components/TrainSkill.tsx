import {useState, useEffect} from 'react';
import styled from "styled-components";
import Image from "next/image";

const DivParent = styled.div`
    overflow: hidden;
    max-width: 100vw;
    flex-wrap: nowrap;
    &::before {
        content: ""
        display: block;
        position: absolute;
        left: 0;
    }
`;

export default function TrainSkill({data = ['']}) {
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
        }, 100);
        return () => clearInterval(interval);
    }, [])
    return (
        <DivParent className=" mt-4">
            <div className="d-flex justify-content-between" style={{transform: `translateX(-${tranSlate}%)`, transition: `0.5s`}}>
            {listItem.length > 0 && listItem.map((item, key) => (
                <div
                    className="skill-item d-flex align-items-center me-4 text-nowrap"
                    key={key}
                >
                    <Image
                        src='img/start-skill.svg'
                        width={40}
                        height={40}
                        alt="Skill"
                        className="me-2"
                    />
                <span className="text-uppercase text-white fw-bold">{item}</span>
            </div>
            ))}
            </div>
        </DivParent>
    )
}