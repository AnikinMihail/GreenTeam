/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/trees/medium-tree-1.gltf --transform -t -j -M 
Files: public/models/trees/medium-tree-1.gltf [6.76KB] > D:\work\websites\greenteam\medium-tree-1-transformed.glb [5.19KB] (23%)
*/

import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
    nodes: {
        Base: THREE.Mesh
        Leaves1: THREE.Mesh
        Leaves2: THREE.Mesh
        Leaves3: THREE.Mesh
        Leaves4: THREE.Mesh
    }
    materials: {
        BaseMaterial: THREE.MeshStandardMaterial
        LeafMaterial: THREE.MeshStandardMaterial
    }
    animations: any[]
}

type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>

export default function MediumTree(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF(
        "/models/transformed/medium-tree-1-transformed.glb",
    ) as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Base.geometry}
                material={materials.BaseMaterial}
            />
            <mesh
                geometry={nodes.Leaves1.geometry}
                material={materials.LeafMaterial}
                position={[-1.331, 4.033, -0.33]}
                rotation={[1.13, -0.683, 2.854]}
                scale={0.514}
            />
            <mesh
                geometry={nodes.Leaves2.geometry}
                material={materials.LeafMaterial}
                position={[-0.404, 4.292, 0.183]}
                rotation={[-0.232, 0.024, 0.128]}
                scale={0.655}
            />
            <mesh
                geometry={nodes.Leaves3.geometry}
                material={materials.LeafMaterial}
                position={[0.767, 4.349, -0.419]}
                rotation={[1.174, -0.356, -2.581]}
                scale={0.685}
            />
            <mesh
                geometry={nodes.Leaves4.geometry}
                material={materials.LeafMaterial}
                position={[2.271, 4.204, -0.271]}
                rotation={[1.174, -0.356, -2.581]}
                scale={0.669}
            />
        </group>
    )
}

useGLTF.preload("/models/transformed/medium-tree-1-transformed.glb")
