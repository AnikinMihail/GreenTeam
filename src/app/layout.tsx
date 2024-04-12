import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Green Team farm",
    description: "авфы",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full">
            <body
                className={cn(
                    "relative h-full font-sans antialiased",
                    inter.className,
                )}
            >
                <main className="relative flex min-h-screen flex-col">
                    <div className="flex-1 flex-grow">{children}</div>
                </main>
            </body>
        </html>
    )
}
