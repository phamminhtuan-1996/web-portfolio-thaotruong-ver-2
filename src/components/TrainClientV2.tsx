"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styled from "styled-components";

const DivParent = styled.div`
  overflow: hidden;
  width: 100%;
  .slider-track {
    display: flex;
    white-space: nowrap;
  }
  .train-client__item {
    width: 200px;
    height: 112px;
    border-radius: 14px;
    margin-right: 30px;
    flex-shrink: 0;
  }
`;

type TrainClientsProps = {
  data: string[];
};

export default function TrainClients({ data = [''] }: TrainClientsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos = 0;
    const speed = 1; // px per frame
    const frame = () => {
      if (trackRef.current) {
        pos -= speed;
        // nếu dịch hết 1 nửa thì reset
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

  // nhân đôi dữ liệu để tạo vòng lặp liền mạch
  const duplicated = [...data, ...data];

  return (
    <DivParent>
      <div className="slider-track" ref={trackRef}>
        {duplicated.map((img, i) => (
          <div className="train-client__item bg-dark d-flex justify-content-center align-items-center" key={i}>
            <Image src={img} alt={`client-${i}`} width={150} height={80} style={{objectFit: 'contain'}}/>
          </div>
        ))}
      </div>
    </DivParent>
  );
}
