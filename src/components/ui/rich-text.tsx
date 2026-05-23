import React, { useMemo, Fragment } from "react"

type ComponentMap = {
    [tag: string]: React.ElementType<any>
}

interface RichTextProps {
    content: string
    components?: ComponentMap
}

const DEFAULT_COMPONENTS: ComponentMap = {
    strong: (props) => <strong {...props} />,
    b:      (props) => <strong {...props} />,
    em:     (props) => <em {...props} />,
    i:      (props) => <em {...props} />,
    p:      (props) => <p {...props} />,
    span:   (props) => <span {...props} />,
    mark:   (props) => <mark {...props} />,
    a: ({ href, ...props }) => {
        const isSafe = !href?.trim().toLowerCase().startsWith("javascript:")
        return <a href={isSafe ? href : undefined} target="_blank" rel="noreferrer" {...props} />
    },
}

const getPropsFromNode = (el: Element): Record<string, string> => {
    const props: Record<string, string> = {}
    Array.from(el.attributes).forEach((attr) => {
        const name =
            attr.name === "class" ? "className"
            : attr.name === "for" ? "htmlFor"
            : attr.name
        props[name] = attr.value
    })
    return props
}

export function RichText({ content, components = {} }: RichTextProps) {
    const elements = useMemo(() => {
        if (!content) return null

        const parser = new DOMParser()
        const doc = parser.parseFromString(content, "text/html")

        const mapNodesToReact = (node: Node, idx: number): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) return node.textContent

            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as Element
                const tagName = el.tagName.toLowerCase()

                const children = Array.from(el.childNodes).map((child, i) =>
                    mapNodesToReact(child, i),
                )
                // key is a direct JSX prop — never put it inside the spread object
                const props = getPropsFromNode(el)
                const Component = components[tagName] ?? DEFAULT_COMPONENTS[tagName]

                if (Component) {
                    return (
                        <Component key={idx} {...props}>
                            {children}
                        </Component>
                    )
                }

                return <Fragment key={idx}>{children}</Fragment>
            }
            return null
        }

        return Array.from(doc.body.childNodes).map((node, idx) =>
            mapNodesToReact(node, idx),
        )
    }, [content, components])

    return <>{elements}</>
}