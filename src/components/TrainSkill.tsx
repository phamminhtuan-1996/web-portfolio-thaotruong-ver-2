import {useState, useEffect} from 'react';
import styled from "styled-components";
import Image from "next/image";

const DivParent = styled.div`
    overflow: hidden;
    max-width: 100vw;
    flex-wrap: nowrap;
    .skill-item {
        
    }
`;

export default function TrainSkill({data = ['']}) {
    const [listItem, setListItem] = useState([...data, ...data, ...data]);
    const [tranSlate, setTranslate] = useState(0);
    const [countLifeCycle, setCountLifeCycle] = useState(70)
    useEffect(() => {
        console.log(listItem.length);
        if (listItem.length >= 200) {
            setListItem((prev) => prev.slice(100));
            setTranslate(0);
            setCountLifeCycle(0);
        }
    }, [listItem])
    useEffect(() => {
        let count = 0;
        // let countLifeCycle = 70;
        const interval = setInterval(() => {
            count += 1;
            setTranslate(count);
            if (countLifeCycle === count) {
                setCountLifeCycle(countLifeCycle + 70);
                setListItem((prev) => [...prev, ...data, ...data, ...data]);
                // count = 0;
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