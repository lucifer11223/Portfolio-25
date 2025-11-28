// Project.jsx
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from './ProjectCard';
import blogImg from '../assets/blog.png'
import chatImg from '../assets/chat.png'
import calcImg from '../assets/calc.png'
import deepSeekImg from '../assets/deepseek.png'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Project = () => {
    const projectRef = useRef(null);
    const cardsRef = useRef([]);
    const gridRef = useRef(null);

    const projects = [
        {
            name: "Blog",
            link: "https://blog-app-rouge-eight-76.vercel.app",
            image: blogImg,
        },
        {
            name: "chat",
            link: "https://chatapp-basic.netlify.app",
            image: chatImg,
        },
        {
            name: "calcy",
            link: "https://3dcalcy.netlify.app",
            image: calcImg,
        },
        {
            name: "DeepSeek-Clone",
            link: "https://deepseek-liart-seven.vercel.app/",
            image: deepSeekImg,
        },
        {
            name: "chat",
            link: "https://chatapp-basic.netlify.app",
            image: "https://via.placeholder.com/150",
        },
    ]

    // Cards layout positions (desktop)
    const gridPositions = [
        { x: -450, y: -200, rotation: 0 },
        { x: 0, y: -200, rotation: 0 },
        { x: 450, y: -200, rotation: 0 },
        { x: -250, y: 180, rotation: 0 },
        { x: 250, y: 180, rotation: 0 },
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // ----------------------------
        // 📱 MOBILE ANIMATION
        // ----------------------------
        mm.add("(max-width: 767px)", () => {
            gsap.set(cardsRef.current, {
                opacity: 0,
                y: 700,
                scale: 0.85,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: projectRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 2,
                }
            });

            // Animate each card upward & ON TOP of previous one
            cardsRef.current.forEach((card, i) => {
                gsap.set(card, { zIndex: 10 + i });  // ensure above previous

                tl.to(card, {
                    y: i * 1,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                }, "-=0.4");  // overlapping stagger
            });

            // Pin
            ScrollTrigger.create({
                trigger: gridRef.current,
                start: "center center",
                end: "+=120%",
                pin: true,
                pinSpacing: true,
            });

        });

        // ----------------------------
        // 💻 DESKTOP ANIMATION
        // ----------------------------
        mm.add("(min-width: 768px)", () => {
            // All cards start stacked at center
            gsap.set(cardsRef.current, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 0,
                scale: 0.92,
            });

            gsap.set(cardsRef.current[0], {
                opacity: 1,
                scale: 1,
                zIndex: 10,
            });

            // Timeline controlling all cards
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: projectRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 2,
                }
            });

            // First card holds attention
            tl.to(cardsRef.current[0], {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });

            tl.to(cardsRef.current[0], {
                scale: 1,
                duration: 0.3,
            });

            // Scatter all cards → GRID POSITION
            cardsRef.current.forEach((card, i) => {
                tl.to(card, {
                    x: gridPositions[i].x,
                    y: gridPositions[i].y,
                    rotation: gridPositions[i].rotation,
                    opacity: 1,
                    scale: 1,
                    zIndex: 5 + i,
                    duration: 1,
                    ease: "power2.out",
                }, "-=0.5");
            });

            // 🧲 Pin grid in place
            ScrollTrigger.create({
                trigger: gridRef.current,
                start: "center center",
                end: "+=120%",
                pin: true,
                pinSpacing: true,
            });
        });

        return () => mm.kill();
    }, []);

    return (
        <div
            id='work'
            ref={projectRef}
            className='bg-[#D2BBA0] w-full min-h-screen relative z-10 rounded-3xl overflow-x-hidden'
        >
            <div className='container mx-auto px-4 py-20'>

                {/* Cards Container */}
                <div ref={gridRef} className='relative w-full h-[1000px] flex items-center justify-center'>
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="absolute"
                        >
                            <ProjectCard projectNumber={i + 1} link={project.link} img={project.image} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Project;
