import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import TanStackQueryDevtools from "#/integrations/tanstack-query/devtools"

import appCss from "../styles.css?url"
import { RouteProgressBar } from "#/components/route-progress-bar"
import { getSessionFn } from "#/lib/server/auth.function"
import { TooltipProvider } from "#/components/ui/tooltip"
import ErrorComponent from "./-components/error-component"
import NotFoundComponent from "./-components/not-found-component"

export const Route = createRootRoute({
    beforeLoad: async () => {
        const session = await getSessionFn()
        return { session }
    },
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "TanStack Start Starter",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    errorComponent: ErrorComponent,
    notFoundComponent: NotFoundComponent,
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <RouteProgressBar />
                <TooltipProvider>{children}</TooltipProvider>
                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
                <Scripts />
            </body>
        </html>
    )
}
