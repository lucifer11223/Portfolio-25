import { useGLTF, Float, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Luffy = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/anime.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    // Log available animations
    console.log("Available animations:", Object.keys(actions));
    
    // Play the first animation if available
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.keys(actions)[0];
      actions[firstAnimation]?.reset().fadeIn(0.5).play();
    }

    // Cleanup
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, mixer]);

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <primitive ref={group} object={scene} scale={1} position={[0, -1.8, 0]} />
    </Float>
  );
};

export default Luffy;