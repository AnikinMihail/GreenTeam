"use client"

import {
    Clone,
    OrbitControls,
    OrbitControlsChangeEvent,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import HouseModel from "./HouseModelRed1"
import GLTFModelLoader from "./GLTFModelLoader"
import GrassTile from "./GrassTile"
import DirtRoad from "./DirtRoad"
import { Fragment, useEffect, useState } from "react"
import HouseModelRed1 from "./HouseModelRed1"
import { Button } from "./ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import GrownTree from "./GrownTree"

type MapType = Array<
    Array<[number, number, "dirt-road" | "grass" | "dirt-road-center", number?]>
>

function GetNGrassTiles({
    n,
    nstart = 0,
    row,
    editMode,
}: {
    n: number
    nstart?: number
    row: number
    editMode: string
}) {
    const kinds = localStorage.getItem("kinds")?.split("|")
    const rotations = localStorage.getItem("rotations")?.split("|")
    const tiles = []
    for (let i = 0; i < n; i++) {
        const id = row * (n + nstart) + i + nstart
        const rotateZ = rotations ? +rotations[id] : 0
        tiles.push(
            <GrassTile
                key={i}
                id={id}
                editMode={editMode}
                props={{
                    position: [row * 2, 0, i * 2 + nstart * 2],
                    rotation: [0, rotateZ, 0],
                }}
                kind={kinds ? +kinds[id] : 0}
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
    const router = useRouter()
    const searchParams = useSearchParams()

    const [treeID, setTreeID] = useState<number[] | undefined>(undefined)

    //Camera settings
    const cameraPosition = new THREE.Vector3(40, 100, 20)
    const cameraOrigin = new THREE.Vector3(0, 0, 20)
    const fov = 25

    //Map of ground tiles
    let MAP: MapType = []
    for (let i = 0; i < 20; i++) {
        MAP.push([[20, 0, "grass"]])
    }

    if (
        typeof window !== "undefined" &&
        localStorage.getItem("kinds") === null
    ) {
        let kinds: string[] = []
        let rotations: string[] = []
        for (let i = 0; i < 400; i++) {
            //Randomly decide kind of grass in such proportions: 1: 10%, 2: 30%, 3:60%

            let kind: "1" | "2" | "3" = "3"
            const rand = Math.random() * 100

            if (rand < 10) {
                kind = "1"
            } else if (rand < 40) {
                kind = "2"
            }

            //Randomly decide rotation of mesh

            const rand2 = Math.random() * 100
            let rotateZ = "0"

            if (rand2 < 25) {
                rotateZ = `${Math.PI / 2}`
            } else if (rand2 < 50) {
                rotateZ = `${Math.PI}`
            } else if (rand2 < 75) {
                rotateZ = `${(3 * Math.PI) / 2}`
            }

            kinds.push(kind)
            rotations.push(rotateZ)
        }
        localStorage.setItem("kinds", kinds.join("|"))
        localStorage.setItem("rotations", rotations.join("|"))
    }

    useEffect(() => {
        if (treeID !== undefined) {
            localStorage.setItem("treeIDs", treeID.join("|"))
        } else {
            let localStorageTreeIDs: number[] | string[] | undefined =
                localStorage.getItem("treeIDs")?.split("|")
            let convToNum: number[] = []
            if (localStorageTreeIDs !== undefined) {
                localStorageTreeIDs.forEach((s) => convToNum.push(+s))
            }
            setTreeID([...convToNum])
        }
    }, [treeID])

    return (
        <div className="h-full w-full  ">
            <div className="mb-2 flex w-full flex-row justify-center gap-x-2">
                <Button
                    className="bg-cyan-500"
                    onClick={() => {
                        const editMode = searchParams.get("editMode")
                        if (editMode === "true") {
                            router.replace("?editMode=false")
                        } else {
                            router.replace("?editMode=true")
                        }
                    }}
                >
                    Интерактив
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={async () => {
                        if (localStorage.getItem("selectedType") === "grass") {
                            let kinds: string[] =
                                localStorage.getItem("kinds")?.split("|") ?? []
                            const id = localStorage.getItem("selectedID")
                            if (id !== null && kinds[+id] !== undefined) {
                                kinds[+id] = "3"
                            }
                            localStorage.setItem("kinds", kinds.join("|"))
                            localStorage.setItem("selected", "null")
                            localStorage.setItem("selectedType", "null")
                            localStorage.setItem("selectedID", "null")
                            router.replace(`?editMode=editing`)
                            await new Promise((r) => setTimeout(r, 100))
                            router.replace(`?editMode=true`)
                        }
                    }}
                >
                    Выровнять
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={async () => {
                        if (localStorage.getItem("selectedType") === "grass") {
                            let kinds: string[] =
                                localStorage.getItem("kinds")?.split("|") ?? []
                            const id = localStorage.getItem("selectedID")
                            if (id !== null && kinds[+id] === "3") {
                                if (treeID !== undefined)
                                    setTreeID([...treeID, +id])
                                else setTreeID([+id])
                            }
                            localStorage.setItem("selected", "null")
                            localStorage.setItem("selectedType", "null")
                            localStorage.setItem("selectedID", "null")
                            router.replace(`?editMode=editing`)
                            await new Promise((r) => setTimeout(r, 500))
                            router.replace(`?editMode=true`)
                        }
                    }}
                >
                    Вырастить дерево
                </Button>
            </div>
            <Canvas camera={{ position: cameraPosition, fov, far: 15000 }}>
                <OrbitControls
                    target={cameraOrigin}
                    /*
                    !Controls boundaries, enable on production
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
                    }}*/
                />
                <directionalLight position={[2, 4, 1]} />
                <ambientLight intensity={0.1} />
                {MAP.map((row, i) => (
                    <Fragment key={i}>
                        {row.map((block, j) => (
                            <Fragment key={j}>
                                {block[2] === "grass" ? (
                                    <GetNGrassTiles
                                        editMode={
                                            typeof searchParams.get(
                                                "editMode",
                                            ) === "string"
                                                ? searchParams.get(
                                                      "editMode",
                                                  ) ?? "false"
                                                : "false"
                                        }
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
                {treeID !== undefined ? (
                    <>
                        {treeID.map((id, i) => {
                            const row = Math.floor(id / 20)
                            const col = id % 20
                            return (
                                <GrownTree
                                    key={i}
                                    rotation={[
                                        0,
                                        Math.round(id / 10) * 2 * Math.PI,
                                        0,
                                    ]}
                                    position={[row * 2, 0, col * 2]}
                                />
                            )
                        })}
                    </>
                ) : (
                    <></>
                )}
            </Canvas>
        </div>
    )
}
