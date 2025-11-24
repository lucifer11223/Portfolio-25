import footImg from "../assets/hero.jpeg";
import musicImg from "../assets/pngwing.com.png";
import gitImg from "../assets/GitHub.png";
import linkedInImg from "../assets/LinkedIn.png";
import instaImg from "../assets/insta.png";
import musicFile from "../assets/music.mp3";
import { useRef, useState } from "react";
import { motion } from "motion/react"


const Footer = () => {
    

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            audioRef.current.currentTime = 0;
            setIsPlaying(true);
        }
    };

    return (
        <footer className="w-full bg-[#49494D] text-white py-8 px-4 overflow-x-hidden">
            {/* Main footer layout */}
            <div style={{
                padding: "10px 10px"
            }} className="relative max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-evenly">
                {/* Left Section: About & Contact */}
                <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3 w-full">
                    <h2 className="font-bold text-xl md:text-2xl text-center md:text-left">
                        Let's <br />
                        <span className="text-green-400">work</span> together.
                    </h2>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <img src={footImg} alt="Shshank" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
                        <span className="font-mono text-sm md:text-base">Shshank raj</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <img src={instaImg} alt="Instagram" className="w-7 h-7 md:w-10 md:h-10 hover:scale-110 transition-transform duration-300" />
                        <img src={linkedInImg} alt="LinkedIn" className="w-7 h-7 md:w-10 md:h-10 hover:scale-110 transition-transform duration-300" />
                        <img src={gitImg} alt="GitHub" className="w-7 h-7 md:w-10 md:h-10 hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-center md:text-left w-full">
                        <p className="mt-3 text-xs md:text-sm">Contact me</p>
                        <p className="text-sm md:text-lg font-medium break-all">1oshshank@gmail.com</p>
                    </div>
                </div>

                {/* Center Section: Title */}
                <div className="flex items-center justify-center md:justify-start md:w-1/3 text-center">
                    <h2 className="font-bold text-lg md:text-5xl leading-relaxed md:leading-snug font-[cursive]">
                        A little test of Culture
                    </h2>
                </div>

                {/* Right Section: Music CD Image */}
                <div className="hidden md:absolute md:-right-10 md:flex flex-col items-center gap-2 ">
                    <audio ref={audioRef} src={musicFile} />
                    <motion.img
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{
                            duration: isPlaying ? 1 : 0,
                            repeat: isPlaying ? Infinity : 0,
                            ease: "linear"
                        }}
                        onClick={toggleMusic}
                        src={musicImg} alt="Music" className="w-36 h-36 rounded-full object-cover" />
                    <p className="text-gray-400 text-base mt-2">Click to Play</p>
                </div>
            </div>
            {/* Divider line */}
            <hr className="border-gray-700 my-6" />

            {/* Footer note */}
            <div className="text-center text-gray-400 text-xs md:text-sm space-y-1">
                <p>&copy; 2025 all rights reserved</p>
                <p>Created with ❤️ by Shshank</p>
            </div>
        </footer>
    );
};

export default Footer;
