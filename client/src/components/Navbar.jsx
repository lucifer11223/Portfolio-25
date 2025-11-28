import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "motion/react";

const Navbar = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className='absolute w-full  z-50 transition-all duration-300 px-4 sm:px-6 lg:px-10'>

                <div className='container max-w-6xl mx-auto py-4 flex items-center justify-around'>


                    {/* Logo */}
                    <h1 onClick={() => navigate('/home')} className='text-4xl font-bold'>𝕾</h1>

                    {/* Desktop Menu */}
                    <div
                        className='absolute right-50 hidden md:flex items-center justify-between gap-16'>
                        <Flip href='#work'
                            onClick={() => {
                                document.getElementById("work")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            [Work]
                        </Flip>

                        {/* About */}
                        <Flip href="/about">
                            [About]
                        </Flip>

                        {/* Contact */}
                        <Flip
                            href="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            [Resume]
                        </Flip>

                        <a href="mailto:1oshshank@gmail.com?subject=Hello%20Shshank&body=I%20would%20like%20to%20talk%20about...">
                            <button
                                style={{ padding: "5px 10px" }}
                                className="ml-4 px-4 py-2 rounded-xl bg-[#444444] text-white font-bold"
                            >
                                Contact Me
                            </button>
                        </a>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div onClick={() => setOpen(!open)}>
                        <MenuIcon open={open} />
                    </div>

                </div>

                {/* MOBILE MENU PANEL */}
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: open ? 1 : 0, y: open ? 0 : -100 }}
                    transition={{
                        duration: 0.3,
                        stiffness: 100,
                        ease: "linear",
                    }}
                    className={`md:hidden overflow-hidden bg-[#f7f3e300] backdrop-blur-2xl 
        px-6 transition-all duration-300 z-55
        ${open ? "h-48 py-5" : "max-h-0 py-0"}
    `}
                >
                    <nav className="flex flex-col items-center justify-evenly h-full text-center">
                        <Flip href='#work'
                            onClick={() => {
                                document.getElementById("work")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            [Work]
                        </Flip>

                        <Flip to="/about">
                            [About]
                        </Flip>

                        <Flip
                            href="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            [Resume]
                        </Flip>
                    </nav>
                </motion.div>



            </header>
        </>
    );
};



const MenuIcon = ({ open }) => {

    const corners = [
        { top: 4, left: 50 },
        { top: 4, right: -50 },
        { bottom: 4, left: 50 },
        { bottom: 4, right: -50 },
    ];

    return (
        <div className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer">

            {/* Corner dots */}
            {corners.map((pos, i) => (
                <span
                    key={i}
                    className="absolute w-2.5 h-2.5 bg-gray-800 transition-all duration-300"
                    style={{
                        ...pos,
                        transform: open ? "translate(2px, 2px)" : "translate(0, 0)",
                    }}
                />
            ))}

            {/* Center Dot */}
            <span
                className={`absolute top-4 -right-9 bg-gray-800 transition-all duration-300 
                ${open ? "w-2.5 h-2.5 opacity-100 scale-100" : "w-0 h-0 opacity-0 scale-0"}`}
            />
        </div>
    );
};

export default Navbar;


const Flip = ({ children, href = "#" }) => {
    return (
        <motion.a
            href={href}
            initial="initial"
            whileHover="hovered"
            className="relative inline-block overflow-hidden"
        >
            {/* Top layer */}
            <div className="relative">
                {children.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" }
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                            delay: i * 0.03
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

            {/* Bottom layer */}
            <div className="absolute inset-0">
                {children.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                            initial: { y: "100%" },
                            hovered: { y: 0 }
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                            delay: i * 0.03
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    );
};
