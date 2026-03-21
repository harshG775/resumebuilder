import type { JSX, PropsWithChildren } from "react"
type ComponentType =
    | "basics"
    | "summary"
    | "experience"
    | "education"
    | "projects"
    | "skills"
    | "custom"


type Component<T = any> = {
    id: string
    type: ComponentType
    order: number
    visible?: boolean
    content: T
}
export type ResumeDataType = {
    metadata: {
        title: string
        description: string
    }
    components: Component[]
}

type ConfigType = {
    shellComponent: {
        render: (props: PropsWithChildren) => React.JSX.Element
    }
    components: Record<ComponentType, (content: any) => JSX.Element>
}
export const basicConfig: ConfigType = {
    shellComponent: {
        render: ({ children }) => {
            return <div>{children}</div>
        },
    },
    components: {
        basics: (props) => (
            <header className="mb-6">
                <h1 className="text-2xl font-bold">{props.name}</h1>

                <p className="text-sm text-muted-foreground">
                    {props.headline}
                </p>

                <div className="text-xs mt-2 flex flex-wrap gap-2 text-muted-foreground">
                    {props.email && <span>{props.email}</span>}
                    {props.phone && <span>• {props.phone}</span>}
                    {props.location && <span>• {props.location}</span>}
                </div>

                {props.links?.length > 0 && (
                    <div className="text-xs mt-2 flex flex-wrap gap-3">
                        {props.links.map((link: any, i: number) => (
                            <a
                                key={i}
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

        summary: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p className="text-sm leading-relaxed">{props.text}</p>
            </section>
        ),

        experience: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Experience</h2>

                <div className="space-y-4">
                    {props.items?.map((item: any) => (
                        <div key={item.order} className="border-l-2 pl-3">
                            <div className="flex justify-between flex-wrap text-sm">
                                <div>
                                    <span className="font-semibold">
                                        {item.role}
                                    </span>{" "}
                                    at {item.company}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    {item.startDate} -{" "}
                                    {item.endDate || "Present"}
                                </div>
                            </div>

                            {item.location && (
                                <div className="text-xs text-muted-foreground">
                                    {item.location}
                                </div>
                            )}

                            {item.links?.length > 0 && (
                                <div className="text-xs mt-1">
                                    {item.links.map(
                                        (link: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-primary mr-2"
                                            >
                                                {link.label}
                                            </a>
                                        ),
                                    )}
                                </div>
                            )}

                            <ul className="list-disc ml-5 text-sm mt-1 space-y-0.5">
                                {item.points?.map((p: string, idx: number) => (
                                    <li key={idx}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        ),

        education: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Education</h2>

                <div className="space-y-3">
                    {props.items?.map((item: any, i: number) => (
                        <div key={i} className="text-sm">
                            <div className="flex justify-between flex-wrap">
                                <span className="font-medium">
                                    {item.degree}
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    {item.startDate} - {item.endDate}
                                </span>
                            </div>

                            <div className="text-xs text-muted-foreground">
                                {item.institution}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        ),

        projects: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Projects</h2>

                <div className="space-y-4">
                    {props.items?.map((item: any, i: number) => (
                        <div key={i} className="border-l-2 pl-3 text-sm">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold">
                                    {item.name}
                                </span>

                                {item.links.length > 0 &&
                                    item.links.map((link: any, idx: number) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline text-xs"
                                        >
                                            {link.label ? link.label : "Live"}
                                        </a>
                                    ))}
                            </div>

                            {item.stack?.length > 0 && (
                                <div className="text-xs text-muted-foreground">
                                    <span className="font-medium">Tech:</span>{" "}
                                    {item.stack.join(", ")}
                                </div>
                            )}

                            <ul className="list-disc ml-4 mt-1 space-y-0.5">
                                {item.points?.map(
                                    (point: string, idx: number) => (
                                        <li key={idx}>{point}</li>
                                    ),
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        ),

        skills: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Skills</h2>

                <div className="space-y-2 text-sm">
                    {props.groups?.map((group: any, i: number) => (
                        <div key={i}>
                            <span className="font-medium">{group.title}:</span>{" "}
                            <span className="text-muted-foreground">
                                {group.items.join(", ")}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        ),

        custom: (props) => (
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">{props.title}</h2>

                <ul className="list-disc ml-5 text-sm space-y-0.5">
                    {props.items?.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>
        ),
    },
}

