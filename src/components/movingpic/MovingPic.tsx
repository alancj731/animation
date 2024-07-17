'use client';
import { useEffect, useState, useRef } from 'react';
import  React from 'react';
import Image from 'next/image';
import './MovingPic.css';

export default function MovingPic(props: Readonly<{src:string, width:string, height:string}>) {
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        if (!imgRef.current) {
            console.log('No image ref');
            return;
        }
        const image = imgRef.current;
        image.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = image.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const sensitivity = 1;
            
            const angleX =  (sensitivity * mouseY / height) * -20; // Max 30 degrees rotation
            const angleY = (sensitivity * mouseX / width) * 20; // Max 30 degrees rotation
            
            image.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
          });
          
          image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          });
    }, []);
    
    return (
        <div className="moving-pic">
            <Image ref={imgRef} id='movingPic' src={props.src} alt="dog" width={parseInt(props.width)} height={parseInt(props.height)}/>
        </div>
    );
}