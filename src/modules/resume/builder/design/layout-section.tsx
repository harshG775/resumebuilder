import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"

export const LayoutSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Layout">
            <form.AppField name="meta.layout.pages[0].main" mode="array">
                {(field) => (
                    <div className="border divide-y rounded-md">
                        <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                            {(items) =>
                                items.map((sectionKey, idx) => (
                                    <SortableDragItem
                                        key={sectionKey}
                                        sortableProps={{ index: idx, id: sectionKey }}
                                        className="flex items-center gap-2 h-12 px-2 bg-background"
                                    >
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Drag to reorder ${form.state.values.sections[sectionKey].title}`}
                                            className="flex size-8 shrink-0 items-center justify-center text-muted-foreground cursor-grab hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <DotsSixVerticalIcon aria-hidden="true" weight="bold" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {form.state.values.sections[sectionKey].title}
                                        </span>
                                    </SortableDragItem>
                                ))
                            }
                        </SortableDragProvider>
                    </div>
                )}
            </form.AppField>
        </SectionFieldSet>
    ),
})
