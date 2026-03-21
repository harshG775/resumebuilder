import type { Config } from "../render"

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
        text: string
    }
    experience: {
        items: ItemProps[]
    }
    education: {
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
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">{props.name || "Name"}</h1>
                    <p className="text-sm text-muted-foreground">{props.headline}</p>
                    <div className="text-xs mt-2 flex flex-wrap gap-2 text-muted-foreground">
                        {props.email && <span>{props.email}</span>}
                        {props.phone && <span>• {props.phone}</span>}
                        {props.location && <span>• {props.location}</span>}
                    </div>
                    {props.links && props.links.length > 0 && (
                        <div className="text-xs mt-2 flex flex-wrap gap-3">
                            {props.links.map((link, i) => (
                                <a
                                    key={link.id || i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-primary"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </header>
            ),
        },

        summary: {
            defaultProps: { text: "" },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-lg font-semibold mb-2 border-b">Summary</h2>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{props.text}</p>
                </section>
            ),
        },

        experience: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-lg font-semibold mb-2 border-b">Experience</h2>
                    <div className="space-y-4">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="border-l-2 pl-3">
                                    <div className="flex justify-between flex-wrap text-sm">
                                        <div>
                                            <span className="font-semibold">{item.title}</span>{" "}
                                            {item.organization && `at ${item.organization}`}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {item.startDate} {item.startDate && "—"}{" "}
                                            {item.endDate || (item.startDate && "Present")}
                                        </div>
                                    </div>
                                    {item.location && (
                                        <div className="text-xs text-muted-foreground">{item.location}</div>
                                    )}
                                    <ul className="list-disc ml-5 text-sm mt-1 space-y-0.5">
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

        education: {
            defaultProps: { items: [] },
            render: (props) => (
                <section className="mb-4">
                    <h2 className="text-lg font-semibold mb-2 border-b">Education</h2>
                    <div className="space-y-3">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="text-sm">
                                    <div className="flex justify-between flex-wrap">
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.startDate} {item.endDate && `— ${item.endDate}`}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{item.organization}</div>
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
                    <h2 className="text-lg font-semibold mb-2 border-b">Projects</h2>
                    <div className="space-y-4">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="border-l-2 pl-3 text-sm">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold">{item.title}</span>
                                        {item.links?.map((link, idx) => (
                                            <a
                                                key={link.id || idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary underline text-xs"
                                            >
                                                {link.label || "Link"}
                                            </a>
                                        ))}
                                    </div>
                                    {item.stack && item.stack.length > 0 && (
                                        <div className="text-xs text-muted-foreground">
                                            <span className="font-medium">Tech:</span> {item.stack.join(", ")}
                                        </div>
                                    )}
                                    <ul className="list-disc ml-4 mt-1 space-y-0.5">
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
                    <h2 className="text-lg font-semibold mb-2 border-b">Skills</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {props.groups
                            ?.sort((a, b) => a.order - b.order)
                            .map((group) => (
                                <div key={group.id}>
                                    <span className="font-medium">{group.title}:</span>{" "}
                                    <span className="text-muted-foreground">{group.items?.join(", ")}</span>
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
                    <h2 className="text-lg font-semibold mb-2 border-b">Certifications</h2>
                    <div className="space-y-3">
                        {props.items
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div key={item.id} className="text-sm">
                                    <div className="flex justify-between flex-wrap">
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.startDate} {item.endDate && `— ${item.endDate}`}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{item.organization}</div>
                                </div>
                            ))}
                    </div>
                </section>
            ),
        },
    },
}
