"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import HouseModel from "./HouseModel"
import GLTFModelLoader from "./GLTFModelLoader"
import GrassTile from "./GrassTile"

function GetNGrassTiles({
    n,
    nstart = 0,
    row,
}: {
    n: number
    nstart?: number
    row: number
}) {
    const tiles = []
    for (let i = 0; i < n; i++) {
        let kind = 1
        const rand = Math.random() * 100
        if (rand < 30) {
            kind = 0
        } else if (rand < 90) {
            kind = 2
        }

        tiles.push(
            <GrassTile
                key={i}
                position={[row * 2, 0, i * 2 + nstart * 2]}
                rotation={[0, 0, 0]}
                kind={kind}
            />,
        )
    }
    console.log(tiles)
    return <>{tiles}</>
}

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
                <GetNGrassTiles n={3} row={0} nstart={2} />
                <GetNGrassTiles n={3} row={0} nstart={8} />
                <GetNGrassTiles n={11} row={1} nstart={1} />
                <GetNGrassTiles n={13} row={2} />
                <GetNGrassTiles n={13} row={3} />
                <GetNGrassTiles n={11} row={4} nstart={1} />
                <GetNGrassTiles n={9} row={5} nstart={2} />
                <GetNGrassTiles n={7} row={6} nstart={3} />
                <GetNGrassTiles n={5} row={7} nstart={4} />
                <GetNGrassTiles n={3} row={8} nstart={5} />
                <GetNGrassTiles n={1} row={9} nstart={6} />
            </Canvas>
        </div>
    )
}
