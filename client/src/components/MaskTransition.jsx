import { useEffect, useRef } from "react";
import gsap from "gsap";

const MaskTransition = ({ onCover, onFinish }) => {
    const container = useRef(null);

    useEffect(() => {
        const blocks = gsap.utils.toArray(".mask-block");

        // randomize each block's width
        blocks.forEach(block => {
            const randomWidth = gsap.utils.random(5, 20); // 5vw – 20vw
            block.style.width = `${randomWidth}vw`;
        });

        gsap.set(blocks, {
            scaleY: 0,
            transformOrigin: "bottom",
        });

        const tl = gsap.timeline({
            defaults: { duration: 0.9, ease: "power4.inOut" }
        });

        //  Randomize the staggering direction
        const staggerFrom = gsap.utils.random([
            "start",
            "center",
            "end",
            "edges",
            "random",
        ]);

        // Random wave cover
        tl.to(blocks, {
            scaleY: 1,
            stagger: {
                amount: 1,
                from: staggerFrom,
                each: 0.04
            },
            onComplete: () => onCover && onCover()
        });

        // pause moment
        tl.to({}, { duration: 0.2 });

        // 👉 Flip direction (top → bottom)
        tl.set(blocks, { transformOrigin: "top" });

        // 👉 Random wave reveal
        tl.to(blocks, {
            scaleY: 0,
            stagger: {
                amount: 1,
                from: staggerFrom,
                each: 0.04
            },
            onComplete: () => onFinish && onFinish()
        });

        return () => tl.kill();
    }, [onCover, onFinish]);

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[999] flex flex-row pointer-events-none"
        >
            {Array.from({ length: 25 }).map((_, i) => (
                <div
                    key={i}
                    className="mask-block bg-white"
                    style={{
                        height: "100vh",
                        willChange: "transform"
                    }}
                />
            ))}
        </div>
    );
};

export default MaskTransition;
