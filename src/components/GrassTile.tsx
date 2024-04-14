"use client"

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { Action, BlockInfo, ObjectID } from "./Scene"

type GLTFResult = GLTF & {
    nodes: {
        Block: THREE.Mesh
        Grass: THREE.Mesh
        RockM01: THREE.Mesh
        RockS01: THREE.Mesh
        RockM02: THREE.Mesh
        RockS02: THREE.Mesh
        TallGrassL01: THREE.Mesh
        TallGrassL02: THREE.Mesh
        TallGrassM01: THREE.Mesh
        TallGrassM02: THREE.Mesh
        TallGrassS01: THREE.Mesh
        FakeUser: THREE.Mesh
    }
    materials: {
        DirtBlockMaterial: THREE.MeshStandardMaterial
        GrassMaterial: THREE.MeshStandardMaterial
        RockMaterial: THREE.MeshStandardMaterial
        GrassTallMaterial: THREE.MeshStandardMaterial
        SelectedMaterial: THREE.MeshStandardMaterial
    }
    animations: GLTFAction[]
}

type ActionName = "Cube.001Action"
interface GLTFAction extends THREE.AnimationClip {
    name: ActionName
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

export default function GrassTile({
    info,
    props,
    isInteractive,
    action,
    selectedObjectID,
    handleClick,
}: SecondaryProps) {
    const group = useRef<THREE.Group>(null!)
    const { nodes, materials } = useGLTF(
        "/models/transformed/grass-tile-transformed.glb",
    ) as GLTFResult

    const [isHovered, setIsHovered] = useState(false) //State for mouse hovering over grass
    const [isSelected, setIsSelected] = useState(false) //State for mouse hovering over grass
    const grassRef = useRef<THREE.Mesh>(null!) //Reference to grass block mesh

    //Compare id to that of hovered / selected

    useEffect(() => {
        if (selectedObjectID === info.id) setIsSelected(true)
        else setIsSelected(false)
    }, [selectedObjectID])

    //Change grass color when hovered or selected

    useEffect(() => {
        if (isInteractive) {
            if (isSelected)
                grassRef.current.material = materials.SelectedMaterial
            else if (isHovered)
                grassRef.current.material = materials.RockMaterial
            else grassRef.current.material = materials.GrassMaterial
        } else grassRef.current.material = materials.GrassMaterial
    }, [isHovered, isSelected, isInteractive])

    return (
        <group
            ref={group}
            {...props}
            rotation={[0, info.rotation, 0]}
            dispose={null}
        >
            <group name="Scene">
                <mesh
                    name="Block"
                    geometry={nodes.Block.geometry}
                    material={materials.DirtBlockMaterial}
                    scale={[1, 0.959, 1]}
                />
                <mesh
                    name="Grass"
                    ref={grassRef}
                    geometry={nodes.Grass.geometry}
                    material={materials.GrassMaterial}
                    position={[0, 0.998, 0]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-1, -0.04, -1]}
                    onPointerEnter={() => {
                        setIsHovered(true)
                    }}
                    onPointerLeave={() => {
                        setIsHovered(false)
                    }}
                    onClick={() => {
                        handleClick()
                    }}
                />

                {info.type === "grass-1" ? (
                    <>
                        <mesh
                            name="RockM01"
                            geometry={nodes.RockM01.geometry}
                            material={materials.RockMaterial}
                            position={[-0.497, 1.043, 0.31]}
                            scale={[1, 0.558, 1]}
                        />
                        <mesh
                            name="RockS01"
                            geometry={nodes.RockS01.geometry}
                            material={materials.RockMaterial}
                            position={[0.592, 1.043, 0.619]}
                            rotation={[-Math.PI, 0, -Math.PI]}
                            scale={[-0.742, -0.409, -0.742]}
                        />
                        <mesh
                            name="TallGrassL01"
                            geometry={nodes.TallGrassL01.geometry}
                            material={materials.GrassTallMaterial}
                            position={[0.411, 0.744, 0.151]}
                            scale={0.554}
                        />
                        <mesh
                            name="TallGrassM01"
                            geometry={nodes.TallGrassM01.geometry}
                            material={materials.GrassTallMaterial}
                            position={[-0.092, 0.847, -0.487]}
                            rotation={[Math.PI, 0, Math.PI]}
                            scale={0.342}
                        />
                        <mesh
                            name="TallGrassS01"
                            geometry={nodes.TallGrassS01.geometry}
                            material={materials.GrassTallMaterial}
                            position={[0.089, 0.878, 0.141]}
                            scale={0.365}
                        />
                    </>
                ) : info.type === "grass-2" ? (
                    <>
                        <mesh
                            name="RockM02"
                            geometry={nodes.RockM02.geometry}
                            material={materials.RockMaterial}
                            position={[0.325, 1.043, -0.326]}
                            scale={[1, 0.558, 1]}
                        />
                        <mesh
                            name="RockS02"
                            geometry={nodes.RockS02.geometry}
                            material={materials.RockMaterial}
                            position={[0.15, 1.043, 0.495]}
                            rotation={[-Math.PI, 0, -Math.PI]}
                            scale={[-0.742, -0.409, -0.742]}
                        />
                        <mesh
                            name="TallGrassL02"
                            geometry={nodes.TallGrassL02.geometry}
                            material={materials.GrassTallMaterial}
                            position={[-0.477, 0.591, -0.561]}
                            rotation={[-Math.PI, 0.111, -Math.PI]}
                            scale={0.554}
                        />
                        <mesh
                            name="TallGrassM02"
                            geometry={nodes.TallGrassM02.geometry}
                            material={materials.GrassTallMaterial}
                            position={[0.05, 0.677, 0.293]}
                            rotation={[0, 0.604, 0]}
                            scale={0.342}
                        />
                    </>
                ) : (
                    <></>
                )}
            </group>
        </group>
    )
}

useGLTF.preload("/models/transformed/grass-tile-transformed.glb")
