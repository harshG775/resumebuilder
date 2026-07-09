import { useTypstSvg } from "#/lib/typst/useTypstSvg"
import { ClientOnly } from "@tanstack/react-router"

export function TypstPreview({ source }: { source: string }) {
    const { svg, error, status } = useTypstSvg(source)
    // if (status !== "loading-engine") {
    //     return <div>loading-engine</div>
    // }
    if (error) {
        return <pre className="text-sm text-red-500">{error}</pre>
    }

    return (
        <ClientOnly fallback={<div>Loading preview…</div>}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
        </ClientOnly>
    )
}
