"use client"

import { OrbitControls, OrbitControlsChangeEvent } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import GrassTile from "./GrassTile"
import { Fragment, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import GrownTree from "./GrownTree"
import PlantedTree from "./PlantedTree"
import MediumTree from "./MediumTree"
import RoadTile from "./RoadTile"

export type BlockType =
    | "grass-1"
    | "grass-2"
    | "plane"
    | "null"
    | "road"
    | "road-t"
    | "road-r"
    | "road-l"
    | "road-b"
    | "road-tr"
    | "road-y"
    | "road-tl"
    | "road-rb"
    | "road-x"
    | "road-bl"
    | "road-trb"
    | "road-tbl"
    | "road-trl"
    | "road-rbl"
    | "road-c"
export type ObjectType = "tree" | "planted-tree" | "medium-tree" | "null"
export type Action =
    | "Clear from grass"
    | "Grow a tree"
    | "Chop down a tree"
    | "Plant grass"
    | "Water a tree"
    | "Build a road"
export type ObjectID = { x: number; y: number }

type generateTileProps = {
    props: BlockInfo
    isInteractive: boolean
    action: Action | null
    selectedObjectID: ObjectID | null
    handleClick: () => void
}

type generateTreeProps = {
    props: ObjectInfo
}

export interface BlockInfo {
    type: BlockType
    rotation: number
    id: ObjectID
}
export interface ObjectInfo {
    type: ObjectType
    rotation: number
    id: ObjectID
}

function generateGrassTile({
    props,
    isInteractive,
    action,
    selectedObjectID,
    handleClick,
}: generateTileProps) {
    if (props && props.id) {
        return (
            <GrassTile
                info={props}
                props={{ position: [props.id.x * 2, 0, props.id.y * 2] }}
                isInteractive={isInteractive}
                action={action}
                selectedObjectID={selectedObjectID}
                handleClick={handleClick}
            />
        )
    }
    return <></>
}

function generateRoadTile({
    props,
    isInteractive,
    action,
    selectedObjectID,
    handleClick,
}: generateTileProps) {
    if (props && props.id) {
        return (
            <RoadTile
                info={props}
                props={{ position: [props.id.x * 2, 0, props.id.y * 2] }}
                isInteractive={isInteractive}
                action={action}
                selectedObjectID={selectedObjectID}
                handleClick={handleClick}
            />
        )
    }
    return <></>
}

function generateTree({ props }: generateTreeProps) {
    if (props.id) {
        if (props.type === "tree")
            return (
                <GrownTree
                    position={[props.id.x * 2, 1, props.id.y * 2]}
                    rotation={[0, props.rotation, 0]}
                />
            )
        else if (props.type === "planted-tree")
            return (
                <PlantedTree
                    position={[props.id.x * 2, 1, props.id.y * 2]}
                    rotation={[0, props.rotation, 0]}
                />
            )
        else if (props.type === "medium-tree")
            return (
                <MediumTree
                    position={[props.id.x * 2, 1, props.id.y * 2]}
                    rotation={[0, props.rotation, 0]}
                />
            )
    }
    return <></>
}

export default function Scene() {
    //Game states
    const [blockMap, setBlockMap] = useState<BlockInfo[][] | null>(null)
    const [objectMap, setObjectMap] = useState<ObjectInfo[][] | null>(null)

    const [isInteractive, setIsInteractive] = useState(false)
    const [selectedObjectID, setSelectedObjectID] = useState<ObjectID | null>(
        null,
    )
    const [action, setAction] = useState<Action | null>(null)

    //Game functions
    function handleRoadCheck() {
        let map = blockMap
        if (map !== null) {
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map.length; j++) {
                    if (map[i][j].type.includes("road")) {
                        let top = 0
                        let bottom = 0
                        let left = 0
                        let right = 0
                        if (
                            map[i - 1] !== undefined &&
                            map[i - 1][j].type.includes("road")
                        ) {
                            top = 1
                        }
                        if (
                            map[i][j + 1] !== undefined &&
                            map[i][j + 1].type.includes("road")
                        ) {
                            right = 1
                        }
                        if (
                            map[i + 1] !== undefined &&
                            map[i + 1][j].type.includes("road")
                        ) {
                            bottom = 1
                        }
                        if (
                            map[i][j - 1] !== undefined &&
                            map[i][j - 1].type.includes("road")
                        ) {
                            left = 1
                        }

                        //top right bottom left
                        const combinations = {
                            "0000": "road",
                            "0001": "road-r",
                            "0010": "road-b",
                            "0011": "road-br",
                            "0100": "road-l",
                            "0101": "road-x",
                            "0110": "road-bl",
                            "0111": "road-rbl",
                            "1000": "road-t",
                            "1001": "road-tr",
                            "1010": "road-y",
                            "1011": "road-trb",
                            "1100": "road-tl",
                            "1101": "road-trl",
                            "1110": "road-tbl",
                            "1111": "road-c",
                        }
                        const combination = `${top}${right}${bottom}${left}`

                        if (combination in combinations) {
                            //@ts-expect-error
                            map[i][j].type = combinations[combination]
                        }
                        console.log(map[i][j].type)
                    }
                }
            }
        }
        setBlockMap(map)
        localStorage.setItem("blockMap", JSON.stringify(map))
    }

    //Initial state
    //! Currently using local storage -> change to server in near future

    useEffect(() => {
        if (
            typeof window !== "undefined" && //Check if in client component(to prevent 500 errors on load)
            (blockMap === null || objectMap === null) //Prevent unwanted rerenders
        ) {
            if (localStorage.getItem("blockMap") === null) {
                let map: BlockInfo[][] = []
                for (let i = 0; i < 20; i++) {
                    let row: BlockInfo[] = []
                    for (let j = 0; j < 20; j++) {
                        //Initially setting blocks to random types of grass & random rotations

                        let type: BlockType = "grass-1"
                        let rotation = 0

                        let randomN = Math.random() * 100
                        if (randomN < 50) type = "grass-2"

                        randomN = Math.random() * 100
                        if (randomN < 25) rotation = Math.PI / 2
                        else if (randomN < 50) rotation = Math.PI
                        else if (randomN < 75) rotation = (3 * Math.PI) / 2

                        const id = { x: i, y: j }
                        row.push({ type, rotation, id })
                    }
                    map.push(row)
                }
                localStorage.setItem("blockMap", JSON.stringify(map))
            }
            if (localStorage.getItem("objectMap") === null) {
                let map: ObjectInfo[][] = []
                for (let i = 0; i < 20; i++) {
                    //Initially setting objects to null & 0 rotation

                    let row: ObjectInfo[] = []
                    for (let j = 0; j < 20; j++) {
                        const type: ObjectType = "null"
                        const rotation = 0
                        const id = { x: i, y: j }

                        row.push({ type, rotation, id })
                    }
                    map.push(row)
                }
                localStorage.setItem("objectMap", JSON.stringify(map))
            }
            let localBlockMap = localStorage.getItem("blockMap")
            if (localBlockMap !== null) {
                setBlockMap(JSON.parse(localBlockMap))
            }
            let localObjectMap = localStorage.getItem("objectMap")
            if (localObjectMap !== null) {
                setObjectMap(JSON.parse(localObjectMap))
            }
        }
    }, [])

    //On action activation do action or do nothing

    useEffect(() => {
        let map = blockMap
        let objMap = objectMap
        if (
            action !== null &&
            selectedObjectID !== null &&
            map !== null &&
            objMap !== null
        ) {
            if (action === "Clear from grass") {
                map[selectedObjectID.x][selectedObjectID.y].type = "plane"
                setBlockMap(map)
                localStorage.setItem("blockMap", JSON.stringify(map))
            } else if (action === "Grow a tree") {
                if (
                    objMap[selectedObjectID.x][selectedObjectID.y].type ===
                        "null" &&
                    map[selectedObjectID.x][selectedObjectID.y].type === "plane"
                ) {
                    //Randomly setting tree's rotation

                    let rotation = 0

                    let randomN = Math.random() * 100
                    if (randomN < 25) rotation = Math.PI / 2
                    else if (randomN < 50) rotation = Math.PI
                    else if (randomN < 75) rotation = (3 * Math.PI) / 2

                    objMap[selectedObjectID.x][selectedObjectID.y].type =
                        "planted-tree"
                    objMap[selectedObjectID.x][selectedObjectID.y].rotation =
                        rotation
                }
                setObjectMap(objMap)
                localStorage.setItem("objectMap", JSON.stringify(objMap))
            } else if (action === "Chop down a tree") {
                if (
                    objMap[selectedObjectID.x][selectedObjectID.y].type !==
                    "null"
                ) {
                    objMap[selectedObjectID.x][selectedObjectID.y].type = "null"
                    objMap[selectedObjectID.x][selectedObjectID.y].rotation = 0
                }
                setObjectMap(objMap)
                localStorage.setItem("objectMap", JSON.stringify(objMap))
            } else if (action === "Plant grass") {
                if (
                    map[selectedObjectID.x][selectedObjectID.y].type ===
                        "plane" &&
                    objMap[selectedObjectID.x][selectedObjectID.y].type ===
                        "null"
                ) {
                    //Randomly setting type of grass and block's rotation
                    let type: BlockType = "grass-1"
                    let rotation = 0

                    let randomN = Math.random() * 100
                    if (randomN < 50) type = "grass-2"

                    randomN = Math.random() * 100
                    if (randomN < 25) rotation = Math.PI / 2
                    else if (randomN < 50) rotation = Math.PI
                    else if (randomN < 75) rotation = (3 * Math.PI) / 2

                    map[selectedObjectID.x][selectedObjectID.y].type = type
                    map[selectedObjectID.x][selectedObjectID.y].rotation =
                        rotation
                    setBlockMap(map)
                    localStorage.setItem("blockMap", JSON.stringify(map))
                }
            } else if (action === "Water a tree") {
                if (
                    objMap[selectedObjectID.x][selectedObjectID.y].type !==
                    "null"
                ) {
                    if (
                        objMap[selectedObjectID.x][selectedObjectID.y].type ===
                        "planted-tree"
                    ) {
                        objMap[selectedObjectID.x][selectedObjectID.y].type =
                            "medium-tree"
                    } else if (
                        objMap[selectedObjectID.x][selectedObjectID.y].type ===
                        "medium-tree"
                    ) {
                        objMap[selectedObjectID.x][selectedObjectID.y].type =
                            "tree"
                    }
                    setObjectMap(objMap)
                    localStorage.setItem("objectMap", JSON.stringify(objMap))
                }
            } else if (action === "Build a road") {
                if (
                    objMap[selectedObjectID.x][selectedObjectID.y].type ===
                    "null"
                ) {
                    //Randomly setting type of grass and block's rotation
                    const type: BlockType = "road"
                    const rotation = 0

                    map[selectedObjectID.x][selectedObjectID.y].type = type
                    map[selectedObjectID.x][selectedObjectID.y].rotation =
                        rotation
                    setBlockMap(map)
                    localStorage.setItem("blockMap", JSON.stringify(map))
                }
                handleRoadCheck()
            }
        }
        setAction(null)
    }, [action])

    //Camera settings
    const cameraPosition = new THREE.Vector3(40, 100, 20)
    const [cameraOrigin, setCameraOrigin] = useState(
        new THREE.Vector3(0, 0, 20),
    )
    const fov = 25
    const orbitControlsRef = useRef<OrbitControlsImpl>(null!)

    return (
        <div className="h-full w-full  ">
            <div className="mb-2 flex w-full flex-row justify-center gap-x-2">
                <Button
                    className="bg-cyan-500"
                    onClick={() => {
                        setIsInteractive(!isInteractive)
                    }}
                >
                    Интерактив
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={() => {
                        if (isInteractive) setAction("Clear from grass")
                    }}
                >
                    Выровнять
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={() => {
                        if (isInteractive) setAction("Plant grass")
                    }}
                >
                    Посадить траву
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={() => {
                        if (isInteractive) setAction("Grow a tree")
                    }}
                >
                    Посадить дерево
                </Button>
                <Button
                    className="bg-teal-500"
                    onClick={() => {
                        if (isInteractive) setAction("Water a tree")
                    }}
                >
                    Полить дерево
                </Button>
                <Button
                    className="bg-rose-600"
                    onClick={() => {
                        if (isInteractive) setAction("Chop down a tree")
                    }}
                >
                    Срубить дерево
                </Button>
                <Button
                    className="bg-black"
                    onClick={() => {
                        if (isInteractive) setAction("Build a road")
                    }}
                >
                    Построить дорогу
                </Button>
            </div>
            <Canvas camera={{ position: cameraPosition, fov, far: 15000 }}>
                <OrbitControls
                    target={cameraOrigin}
                    enableDamping={false}
                    ref={orbitControlsRef}
                    //!Controls boundaries, enable on production
                    /*
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

                {blockMap !== null ? (
                    <>
                        {blockMap.map((row, i) => (
                            <Fragment key={i}>
                                {row.map((obj, j) => {
                                    if (
                                        obj.type === "grass-1" ||
                                        obj.type === "grass-2" ||
                                        obj.type === "plane"
                                    )
                                        return (
                                            <Fragment key={j}>
                                                {generateGrassTile({
                                                    props: obj,
                                                    isInteractive,
                                                    action,
                                                    selectedObjectID,
                                                    handleClick: () => {
                                                        if (isInteractive) {
                                                            orbitControlsRef.current.saveState()
                                                            if (
                                                                selectedObjectID !==
                                                                obj.id
                                                            ) {
                                                                setSelectedObjectID(
                                                                    obj.id,
                                                                )
                                                            } else {
                                                                setSelectedObjectID(
                                                                    null,
                                                                )
                                                            }
                                                        }
                                                    },
                                                })}
                                            </Fragment>
                                        )
                                    else if (obj.type.includes("road")) {
                                        obj.rotation = 0
                                        return (
                                            <Fragment key={j}>
                                                {generateRoadTile({
                                                    props: obj,
                                                    isInteractive,
                                                    action,
                                                    selectedObjectID,
                                                    handleClick: () => {
                                                        if (isInteractive) {
                                                            orbitControlsRef.current.saveState()
                                                            if (
                                                                selectedObjectID !==
                                                                obj.id
                                                            ) {
                                                                setSelectedObjectID(
                                                                    obj.id,
                                                                )
                                                            } else {
                                                                setSelectedObjectID(
                                                                    null,
                                                                )
                                                            }
                                                        }
                                                    },
                                                })}
                                            </Fragment>
                                        )
                                    }
                                })}
                            </Fragment>
                        ))}
                    </>
                ) : (
                    <></>
                )}
                {objectMap !== null ? (
                    <>
                        {objectMap.map((row, i) => (
                            <Fragment key={i}>
                                {row.map((obj, j) => {
                                    const type = obj.type
                                    if (
                                        type === "tree" ||
                                        type === "medium-tree" ||
                                        type === "planted-tree"
                                    ) {
                                        return (
                                            <Fragment key={j}>
                                                {generateTree({
                                                    props: obj,
                                                })}
                                            </Fragment>
                                        )
                                    }
                                    return <Fragment key={j}></Fragment>
                                })}
                            </Fragment>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </Canvas>
        </div>
    )
}
