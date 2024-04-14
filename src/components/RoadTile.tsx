/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/planes/road-tile/road-1.gltf --transform -t -j -M 
Files: public/models/planes/road-tile/road-1.gltf [8.49KB] > D:\work\websites\greenteam\road-1-transformed.glb [3.59KB] (58%)
*/

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { Action, BlockInfo, ObjectID } from "./Scene"

type GLTFResult = GLTF & {
    nodes: {
        Block: THREE.Mesh
        FakeUser: THREE.Mesh
        BorderX1: THREE.Mesh
        BorderX2: THREE.Mesh
        BorderY1: THREE.Mesh
        BorderY2: THREE.Mesh
        Road: THREE.Mesh
    }
    materials: {
        DirtBlockMaterial: THREE.MeshStandardMaterial
        SelectedMaterial: THREE.MeshStandardMaterial
        RoadMaterial: THREE.MeshStandardMaterial
    }
    animations: any[]
}

type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>

type SecondaryProps = {
    info: BlockInfo
    props: JSX.IntrinsicElements["group"]
    isInteractive: boolean
    action: Action | null
    selectedObjectID: ObjectID | null
    handleClick: () => void
}

export default function RoadTile({
    info,
    props,
    isInteractive,
    action,
    selectedObjectID,
    handleClick,
}: SecondaryProps) {
    const { nodes, materials } = useGLTF(
        "/models/transformed/road-1-transformed.glb",
    ) as GLTFResult

    const [isHovered, setIsHovered] = useState(false) //State for mouse hovering over grass
    const [isSelected, setIsSelected] = useState(false) //State for mouse hovering over grass
    const roadRef = useRef<THREE.Mesh>(null!) //Reference to grass block mesh

    //Compare id to that of hovered / selected

    useEffect(() => {
        if (selectedObjectID === info.id) setIsSelected(true)
        else setIsSelected(false)
    }, [selectedObjectID])

    //Change grass color when hovered or selected

    useEffect(() => {
        if (isInteractive) {
            if (isSelected)
                roadRef.current.material = materials.SelectedMaterial
            else if (isHovered)
                roadRef.current.material = nodes.BorderX1.material
            else roadRef.current.material = materials.RoadMaterial
        } else roadRef.current.material = materials.RoadMaterial
    }, [isHovered, isSelected, isInteractive])

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Block.geometry}
                material={materials.DirtBlockMaterial}
                scale={[1, 0.959, 1]}
            />
            {/*left*/}
            {!info.type.includes("l") &&
            info.type !== "road-c" &&
            info.type !== "road-x" ? (
                <mesh
                    geometry={nodes.BorderX1.geometry}
                    material={nodes.BorderX1.material}
                    position={[0.001, 1.08, 0.964]}
                    rotation={[0, -Math.PI / 2, 0]}
                    scale={[-0.036, -0.024, -1]}
                />
            ) : (
                <></>
            )}
            {/*right*/}
            {info.type.lastIndexOf("r") === 0 &&
            info.type !== "road-c" &&
            info.type !== "road-x" ? (
                <mesh
                    geometry={nodes.BorderX2.geometry}
                    material={nodes.BorderX2.material}
                    position={[0.001, 1.08, -0.964]}
                    rotation={[0, -Math.PI / 2, 0]}
                    scale={[-0.036, -0.024, -1]}
                />
            ) : (
                <></>
            )}

            {/*bottom*/}
            {!info.type.includes("b") &&
            info.type !== "road-c" &&
            info.type !== "road-y" ? (
                <mesh
                    geometry={nodes.BorderY1.geometry}
                    material={nodes.BorderY1.material}
                    position={[0.964, 1.079, 0]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-0.036, -0.024, -1]}
                />
            ) : (
                <></>
            )}
            {/*top*/}
            {!info.type.includes("t") &&
            info.type !== "road-c" &&
            info.type !== "road-y" ? (
                <mesh
                    geometry={nodes.BorderY2.geometry}
                    material={nodes.BorderY2.material}
                    position={[-0.964, 1.079, 0]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-0.036, -0.024, -1]}
                />
            ) : (
                <></>
            )}

            <mesh
                geometry={nodes.Road.geometry}
                material={materials.RoadMaterial}
                position={[0, 1.008, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-1, -0.048, -1]}
                ref={roadRef}
                onClick={() => {
                    setIsSelected(true)
                    handleClick()
                }}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            />
        </group>
    )
}

useGLTF.preload("/models/transformed/road-1-transformed.glb")
