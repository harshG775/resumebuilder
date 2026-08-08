import type { ResumeValues } from "../../schema/resume.zod-schema"

type ContentItem = ResumeValues["data"]["sections"]["professionalSummary"]["attributes"][number]

export function contentItemsToText(items: ContentItem[]): string {
    return items.map((item) => item.value).join("\n")
}

export function textToContentItems(text: string, prevItems: ContentItem[]): ContentItem[] {
    return text.split("\n").map((value, idx) => ({
        id: prevItems[idx]?.id ?? crypto.randomUUID(),
        isActive: prevItems[idx]?.isActive ?? true,
        value,
    }))
}
