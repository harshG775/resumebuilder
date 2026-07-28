import { cn } from "#/lib/utils.ts"
import { siteConfig } from "#/config/site.ts"

function LogoMark({ className }: { className?: string }) {
    return (
        <>
            <img src="/logo.png" alt={siteConfig.name} className={cn(className, "object-contain dark:hidden")} />
            <img
                src="/logo-dark.png"
                alt={siteConfig.name}
                className={cn(className, "hidden object-contain dark:block")}
            />
        </>
    )
}

export { LogoMark }
