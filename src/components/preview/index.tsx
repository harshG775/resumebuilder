import { PAPER_SIZES } from "#/constants/paper-sizes"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import type { ResumeValues } from "#/lib/schemas/resume-schema"
import React from "react"

const sectionRenderers = {
    summary: (values: ResumeValues) =>
        !values.sections.summary.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">{values.sections.summary.title || "Summary"}</h2>
                <p className="text-neutral-700 whitespace-pre-line">{values.sections.summary.content}</p>
            </section>
        ),

    skills: (values: ResumeValues) =>
        !values.sections.skills.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">{values.sections.skills.title || "Skills"}</h2>
                <div className="flex flex-wrap gap-2">
                    {values.sections.skills.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                            <span key={item.id} className="px-2 py-1 border rounded text-xs">
                                {item.name}
                            </span>
                        ))}
                </div>
            </section>
        ),

    experience: (values: ResumeValues) =>
        !values.sections.experience.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">
                    {values.sections.experience.title || "Experience"}
                </h2>

                <div className="space-y-2">
                    {values.sections.experience.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        {item.position} — {item.company}
                                    </span>
                                    <span className="text-xs text-neutral-600">{item.period}</span>
                                </div>
                                <div className="text-xs text-neutral-600">{item.location}</div>
                                <p className="text-neutral-700 whitespace-pre-line">{item.description}</p>
                            </div>
                        ))}
                </div>
            </section>
        ),

    projects: (values: ResumeValues) =>
        !values.sections.projects.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">
                    {values.sections.projects.title || "Projects"}
                </h2>

                <div className="space-y-2">
                    {values.sections.projects.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-xs text-neutral-600">{item.period}</span>
                                </div>
                                <p className="text-neutral-700 whitespace-pre-line">{item.description}</p>
                            </div>
                        ))}
                </div>
            </section>
        ),

    education: (values: ResumeValues) =>
        !values.sections.education.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">
                    {values.sections.education.title || "Education"}
                </h2>

                <div className="space-y-2">
                    {values.sections.education.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        {item.degree} — {item.school}
                                    </span>
                                    <span className="text-xs text-neutral-600">{item.period}</span>
                                </div>
                                <div className="text-xs text-neutral-600">{item.location}</div>
                            </div>
                        ))}
                </div>
            </section>
        ),

    certifications: (values: ResumeValues) =>
        !values.sections.certifications.hidden && (
            <section>
                <h2 className="font-semibold text-base border-b mb-1">
                    {values.sections.certifications.title || "Certifications"}
                </h2>

                <div className="space-y-2">
                    {values.sections.certifications.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-neutral-600">{item.date}</span>
                                </div>
                                <div className="text-xs text-neutral-600">{item.issuer}</div>
                            </div>
                        ))}
                </div>
            </section>
        ),
}
export const Preview = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        console.log(form.state.values)
        const paperSize = PAPER_SIZES["a4"]
        return (
            <form.Subscribe selector={(state) => state.values}>
                {(values) => (
                    <div
                        className="reset-tw"
                        style={{
                            // A4 size page
                            padding: "1.5rem",
                            aspectRatio: paperSize.aspectRatio,
                            width: `${paperSize.widthPx}px`,
                            backgroundColor: "white",
                            color: "black",
                        }}
                    >
                        <header className="mb-4 flex">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-neutral-900">{values.basics.name}</h1>
                                <p className="text-sm font-medium text-neutral-700">{values.basics.headline}</p>
                                <div className="text-[11px] mt-1 flex flex-wrap gap-2 text-neutral-600">
                                    {values.basics.email && <span>{values.basics.email}</span>}
                                    {values.basics.phone && <span>| {values.basics.phone}</span>}
                                    {values.basics.location && <span>| {values.basics.location}</span>}
                                    {values.basics.website && (
                                        <a
                                            href={values.basics.website.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-700 hover:text-blue-800 wrap-break-word"
                                        >
                                            {values.basics.website.label}
                                        </a>
                                    )}
                                    {values.basics?.customFields.length > 0 && (
                                        <>
                                            {values.basics.customFields.map((link, i) => (
                                                <React.Fragment key={link.id || i}>
                                                    {i > 0 && <span>|</span>}
                                                    <a
                                                        key={link.id || i}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-blue-700 hover:text-blue-800 wrap-break-word"
                                                    >
                                                        {link.label}
                                                    </a>
                                                </React.Fragment>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </header>
                        <main className="space-y-4 text-sm">
                            {values.order.map((sectionKey) => {
                                const render = sectionRenderers[sectionKey as keyof typeof sectionRenderers]

                                if (!render) return null

                                return <React.Fragment key={sectionKey}>{render(values)}</React.Fragment>
                            })}
                        </main>
                    </div>
                )}
            </form.Subscribe>
        )
    },
})
