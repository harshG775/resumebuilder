import { Button } from "#/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "#/components/ui/dialog"
import { DownloadIcon } from "lucide-react"
import type { ReactElement, ReactNode } from "react"

export type DownloadFormatOption = {
    key: string
    icon: ReactNode
    title: string
    description: string
    onDownload: () => void
    isDownloading?: boolean
}

export function DownloadDialog({
    trigger,
    formats,
    isDownloading,
}: {
    trigger?: ReactElement
    formats: DownloadFormatOption[]
    isDownloading?: boolean
}) {
    return (
        <Dialog>
            <DialogTrigger render={trigger ?? <Button disabled={isDownloading} />}>
                {!trigger && (
                    <>
                        <DownloadIcon />
                        <span className="sr-only sm:not-sr-only">{isDownloading ? "Downloading…" : "Download"}</span>
                    </>
                )}
            </DialogTrigger>
            <DialogContent className="md:max-w-2xl lg:max-w-3xl max-h-[calc(90vh)] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Download</DialogTitle>
                    <DialogDescription>Export your resume in the format you need.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {formats.map((format) => (
                        <div key={format.key} className="flex items-center gap-3 rounded-2xl border p-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                {format.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium">{format.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{format.description}</div>
                            </div>
                            <Button variant="outline" onClick={format.onDownload} disabled={format.isDownloading}>
                                <DownloadIcon />
                                {format.isDownloading ? "Downloading…" : "Download"}
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
