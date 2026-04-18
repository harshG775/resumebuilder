import { PAPER_SIZES } from "#/constants/paper-sizes"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import React from "react"

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
                        <main>
                            <section></section>
                            <section></section>
                            <section></section>
                            <section></section>
                        </main>
                    </div>
                )}
            </form.Subscribe>
        )
    },
})
