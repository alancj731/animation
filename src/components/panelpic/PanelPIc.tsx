'use client';
import { useEffect, useRef } from 'react';
import  React from 'react';
import './PanelPic.css';

export default function PanelPic(props: Readonly<{src:string, width:string, height:string}>) {
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const stripContainerRef = useRef<HTMLDivElement>(null);
    let stripsAdded = false;
    
    useEffect(() => {
        if (!imgContainerRef.current || !stripContainerRef.current) {
            console.log('No container ref');
            return;
        }

        // make sure useEffect only add strips once
        if (stripsAdded) return;
        stripsAdded = true;

        const imageContainer = imgContainerRef.current;
        const stripContainer = stripContainerRef.current;

        const numStrips = 10;
        const stripWidth = stripContainer.clientWidth / numStrips;
        console.log(stripWidth, stripContainer.clientWidth);

        for (let i = 0; i < numStrips; i++) {
            const strip = document.createElement("div");
            strip.classList.add("strip");
            strip.style.width = `${stripWidth}px`;
            strip.style.left = `${i * stripWidth}px`;
            strip.style.backgroundImage = `url(${props.src})`;
            strip.style.backgroundPosition = `-${i * stripWidth}px 0`;
            stripContainer.appendChild(strip);
        }

    }, []);

    return (
            <div ref={imgContainerRef} 
            className="image-container"
            style={{width: props.width, height: props.height}} 
            >
                <div ref={stripContainerRef} className="strip-container">

                </div>
            </div>
    );
}