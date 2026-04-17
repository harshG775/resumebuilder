import { formatDate } from "#/lib/format"
import React from "react"
import type { Config } from ".."

type Link = {
    id?: string
    label: string
    url: string
}

type ItemProps = {
    id: string
    order: number
    title: string
    organization?: string | null
    startDate?: string
    endDate?: string | null
    location?: string
    links?: Link[]
    points?: string[]
    stack?: string[]
}

type Props = {
    basics: {
        name: string
        headline: string
        email: string
        phone?: string
        location?: string
        links?: Link[]
    }
    summary: {
        points: string[]
    }
    experience: {
        items: ItemProps[]
    }
    projects: {
        items: ItemProps[]
    }
    skills: {
        groups: Array<{
            id: string
            order: number
            title: string
            items: string[]
        }>
    }
    education: {
        items: ItemProps[]
    }
    certifications: {
        items: ItemProps[]
    }
}

export const basicConfig: Config<Props> = {
    components: {
        basics: {
            defaultProps: {
                name: "",
                headline: "",
                email: "",
                phone: "",
                location: "",
                links: [],
            },
            render: (props) => (
                <header className="mb-4 flex">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-neutral-900">{props.name || "Name"}</h1>
                        <p className="text-sm font-medium text-neutral-700">{props.headline}</p>
                        <div className="text-[11px] mt-1 flex flex-wrap gap-2 text-neutral-600">
                            {props.email && <span>{props.email}</span>}
                            {props.phone && <span>| {props.phone}</span>}
                            {props.location && <span>| {props.location}</span>}
                            {props.links && props.links.length > 0 && (
                                <>
                                    {props.links.map((link, i) => (
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
            ),
        },

        summary: {
            defaultProps: { points: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-1.5 border-b border-neutral-300 uppercase tracking-wide">
                        Summary
                    </h2>
                    {props.points?.map((point, idx) => (
                        <p key={idx} className="text-[11px] leading-relaxed text-neutral-800 whitespace-pre-line">
                            {point}
                        </p>
                    ))}
                </section>
            ),
        },

        experience: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-2 border-b border-neutral-300 uppercase tracking-wide">
                        Experience
                    </h2>
                    <div className="space-y-3">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="border-l-2 border-neutral-200 pl-3">
                                    <div className="flex justify-between items-baseline flex-wrap text-[11px]">
                                        <div>
                                            <span className="font-bold text-neutral-950">{item.title}</span>
                                            <span className="text-neutral-500 mx-1">|</span>
                                            <span className="font-semibold text-neutral-700">{item.organization}</span>
                                            {item.links && item.links.length > 0 && (
                                                <div className="inline-flex flex-wrap gap-2 ml-2">
                                                    {item.links.map((link, idx) => (
                                                        <a
                                                            key={link.id || idx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-700 underline wrap-break-word"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-1 text-neutral-500 font-medium">
                                            <span>
                                                {formatDate(item.startDate)} {item.startDate && "—"}{" "}
                                                {formatDate(item.endDate) || (item.startDate && "Present")}
                                            </span>
                                            {item.location && (
                                                <>
                                                    <span className="text-neutral-300">|</span>
                                                    <span>{item.location}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <ul className="list-disc ml-4 text-[11px] mt-1 space-y-0.5 text-neutral-700">
                                        {item.points?.map((p, idx) => (
                                            <li key={idx}>{p}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },

        projects: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-2 border-b border-neutral-300 uppercase tracking-wide">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="border-l-2 border-neutral-200 pl-3 text-[11px]">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-bold text-neutral-900">
                                            {item.title}
                                            {item.organization && (
                                                <span className="text-neutral-500 font-normal">
                                                    {" "}
                                                    @ {item.organization}
                                                </span>
                                            )}
                                        </span>

                                        {item.links?.map((link, idx) => (
                                            <a
                                                key={link.id || idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-700 underline wrap-break-word"
                                            >
                                                {link.label || "Link"}
                                            </a>
                                        ))}
                                    </div>
                                    {item.stack && item.stack.length > 0 && (
                                        <div className="text-[10px] text-neutral-500 mt-0.5">
                                            {item.stack.join(", ")}
                                        </div>
                                    )}
                                    <ul className="list-disc ml-4 mt-1 space-y-0.5 text-neutral-700">
                                        {item.points?.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },

        skills: {
            defaultProps: { groups: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-1.5 border-b border-neutral-300 uppercase tracking-wide">
                        Skills
                    </h2>
                    <div className="text-[11px] space-y-1">
                        {props.groups
                            ?.sort((a, b) => a.order - b.order)
                            .map((group) => (
                                <div key={group.id} className="leading-tight">
                                    <span className="font-bold text-neutral-800">{group.title}: </span>
                                    <span className="font-medium text-neutral-700">
                                        {group.items?.map((item, index) => (
                                            <span key={index}>
                                                <span>{item}</span>
                                                {index < group.items.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </span>{" "}
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },
        education: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-2 border-b border-neutral-300 uppercase tracking-wide">
                        Education
                    </h2>
                    <div className="space-y-2">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="text-[11px]">
                                    <div className="flex justify-between items-baseline flex-wrap">
                                        <span className="font-bold text-neutral-900">{item.title}</span>
                                        <span className="text-neutral-500 font-medium">
                                            {formatDate(item.startDate)} {item.startDate && "—"}{" "}
                                            {formatDate(item.endDate) || (item.startDate && "Ongoing")}
                                        </span>
                                    </div>
                                    <div className="text-neutral-600 italic">{item.organization}</div>
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },
        certifications: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-sm font-bold mb-2 border-b border-neutral-300 uppercase tracking-wide">
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="text-[11px]">
                                    <div className="flex justify-between items-baseline flex-wrap">
                                        <span className="font-bold text-neutral-900">{item.title}</span>
                                        <span className="text-neutral-500 font-medium">{formatDate(item.endDate)}</span>
                                    </div>
                                    <div className="text-neutral-600">{item.organization}</div>
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },
    },
}
