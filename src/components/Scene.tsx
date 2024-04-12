"use client"

import { Clone, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import HouseModel from "./HouseModel"
import GLTFModelLoader from "./GLTFModelLoader"
import GrassTile from "./GrassTile"
import DirtRoad from "./DirtRoad"

type MapType = Array<Array<[number, number, "dirt-road" | "grass", number?]>>

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
        const rand2 = Math.random() * 100
        let rotateZ = 0
        if (rand2 < 25) {
            rotateZ = Math.PI / 2
        } else if (rand2 < 50) {
            rotateZ = Math.PI
        } else if (rand2 < 75) {
            rotateZ = (3 * Math.PI) / 2
        }

        tiles.push(
            <GrassTile
                key={i}
                position={[row * 2, 0, i * 2 + nstart * 2]}
                rotation={[0, rotateZ, 0]}
                kind={kind}
            />,
        )
    }
    return <>{tiles}</>
}

function GetNDirtRoadTiles({
    n,
    nstart = 0,
    rotateZ = 0,
    row,
}: {
    n: number
    nstart?: number
    rotateZ?: number
    row: number
}) {
    const tiles = []
    for (let i = 0; i < n; i++) {
        let kind = 1
        const rand = Math.random() * 100
        if (rand < 30) {
            kind = 0
        }

        tiles.push(
            <DirtRoad
                key={i}
                position={[row * 2, 0, i * 2 + nstart * 2]}
                rotation={[0, rotateZ, 0]}
                kind={kind}
            />,
        )
    }
    return <>{tiles}</>
}

export default function Page() {
    //*Camera settings
    const cameraPosition = new THREE.Vector3(10, 10, 0)
    const cameraOrigin = new THREE.Vector3(0, 0, 0)
    const fov = 25

    /*
    !HEART
    const MAP: MapType = [
        [
            [3, 2],
            [3, 8],
        ],
        [[11, 1]],
        [[13, 0]],
        [[13, 0]],
        [[11, 1]],
        [[9, 2]],
        [[7, 3]],
        [[5, 4]],
        [[3, 5]],
        [[1, 6]],
    ]*/
    let MAP: MapType = []
    for (let i = 0; i < 20; i++) {
        if (i === 5) {
            MAP.push([
                [12, 0, "grass"],
                [8, 12, "dirt-road"],
            ])
        } else {
            MAP.push([
                [17, 0, "grass"],
                [1, 17, "dirt-road", Math.PI / 2],
                [2, 18, "grass"],
            ])
        }
    }

    return (
        <div className="h-full w-full ">
            <Canvas camera={{ position: cameraPosition, fov, far: 15000 }}>
                <OrbitControls target={cameraOrigin} />
                <directionalLight position={[2, 4, 1]} />
                {MAP.map((row, i) => (
                    <>
                        {row.map((block, j) => (
                            <>
                                {block[2] === "grass" ? (
                                    <GetNGrassTiles
                                        n={block[0]}
                                        row={i}
                                        key={j}
                                        nstart={block[1]}
                                    />
                                ) : (
                                    <GetNDirtRoadTiles
                                        n={block[0]}
                                        row={i}
                                        key={j}
                                        rotateZ={
                                            block[3] !== undefined
                                                ? block[3]
                                                : 0
                                        }
                                        nstart={block[1]}
                                    />
                                )}
                            </>
                        ))}
                    </>
                ))}

                <GLTFModelLoader
                    src="/models/houses/red-1.gltf"
                    position={new THREE.Vector3(5, 1, 26)}
                />
            </Canvas>
        </div>
    )
}
