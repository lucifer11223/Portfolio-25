
import heroImg from '../assets/hero.jpeg';
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        gsap.set(contentRef.current, { opacity: 1, scale: 1 });
        gsap.set('.hero-text', { opacity: 1, scale: 1 });

        gsap.fromTo(contentRef.current,
            { opacity: 1, scale: 1 },
            {
                opacity: 0,
                scale: 0.7,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    // markers: true, // Remove in production
                }
            }
        );


        gsap.fromTo('.hero-text',
            { scale: 1, opacity: 1 },
            {
                scale: 0.5,
                opacity: 0,
                x: -100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            }
        );


        gsap.to('.hero-image', {
            scale: 0.6,
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play none none reverse",
            }
        });

        gsap.to('.hero-buttons', {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play none none reverse",
            }
        });
    }, []);

    return (
        <div
            ref={heroRef}
            className="bg-[#F7F3E3] flex md:flex-row flex-col h-screen w-full items-center justify-center relative overflow-hidden top-0"
        >
            <div ref={contentRef} className="w-full h-full flex md:flex-row flex-col items-center justify-center">
                {/*left */}
                <div className="hero relative w-[60%] flex flex-col items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: -300 }}
                        transition={{
                            duration: 4,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="hero-text md:text-[10rem] text-7xl font-bold absolute md:-top-96 -top-88 md:left-1/5 left-20 -translate-x-1/2"
                        style={{
                            letterSpacing: "20px",
                        }}
                    >
                        hello
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: -300 }}
                        transition={{
                            duration: 4,
                            delay: 2,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="hero-text md:text-[10rem] text-7xl font-bold absolute md:-top-96 -top-88 md:left-1/5 left-20 -translate-x-1/2 select-none"
                        style={{
                            letterSpacing: "20px",
                        }}
                    >
                        hello
                    </motion.h1>

                    <motion.img
                        initial={{ y: 10 }}
                        animate={{ y: -10 }}
                        transition={{
                            duration: 3,
                            ease: "easeIn",
                            repeat: Infinity,
                            repeatType: "reverse",
                            yoyo: true,
                            damping: 500,
                            stiffness: 10,
                            bounce: 5,
                        }}
                        className="hero-image md:w-[45vh] md:h-[75vh] w-[30vh] h-[50vh] absolute object-cover md:mt-32 left-0 -top-80"
                        src={heroImg}
                        alt="hero"
                    />

                    <motion.h1
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: [0, 1, 1, 0], x: 300 }}
                        transition={{
                            duration: 5,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="hero-text md:text-6xl text-4xl font-bold uppercase absolute md:-bottom-40  left-1/5 -translate-x-1/4 select-none"
                        style={{ letterSpacing: "15px" }}
                    >
                        i'm shshank
                    </motion.h1>
                </div>

                <div className="relative w-2 flex flex-col items-center justify-center">
                    <div className=' hero-text flex text-right md:w-100 w-sm absolute md:-top-40 top-28 md:right-0 right-10 transform translate-x-[50%] '>
                        <motion.p
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className='md:text-4xl text-3xl font-mono select-none'>
                            i'm <br />
                            shshank.<br /> A web Devloper with
                            both fronted and
                            backend knowledge.
                        </motion.p>
                    </div>

                    <div className='hero-buttons absolute md:bottom-0 -bottom-16 -right-40 transform translate-y-80 flex gap-10'>
                        <motion.button
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                padding: "10px 20px"
                            }}
                            className='w-60 bg-[#444444] text-white font-mono text-lg'
                        >
                            <a href="mailto:1oshshank@gmail.com?subject=Hello%20Shshank&body=I%20would%20like%20to%20talk%20about...">
                                Contact Me
                            </a>
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                padding: "0 20px"
                            }}
                            className='bg-[#444444] text-white font-mono text-lg'
                        >
                            <a
                                href="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Resume
                            </a>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;