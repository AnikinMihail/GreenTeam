"use client"

import {
    Clone,
    OrbitControls,
    OrbitControlsChangeEvent,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import HouseModel from "./HouseModel"
import GLTFModelLoader from "./GLTFModelLoader"
import GrassTile from "./GrassTile"
import DirtRoad from "./DirtRoad"
import { Fragment } from "react"

type MapType = Array<
    Array<[number, number, "dirt-road" | "grass" | "dirt-road-center", number?]>
>

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
    center = false,
}: {
    n: number
    nstart?: number
    rotateZ?: number
    row: number
    center?: boolean
}) {
    const tiles = []
    for (let i = 0; i < n; i++) {
        let kind = 1
        const rand = Math.random() * 100
        if (rand < 30) {
            kind = 0
        }
        if (center) {
            kind = 2
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
    const cameraPosition = new THREE.Vector3(40, 100, 20)
    const cameraOrigin = new THREE.Vector3(0, 0, 20)
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
                [5, 12, "dirt-road"],
                [1, 17, "dirt-road-center"],
                [2, 18, "dirt-road"],
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
                <OrbitControls
                    target={cameraOrigin}
                    maxDistance={200}
                    minDistance={100}
                    maxAzimuthAngle={Math.PI * 0.75}
                    minAzimuthAngle={Math.PI * 0.25}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI * 0.25}
                    onChange={(e?: OrbitControlsChangeEvent | undefined) => {
                        const currentY = e?.target.object.position.y
                        if (currentY)
                            if (currentY > 220) {
                                e?.target.object.position.setY(220)
                            } else if (currentY < 50) {
                                e?.target.object.position.setY(50)
                            }
                    }}
                />
                <directionalLight position={[2, 4, 1]} />
                <ambientLight intensity={0.1} />
                {MAP.map((row, i) => (
                    <Fragment key={i}>
                        {row.map((block, j) => (
                            <Fragment key={j}>
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
                                        center={
                                            block[2] === "dirt-road-center"
                                                ? true
                                                : false
                                        }
                                        rotateZ={
                                            block[3] !== undefined
                                                ? block[3]
                                                : 0
                                        }
                                        nstart={block[1]}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </Fragment>
                ))}

                <GLTFModelLoader
                    src="/models/houses/red-1.gltf"
                    position={new THREE.Vector3(5, 1, 26)}
                />
                <GLTFModelLoader
                    src="/models/houses/red-1.gltf"
                    position={new THREE.Vector3(5, 1, 15)}
                />
            </Canvas>
        </div>
    )
}
