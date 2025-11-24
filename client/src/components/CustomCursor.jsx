import gsap from "gsap";
import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    gsap.set([cursor, cursorBorder], {
      xPercent: -50,
      yPercent: -50,
    });

    // ✅ Correct quickTo usage
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.3,
      ease: "power3.out",
    });
    const xBorderTo = gsap.quickTo(cursorBorder, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yBorderTo = gsap.quickTo(cursorBorder, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xBorderTo(e.clientX);
      yBorderTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleDown = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 0.6,
        duration: 0.15,
      });
    };

    const handleUp = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 1,
        duration: 0.15,
      });
    };

    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);

    // ✓ Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="md:fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-9998 mix-blend-difference opacity-50"
      />
    </>
  );
};

export default CustomCursor;
