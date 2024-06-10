import { PropsWithChildren } from "react"


export default function GradientShadowBox({ children }: PropsWithChildren) {
    return (
        <div className="relative  mx-auto my-auto max-w-3xl">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-b from-pink-600 via-fuchsia-600 to-pink-600 opacity-50 blur-2xl"></div>
            <div className="relative flex-col items-center justify-center border border-zinc-700 rounded-lg bg-zinc-900 text-slate-300">
                {children}
            </div>
        </div>
    )
}