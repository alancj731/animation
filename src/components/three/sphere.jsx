'use client';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import React, { useEffect, useRef } from "react";
import "./sphere.css";


export function Sphere(){

    const canvasRef = useRef(null);
    const containerRef = useRef(null);  
    
    const scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(5, 64, 64);

    const material = new THREE.MeshStandardMaterial({
        color: "#ff4500",
        roughness: 0.3,
      });

    const mesh = new THREE.Mesh(geometry, material);

    const sizes = {
        width: 1,
        height: 1,
    };

    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    light.intensity = 1;
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.z = 20;
    scene.add(camera);

    

    useEffect(() => {
        if (containerRef.current && canvasRef.current) {
            sizes.width = containerRef.current.clientWidth * 0.75;
            sizes.height = containerRef.current.clientHeight * 0.75;

            const renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
            });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(3);
            renderer.render(scene, camera);

            const controls = new OrbitControls(camera, canvasRef.current);
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1;

            const handleResize = () => {
                sizes.width = containerRef.current.clientWidth * 0.75;
                sizes.height = containerRef.current.clientHeight * 0.75;
              
                //Update camera
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
                renderer.setSize(sizes.width, sizes.height);
            };

            canvasRef.current.addEventListener("resize", handleResize);

            const animate = () => {
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            };
            animate();

            return () => {
                window.removeEventListener('resize', handleResize);
            }
        }
    }, []);
    
    return (
        <div className='canvascontainer' ref={containerRef}>
            <canvas id='canvas' className='canvas' ref={canvasRef} > Sphere </canvas>
        </div>
    )
}