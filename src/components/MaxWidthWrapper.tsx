import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

export default function MaxWidthWrapper({
    className,
    children,
}: {
    className?: string
    children?: ReactNode
}) {
    return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>
}
