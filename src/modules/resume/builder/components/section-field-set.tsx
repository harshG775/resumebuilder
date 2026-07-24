import { CaretDownIcon } from "@phosphor-icons/react"
import { Button } from "#/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { cn } from "#/lib/utils"
import type { ReactNode } from "react"

type SectionFieldSetProps = {
    title: ReactNode
    actions?: ReactNode
    defaultOpen?: boolean
    className?: string
    children: ReactNode
}

export function SectionFieldSet({ title, actions, defaultOpen = true, className, children }: SectionFieldSetProps) {
    return (
        <FieldSet className={className}>
            <Collapsible defaultOpen={defaultOpen} render={<div className="contents" />}>
                <FieldLegend className="font-bold text-2xl! flex items-center w-full">
                    <CollapsibleTrigger
                        className="group"
                        render={<Button type="button" variant={"ghost"} aria-label="Toggle section" />}
                    >
                        <CaretDownIcon
                            weight="bold"
                            className={cn("transition-transform -rotate-90 group-data-panel-open:rotate-0")}
                        />
                    </CollapsibleTrigger>
                    <div className="w-full">{title}</div>
                    {actions}
                </FieldLegend>
                <CollapsibleContent>
                    <FieldGroup>{children}</FieldGroup>
                </CollapsibleContent>
            </Collapsible>
        </FieldSet>
    )
}
