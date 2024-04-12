"use client"

import { useRef } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as THREE from "three"

interface GLTFModelLoaderProps {
    src: string
    scale?: number
    position?: THREE.Vector3
    rotation?: THREE.Euler
}

export default function GLTFModelLoader({
    src,
    scale = 1,
    position = new THREE.Vector3(0, 0, 0),
    rotation = new THREE.Euler(0, 0, 0),
}: GLTFModelLoaderProps) {
    const mesh = useRef<THREE.Mesh>(null!)
    const gltf = useLoader(GLTFLoader, src)
    return (
        <mesh ref={mesh} scale={scale} rotation={rotation} position={position}>
            <primitive object={gltf.scene} dispose={null} />
        </mesh>
    )
}
