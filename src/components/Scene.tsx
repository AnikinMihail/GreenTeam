"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import HouseModel from "./HouseModel"
import GLTFModelLoader from "./GLTFModelLoader"
import GrassTile1 from "./GrassTile1"

export default function Page() {
    //*Camera settings
    const cameraPosition = new THREE.Vector3(10, 10, 0)
    const cameraOrigin = new THREE.Vector3(0, 0, 0)
    const fov = 25

    return (
        <div className="h-full w-full ">
            <Canvas camera={{ position: cameraPosition, fov }}>
                <OrbitControls target={cameraOrigin} />
                <directionalLight position={[1, 1, 0]} />
                <GrassTile1 />
            </Canvas>
        </div>
    )
}
