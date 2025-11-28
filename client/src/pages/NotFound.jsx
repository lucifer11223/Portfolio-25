import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import Luffy from "../components/Luffy";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-sky-100 to-blue-200 flex flex-col items-center justify-center text-gray-900">

      {/* 3D SCENE */}
      <div className="w-full h-screen">
        <Canvas camera={{ position: [0, 1.5, 6], fov: 35 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="sunset" />

          <Luffy />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* TEXT */}
      <div className="text-center mt-6 px-4 absolute z-10 bottom-10">
        <h1 className="text-4xl font-extrabold mb-3">
          Thank You for Visiting 
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          This page doesn’t exist, but your journey is just getting started.
        </p>

        <Link
          to="/home"
          style={{
            padding:"10px 10px"
          }}
          className="inline-block mt-6 px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
