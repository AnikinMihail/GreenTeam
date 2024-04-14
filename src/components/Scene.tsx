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
import HouseModelRed1 from "./HouseModelRed1"

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
export type ObjectType =
    | "tree"
    | "planted-tree"
    | "medium-tree"
    | "house"
    | "occupied"
    | "null"
export type Action =
    | "Clear from grass"
    | "Grow a tree"
    | "Chop down a tree"
    | "Plant grass"
    | "Water a tree"
    | "Build a road"
    | "Remove a road"
    | "Build a house"
    | "Remove a house"
export type ObjectID = { x: number; y: number }

type GenerateTileProps = {
    props: BlockInfo
    isInteractive: boolean
    action: Action | null
    selectedObjectID: ObjectID | null
    handleClick: () => void
}

type GenerateObjectProps = {
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
}: GenerateTileProps) {
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
}: GenerateTileProps) {
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

function generateTree({ props }: GenerateObjectProps) {
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

function generateHouse({ props }: GenerateObjectProps) {
    if (props.id) {
        return (
            <HouseModelRed1
                position={[props.id.x * 2 + 1, 1, props.id.y * 2 + 1]}
                rotation={[0, props.rotation, 0]}
            />
        )
    }
}

export default function Scene() {
    //Game presets
    const presetObjectString = `[[{"type":"null","rotation":0,"id":{"x":0,"y":0}},{"type":"null","rotation":0,"id":{"x":0,"y":1}},{"type":"medium-tree","rotation":4.71238898038469,"id":{"x":0,"y":2}},{"type":"null","rotation":0,"id":{"x":0,"y":3}},{"type":"null","rotation":0,"id":{"x":0,"y":4}},{"type":"null","rotation":0,"id":{"x":0,"y":5}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":0,"y":6}},{"type":"null","rotation":0,"id":{"x":0,"y":7}},{"type":"null","rotation":0,"id":{"x":0,"y":8}},{"type":"null","rotation":0,"id":{"x":0,"y":9}},{"type":"medium-tree","rotation":4.71238898038469,"id":{"x":0,"y":10}},{"type":"null","rotation":0,"id":{"x":0,"y":11}},{"type":"null","rotation":0,"id":{"x":0,"y":12}},{"type":"null","rotation":0,"id":{"x":0,"y":13}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":0,"y":14}},{"type":"null","rotation":0,"id":{"x":0,"y":15}},{"type":"null","rotation":0,"id":{"x":0,"y":16}},{"type":"null","rotation":0,"id":{"x":0,"y":17}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":0,"y":18}},{"type":"null","rotation":0,"id":{"x":0,"y":19}},{"type":"null","rotation":0,"id":{"x":0,"y":20}},{"type":"null","rotation":0,"id":{"x":0,"y":21}},{"type":"null","rotation":0,"id":{"x":0,"y":22}},{"type":"null","rotation":0,"id":{"x":0,"y":23}},{"type":"null","rotation":0,"id":{"x":0,"y":24}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":0,"y":25}},{"type":"null","rotation":0,"id":{"x":0,"y":26}},{"type":"null","rotation":0,"id":{"x":0,"y":27}},{"type":"null","rotation":0,"id":{"x":0,"y":28}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":0,"y":29}}],[{"type":"null","rotation":0,"id":{"x":1,"y":0}},{"type":"null","rotation":0,"id":{"x":1,"y":1}},{"type":"null","rotation":0,"id":{"x":1,"y":2}},{"type":"null","rotation":0,"id":{"x":1,"y":3}},{"type":"null","rotation":0,"id":{"x":1,"y":4}},{"type":"null","rotation":0,"id":{"x":1,"y":5}},{"type":"null","rotation":0,"id":{"x":1,"y":6}},{"type":"null","rotation":0,"id":{"x":1,"y":7}},{"type":"null","rotation":0,"id":{"x":1,"y":8}},{"type":"null","rotation":0,"id":{"x":1,"y":9}},{"type":"null","rotation":0,"id":{"x":1,"y":10}},{"type":"null","rotation":0,"id":{"x":1,"y":11}},{"type":"null","rotation":0,"id":{"x":1,"y":12}},{"type":"null","rotation":0,"id":{"x":1,"y":13}},{"type":"null","rotation":0,"id":{"x":1,"y":14}},{"type":"null","rotation":0,"id":{"x":1,"y":15}},{"type":"null","rotation":0,"id":{"x":1,"y":16}},{"type":"null","rotation":0,"id":{"x":1,"y":17}},{"type":"null","rotation":0,"id":{"x":1,"y":18}},{"type":"null","rotation":0,"id":{"x":1,"y":19}},{"type":"null","rotation":0,"id":{"x":1,"y":20}},{"type":"null","rotation":0,"id":{"x":1,"y":21}},{"type":"null","rotation":0,"id":{"x":1,"y":22}},{"type":"null","rotation":0,"id":{"x":1,"y":23}},{"type":"null","rotation":0,"id":{"x":1,"y":24}},{"type":"null","rotation":0,"id":{"x":1,"y":25}},{"type":"null","rotation":0,"id":{"x":1,"y":26}},{"type":"null","rotation":0,"id":{"x":1,"y":27}},{"type":"null","rotation":0,"id":{"x":1,"y":28}},{"type":"null","rotation":0,"id":{"x":1,"y":29}}],[{"type":"null","rotation":0,"id":{"x":2,"y":0}},{"type":"null","rotation":0,"id":{"x":2,"y":1}},{"type":"null","rotation":0,"id":{"x":2,"y":2}},{"type":"null","rotation":0,"id":{"x":2,"y":3}},{"type":"null","rotation":0,"id":{"x":2,"y":4}},{"type":"null","rotation":0,"id":{"x":2,"y":5}},{"type":"null","rotation":0,"id":{"x":2,"y":6}},{"type":"null","rotation":0,"id":{"x":2,"y":7}},{"type":"null","rotation":0,"id":{"x":2,"y":8}},{"type":"null","rotation":0,"id":{"x":2,"y":9}},{"type":"null","rotation":0,"id":{"x":2,"y":10}},{"type":"null","rotation":0,"id":{"x":2,"y":11}},{"type":"null","rotation":0,"id":{"x":2,"y":12}},{"type":"null","rotation":0,"id":{"x":2,"y":13}},{"type":"null","rotation":0,"id":{"x":2,"y":14}},{"type":"null","rotation":0,"id":{"x":2,"y":15}},{"type":"null","rotation":0,"id":{"x":2,"y":16}},{"type":"null","rotation":0,"id":{"x":2,"y":17}},{"type":"null","rotation":0,"id":{"x":2,"y":18}},{"type":"null","rotation":0,"id":{"x":2,"y":19}},{"type":"null","rotation":0,"id":{"x":2,"y":20}},{"type":"null","rotation":0,"id":{"x":2,"y":21}},{"type":"null","rotation":0,"id":{"x":2,"y":22}},{"type":"null","rotation":0,"id":{"x":2,"y":23}},{"type":"null","rotation":0,"id":{"x":2,"y":24}},{"type":"null","rotation":0,"id":{"x":2,"y":25}},{"type":"null","rotation":0,"id":{"x":2,"y":26}},{"type":"null","rotation":0,"id":{"x":2,"y":27}},{"type":"null","rotation":0,"id":{"x":2,"y":28}},{"type":"null","rotation":0,"id":{"x":2,"y":29}}],[{"type":"occupied","rotation":0,"id":{"x":3,"y":0}},{"type":"occupied","rotation":0,"id":{"x":3,"y":1}},{"type":"occupied","rotation":0,"id":{"x":3,"y":2}},{"type":"occupied","rotation":0,"id":{"x":3,"y":3}},{"type":"null","rotation":0,"id":{"x":3,"y":4}},{"type":"occupied","rotation":0,"id":{"x":3,"y":5}},{"type":"occupied","rotation":0,"id":{"x":3,"y":6}},{"type":"occupied","rotation":0,"id":{"x":3,"y":7}},{"type":"occupied","rotation":0,"id":{"x":3,"y":8}},{"type":"null","rotation":0,"id":{"x":3,"y":9}},{"type":"occupied","rotation":0,"id":{"x":3,"y":10}},{"type":"occupied","rotation":0,"id":{"x":3,"y":11}},{"type":"occupied","rotation":0,"id":{"x":3,"y":12}},{"type":"occupied","rotation":0,"id":{"x":3,"y":13}},{"type":"null","rotation":0,"id":{"x":3,"y":14}},{"type":"occupied","rotation":0,"id":{"x":3,"y":15}},{"type":"occupied","rotation":0,"id":{"x":3,"y":16}},{"type":"occupied","rotation":0,"id":{"x":3,"y":17}},{"type":"occupied","rotation":0,"id":{"x":3,"y":18}},{"type":"null","rotation":0,"id":{"x":3,"y":19}},{"type":"null","rotation":0,"id":{"x":3,"y":20}},{"type":"null","rotation":0,"id":{"x":3,"y":21}},{"type":"null","rotation":0,"id":{"x":3,"y":22}},{"type":"null","rotation":0,"id":{"x":3,"y":23}},{"type":"null","rotation":0,"id":{"x":3,"y":24}},{"type":"occupied","rotation":0,"id":{"x":3,"y":25}},{"type":"occupied","rotation":0,"id":{"x":3,"y":26}},{"type":"occupied","rotation":0,"id":{"x":3,"y":27}},{"type":"occupied","rotation":0,"id":{"x":3,"y":28}},{"type":"null","rotation":0,"id":{"x":3,"y":29}}],[{"type":"occupied","rotation":0,"id":{"x":4,"y":0}},{"type":"occupied","rotation":0,"id":{"x":4,"y":1}},{"type":"occupied","rotation":0,"id":{"x":4,"y":2}},{"type":"occupied","rotation":0,"id":{"x":4,"y":3}},{"type":"null","rotation":0,"id":{"x":4,"y":4}},{"type":"occupied","rotation":0,"id":{"x":4,"y":5}},{"type":"occupied","rotation":0,"id":{"x":4,"y":6}},{"type":"occupied","rotation":0,"id":{"x":4,"y":7}},{"type":"occupied","rotation":0,"id":{"x":4,"y":8}},{"type":"null","rotation":0,"id":{"x":4,"y":9}},{"type":"occupied","rotation":0,"id":{"x":4,"y":10}},{"type":"occupied","rotation":0,"id":{"x":4,"y":11}},{"type":"occupied","rotation":0,"id":{"x":4,"y":12}},{"type":"occupied","rotation":0,"id":{"x":4,"y":13}},{"type":"null","rotation":0,"id":{"x":4,"y":14}},{"type":"occupied","rotation":0,"id":{"x":4,"y":15}},{"type":"occupied","rotation":0,"id":{"x":4,"y":16}},{"type":"occupied","rotation":0,"id":{"x":4,"y":17}},{"type":"occupied","rotation":0,"id":{"x":4,"y":18}},{"type":"null","rotation":0,"id":{"x":4,"y":19}},{"type":"null","rotation":0,"id":{"x":4,"y":20}},{"type":"null","rotation":0,"id":{"x":4,"y":21}},{"type":"null","rotation":0,"id":{"x":4,"y":22}},{"type":"null","rotation":0,"id":{"x":4,"y":23}},{"type":"null","rotation":0,"id":{"x":4,"y":24}},{"type":"occupied","rotation":0,"id":{"x":4,"y":25}},{"type":"occupied","rotation":0,"id":{"x":4,"y":26}},{"type":"occupied","rotation":0,"id":{"x":4,"y":27}},{"type":"occupied","rotation":0,"id":{"x":4,"y":28}},{"type":"null","rotation":0,"id":{"x":4,"y":29}}],[{"type":"occupied","rotation":0,"id":{"x":5,"y":0}},{"type":"occupied","rotation":0,"id":{"x":5,"y":1}},{"type":"occupied","rotation":0,"id":{"x":5,"y":2}},{"type":"occupied","rotation":0,"id":{"x":5,"y":3}},{"type":"null","rotation":0,"id":{"x":5,"y":4}},{"type":"occupied","rotation":0,"id":{"x":5,"y":5}},{"type":"occupied","rotation":0,"id":{"x":5,"y":6}},{"type":"occupied","rotation":0,"id":{"x":5,"y":7}},{"type":"occupied","rotation":0,"id":{"x":5,"y":8}},{"type":"null","rotation":0,"id":{"x":5,"y":9}},{"type":"occupied","rotation":0,"id":{"x":5,"y":10}},{"type":"occupied","rotation":0,"id":{"x":5,"y":11}},{"type":"occupied","rotation":0,"id":{"x":5,"y":12}},{"type":"occupied","rotation":0,"id":{"x":5,"y":13}},{"type":"null","rotation":0,"id":{"x":5,"y":14}},{"type":"occupied","rotation":0,"id":{"x":5,"y":15}},{"type":"occupied","rotation":0,"id":{"x":5,"y":16}},{"type":"occupied","rotation":0,"id":{"x":5,"y":17}},{"type":"occupied","rotation":0,"id":{"x":5,"y":18}},{"type":"null","rotation":0,"id":{"x":5,"y":19}},{"type":"null","rotation":0,"id":{"x":5,"y":20}},{"type":"null","rotation":0,"id":{"x":5,"y":21}},{"type":"null","rotation":0,"id":{"x":5,"y":22}},{"type":"null","rotation":0,"id":{"x":5,"y":23}},{"type":"null","rotation":0,"id":{"x":5,"y":24}},{"type":"occupied","rotation":0,"id":{"x":5,"y":25}},{"type":"occupied","rotation":0,"id":{"x":5,"y":26}},{"type":"occupied","rotation":0,"id":{"x":5,"y":27}},{"type":"occupied","rotation":0,"id":{"x":5,"y":28}},{"type":"null","rotation":0,"id":{"x":5,"y":29}}],[{"type":"occupied","rotation":0,"id":{"x":6,"y":0}},{"type":"occupied","rotation":0,"id":{"x":6,"y":1}},{"type":"occupied","rotation":0,"id":{"x":6,"y":2}},{"type":"house","rotation":0,"id":{"x":6,"y":3}},{"type":"null","rotation":0,"id":{"x":6,"y":4}},{"type":"occupied","rotation":0,"id":{"x":6,"y":5}},{"type":"occupied","rotation":0,"id":{"x":6,"y":6}},{"type":"occupied","rotation":0,"id":{"x":6,"y":7}},{"type":"house","rotation":0,"id":{"x":6,"y":8}},{"type":"null","rotation":0,"id":{"x":6,"y":9}},{"type":"occupied","rotation":0,"id":{"x":6,"y":10}},{"type":"occupied","rotation":0,"id":{"x":6,"y":11}},{"type":"occupied","rotation":0,"id":{"x":6,"y":12}},{"type":"house","rotation":0,"id":{"x":6,"y":13}},{"type":"null","rotation":0,"id":{"x":6,"y":14}},{"type":"occupied","rotation":0,"id":{"x":6,"y":15}},{"type":"occupied","rotation":0,"id":{"x":6,"y":16}},{"type":"occupied","rotation":0,"id":{"x":6,"y":17}},{"type":"house","rotation":0,"id":{"x":6,"y":18}},{"type":"null","rotation":0,"id":{"x":6,"y":19}},{"type":"null","rotation":0,"id":{"x":6,"y":20}},{"type":"null","rotation":0,"id":{"x":6,"y":21}},{"type":"null","rotation":0,"id":{"x":6,"y":22}},{"type":"null","rotation":0,"id":{"x":6,"y":23}},{"type":"null","rotation":0,"id":{"x":6,"y":24}},{"type":"occupied","rotation":0,"id":{"x":6,"y":25}},{"type":"occupied","rotation":0,"id":{"x":6,"y":26}},{"type":"occupied","rotation":0,"id":{"x":6,"y":27}},{"type":"house","rotation":0,"id":{"x":6,"y":28}},{"type":"null","rotation":0,"id":{"x":6,"y":29}}],[{"type":"null","rotation":0,"id":{"x":7,"y":0}},{"type":"null","rotation":0,"id":{"x":7,"y":1}},{"type":"null","rotation":0,"id":{"x":7,"y":2}},{"type":"null","rotation":0,"id":{"x":7,"y":3}},{"type":"null","rotation":0,"id":{"x":7,"y":4}},{"type":"null","rotation":0,"id":{"x":7,"y":5}},{"type":"null","rotation":0,"id":{"x":7,"y":6}},{"type":"null","rotation":0,"id":{"x":7,"y":7}},{"type":"null","rotation":0,"id":{"x":7,"y":8}},{"type":"null","rotation":0,"id":{"x":7,"y":9}},{"type":"null","rotation":0,"id":{"x":7,"y":10}},{"type":"null","rotation":0,"id":{"x":7,"y":11}},{"type":"null","rotation":0,"id":{"x":7,"y":12}},{"type":"null","rotation":0,"id":{"x":7,"y":13}},{"type":"null","rotation":0,"id":{"x":7,"y":14}},{"type":"null","rotation":0,"id":{"x":7,"y":15}},{"type":"null","rotation":0,"id":{"x":7,"y":16}},{"type":"null","rotation":0,"id":{"x":7,"y":17}},{"type":"null","rotation":0,"id":{"x":7,"y":18}},{"type":"null","rotation":0,"id":{"x":7,"y":19}},{"type":"null","rotation":0,"id":{"x":7,"y":20}},{"type":"null","rotation":0,"id":{"x":7,"y":21}},{"type":"null","rotation":0,"id":{"x":7,"y":22}},{"type":"null","rotation":0,"id":{"x":7,"y":23}},{"type":"null","rotation":0,"id":{"x":7,"y":24}},{"type":"null","rotation":0,"id":{"x":7,"y":25}},{"type":"null","rotation":0,"id":{"x":7,"y":26}},{"type":"null","rotation":0,"id":{"x":7,"y":27}},{"type":"null","rotation":0,"id":{"x":7,"y":28}},{"type":"null","rotation":0,"id":{"x":7,"y":29}}],[{"type":"null","rotation":0,"id":{"x":8,"y":0}},{"type":"null","rotation":0,"id":{"x":8,"y":1}},{"type":"null","rotation":0,"id":{"x":8,"y":2}},{"type":"null","rotation":0,"id":{"x":8,"y":3}},{"type":"null","rotation":0,"id":{"x":8,"y":4}},{"type":"null","rotation":0,"id":{"x":8,"y":5}},{"type":"null","rotation":0,"id":{"x":8,"y":6}},{"type":"null","rotation":0,"id":{"x":8,"y":7}},{"type":"null","rotation":0,"id":{"x":8,"y":8}},{"type":"null","rotation":0,"id":{"x":8,"y":9}},{"type":"null","rotation":0,"id":{"x":8,"y":10}},{"type":"null","rotation":0,"id":{"x":8,"y":11}},{"type":"null","rotation":0,"id":{"x":8,"y":12}},{"type":"null","rotation":0,"id":{"x":8,"y":13}},{"type":"null","rotation":0,"id":{"x":8,"y":14}},{"type":"null","rotation":0,"id":{"x":8,"y":15}},{"type":"null","rotation":0,"id":{"x":8,"y":16}},{"type":"null","rotation":0,"id":{"x":8,"y":17}},{"type":"null","rotation":0,"id":{"x":8,"y":18}},{"type":"null","rotation":0,"id":{"x":8,"y":19}},{"type":"null","rotation":0,"id":{"x":8,"y":20}},{"type":"null","rotation":0,"id":{"x":8,"y":21}},{"type":"null","rotation":0,"id":{"x":8,"y":22}},{"type":"null","rotation":0,"id":{"x":8,"y":23}},{"type":"null","rotation":0,"id":{"x":8,"y":24}},{"type":"null","rotation":0,"id":{"x":8,"y":25}},{"type":"null","rotation":0,"id":{"x":8,"y":26}},{"type":"null","rotation":0,"id":{"x":8,"y":27}},{"type":"null","rotation":0,"id":{"x":8,"y":28}},{"type":"null","rotation":0,"id":{"x":8,"y":29}}],[{"type":"null","rotation":0,"id":{"x":9,"y":0}},{"type":"null","rotation":0,"id":{"x":9,"y":1}},{"type":"null","rotation":0,"id":{"x":9,"y":2}},{"type":"null","rotation":0,"id":{"x":9,"y":3}},{"type":"null","rotation":0,"id":{"x":9,"y":4}},{"type":"null","rotation":0,"id":{"x":9,"y":5}},{"type":"null","rotation":0,"id":{"x":9,"y":6}},{"type":"null","rotation":0,"id":{"x":9,"y":7}},{"type":"null","rotation":0,"id":{"x":9,"y":8}},{"type":"null","rotation":0,"id":{"x":9,"y":9}},{"type":"null","rotation":0,"id":{"x":9,"y":10}},{"type":"null","rotation":0,"id":{"x":9,"y":11}},{"type":"null","rotation":0,"id":{"x":9,"y":12}},{"type":"null","rotation":0,"id":{"x":9,"y":13}},{"type":"null","rotation":0,"id":{"x":9,"y":14}},{"type":"null","rotation":0,"id":{"x":9,"y":15}},{"type":"null","rotation":0,"id":{"x":9,"y":16}},{"type":"null","rotation":0,"id":{"x":9,"y":17}},{"type":"null","rotation":0,"id":{"x":9,"y":18}},{"type":"null","rotation":0,"id":{"x":9,"y":19}},{"type":"null","rotation":0,"id":{"x":9,"y":20}},{"type":"null","rotation":0,"id":{"x":9,"y":21}},{"type":"null","rotation":0,"id":{"x":9,"y":22}},{"type":"null","rotation":0,"id":{"x":9,"y":23}},{"type":"null","rotation":0,"id":{"x":9,"y":24}},{"type":"null","rotation":0,"id":{"x":9,"y":25}},{"type":"null","rotation":0,"id":{"x":9,"y":26}},{"type":"null","rotation":0,"id":{"x":9,"y":27}},{"type":"null","rotation":0,"id":{"x":9,"y":28}},{"type":"null","rotation":0,"id":{"x":9,"y":29}}],[{"type":"null","rotation":0,"id":{"x":10,"y":0}},{"type":"null","rotation":0,"id":{"x":10,"y":1}},{"type":"null","rotation":0,"id":{"x":10,"y":2}},{"type":"null","rotation":0,"id":{"x":10,"y":3}},{"type":"null","rotation":0,"id":{"x":10,"y":4}},{"type":"null","rotation":0,"id":{"x":10,"y":5}},{"type":"null","rotation":0,"id":{"x":10,"y":6}},{"type":"null","rotation":0,"id":{"x":10,"y":7}},{"type":"null","rotation":0,"id":{"x":10,"y":8}},{"type":"null","rotation":0,"id":{"x":10,"y":9}},{"type":"null","rotation":0,"id":{"x":10,"y":10}},{"type":"null","rotation":0,"id":{"x":10,"y":11}},{"type":"null","rotation":0,"id":{"x":10,"y":12}},{"type":"null","rotation":0,"id":{"x":10,"y":13}},{"type":"null","rotation":0,"id":{"x":10,"y":14}},{"type":"null","rotation":0,"id":{"x":10,"y":15}},{"type":"null","rotation":0,"id":{"x":10,"y":16}},{"type":"null","rotation":0,"id":{"x":10,"y":17}},{"type":"null","rotation":0,"id":{"x":10,"y":18}},{"type":"null","rotation":0,"id":{"x":10,"y":19}},{"type":"null","rotation":0,"id":{"x":10,"y":20}},{"type":"null","rotation":0,"id":{"x":10,"y":21}},{"type":"null","rotation":0,"id":{"x":10,"y":22}},{"type":"null","rotation":0,"id":{"x":10,"y":23}},{"type":"null","rotation":0,"id":{"x":10,"y":24}},{"type":"null","rotation":0,"id":{"x":10,"y":25}},{"type":"null","rotation":0,"id":{"x":10,"y":26}},{"type":"null","rotation":0,"id":{"x":10,"y":27}},{"type":"null","rotation":0,"id":{"x":10,"y":28}},{"type":"null","rotation":0,"id":{"x":10,"y":29}}],[{"type":"null","rotation":0,"id":{"x":11,"y":0}},{"type":"null","rotation":0,"id":{"x":11,"y":1}},{"type":"null","rotation":0,"id":{"x":11,"y":2}},{"type":"null","rotation":0,"id":{"x":11,"y":3}},{"type":"null","rotation":0,"id":{"x":11,"y":4}},{"type":"null","rotation":0,"id":{"x":11,"y":5}},{"type":"null","rotation":0,"id":{"x":11,"y":6}},{"type":"null","rotation":0,"id":{"x":11,"y":7}},{"type":"null","rotation":0,"id":{"x":11,"y":8}},{"type":"null","rotation":0,"id":{"x":11,"y":9}},{"type":"null","rotation":0,"id":{"x":11,"y":10}},{"type":"null","rotation":0,"id":{"x":11,"y":11}},{"type":"null","rotation":0,"id":{"x":11,"y":12}},{"type":"null","rotation":0,"id":{"x":11,"y":13}},{"type":"null","rotation":0,"id":{"x":11,"y":14}},{"type":"null","rotation":0,"id":{"x":11,"y":15}},{"type":"null","rotation":0,"id":{"x":11,"y":16}},{"type":"null","rotation":0,"id":{"x":11,"y":17}},{"type":"null","rotation":0,"id":{"x":11,"y":18}},{"type":"null","rotation":0,"id":{"x":11,"y":19}},{"type":"null","rotation":0,"id":{"x":11,"y":20}},{"type":"null","rotation":0,"id":{"x":11,"y":21}},{"type":"null","rotation":0,"id":{"x":11,"y":22}},{"type":"null","rotation":0,"id":{"x":11,"y":23}},{"type":"null","rotation":0,"id":{"x":11,"y":24}},{"type":"null","rotation":0,"id":{"x":11,"y":25}},{"type":"null","rotation":0,"id":{"x":11,"y":26}},{"type":"null","rotation":0,"id":{"x":11,"y":27}},{"type":"null","rotation":0,"id":{"x":11,"y":28}},{"type":"null","rotation":0,"id":{"x":11,"y":29}}],[{"type":"null","rotation":0,"id":{"x":12,"y":0}},{"type":"medium-tree","rotation":0,"id":{"x":12,"y":1}},{"type":"null","rotation":0,"id":{"x":12,"y":2}},{"type":"null","rotation":0,"id":{"x":12,"y":3}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":12,"y":4}},{"type":"null","rotation":0,"id":{"x":12,"y":5}},{"type":"null","rotation":0,"id":{"x":12,"y":6}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":12,"y":7}},{"type":"null","rotation":0,"id":{"x":12,"y":8}},{"type":"null","rotation":0,"id":{"x":12,"y":9}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":12,"y":10}},{"type":"null","rotation":0,"id":{"x":12,"y":11}},{"type":"null","rotation":0,"id":{"x":12,"y":12}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":12,"y":13}},{"type":"null","rotation":0,"id":{"x":12,"y":14}},{"type":"null","rotation":0,"id":{"x":12,"y":15}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":12,"y":16}},{"type":"null","rotation":0,"id":{"x":12,"y":17}},{"type":"null","rotation":0,"id":{"x":12,"y":18}},{"type":"medium-tree","rotation":1.5707963267948966,"id":{"x":12,"y":19}},{"type":"null","rotation":0,"id":{"x":12,"y":20}},{"type":"null","rotation":0,"id":{"x":12,"y":21}},{"type":"null","rotation":0,"id":{"x":12,"y":22}},{"type":"null","rotation":0,"id":{"x":12,"y":23}},{"type":"null","rotation":0,"id":{"x":12,"y":24}},{"type":"null","rotation":0,"id":{"x":12,"y":25}},{"type":"null","rotation":0,"id":{"x":12,"y":26}},{"type":"null","rotation":0,"id":{"x":12,"y":27}},{"type":"null","rotation":0,"id":{"x":12,"y":28}},{"type":"null","rotation":0,"id":{"x":12,"y":29}}],[{"type":"null","rotation":0,"id":{"x":13,"y":0}},{"type":"null","rotation":0,"id":{"x":13,"y":1}},{"type":"null","rotation":0,"id":{"x":13,"y":2}},{"type":"null","rotation":0,"id":{"x":13,"y":3}},{"type":"null","rotation":0,"id":{"x":13,"y":4}},{"type":"null","rotation":0,"id":{"x":13,"y":5}},{"type":"null","rotation":0,"id":{"x":13,"y":6}},{"type":"null","rotation":0,"id":{"x":13,"y":7}},{"type":"null","rotation":0,"id":{"x":13,"y":8}},{"type":"null","rotation":0,"id":{"x":13,"y":9}},{"type":"null","rotation":0,"id":{"x":13,"y":10}},{"type":"null","rotation":0,"id":{"x":13,"y":11}},{"type":"null","rotation":0,"id":{"x":13,"y":12}},{"type":"null","rotation":0,"id":{"x":13,"y":13}},{"type":"null","rotation":0,"id":{"x":13,"y":14}},{"type":"null","rotation":0,"id":{"x":13,"y":15}},{"type":"null","rotation":0,"id":{"x":13,"y":16}},{"type":"null","rotation":0,"id":{"x":13,"y":17}},{"type":"null","rotation":0,"id":{"x":13,"y":18}},{"type":"null","rotation":0,"id":{"x":13,"y":19}},{"type":"null","rotation":0,"id":{"x":13,"y":20}},{"type":"null","rotation":0,"id":{"x":13,"y":21}},{"type":"null","rotation":0,"id":{"x":13,"y":22}},{"type":"null","rotation":0,"id":{"x":13,"y":23}},{"type":"null","rotation":0,"id":{"x":13,"y":24}},{"type":"tree","rotation":0,"id":{"x":13,"y":25}},{"type":"null","rotation":0,"id":{"x":13,"y":26}},{"type":"null","rotation":0,"id":{"x":13,"y":27}},{"type":"tree","rotation":1.5707963267948966,"id":{"x":13,"y":28}},{"type":"null","rotation":0,"id":{"x":13,"y":29}}],[{"type":"null","rotation":0,"id":{"x":14,"y":0}},{"type":"null","rotation":0,"id":{"x":14,"y":1}},{"type":"null","rotation":0,"id":{"x":14,"y":2}},{"type":"null","rotation":0,"id":{"x":14,"y":3}},{"type":"null","rotation":0,"id":{"x":14,"y":4}},{"type":"null","rotation":0,"id":{"x":14,"y":5}},{"type":"null","rotation":0,"id":{"x":14,"y":6}},{"type":"null","rotation":0,"id":{"x":14,"y":7}},{"type":"null","rotation":0,"id":{"x":14,"y":8}},{"type":"null","rotation":0,"id":{"x":14,"y":9}},{"type":"null","rotation":0,"id":{"x":14,"y":10}},{"type":"null","rotation":0,"id":{"x":14,"y":11}},{"type":"null","rotation":0,"id":{"x":14,"y":12}},{"type":"null","rotation":0,"id":{"x":14,"y":13}},{"type":"null","rotation":0,"id":{"x":14,"y":14}},{"type":"null","rotation":0,"id":{"x":14,"y":15}},{"type":"null","rotation":0,"id":{"x":14,"y":16}},{"type":"null","rotation":0,"id":{"x":14,"y":17}},{"type":"null","rotation":0,"id":{"x":14,"y":18}},{"type":"null","rotation":0,"id":{"x":14,"y":19}},{"type":"null","rotation":0,"id":{"x":14,"y":20}},{"type":"null","rotation":0,"id":{"x":14,"y":21}},{"type":"null","rotation":0,"id":{"x":14,"y":22}},{"type":"null","rotation":0,"id":{"x":14,"y":23}},{"type":"null","rotation":0,"id":{"x":14,"y":24}},{"type":"null","rotation":0,"id":{"x":14,"y":25}},{"type":"null","rotation":0,"id":{"x":14,"y":26}},{"type":"null","rotation":0,"id":{"x":14,"y":27}},{"type":"null","rotation":0,"id":{"x":14,"y":28}},{"type":"null","rotation":0,"id":{"x":14,"y":29}}],[{"type":"null","rotation":0,"id":{"x":15,"y":0}},{"type":"null","rotation":0,"id":{"x":15,"y":1}},{"type":"null","rotation":0,"id":{"x":15,"y":2}},{"type":"null","rotation":0,"id":{"x":15,"y":3}},{"type":"null","rotation":0,"id":{"x":15,"y":4}},{"type":"null","rotation":0,"id":{"x":15,"y":5}},{"type":"null","rotation":0,"id":{"x":15,"y":6}},{"type":"null","rotation":0,"id":{"x":15,"y":7}},{"type":"null","rotation":0,"id":{"x":15,"y":8}},{"type":"null","rotation":0,"id":{"x":15,"y":9}},{"type":"null","rotation":0,"id":{"x":15,"y":10}},{"type":"null","rotation":0,"id":{"x":15,"y":11}},{"type":"null","rotation":0,"id":{"x":15,"y":12}},{"type":"null","rotation":0,"id":{"x":15,"y":13}},{"type":"null","rotation":0,"id":{"x":15,"y":14}},{"type":"null","rotation":0,"id":{"x":15,"y":15}},{"type":"null","rotation":0,"id":{"x":15,"y":16}},{"type":"null","rotation":0,"id":{"x":15,"y":17}},{"type":"null","rotation":0,"id":{"x":15,"y":18}},{"type":"null","rotation":0,"id":{"x":15,"y":19}},{"type":"null","rotation":0,"id":{"x":15,"y":20}},{"type":"null","rotation":0,"id":{"x":15,"y":21}},{"type":"null","rotation":0,"id":{"x":15,"y":22}},{"type":"null","rotation":0,"id":{"x":15,"y":23}},{"type":"null","rotation":0,"id":{"x":15,"y":24}},{"type":"null","rotation":0,"id":{"x":15,"y":25}},{"type":"null","rotation":0,"id":{"x":15,"y":26}},{"type":"null","rotation":0,"id":{"x":15,"y":27}},{"type":"null","rotation":0,"id":{"x":15,"y":28}},{"type":"null","rotation":0,"id":{"x":15,"y":29}}],[{"type":"null","rotation":0,"id":{"x":16,"y":0}},{"type":"null","rotation":0,"id":{"x":16,"y":1}},{"type":"null","rotation":0,"id":{"x":16,"y":2}},{"type":"null","rotation":0,"id":{"x":16,"y":3}},{"type":"null","rotation":0,"id":{"x":16,"y":4}},{"type":"null","rotation":0,"id":{"x":16,"y":5}},{"type":"null","rotation":0,"id":{"x":16,"y":6}},{"type":"null","rotation":0,"id":{"x":16,"y":7}},{"type":"null","rotation":0,"id":{"x":16,"y":8}},{"type":"null","rotation":0,"id":{"x":16,"y":9}},{"type":"null","rotation":0,"id":{"x":16,"y":10}},{"type":"null","rotation":0,"id":{"x":16,"y":11}},{"type":"null","rotation":0,"id":{"x":16,"y":12}},{"type":"null","rotation":0,"id":{"x":16,"y":13}},{"type":"null","rotation":0,"id":{"x":16,"y":14}},{"type":"null","rotation":0,"id":{"x":16,"y":15}},{"type":"null","rotation":0,"id":{"x":16,"y":16}},{"type":"null","rotation":0,"id":{"x":16,"y":17}},{"type":"null","rotation":0,"id":{"x":16,"y":18}},{"type":"null","rotation":0,"id":{"x":16,"y":19}},{"type":"null","rotation":0,"id":{"x":16,"y":20}},{"type":"null","rotation":0,"id":{"x":16,"y":21}},{"type":"null","rotation":0,"id":{"x":16,"y":22}},{"type":"null","rotation":0,"id":{"x":16,"y":23}},{"type":"null","rotation":0,"id":{"x":16,"y":24}},{"type":"null","rotation":0,"id":{"x":16,"y":25}},{"type":"null","rotation":0,"id":{"x":16,"y":26}},{"type":"null","rotation":0,"id":{"x":16,"y":27}},{"type":"null","rotation":0,"id":{"x":16,"y":28}},{"type":"null","rotation":0,"id":{"x":16,"y":29}}],[{"type":"null","rotation":0,"id":{"x":17,"y":0}},{"type":"null","rotation":0,"id":{"x":17,"y":1}},{"type":"null","rotation":0,"id":{"x":17,"y":2}},{"type":"null","rotation":0,"id":{"x":17,"y":3}},{"type":"occupied","rotation":0,"id":{"x":17,"y":4}},{"type":"occupied","rotation":0,"id":{"x":17,"y":5}},{"type":"occupied","rotation":0,"id":{"x":17,"y":6}},{"type":"occupied","rotation":0,"id":{"x":17,"y":7}},{"type":"null","rotation":0,"id":{"x":17,"y":8}},{"type":"null","rotation":0,"id":{"x":17,"y":9}},{"type":"null","rotation":0,"id":{"x":17,"y":10}},{"type":"null","rotation":0,"id":{"x":17,"y":11}},{"type":"null","rotation":0,"id":{"x":17,"y":12}},{"type":"null","rotation":0,"id":{"x":17,"y":13}},{"type":"null","rotation":0,"id":{"x":17,"y":14}},{"type":"null","rotation":0,"id":{"x":17,"y":15}},{"type":"null","rotation":0,"id":{"x":17,"y":16}},{"type":"null","rotation":0,"id":{"x":17,"y":17}},{"type":"null","rotation":0,"id":{"x":17,"y":18}},{"type":"null","rotation":0,"id":{"x":17,"y":19}},{"type":"null","rotation":0,"id":{"x":17,"y":20}},{"type":"null","rotation":0,"id":{"x":17,"y":21}},{"type":"null","rotation":0,"id":{"x":17,"y":22}},{"type":"null","rotation":0,"id":{"x":17,"y":23}},{"type":"null","rotation":0,"id":{"x":17,"y":24}},{"type":"tree","rotation":1.5707963267948966,"id":{"x":17,"y":25}},{"type":"null","rotation":0,"id":{"x":17,"y":26}},{"type":"null","rotation":0,"id":{"x":17,"y":27}},{"type":"tree","rotation":3.141592653589793,"id":{"x":17,"y":28}},{"type":"null","rotation":0,"id":{"x":17,"y":29}}],[{"type":"null","rotation":0,"id":{"x":18,"y":0}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":18,"y":1}},{"type":"null","rotation":0,"id":{"x":18,"y":2}},{"type":"null","rotation":0,"id":{"x":18,"y":3}},{"type":"occupied","rotation":0,"id":{"x":18,"y":4}},{"type":"occupied","rotation":0,"id":{"x":18,"y":5}},{"type":"occupied","rotation":0,"id":{"x":18,"y":6}},{"type":"occupied","rotation":0,"id":{"x":18,"y":7}},{"type":"null","rotation":0,"id":{"x":18,"y":8}},{"type":"null","rotation":0,"id":{"x":18,"y":9}},{"type":"null","rotation":0,"id":{"x":18,"y":10}},{"type":"null","rotation":0,"id":{"x":18,"y":11}},{"type":"null","rotation":0,"id":{"x":18,"y":12}},{"type":"null","rotation":0,"id":{"x":18,"y":13}},{"type":"null","rotation":0,"id":{"x":18,"y":14}},{"type":"null","rotation":0,"id":{"x":18,"y":15}},{"type":"occupied","rotation":0,"id":{"x":18,"y":16}},{"type":"occupied","rotation":0,"id":{"x":18,"y":17}},{"type":"occupied","rotation":0,"id":{"x":18,"y":18}},{"type":"occupied","rotation":0,"id":{"x":18,"y":19}},{"type":"null","rotation":0,"id":{"x":18,"y":20}},{"type":"null","rotation":0,"id":{"x":18,"y":21}},{"type":"null","rotation":0,"id":{"x":18,"y":22}},{"type":"null","rotation":0,"id":{"x":18,"y":23}},{"type":"null","rotation":0,"id":{"x":18,"y":24}},{"type":"null","rotation":0,"id":{"x":18,"y":25}},{"type":"null","rotation":0,"id":{"x":18,"y":26}},{"type":"null","rotation":0,"id":{"x":18,"y":27}},{"type":"null","rotation":0,"id":{"x":18,"y":28}},{"type":"null","rotation":0,"id":{"x":18,"y":29}}],[{"type":"null","rotation":0,"id":{"x":19,"y":0}},{"type":"null","rotation":0,"id":{"x":19,"y":1}},{"type":"null","rotation":0,"id":{"x":19,"y":2}},{"type":"null","rotation":0,"id":{"x":19,"y":3}},{"type":"occupied","rotation":0,"id":{"x":19,"y":4}},{"type":"occupied","rotation":0,"id":{"x":19,"y":5}},{"type":"occupied","rotation":0,"id":{"x":19,"y":6}},{"type":"occupied","rotation":0,"id":{"x":19,"y":7}},{"type":"null","rotation":0,"id":{"x":19,"y":8}},{"type":"null","rotation":0,"id":{"x":19,"y":9}},{"type":"null","rotation":0,"id":{"x":19,"y":10}},{"type":"null","rotation":0,"id":{"x":19,"y":11}},{"type":"null","rotation":0,"id":{"x":19,"y":12}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":19,"y":13}},{"type":"null","rotation":0,"id":{"x":19,"y":14}},{"type":"null","rotation":0,"id":{"x":19,"y":15}},{"type":"occupied","rotation":0,"id":{"x":19,"y":16}},{"type":"occupied","rotation":0,"id":{"x":19,"y":17}},{"type":"occupied","rotation":0,"id":{"x":19,"y":18}},{"type":"occupied","rotation":0,"id":{"x":19,"y":19}},{"type":"null","rotation":0,"id":{"x":19,"y":20}},{"type":"null","rotation":0,"id":{"x":19,"y":21}},{"type":"null","rotation":0,"id":{"x":19,"y":22}},{"type":"null","rotation":0,"id":{"x":19,"y":23}},{"type":"null","rotation":0,"id":{"x":19,"y":24}},{"type":"null","rotation":0,"id":{"x":19,"y":25}},{"type":"null","rotation":0,"id":{"x":19,"y":26}},{"type":"null","rotation":0,"id":{"x":19,"y":27}},{"type":"null","rotation":0,"id":{"x":19,"y":28}},{"type":"null","rotation":0,"id":{"x":19,"y":29}}],[{"type":"null","rotation":0,"id":{"x":20,"y":0}},{"type":"null","rotation":0,"id":{"x":20,"y":1}},{"type":"null","rotation":0,"id":{"x":20,"y":2}},{"type":"null","rotation":0,"id":{"x":20,"y":3}},{"type":"occupied","rotation":0,"id":{"x":20,"y":4}},{"type":"occupied","rotation":0,"id":{"x":20,"y":5}},{"type":"occupied","rotation":0,"id":{"x":20,"y":6}},{"type":"house","rotation":0,"id":{"x":20,"y":7}},{"type":"null","rotation":0,"id":{"x":20,"y":8}},{"type":"null","rotation":0,"id":{"x":20,"y":9}},{"type":"null","rotation":0,"id":{"x":20,"y":10}},{"type":"null","rotation":0,"id":{"x":20,"y":11}},{"type":"null","rotation":0,"id":{"x":20,"y":12}},{"type":"null","rotation":0,"id":{"x":20,"y":13}},{"type":"null","rotation":0,"id":{"x":20,"y":14}},{"type":"null","rotation":0,"id":{"x":20,"y":15}},{"type":"occupied","rotation":0,"id":{"x":20,"y":16}},{"type":"occupied","rotation":0,"id":{"x":20,"y":17}},{"type":"occupied","rotation":0,"id":{"x":20,"y":18}},{"type":"occupied","rotation":0,"id":{"x":20,"y":19}},{"type":"null","rotation":0,"id":{"x":20,"y":20}},{"type":"null","rotation":0,"id":{"x":20,"y":21}},{"type":"null","rotation":0,"id":{"x":20,"y":22}},{"type":"null","rotation":0,"id":{"x":20,"y":23}},{"type":"null","rotation":0,"id":{"x":20,"y":24}},{"type":"null","rotation":0,"id":{"x":20,"y":25}},{"type":"null","rotation":0,"id":{"x":20,"y":26}},{"type":"null","rotation":0,"id":{"x":20,"y":27}},{"type":"null","rotation":0,"id":{"x":20,"y":28}},{"type":"null","rotation":0,"id":{"x":20,"y":29}}],[{"type":"null","rotation":0,"id":{"x":21,"y":0}},{"type":"null","rotation":0,"id":{"x":21,"y":1}},{"type":"null","rotation":0,"id":{"x":21,"y":2}},{"type":"null","rotation":0,"id":{"x":21,"y":3}},{"type":"null","rotation":0,"id":{"x":21,"y":4}},{"type":"null","rotation":0,"id":{"x":21,"y":5}},{"type":"null","rotation":0,"id":{"x":21,"y":6}},{"type":"null","rotation":0,"id":{"x":21,"y":7}},{"type":"null","rotation":0,"id":{"x":21,"y":8}},{"type":"null","rotation":0,"id":{"x":21,"y":9}},{"type":"null","rotation":0,"id":{"x":21,"y":10}},{"type":"null","rotation":0,"id":{"x":21,"y":11}},{"type":"null","rotation":0,"id":{"x":21,"y":12}},{"type":"null","rotation":0,"id":{"x":21,"y":13}},{"type":"null","rotation":0,"id":{"x":21,"y":14}},{"type":"null","rotation":0,"id":{"x":21,"y":15}},{"type":"occupied","rotation":0,"id":{"x":21,"y":16}},{"type":"occupied","rotation":0,"id":{"x":21,"y":17}},{"type":"occupied","rotation":0,"id":{"x":21,"y":18}},{"type":"house","rotation":0,"id":{"x":21,"y":19}},{"type":"null","rotation":0,"id":{"x":21,"y":20}},{"type":"null","rotation":0,"id":{"x":21,"y":21}},{"type":"null","rotation":0,"id":{"x":21,"y":22}},{"type":"null","rotation":0,"id":{"x":21,"y":23}},{"type":"null","rotation":0,"id":{"x":21,"y":24}},{"type":"tree","rotation":4.71238898038469,"id":{"x":21,"y":25}},{"type":"null","rotation":0,"id":{"x":21,"y":26}},{"type":"null","rotation":0,"id":{"x":21,"y":27}},{"type":"tree","rotation":4.71238898038469,"id":{"x":21,"y":28}},{"type":"null","rotation":0,"id":{"x":21,"y":29}}],[{"type":"null","rotation":0,"id":{"x":22,"y":0}},{"type":"null","rotation":0,"id":{"x":22,"y":1}},{"type":"null","rotation":0,"id":{"x":22,"y":2}},{"type":"null","rotation":0,"id":{"x":22,"y":3}},{"type":"null","rotation":0,"id":{"x":22,"y":4}},{"type":"null","rotation":0,"id":{"x":22,"y":5}},{"type":"null","rotation":0,"id":{"x":22,"y":6}},{"type":"null","rotation":0,"id":{"x":22,"y":7}},{"type":"null","rotation":0,"id":{"x":22,"y":8}},{"type":"null","rotation":0,"id":{"x":22,"y":9}},{"type":"null","rotation":0,"id":{"x":22,"y":10}},{"type":"null","rotation":0,"id":{"x":22,"y":11}},{"type":"null","rotation":0,"id":{"x":22,"y":12}},{"type":"null","rotation":0,"id":{"x":22,"y":13}},{"type":"null","rotation":0,"id":{"x":22,"y":14}},{"type":"null","rotation":0,"id":{"x":22,"y":15}},{"type":"null","rotation":0,"id":{"x":22,"y":16}},{"type":"null","rotation":0,"id":{"x":22,"y":17}},{"type":"null","rotation":0,"id":{"x":22,"y":18}},{"type":"null","rotation":0,"id":{"x":22,"y":19}},{"type":"null","rotation":0,"id":{"x":22,"y":20}},{"type":"null","rotation":0,"id":{"x":22,"y":21}},{"type":"null","rotation":0,"id":{"x":22,"y":22}},{"type":"null","rotation":0,"id":{"x":22,"y":23}},{"type":"null","rotation":0,"id":{"x":22,"y":24}},{"type":"null","rotation":0,"id":{"x":22,"y":25}},{"type":"null","rotation":0,"id":{"x":22,"y":26}},{"type":"null","rotation":0,"id":{"x":22,"y":27}},{"type":"null","rotation":0,"id":{"x":22,"y":28}},{"type":"null","rotation":0,"id":{"x":22,"y":29}}],[{"type":"null","rotation":0,"id":{"x":23,"y":0}},{"type":"null","rotation":0,"id":{"x":23,"y":1}},{"type":"null","rotation":0,"id":{"x":23,"y":2}},{"type":"null","rotation":0,"id":{"x":23,"y":3}},{"type":"null","rotation":0,"id":{"x":23,"y":4}},{"type":"null","rotation":0,"id":{"x":23,"y":5}},{"type":"null","rotation":0,"id":{"x":23,"y":6}},{"type":"null","rotation":0,"id":{"x":23,"y":7}},{"type":"null","rotation":0,"id":{"x":23,"y":8}},{"type":"null","rotation":0,"id":{"x":23,"y":9}},{"type":"planted-tree","rotation":4.71238898038469,"id":{"x":23,"y":10}},{"type":"null","rotation":0,"id":{"x":23,"y":11}},{"type":"null","rotation":0,"id":{"x":23,"y":12}},{"type":"null","rotation":0,"id":{"x":23,"y":13}},{"type":"null","rotation":0,"id":{"x":23,"y":14}},{"type":"null","rotation":0,"id":{"x":23,"y":15}},{"type":"null","rotation":0,"id":{"x":23,"y":16}},{"type":"null","rotation":0,"id":{"x":23,"y":17}},{"type":"null","rotation":0,"id":{"x":23,"y":18}},{"type":"null","rotation":0,"id":{"x":23,"y":19}},{"type":"null","rotation":0,"id":{"x":23,"y":20}},{"type":"null","rotation":0,"id":{"x":23,"y":21}},{"type":"null","rotation":0,"id":{"x":23,"y":22}},{"type":"null","rotation":0,"id":{"x":23,"y":23}},{"type":"null","rotation":0,"id":{"x":23,"y":24}},{"type":"null","rotation":0,"id":{"x":23,"y":25}},{"type":"null","rotation":0,"id":{"x":23,"y":26}},{"type":"null","rotation":0,"id":{"x":23,"y":27}},{"type":"null","rotation":0,"id":{"x":23,"y":28}},{"type":"null","rotation":0,"id":{"x":23,"y":29}}],[{"type":"null","rotation":0,"id":{"x":24,"y":0}},{"type":"null","rotation":0,"id":{"x":24,"y":1}},{"type":"null","rotation":0,"id":{"x":24,"y":2}},{"type":"null","rotation":0,"id":{"x":24,"y":3}},{"type":"null","rotation":0,"id":{"x":24,"y":4}},{"type":"null","rotation":0,"id":{"x":24,"y":5}},{"type":"null","rotation":0,"id":{"x":24,"y":6}},{"type":"null","rotation":0,"id":{"x":24,"y":7}},{"type":"null","rotation":0,"id":{"x":24,"y":8}},{"type":"null","rotation":0,"id":{"x":24,"y":9}},{"type":"null","rotation":0,"id":{"x":24,"y":10}},{"type":"null","rotation":0,"id":{"x":24,"y":11}},{"type":"null","rotation":0,"id":{"x":24,"y":12}},{"type":"null","rotation":0,"id":{"x":24,"y":13}},{"type":"null","rotation":0,"id":{"x":24,"y":14}},{"type":"null","rotation":0,"id":{"x":24,"y":15}},{"type":"null","rotation":0,"id":{"x":24,"y":16}},{"type":"null","rotation":0,"id":{"x":24,"y":17}},{"type":"null","rotation":0,"id":{"x":24,"y":18}},{"type":"null","rotation":0,"id":{"x":24,"y":19}},{"type":"null","rotation":0,"id":{"x":24,"y":20}},{"type":"null","rotation":0,"id":{"x":24,"y":21}},{"type":"null","rotation":0,"id":{"x":24,"y":22}},{"type":"null","rotation":0,"id":{"x":24,"y":23}},{"type":"null","rotation":0,"id":{"x":24,"y":24}},{"type":"null","rotation":0,"id":{"x":24,"y":25}},{"type":"null","rotation":0,"id":{"x":24,"y":26}},{"type":"null","rotation":0,"id":{"x":24,"y":27}},{"type":"null","rotation":0,"id":{"x":24,"y":28}},{"type":"null","rotation":0,"id":{"x":24,"y":29}}],[{"type":"null","rotation":0,"id":{"x":25,"y":0}},{"type":"null","rotation":0,"id":{"x":25,"y":1}},{"type":"null","rotation":0,"id":{"x":25,"y":2}},{"type":"null","rotation":0,"id":{"x":25,"y":3}},{"type":"null","rotation":0,"id":{"x":25,"y":4}},{"type":"null","rotation":0,"id":{"x":25,"y":5}},{"type":"null","rotation":0,"id":{"x":25,"y":6}},{"type":"null","rotation":0,"id":{"x":25,"y":7}},{"type":"null","rotation":0,"id":{"x":25,"y":8}},{"type":"null","rotation":0,"id":{"x":25,"y":9}},{"type":"null","rotation":0,"id":{"x":25,"y":10}},{"type":"null","rotation":0,"id":{"x":25,"y":11}},{"type":"null","rotation":0,"id":{"x":25,"y":12}},{"type":"null","rotation":0,"id":{"x":25,"y":13}},{"type":"null","rotation":0,"id":{"x":25,"y":14}},{"type":"null","rotation":0,"id":{"x":25,"y":15}},{"type":"occupied","rotation":0,"id":{"x":25,"y":16}},{"type":"occupied","rotation":0,"id":{"x":25,"y":17}},{"type":"occupied","rotation":0,"id":{"x":25,"y":18}},{"type":"occupied","rotation":0,"id":{"x":25,"y":19}},{"type":"null","rotation":0,"id":{"x":25,"y":20}},{"type":"null","rotation":0,"id":{"x":25,"y":21}},{"type":"null","rotation":0,"id":{"x":25,"y":22}},{"type":"null","rotation":0,"id":{"x":25,"y":23}},{"type":"null","rotation":0,"id":{"x":25,"y":24}},{"type":"tree","rotation":0,"id":{"x":25,"y":25}},{"type":"null","rotation":0,"id":{"x":25,"y":26}},{"type":"null","rotation":0,"id":{"x":25,"y":27}},{"type":"tree","rotation":4.71238898038469,"id":{"x":25,"y":28}},{"type":"null","rotation":0,"id":{"x":25,"y":29}}],[{"type":"null","rotation":0,"id":{"x":26,"y":0}},{"type":"null","rotation":0,"id":{"x":26,"y":1}},{"type":"null","rotation":0,"id":{"x":26,"y":2}},{"type":"null","rotation":0,"id":{"x":26,"y":3}},{"type":"occupied","rotation":0,"id":{"x":26,"y":4}},{"type":"occupied","rotation":0,"id":{"x":26,"y":5}},{"type":"occupied","rotation":0,"id":{"x":26,"y":6}},{"type":"occupied","rotation":0,"id":{"x":26,"y":7}},{"type":"null","rotation":0,"id":{"x":26,"y":8}},{"type":"null","rotation":0,"id":{"x":26,"y":9}},{"type":"null","rotation":0,"id":{"x":26,"y":10}},{"type":"null","rotation":0,"id":{"x":26,"y":11}},{"type":"null","rotation":0,"id":{"x":26,"y":12}},{"type":"null","rotation":0,"id":{"x":26,"y":13}},{"type":"null","rotation":0,"id":{"x":26,"y":14}},{"type":"null","rotation":0,"id":{"x":26,"y":15}},{"type":"occupied","rotation":0,"id":{"x":26,"y":16}},{"type":"occupied","rotation":0,"id":{"x":26,"y":17}},{"type":"occupied","rotation":0,"id":{"x":26,"y":18}},{"type":"occupied","rotation":0,"id":{"x":26,"y":19}},{"type":"null","rotation":0,"id":{"x":26,"y":20}},{"type":"null","rotation":0,"id":{"x":26,"y":21}},{"type":"null","rotation":0,"id":{"x":26,"y":22}},{"type":"null","rotation":0,"id":{"x":26,"y":23}},{"type":"null","rotation":0,"id":{"x":26,"y":24}},{"type":"null","rotation":0,"id":{"x":26,"y":25}},{"type":"null","rotation":0,"id":{"x":26,"y":26}},{"type":"null","rotation":0,"id":{"x":26,"y":27}},{"type":"null","rotation":0,"id":{"x":26,"y":28}},{"type":"null","rotation":0,"id":{"x":26,"y":29}}],[{"type":"null","rotation":0,"id":{"x":27,"y":0}},{"type":"null","rotation":0,"id":{"x":27,"y":1}},{"type":"null","rotation":0,"id":{"x":27,"y":2}},{"type":"null","rotation":0,"id":{"x":27,"y":3}},{"type":"occupied","rotation":0,"id":{"x":27,"y":4}},{"type":"occupied","rotation":0,"id":{"x":27,"y":5}},{"type":"occupied","rotation":0,"id":{"x":27,"y":6}},{"type":"occupied","rotation":0,"id":{"x":27,"y":7}},{"type":"null","rotation":0,"id":{"x":27,"y":8}},{"type":"null","rotation":0,"id":{"x":27,"y":9}},{"type":"null","rotation":0,"id":{"x":27,"y":10}},{"type":"null","rotation":0,"id":{"x":27,"y":11}},{"type":"null","rotation":0,"id":{"x":27,"y":12}},{"type":"medium-tree","rotation":3.141592653589793,"id":{"x":27,"y":13}},{"type":"null","rotation":0,"id":{"x":27,"y":14}},{"type":"null","rotation":0,"id":{"x":27,"y":15}},{"type":"occupied","rotation":0,"id":{"x":27,"y":16}},{"type":"occupied","rotation":0,"id":{"x":27,"y":17}},{"type":"occupied","rotation":0,"id":{"x":27,"y":18}},{"type":"occupied","rotation":0,"id":{"x":27,"y":19}},{"type":"null","rotation":0,"id":{"x":27,"y":20}},{"type":"null","rotation":0,"id":{"x":27,"y":21}},{"type":"null","rotation":0,"id":{"x":27,"y":22}},{"type":"null","rotation":0,"id":{"x":27,"y":23}},{"type":"null","rotation":0,"id":{"x":27,"y":24}},{"type":"null","rotation":0,"id":{"x":27,"y":25}},{"type":"null","rotation":0,"id":{"x":27,"y":26}},{"type":"null","rotation":0,"id":{"x":27,"y":27}},{"type":"null","rotation":0,"id":{"x":27,"y":28}},{"type":"null","rotation":0,"id":{"x":27,"y":29}}],[{"type":"null","rotation":0,"id":{"x":28,"y":0}},{"type":"null","rotation":0,"id":{"x":28,"y":1}},{"type":"null","rotation":0,"id":{"x":28,"y":2}},{"type":"null","rotation":0,"id":{"x":28,"y":3}},{"type":"occupied","rotation":0,"id":{"x":28,"y":4}},{"type":"occupied","rotation":0,"id":{"x":28,"y":5}},{"type":"occupied","rotation":0,"id":{"x":28,"y":6}},{"type":"occupied","rotation":0,"id":{"x":28,"y":7}},{"type":"null","rotation":0,"id":{"x":28,"y":8}},{"type":"null","rotation":0,"id":{"x":28,"y":9}},{"type":"null","rotation":0,"id":{"x":28,"y":10}},{"type":"null","rotation":0,"id":{"x":28,"y":11}},{"type":"null","rotation":0,"id":{"x":28,"y":12}},{"type":"null","rotation":0,"id":{"x":28,"y":13}},{"type":"null","rotation":0,"id":{"x":28,"y":14}},{"type":"null","rotation":0,"id":{"x":28,"y":15}},{"type":"occupied","rotation":0,"id":{"x":28,"y":16}},{"type":"occupied","rotation":0,"id":{"x":28,"y":17}},{"type":"occupied","rotation":0,"id":{"x":28,"y":18}},{"type":"house","rotation":0,"id":{"x":28,"y":19}},{"type":"null","rotation":0,"id":{"x":28,"y":20}},{"type":"null","rotation":0,"id":{"x":28,"y":21}},{"type":"null","rotation":0,"id":{"x":28,"y":22}},{"type":"null","rotation":0,"id":{"x":28,"y":23}},{"type":"null","rotation":0,"id":{"x":28,"y":24}},{"type":"null","rotation":0,"id":{"x":28,"y":25}},{"type":"null","rotation":0,"id":{"x":28,"y":26}},{"type":"null","rotation":0,"id":{"x":28,"y":27}},{"type":"null","rotation":0,"id":{"x":28,"y":28}},{"type":"null","rotation":0,"id":{"x":28,"y":29}}],[{"type":"null","rotation":0,"id":{"x":29,"y":0}},{"type":"null","rotation":0,"id":{"x":29,"y":1}},{"type":"null","rotation":0,"id":{"x":29,"y":2}},{"type":"null","rotation":0,"id":{"x":29,"y":3}},{"type":"occupied","rotation":0,"id":{"x":29,"y":4}},{"type":"occupied","rotation":0,"id":{"x":29,"y":5}},{"type":"occupied","rotation":0,"id":{"x":29,"y":6}},{"type":"house","rotation":0,"id":{"x":29,"y":7}},{"type":"null","rotation":0,"id":{"x":29,"y":8}},{"type":"null","rotation":0,"id":{"x":29,"y":9}},{"type":"null","rotation":0,"id":{"x":29,"y":10}},{"type":"null","rotation":0,"id":{"x":29,"y":11}},{"type":"null","rotation":0,"id":{"x":29,"y":12}},{"type":"null","rotation":0,"id":{"x":29,"y":13}},{"type":"null","rotation":0,"id":{"x":29,"y":14}},{"type":"null","rotation":0,"id":{"x":29,"y":15}},{"type":"null","rotation":0,"id":{"x":29,"y":16}},{"type":"null","rotation":0,"id":{"x":29,"y":17}},{"type":"null","rotation":0,"id":{"x":29,"y":18}},{"type":"null","rotation":0,"id":{"x":29,"y":19}},{"type":"null","rotation":0,"id":{"x":29,"y":20}},{"type":"null","rotation":0,"id":{"x":29,"y":21}},{"type":"null","rotation":0,"id":{"x":29,"y":22}},{"type":"null","rotation":0,"id":{"x":29,"y":23}},{"type":"null","rotation":0,"id":{"x":29,"y":24}},{"type":"tree","rotation":3.141592653589793,"id":{"x":29,"y":25}},{"type":"null","rotation":0,"id":{"x":29,"y":26}},{"type":"null","rotation":0,"id":{"x":29,"y":27}},{"type":"tree","rotation":0,"id":{"x":29,"y":28}},{"type":"null","rotation":0,"id":{"x":29,"y":29}}]]`
    const presetBlockString = `[[{"type":"grass-1","rotation":4.71238898038469,"id":{"x":0,"y":0}},{"type":"grass-2","rotation":0,"id":{"x":0,"y":1}},{"type":"plane","rotation":3.141592653589793,"id":{"x":0,"y":2}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":0,"y":3}},{"type":"grass-2","rotation":0,"id":{"x":0,"y":4}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":0,"y":5}},{"type":"plane","rotation":3.141592653589793,"id":{"x":0,"y":6}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":0,"y":7}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":0,"y":8}},{"type":"grass-2","rotation":0,"id":{"x":0,"y":9}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":0,"y":10}},{"type":"plane","rotation":0,"id":{"x":0,"y":11}},{"type":"grass-1","rotation":0,"id":{"x":0,"y":12}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":0,"y":13}},{"type":"plane","rotation":4.71238898038469,"id":{"x":0,"y":14}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":0,"y":15}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":0,"y":16}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":0,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":0,"y":18}},{"type":"grass-1","rotation":0,"id":{"x":0,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":0,"y":20}},{"type":"road-bl","rotation":0,"id":{"x":0,"y":21}},{"type":"road-br","rotation":0,"id":{"x":0,"y":22}},{"type":"plane","rotation":0,"id":{"x":0,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":0,"y":24}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":0,"y":25}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":0,"y":26}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":0,"y":27}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":0,"y":28}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":0,"y":29}}],[{"type":"grass-2","rotation":0,"id":{"x":1,"y":0}},{"type":"grass-2","rotation":0,"id":{"x":1,"y":1}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":1,"y":2}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":1,"y":3}},{"type":"grass-2","rotation":0,"id":{"x":1,"y":4}},{"type":"grass-1","rotation":0,"id":{"x":1,"y":5}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":1,"y":6}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":1,"y":7}},{"type":"grass-1","rotation":0,"id":{"x":1,"y":8}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":1,"y":9}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":1,"y":10}},{"type":"grass-1","rotation":0,"id":{"x":1,"y":11}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":1,"y":12}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":1,"y":13}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":1,"y":14}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":1,"y":15}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":1,"y":16}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":1,"y":17}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":1,"y":18}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":1,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":1,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":1,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":1,"y":22}},{"type":"plane","rotation":4.71238898038469,"id":{"x":1,"y":23}},{"type":"grass-2","rotation":0,"id":{"x":1,"y":24}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":1,"y":25}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":1,"y":26}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":1,"y":27}},{"type":"grass-2","rotation":0,"id":{"x":1,"y":28}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":1,"y":29}}],[{"type":"plane","rotation":0,"id":{"x":2,"y":0}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":1}},{"type":"plane","rotation":4.71238898038469,"id":{"x":2,"y":2}},{"type":"plane","rotation":0,"id":{"x":2,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":5}},{"type":"plane","rotation":0,"id":{"x":2,"y":6}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":7}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":9}},{"type":"plane","rotation":0,"id":{"x":2,"y":10}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":11}},{"type":"plane","rotation":0,"id":{"x":2,"y":12}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":16}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":17}},{"type":"plane","rotation":4.71238898038469,"id":{"x":2,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":2,"y":19}},{"type":"plane","rotation":0,"id":{"x":2,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":2,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":2,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":23}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":24}},{"type":"plane","rotation":0,"id":{"x":2,"y":25}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":26}},{"type":"plane","rotation":3.141592653589793,"id":{"x":2,"y":27}},{"type":"plane","rotation":4.71238898038469,"id":{"x":2,"y":28}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":2,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":0}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":1}},{"type":"plane","rotation":0,"id":{"x":3,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":4}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":5}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":6}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":9}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":10}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":11}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":12}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":13}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":15}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":16}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":18}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":3,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":3,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":23}},{"type":"plane","rotation":0,"id":{"x":3,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":25}},{"type":"plane","rotation":3.141592653589793,"id":{"x":3,"y":26}},{"type":"plane","rotation":0,"id":{"x":3,"y":27}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":3,"y":28}},{"type":"plane","rotation":4.71238898038469,"id":{"x":3,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":0}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":1}},{"type":"plane","rotation":0,"id":{"x":4,"y":2}},{"type":"plane","rotation":0,"id":{"x":4,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":4,"y":4}},{"type":"plane","rotation":0,"id":{"x":4,"y":5}},{"type":"plane","rotation":0,"id":{"x":4,"y":6}},{"type":"plane","rotation":0,"id":{"x":4,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":9}},{"type":"plane","rotation":0,"id":{"x":4,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":11}},{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":12}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":4,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":14}},{"type":"plane","rotation":0,"id":{"x":4,"y":15}},{"type":"plane","rotation":0,"id":{"x":4,"y":16}},{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":17}},{"type":"plane","rotation":0,"id":{"x":4,"y":18}},{"type":"plane","rotation":3.141592653589793,"id":{"x":4,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":4,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":4,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":4,"y":22}},{"type":"plane","rotation":0,"id":{"x":4,"y":23}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":25}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":26}},{"type":"plane","rotation":0,"id":{"x":4,"y":27}},{"type":"plane","rotation":4.71238898038469,"id":{"x":4,"y":28}},{"type":"plane","rotation":0,"id":{"x":4,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":0}},{"type":"plane","rotation":0,"id":{"x":5,"y":1}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":3}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":4}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":5}},{"type":"plane","rotation":0,"id":{"x":5,"y":6}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":9}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":10}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":11}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":13}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":14}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":15}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":16}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":18}},{"type":"plane","rotation":0,"id":{"x":5,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":5,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":5,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":5,"y":23}},{"type":"plane","rotation":0,"id":{"x":5,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":5,"y":25}},{"type":"plane","rotation":0,"id":{"x":5,"y":26}},{"type":"plane","rotation":0,"id":{"x":5,"y":27}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":28}},{"type":"plane","rotation":3.141592653589793,"id":{"x":5,"y":29}}],[{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":0}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":6,"y":1}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":2}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":6,"y":4}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":6,"y":5}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":6}},{"type":"plane","rotation":0,"id":{"x":6,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":9}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":11}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":6,"y":12}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":13}},{"type":"plane","rotation":0,"id":{"x":6,"y":14}},{"type":"plane","rotation":0,"id":{"x":6,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":16}},{"type":"plane","rotation":0,"id":{"x":6,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":6,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":6,"y":22}},{"type":"plane","rotation":0,"id":{"x":6,"y":23}},{"type":"plane","rotation":0,"id":{"x":6,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":6,"y":25}},{"type":"plane","rotation":0,"id":{"x":6,"y":26}},{"type":"plane","rotation":3.141592653589793,"id":{"x":6,"y":27}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":6,"y":28}},{"type":"plane","rotation":0,"id":{"x":6,"y":29}}],[{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":0}},{"type":"plane","rotation":0,"id":{"x":7,"y":1}},{"type":"plane","rotation":0,"id":{"x":7,"y":2}},{"type":"plane","rotation":0,"id":{"x":7,"y":3}},{"type":"plane","rotation":0,"id":{"x":7,"y":4}},{"type":"plane","rotation":0,"id":{"x":7,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":7,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":8}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":9}},{"type":"plane","rotation":0,"id":{"x":7,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":7,"y":11}},{"type":"plane","rotation":0,"id":{"x":7,"y":12}},{"type":"plane","rotation":4.71238898038469,"id":{"x":7,"y":13}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":14}},{"type":"plane","rotation":4.71238898038469,"id":{"x":7,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":16}},{"type":"plane","rotation":0,"id":{"x":7,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":18}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":7,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":7,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":23}},{"type":"plane","rotation":0,"id":{"x":7,"y":24}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":7,"y":25}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":26}},{"type":"plane","rotation":4.71238898038469,"id":{"x":7,"y":27}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":28}},{"type":"plane","rotation":3.141592653589793,"id":{"x":7,"y":29}}],[{"type":"road-bl","rotation":0,"id":{"x":8,"y":0}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":1}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":2}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":3}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":4}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":5}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":6}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":7}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":8}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":9}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":10}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":11}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":12}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":13}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":14}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":15}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":16}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":17}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":18}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":19}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":20}},{"type":"road-c","rotation":0,"id":{"x":8,"y":21}},{"type":"road-c","rotation":0,"id":{"x":8,"y":22}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":23}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":24}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":25}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":26}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":27}},{"type":"road-rbl","rotation":0,"id":{"x":8,"y":28}},{"type":"road-br","rotation":0,"id":{"x":8,"y":29}}],[{"type":"road-tl","rotation":0,"id":{"x":9,"y":0}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":1}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":2}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":3}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":4}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":5}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":6}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":7}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":8}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":9}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":10}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":11}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":12}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":13}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":14}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":15}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":16}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":17}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":18}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":19}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":20}},{"type":"road-c","rotation":0,"id":{"x":9,"y":21}},{"type":"road-c","rotation":0,"id":{"x":9,"y":22}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":23}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":24}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":25}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":26}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":27}},{"type":"road-trl","rotation":0,"id":{"x":9,"y":28}},{"type":"road-tr","rotation":0,"id":{"x":9,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":0}},{"type":"plane","rotation":0,"id":{"x":10,"y":1}},{"type":"plane","rotation":0,"id":{"x":10,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":3}},{"type":"plane","rotation":0,"id":{"x":10,"y":4}},{"type":"plane","rotation":4.71238898038469,"id":{"x":10,"y":5}},{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":6}},{"type":"plane","rotation":0,"id":{"x":10,"y":7}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":10,"y":9}},{"type":"plane","rotation":0,"id":{"x":10,"y":10}},{"type":"plane","rotation":0,"id":{"x":10,"y":11}},{"type":"plane","rotation":0,"id":{"x":10,"y":12}},{"type":"plane","rotation":0,"id":{"x":10,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":14}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":16}},{"type":"plane","rotation":0,"id":{"x":10,"y":17}},{"type":"plane","rotation":0,"id":{"x":10,"y":18}},{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":19}},{"type":"plane","rotation":0,"id":{"x":10,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":10,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":10,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":10,"y":23}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":24}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":25}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":26}},{"type":"plane","rotation":4.71238898038469,"id":{"x":10,"y":27}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":10,"y":28}},{"type":"plane","rotation":4.71238898038469,"id":{"x":10,"y":29}}],[{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":0}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":11,"y":1}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":11,"y":2}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":11,"y":3}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":11,"y":4}},{"type":"grass-2","rotation":0,"id":{"x":11,"y":5}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":6}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":11,"y":7}},{"type":"grass-2","rotation":0,"id":{"x":11,"y":8}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":11,"y":9}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":11,"y":10}},{"type":"grass-1","rotation":0,"id":{"x":11,"y":11}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":11,"y":12}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":13}},{"type":"grass-1","rotation":0,"id":{"x":11,"y":14}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":11,"y":15}},{"type":"grass-1","rotation":0,"id":{"x":11,"y":16}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":17}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":18}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":11,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":11,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":11,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":11,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":11,"y":23}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":11,"y":24}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":11,"y":25}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":26}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":11,"y":27}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":11,"y":28}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":11,"y":29}}],[{"type":"grass-2","rotation":0,"id":{"x":12,"y":0}},{"type":"plane","rotation":0,"id":{"x":12,"y":1}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":12,"y":2}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":12,"y":3}},{"type":"plane","rotation":3.141592653589793,"id":{"x":12,"y":4}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":12,"y":5}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":12,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":12,"y":7}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":12,"y":8}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":12,"y":9}},{"type":"plane","rotation":0,"id":{"x":12,"y":10}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":12,"y":11}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":12,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":12,"y":13}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":12,"y":14}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":12,"y":15}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":12,"y":16}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":12,"y":17}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":12,"y":18}},{"type":"plane","rotation":0,"id":{"x":12,"y":19}},{"type":"plane","rotation":0,"id":{"x":12,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":12,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":12,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":12,"y":23}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":12,"y":24}},{"type":"grass-1","rotation":0,"id":{"x":12,"y":25}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":12,"y":26}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":12,"y":27}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":12,"y":28}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":12,"y":29}}],[{"type":"grass-1","rotation":3.141592653589793,"id":{"x":13,"y":0}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":13,"y":1}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":13,"y":2}},{"type":"grass-1","rotation":0,"id":{"x":13,"y":3}},{"type":"grass-2","rotation":0,"id":{"x":13,"y":4}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":13,"y":5}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":13,"y":6}},{"type":"grass-1","rotation":0,"id":{"x":13,"y":7}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":13,"y":8}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":13,"y":9}},{"type":"grass-2","rotation":0,"id":{"x":13,"y":10}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":13,"y":11}},{"type":"grass-2","rotation":0,"id":{"x":13,"y":12}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":13,"y":13}},{"type":"grass-2","rotation":0,"id":{"x":13,"y":14}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":13,"y":15}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":13,"y":16}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":13,"y":17}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":13,"y":18}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":13,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":13,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":13,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":13,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":13,"y":23}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":13,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":13,"y":25}},{"type":"grass-1","rotation":0,"id":{"x":13,"y":26}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":13,"y":27}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":13,"y":28}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":13,"y":29}}],[{"type":"plane","rotation":1.5707963267948966,"id":{"x":14,"y":0}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":1}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":2}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":3}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":5}},{"type":"plane","rotation":0,"id":{"x":14,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":7}},{"type":"plane","rotation":0,"id":{"x":14,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":9}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":10}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":14,"y":11}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":13}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":14,"y":14}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":14,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":16}},{"type":"plane","rotation":3.141592653589793,"id":{"x":14,"y":17}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":14,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":14,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":14,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":14,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":14,"y":24}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":14,"y":25}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":14,"y":26}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":14,"y":27}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":14,"y":28}},{"type":"grass-2","rotation":0,"id":{"x":14,"y":29}}],[{"type":"road-l","rotation":0,"id":{"x":15,"y":0}},{"type":"road-x","rotation":0,"id":{"x":15,"y":1}},{"type":"road-x","rotation":0,"id":{"x":15,"y":2}},{"type":"road-x","rotation":0,"id":{"x":15,"y":3}},{"type":"road-x","rotation":0,"id":{"x":15,"y":4}},{"type":"road-x","rotation":0,"id":{"x":15,"y":5}},{"type":"road-x","rotation":0,"id":{"x":15,"y":6}},{"type":"road-x","rotation":0,"id":{"x":15,"y":7}},{"type":"road-x","rotation":0,"id":{"x":15,"y":8}},{"type":"road-x","rotation":0,"id":{"x":15,"y":9}},{"type":"road-rbl","rotation":0,"id":{"x":15,"y":10}},{"type":"road-x","rotation":0,"id":{"x":15,"y":11}},{"type":"road-x","rotation":0,"id":{"x":15,"y":12}},{"type":"road-x","rotation":0,"id":{"x":15,"y":13}},{"type":"road-x","rotation":0,"id":{"x":15,"y":14}},{"type":"road-x","rotation":0,"id":{"x":15,"y":15}},{"type":"road-x","rotation":0,"id":{"x":15,"y":16}},{"type":"road-x","rotation":0,"id":{"x":15,"y":17}},{"type":"road-x","rotation":0,"id":{"x":15,"y":18}},{"type":"road-x","rotation":0,"id":{"x":15,"y":19}},{"type":"road-x","rotation":0,"id":{"x":15,"y":20}},{"type":"road-c","rotation":0,"id":{"x":15,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":15,"y":22}},{"type":"plane","rotation":0,"id":{"x":15,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":15,"y":24}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":15,"y":25}},{"type":"grass-2","rotation":0,"id":{"x":15,"y":26}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":15,"y":27}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":15,"y":28}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":15,"y":29}}],[{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":0}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":1}},{"type":"plane","rotation":3.141592653589793,"id":{"x":16,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":3}},{"type":"plane","rotation":4.71238898038469,"id":{"x":16,"y":4}},{"type":"plane","rotation":0,"id":{"x":16,"y":5}},{"type":"plane","rotation":4.71238898038469,"id":{"x":16,"y":6}},{"type":"plane","rotation":0,"id":{"x":16,"y":7}},{"type":"plane","rotation":4.71238898038469,"id":{"x":16,"y":8}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":9}},{"type":"road-y","rotation":0,"id":{"x":16,"y":10}},{"type":"plane","rotation":0,"id":{"x":16,"y":11}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":16,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":16,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":16,"y":15}},{"type":"plane","rotation":0,"id":{"x":16,"y":16}},{"type":"plane","rotation":0,"id":{"x":16,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":18}},{"type":"plane","rotation":0,"id":{"x":16,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":16,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":16,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":16,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":16,"y":23}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":16,"y":24}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":16,"y":25}},{"type":"grass-1","rotation":0,"id":{"x":16,"y":26}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":16,"y":27}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":16,"y":28}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":16,"y":29}}],[{"type":"grass-2","rotation":4.71238898038469,"id":{"x":17,"y":0}},{"type":"grass-1","rotation":0,"id":{"x":17,"y":1}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":17,"y":2}},{"type":"plane","rotation":4.71238898038469,"id":{"x":17,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":17,"y":4}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":17,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":17,"y":6}},{"type":"plane","rotation":0,"id":{"x":17,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":17,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":17,"y":9}},{"type":"road-y","rotation":0,"id":{"x":17,"y":10}},{"type":"plane","rotation":3.141592653589793,"id":{"x":17,"y":11}},{"type":"grass-2","rotation":0,"id":{"x":17,"y":12}},{"type":"grass-1","rotation":0,"id":{"x":17,"y":13}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":17,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":17,"y":15}},{"type":"plane","rotation":4.71238898038469,"id":{"x":17,"y":16}},{"type":"plane","rotation":4.71238898038469,"id":{"x":17,"y":17}},{"type":"plane","rotation":4.71238898038469,"id":{"x":17,"y":18}},{"type":"plane","rotation":0,"id":{"x":17,"y":19}},{"type":"plane","rotation":0,"id":{"x":17,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":17,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":17,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":17,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":17,"y":24}},{"type":"plane","rotation":3.141592653589793,"id":{"x":17,"y":25}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":17,"y":26}},{"type":"grass-1","rotation":0,"id":{"x":17,"y":27}},{"type":"plane","rotation":4.71238898038469,"id":{"x":17,"y":28}},{"type":"grass-2","rotation":0,"id":{"x":17,"y":29}}],[{"type":"grass-1","rotation":3.141592653589793,"id":{"x":18,"y":0}},{"type":"plane","rotation":3.141592653589793,"id":{"x":18,"y":1}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":18,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":18,"y":3}},{"type":"plane","rotation":3.141592653589793,"id":{"x":18,"y":4}},{"type":"plane","rotation":0,"id":{"x":18,"y":5}},{"type":"plane","rotation":3.141592653589793,"id":{"x":18,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":18,"y":7}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":18,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":18,"y":9}},{"type":"road-y","rotation":0,"id":{"x":18,"y":10}},{"type":"plane","rotation":0,"id":{"x":18,"y":11}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":18,"y":12}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":18,"y":13}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":18,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":18,"y":15}},{"type":"plane","rotation":0,"id":{"x":18,"y":16}},{"type":"plane","rotation":0,"id":{"x":18,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":18,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":18,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":18,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":18,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":18,"y":22}},{"type":"plane","rotation":0,"id":{"x":18,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":18,"y":24}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":18,"y":25}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":18,"y":26}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":18,"y":27}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":18,"y":28}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":18,"y":29}}],[{"type":"grass-2","rotation":3.141592653589793,"id":{"x":19,"y":0}},{"type":"grass-2","rotation":0,"id":{"x":19,"y":1}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":19,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":19,"y":3}},{"type":"plane","rotation":0,"id":{"x":19,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":19,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":19,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":8}},{"type":"plane","rotation":4.71238898038469,"id":{"x":19,"y":9}},{"type":"road-y","rotation":0,"id":{"x":19,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":19,"y":11}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":19,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":13}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":19,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":15}},{"type":"plane","rotation":4.71238898038469,"id":{"x":19,"y":16}},{"type":"plane","rotation":0,"id":{"x":19,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":18}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":19,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":19,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":19,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":19,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":19,"y":24}},{"type":"grass-2","rotation":0,"id":{"x":19,"y":25}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":19,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":19,"y":27}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":19,"y":28}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":19,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":0}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":1}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":2}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":3}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":4}},{"type":"plane","rotation":0,"id":{"x":20,"y":5}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":7}},{"type":"plane","rotation":4.71238898038469,"id":{"x":20,"y":8}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":9}},{"type":"road-y","rotation":0,"id":{"x":20,"y":10}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":11}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":12}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":20,"y":13}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":20,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":16}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":17}},{"type":"plane","rotation":4.71238898038469,"id":{"x":20,"y":18}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":20,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":20,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":20,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":20,"y":23}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":20,"y":24}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":20,"y":25}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":20,"y":26}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":20,"y":27}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":20,"y":28}},{"type":"grass-1","rotation":0,"id":{"x":20,"y":29}}],[{"type":"road-l","rotation":0,"id":{"x":21,"y":0}},{"type":"road-x","rotation":0,"id":{"x":21,"y":1}},{"type":"road-br","rotation":0,"id":{"x":21,"y":2}},{"type":"plane","rotation":3.141592653589793,"id":{"x":21,"y":3}},{"type":"plane","rotation":3.141592653589793,"id":{"x":21,"y":4}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":21,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":21,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":7}},{"type":"plane","rotation":0,"id":{"x":21,"y":8}},{"type":"road-bl","rotation":0,"id":{"x":21,"y":9}},{"type":"road-trl","rotation":0,"id":{"x":21,"y":10}},{"type":"road-br","rotation":0,"id":{"x":21,"y":11}},{"type":"plane","rotation":3.141592653589793,"id":{"x":21,"y":12}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":13}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":21,"y":14}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":21,"y":15}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":16}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":21,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":21,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":21,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":21,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":21,"y":23}},{"type":"grass-2","rotation":0,"id":{"x":21,"y":24}},{"type":"plane","rotation":0,"id":{"x":21,"y":25}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":21,"y":26}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":21,"y":27}},{"type":"plane","rotation":3.141592653589793,"id":{"x":21,"y":28}},{"type":"grass-2","rotation":0,"id":{"x":21,"y":29}}],[{"type":"plane","rotation":3.141592653589793,"id":{"x":22,"y":0}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":1}},{"type":"road-y","rotation":0,"id":{"x":22,"y":2}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":22,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":22,"y":5}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":7}},{"type":"road-bl","rotation":0,"id":{"x":22,"y":8}},{"type":"road-tr","rotation":0,"id":{"x":22,"y":9}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":22,"y":10}},{"type":"road-tl","rotation":0,"id":{"x":22,"y":11}},{"type":"road-br","rotation":0,"id":{"x":22,"y":12}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":22,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":22,"y":15}},{"type":"plane","rotation":0,"id":{"x":22,"y":16}},{"type":"plane","rotation":0,"id":{"x":22,"y":17}},{"type":"plane","rotation":0,"id":{"x":22,"y":18}},{"type":"plane","rotation":0,"id":{"x":22,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":22,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":22,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":22,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":22,"y":23}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":22,"y":24}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":22,"y":25}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":22,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":22,"y":27}},{"type":"grass-2","rotation":0,"id":{"x":22,"y":28}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":22,"y":29}}],[{"type":"grass-2","rotation":3.141592653589793,"id":{"x":23,"y":0}},{"type":"plane","rotation":0,"id":{"x":23,"y":1}},{"type":"road-tbl","rotation":0,"id":{"x":23,"y":2}},{"type":"road-x","rotation":0,"id":{"x":23,"y":3}},{"type":"road-x","rotation":0,"id":{"x":23,"y":4}},{"type":"road-x","rotation":0,"id":{"x":23,"y":5}},{"type":"road-x","rotation":0,"id":{"x":23,"y":6}},{"type":"road-x","rotation":0,"id":{"x":23,"y":7}},{"type":"road-trb","rotation":0,"id":{"x":23,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":23,"y":9}},{"type":"plane","rotation":4.71238898038469,"id":{"x":23,"y":10}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":23,"y":11}},{"type":"road-tbl","rotation":0,"id":{"x":23,"y":12}},{"type":"road-x","rotation":0,"id":{"x":23,"y":13}},{"type":"road-x","rotation":0,"id":{"x":23,"y":14}},{"type":"road-x","rotation":0,"id":{"x":23,"y":15}},{"type":"road-x","rotation":0,"id":{"x":23,"y":16}},{"type":"road-x","rotation":0,"id":{"x":23,"y":17}},{"type":"road-x","rotation":0,"id":{"x":23,"y":18}},{"type":"road-x","rotation":0,"id":{"x":23,"y":19}},{"type":"road-x","rotation":0,"id":{"x":23,"y":20}},{"type":"road-c","rotation":0,"id":{"x":23,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":23,"y":22}},{"type":"plane","rotation":4.71238898038469,"id":{"x":23,"y":23}},{"type":"grass-1","rotation":0,"id":{"x":23,"y":24}},{"type":"grass-1","rotation":0,"id":{"x":23,"y":25}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":23,"y":26}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":23,"y":27}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":23,"y":28}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":23,"y":29}}],[{"type":"grass-2","rotation":0,"id":{"x":24,"y":0}},{"type":"plane","rotation":4.71238898038469,"id":{"x":24,"y":1}},{"type":"road-y","rotation":0,"id":{"x":24,"y":2}},{"type":"plane","rotation":0,"id":{"x":24,"y":3}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":24,"y":6}},{"type":"plane","rotation":4.71238898038469,"id":{"x":24,"y":7}},{"type":"road-tl","rotation":0,"id":{"x":24,"y":8}},{"type":"road-br","rotation":0,"id":{"x":24,"y":9}},{"type":"plane","rotation":4.71238898038469,"id":{"x":24,"y":10}},{"type":"road-bl","rotation":0,"id":{"x":24,"y":11}},{"type":"road-tr","rotation":0,"id":{"x":24,"y":12}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":13}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":15}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":24,"y":16}},{"type":"plane","rotation":4.71238898038469,"id":{"x":24,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":24,"y":18}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":24,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":24,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":24,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":24,"y":22}},{"type":"plane","rotation":0,"id":{"x":24,"y":23}},{"type":"grass-2","rotation":0,"id":{"x":24,"y":24}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":24,"y":25}},{"type":"grass-2","rotation":0,"id":{"x":24,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":24,"y":27}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":24,"y":28}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":24,"y":29}}],[{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":25,"y":0}},{"type":"plane","rotation":3.141592653589793,"id":{"x":25,"y":1}},{"type":"road-y","rotation":0,"id":{"x":25,"y":2}},{"type":"plane","rotation":3.141592653589793,"id":{"x":25,"y":3}},{"type":"plane","rotation":4.71238898038469,"id":{"x":25,"y":4}},{"type":"plane","rotation":3.141592653589793,"id":{"x":25,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":25,"y":7}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":8}},{"type":"road-tl","rotation":0,"id":{"x":25,"y":9}},{"type":"road-rbl","rotation":0,"id":{"x":25,"y":10}},{"type":"road-tr","rotation":0,"id":{"x":25,"y":11}},{"type":"plane","rotation":4.71238898038469,"id":{"x":25,"y":12}},{"type":"plane","rotation":0,"id":{"x":25,"y":13}},{"type":"plane","rotation":0,"id":{"x":25,"y":14}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":15}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":16}},{"type":"plane","rotation":3.141592653589793,"id":{"x":25,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":18}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":19}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":25,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":25,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":25,"y":23}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":25,"y":24}},{"type":"plane","rotation":4.71238898038469,"id":{"x":25,"y":25}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":25,"y":26}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":25,"y":27}},{"type":"plane","rotation":4.71238898038469,"id":{"x":25,"y":28}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":25,"y":29}}],[{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":26,"y":0}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":1}},{"type":"road-y","rotation":0,"id":{"x":26,"y":2}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":4}},{"type":"plane","rotation":4.71238898038469,"id":{"x":26,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":6}},{"type":"plane","rotation":0,"id":{"x":26,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":26,"y":8}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":9}},{"type":"road-y","rotation":0,"id":{"x":26,"y":10}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":11}},{"type":"plane","rotation":0,"id":{"x":26,"y":12}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":26,"y":13}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":26,"y":14}},{"type":"plane","rotation":0,"id":{"x":26,"y":15}},{"type":"plane","rotation":4.71238898038469,"id":{"x":26,"y":16}},{"type":"plane","rotation":0,"id":{"x":26,"y":17}},{"type":"plane","rotation":0,"id":{"x":26,"y":18}},{"type":"plane","rotation":3.141592653589793,"id":{"x":26,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":26,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":26,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":26,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":26,"y":23}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":26,"y":24}},{"type":"grass-2","rotation":0,"id":{"x":26,"y":25}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":26,"y":26}},{"type":"grass-1","rotation":0,"id":{"x":26,"y":27}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":26,"y":28}},{"type":"grass-1","rotation":0,"id":{"x":26,"y":29}}],[{"type":"grass-2","rotation":3.141592653589793,"id":{"x":27,"y":0}},{"type":"plane","rotation":0,"id":{"x":27,"y":1}},{"type":"road-y","rotation":0,"id":{"x":27,"y":2}},{"type":"plane","rotation":4.71238898038469,"id":{"x":27,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":27,"y":4}},{"type":"plane","rotation":0,"id":{"x":27,"y":5}},{"type":"plane","rotation":4.71238898038469,"id":{"x":27,"y":6}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":27,"y":7}},{"type":"plane","rotation":0,"id":{"x":27,"y":8}},{"type":"plane","rotation":3.141592653589793,"id":{"x":27,"y":9}},{"type":"road-y","rotation":0,"id":{"x":27,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":27,"y":11}},{"type":"grass-2","rotation":0,"id":{"x":27,"y":12}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":27,"y":13}},{"type":"grass-2","rotation":0,"id":{"x":27,"y":14}},{"type":"plane","rotation":0,"id":{"x":27,"y":15}},{"type":"plane","rotation":3.141592653589793,"id":{"x":27,"y":16}},{"type":"plane","rotation":4.71238898038469,"id":{"x":27,"y":17}},{"type":"plane","rotation":0,"id":{"x":27,"y":18}},{"type":"plane","rotation":0,"id":{"x":27,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":27,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":27,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":27,"y":22}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":27,"y":23}},{"type":"grass-1","rotation":0,"id":{"x":27,"y":24}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":27,"y":25}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":27,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":27,"y":27}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":27,"y":28}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":27,"y":29}}],[{"type":"grass-2","rotation":3.141592653589793,"id":{"x":28,"y":0}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":28,"y":1}},{"type":"road-y","rotation":0,"id":{"x":28,"y":2}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":3}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":28,"y":4}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":28,"y":5}},{"type":"plane","rotation":4.71238898038469,"id":{"x":28,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":8}},{"type":"plane","rotation":0,"id":{"x":28,"y":9}},{"type":"road-y","rotation":0,"id":{"x":28,"y":10}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":11}},{"type":"grass-2","rotation":0,"id":{"x":28,"y":12}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":28,"y":13}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":28,"y":14}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":15}},{"type":"plane","rotation":0,"id":{"x":28,"y":16}},{"type":"plane","rotation":0,"id":{"x":28,"y":17}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":18}},{"type":"plane","rotation":4.71238898038469,"id":{"x":28,"y":19}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":20}},{"type":"road-tbl","rotation":0,"id":{"x":28,"y":21}},{"type":"road-trb","rotation":0,"id":{"x":28,"y":22}},{"type":"plane","rotation":3.141592653589793,"id":{"x":28,"y":23}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":28,"y":24}},{"type":"grass-2","rotation":4.71238898038469,"id":{"x":28,"y":25}},{"type":"grass-1","rotation":4.71238898038469,"id":{"x":28,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":28,"y":27}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":28,"y":28}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":28,"y":29}}],[{"type":"grass-1","rotation":4.71238898038469,"id":{"x":29,"y":0}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":1}},{"type":"road-t","rotation":0,"id":{"x":29,"y":2}},{"type":"plane","rotation":0,"id":{"x":29,"y":3}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":4}},{"type":"plane","rotation":0,"id":{"x":29,"y":5}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":29,"y":6}},{"type":"plane","rotation":3.141592653589793,"id":{"x":29,"y":7}},{"type":"plane","rotation":3.141592653589793,"id":{"x":29,"y":8}},{"type":"plane","rotation":0,"id":{"x":29,"y":9}},{"type":"road-t","rotation":0,"id":{"x":29,"y":10}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":11}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":29,"y":12}},{"type":"grass-1","rotation":1.5707963267948966,"id":{"x":29,"y":13}},{"type":"grass-2","rotation":3.141592653589793,"id":{"x":29,"y":14}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":29,"y":15}},{"type":"plane","rotation":0,"id":{"x":29,"y":16}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":29,"y":17}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":29,"y":18}},{"type":"plane","rotation":1.5707963267948966,"id":{"x":29,"y":19}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":20}},{"type":"road-tl","rotation":0,"id":{"x":29,"y":21}},{"type":"road-tr","rotation":0,"id":{"x":29,"y":22}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":23}},{"type":"grass-1","rotation":3.141592653589793,"id":{"x":29,"y":24}},{"type":"plane","rotation":3.141592653589793,"id":{"x":29,"y":25}},{"type":"grass-1","rotation":0,"id":{"x":29,"y":26}},{"type":"grass-2","rotation":1.5707963267948966,"id":{"x":29,"y":27}},{"type":"plane","rotation":4.71238898038469,"id":{"x":29,"y":28}},{"type":"grass-1","rotation":0,"id":{"x":29,"y":29}}]]`
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
                for (let i = 0; i < 30; i++) {
                    let row: BlockInfo[] = []
                    for (let j = 0; j < 30; j++) {
                        //Initially setting blocks to random types of grass & random rotations

                        let type: BlockType = "plane"
                        let rotation = 0

                        let randomN = Math.random() * 100
                        if (randomN < 50) type = "plane"

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
                for (let i = 0; i < 30; i++) {
                    //Initially setting objects to null & 0 rotation

                    let row: ObjectInfo[] = []
                    for (let j = 0; j < 30; j++) {
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
                    const type: BlockType = "road"
                    const rotation = 0

                    map[selectedObjectID.x][selectedObjectID.y].type = type
                    map[selectedObjectID.x][selectedObjectID.y].rotation =
                        rotation
                    setBlockMap(map)
                    localStorage.setItem("blockMap", JSON.stringify(map))
                }
                handleRoadCheck()
            } else if (action === "Remove a road") {
                if (
                    map[selectedObjectID.x][selectedObjectID.y].type.includes(
                        "road",
                    )
                ) {
                    const type: BlockType = "plane"
                    const rotation = 0

                    map[selectedObjectID.x][selectedObjectID.y].type = type
                    map[selectedObjectID.x][selectedObjectID.y].rotation =
                        rotation
                    setBlockMap(map)
                    localStorage.setItem("blockMap", JSON.stringify(map))
                }
                handleRoadCheck()
            } else if (action === "Build a house") {
                if (
                    !map[selectedObjectID.x][selectedObjectID.y].type.includes(
                        "road",
                    ) &&
                    !map[selectedObjectID.x][selectedObjectID.y].type.includes(
                        "grass",
                    )
                ) {
                    let canBeBuilt = true
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            if (
                                map[selectedObjectID.x - i] &&
                                map[selectedObjectID.x - i][
                                    selectedObjectID.y - j
                                ] &&
                                map[selectedObjectID.x - i][
                                    selectedObjectID.y - j
                                ].type === "plane" &&
                                objMap[selectedObjectID.x - i][
                                    selectedObjectID.y - j
                                ].type === "null"
                            ) {
                                canBeBuilt = true
                            } else {
                                canBeBuilt = false
                                break
                            }
                        }
                    }
                    if (canBeBuilt) {
                        objMap[selectedObjectID.x][selectedObjectID.y].type =
                            "house"
                        for (let i = 0; i < 4; i++) {
                            for (let j = 0; j < 4; j++) {
                                if (i !== 0 || j !== 0) {
                                    objMap[selectedObjectID.x - i][
                                        selectedObjectID.y - j
                                    ].type = "occupied"
                                }
                            }
                        }
                    }
                    localStorage.setItem("objectMap", JSON.stringify(objMap))
                }
            } else if (action === "Remove a house") {
                if (
                    objMap[selectedObjectID.x][selectedObjectID.y].type ===
                    "house"
                ) {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            objMap[selectedObjectID.x - i][
                                selectedObjectID.y - j
                            ].type = "null"
                        }
                    }
                }
                localStorage.setItem("objectMap", JSON.stringify(objMap))
            }
        }
        setAction(null)
    }, [action])

    //Camera settings
    const cameraPosition = new THREE.Vector3(120, 60, 20)
    const [cameraOrigin, setCameraOrigin] = useState(
        new THREE.Vector3(20, 0, 20),
    )
    const fov = 25
    const orbitControlsRef = useRef<OrbitControlsImpl>(null!)
    const [autoRotate, setAutoRotate] = useState(false)

    return (
        <div className="h-full w-full  ">
            <div className="mb-2 flex w-full flex-row justify-center gap-x-2 overflow-y-scroll">
                <Button
                    variant="secondary"
                    onClick={() => {
                        localStorage.setItem("objectMap", presetObjectString)
                        localStorage.setItem("blockMap", presetBlockString)
                        setBlockMap(JSON.parse(presetBlockString))
                        setObjectMap(JSON.parse(presetObjectString))
                    }}
                >
                    Готовая карта
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setAutoRotate(!autoRotate)
                    }}
                >
                    Вращение
                </Button>
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
                <Button
                    className="bg-black"
                    onClick={() => {
                        if (isInteractive) setAction("Remove a road")
                    }}
                >
                    Снести дорогу
                </Button>
                <Button
                    className="bg-black"
                    onClick={() => {
                        if (isInteractive) setAction("Build a house")
                    }}
                >
                    Построить дом
                </Button>
                <Button
                    className="bg-black"
                    onClick={() => {
                        if (isInteractive) setAction("Remove a house")
                    }}
                >
                    Снести дом
                </Button>
            </div>
            <div className="h-full w-full rounded-xl bg-sky-200">
                <Canvas camera={{ position: cameraPosition, fov, far: 15000 }}>
                    <OrbitControls
                        target={cameraOrigin}
                        ref={orbitControlsRef}
                        autoRotate={autoRotate}
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
                                        if (type.includes("tree")) {
                                            return (
                                                <Fragment key={j}>
                                                    {generateTree({
                                                        props: obj,
                                                    })}
                                                </Fragment>
                                            )
                                        }
                                        if (type === "house") {
                                            return (
                                                <Fragment key={j}>
                                                    {generateHouse({
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
        </div>
    )
}
