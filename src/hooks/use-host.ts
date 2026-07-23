import { useEffect, useState } from "react"

export function useHost() {
    const [host, setHost] = useState("")
    useEffect(() => {
        setHost(window.location.host)
    }, [])
    return host
}
