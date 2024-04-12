"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as THREE from "three"

export default function HouseModel() {
    const fileUrl = "/models/houses/red-1.gltf"
    const mesh = useRef<THREE.Mesh>(null!)
    const gltf = useLoader(GLTFLoader, fileUrl)
    return (
        <mesh ref={mesh} scale={0.2}>
            <primitive object={gltf.scene.clone()} dispose={null} />
        </mesh>
    )
}
