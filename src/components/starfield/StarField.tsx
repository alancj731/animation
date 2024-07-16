'use client';

import React, { useEffect, useRef } from 'react';
import './StarField.css';

const Starfield: React.FC = () => {
  const universeRef = useRef<HTMLDivElement | null>(null);
  const layerCount = 5;
  const starCount = 100;

  function createStar(width: number, height: number){
    if (!universeRef.current){
        console.error("Universe ref is null");
        return;
    }
    
    for (let l = 0; l < layerCount; ++l) {
        const layer = document.createElement('div');
        layer.id = `layer${l}`;
        layer.className = 'starfield';
        universeRef.current.appendChild(layer);
        
        for (let i = 0; i < starCount; ++i) {
          const xpos = Math.round(Math.random() * width);
          const ypos = Math.round(Math.random() * height);
          
          for (let s = 0; s < 2; ++s) {
            const star = document.createElement('div');
            star.className = `star${l}`;
            star.style.left = `${xpos + s * width}px`;
            star.style.top = `${ypos}px`;
            star.style.backgroundColor = 'white';
            layer.appendChild(star);
          }
        }
        
        layer.style.animationDuration = `${Math.pow(8, layerCount - l) * 1}s`;
      }
      }

  useEffect(() => {
    const updateDimensions = () => {
      if (universeRef.current) {
        const { width, height } = universeRef.current.getBoundingClientRect();
        createStar(width, height);
      }
    };

    // Initial dimension and create starts
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (universeRef.current) {
      resizeObserver.observe(universeRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
  

  return (
    <div 
      id="universe" 
      ref={universeRef} 
      style={{ 
        width: '100%', 
        height: '500px', 
        overflow: 'hidden', 
        background: 'black',
        position: 'relative'  // Ensure it takes up space
      }}
    >
    </div>
  );
};

export default Starfield;