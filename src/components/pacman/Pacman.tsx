'use client';
import { use, useEffect, useState, useRef } from 'react';
import './Pacman.css';
import { clear } from 'console';


export default function Pacman(props: Readonly<{animationTime:string, animationDelay:string}>) {

    let intId :NodeJS.Timeout | null = null;
    const pacmanRef = useRef<HTMLDivElement>(null);
    const totalDots = 25;
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dotPositions = Array.from({ length: totalDots }, (_, i) => 1.5 + i * (100/totalDots));
    const dots = dotPositions.map((left, i) =>  
    <div 
    className="dot" 
    key={i} 
    style={{ left: `${left}%` }}
    ref={(ref: HTMLDivElement | null) => { dotRefs.current[i] = ref; }}
    />
    );
    const [progress, setProgress] = useState(0);

    const showTime = parseFloat(props.animationTime) * 1000;
    const itvl = showTime / (totalDots * 1.1);
    const delay = parseFloat(props.animationDelay) * 1000;
    const pacmanStartRef = useRef<number>(0);

    useEffect(() => 
        {
            pacmanStartRef.current = parseFloat(window.getComputedStyle(pacmanRef.current!).getPropertyValue('left'));
            if (!intId){
                setTimeout(() => 
                    {
                        if (!intId){
                            intId = setInterval(() => setProgress(prev => prev +1)
                            , itvl);
                        }
                    }, delay
                )
                setTimeout(() =>
                {
                    if (intId) {
                        clearInterval(intId);
                        intId = null;
                    }
                }, showTime + delay);
            }   
            return () => {
                if (intId) {
                    clearInterval(intId);
                    intId = null;
            }
        }
        }, []
    );

    useEffect(() => 
        {              
            const pacmanStyle = window.getComputedStyle(pacmanRef.current!);
            const pacmanLeft = parseFloat(pacmanStyle.getPropertyValue('left')) - pacmanStartRef.current; 
            for (let i =0; i < dots.length; i++) {
                const dotRef = dotRefs.current[i];
                const dotStyleLeft = window.getComputedStyle(dotRef!).getPropertyValue('left');
                const dotLeft = parseFloat(dotStyleLeft); 
                if (pacmanLeft - dotLeft > -30) {
                 dotRef!.style.visibility = 'hidden';
                }
            }
        }, 
        [progress]
    );

    const extraDelay = parseFloat(props.animationDelay) * 1.2 + 's';
    
    return (
        <div className="path">
            <div className="pacman" id="pacman" ref={pacmanRef} style={{'--animation-time': props.animationTime, '--animation-delay': extraDelay}}></div>
            {dots}
        </div>
    );
}