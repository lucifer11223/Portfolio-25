import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import MaskTransition from "../components/MaskTransition";

const Landing = () => {
    const [showMask, setShowMask] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setShowMask(true), 2500);
        return () => clearTimeout(t);
    }, []);

    const handleCover = () => {
        navigate("/home");
    };

    const handleFinish = () => {
        setShowMask(false);
    };

    return (
        <div className="bg-[#1E1E1E] h-screen flex items-center justify-center relative">
            <div className="flex flex-col items-center gap-1">
                <motion.h1
                    initial={{ opacity: 0, y: -40, x: -100 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-bold text-[#FFD9DA]"
                >
                    नमस्ते
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 40, x: 100 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-bold text-[#FFD9DA]"
                >
                    NAMASTE
                </motion.h1>
            </div>

            {showMask && (
                <MaskTransition onCover={handleCover} onFinish={handleFinish} />
            )}
        </div>
    );
};

export default Landing;
