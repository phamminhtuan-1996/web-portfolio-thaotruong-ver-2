"use client";
import { useEffect, useRef } from 'react';
import styled from "styled-components";
import Image from "next/image";

const DivParent = styled.div`
  overflow: hidden;
  max-width: 100vw;
  position: relative;

  .slider-track {
    display: flex;
    white-space: nowrap;
  }

  .skill-item {
    flex-shrink: 0;
    margin-right: 1rem;
  }
`;

type Props = {
  data: string[];
};

export default function TrainSkill({ data = [''] }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos = 0;
    const speed = 1; // px per frame
    const frame = () => {
      if (trackRef.current) {
        pos -= speed;
        const trackWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(pos) >= trackWidth) {
          pos = 0;
        }
        trackRef.current.style.transform = `translateX(${pos}px)`;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  const duplicated = [...data, ...data];

  return (
    <DivParent className="mt-4">
      <div className="slider-track" ref={trackRef}>
        {duplicated.map((item, key) => (
          <div className="skill-item d-flex align-items-center text-nowrap" key={key}>
            <Image
              src="/img/start-skill.svg"
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
  );
}
