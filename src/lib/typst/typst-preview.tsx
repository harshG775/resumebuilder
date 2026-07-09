import { useTypstSvg } from "./useTypstSvg"

export function TypstPreview({ source }: { source: string }) {
    const { svg, error, status } = useTypstSvg(source)

    if (error) {
        return <pre className="text-sm text-red-500">{error}</pre>
    }

    if (status === "loading-engine" || !svg) {
        return <div className="text-sm text-muted-foreground">Rendering preview…</div>
    }

    return <div dangerouslySetInnerHTML={{ __html: svg }} />
}