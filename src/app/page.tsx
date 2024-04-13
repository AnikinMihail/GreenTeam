import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Scene from "@/components/Scene"
import { Suspense } from "react"

export default function Home() {
    return (
        <div>
            <MaxWidthWrapper className="mt-10 flex flex-row justify-center gap-x-5">
                <h1 className="text-center text-3xl font-bold">Scene</h1>
            </MaxWidthWrapper>
            <div className="h-screen w-[99vw] ps-3">
                <Suspense>
                    <Scene />
                </Suspense>
            </div>
        </div>
    )
}
