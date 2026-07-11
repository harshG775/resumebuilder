"use client"

import * as React from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "#/components/ui/alert-dialog.tsx"
import { Input } from "#/components/ui/input.tsx"

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export type AlertButtonStyle = "default" | "cancel" | "destructive"

export interface AlertButton {
    text: string
    /** For `prompt`, receives the current input value. */
    onPress?: (value?: string) => void
    style?: AlertButtonStyle
}

export interface AlertOptions {
    /** Allow dismissing via Escape (default: true). */
    cancelable?: boolean
    onDismiss?: () => void
    /** Optional icon/illustration rendered in the AlertDialogMedia slot. */
    icon?: React.ReactNode
    /** Popup size, forwarded to AlertDialogContent. */
    size?: "default" | "sm"
}

export interface PromptOptions extends AlertOptions {
    defaultValue?: string
    placeholder?: string
    /** "plain-text" (default) or "secure-text" for a password field. */
    type?: "plain-text" | "secure-text"
}

interface AlertItem {
    id: string
    kind: "alert" | "prompt"
    title: string
    message?: string
    buttons: AlertButton[]
    cancelable: boolean
    onDismiss?: () => void
    icon?: React.ReactNode
    size: "default" | "sm"
    defaultValue: string
    placeholder?: string
    inputType: "text" | "password"
}

/* -------------------------------------------------------------------------- */
/*                              External store                                */
/*        (module-level so `Alert.*` can be called from anywhere)             */
/* -------------------------------------------------------------------------- */

let queue: AlertItem[] = []
const listeners = new Set<() => void>()

function emit() {
    for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return queue
}

function enqueue(item: AlertItem) {
    queue = [...queue, item]
    emit()
}

function remove(id: string) {
    queue = queue.filter((item) => item.id !== id)
    emit()
}

let seq = 0
const uid = () => `alert-${Date.now()}-${seq++}`

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

function alert(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) {
    enqueue({
        id: uid(),
        kind: "alert",
        title,
        message,
        buttons: buttons && buttons.length ? buttons : [{ text: "OK" }],
        cancelable: options?.cancelable ?? true,
        onDismiss: options?.onDismiss,
        icon: options?.icon,
        size: options?.size ?? "default",
        defaultValue: "",
        inputType: "text",
    })
}

function prompt(
    title: string,
    message?: string,
    buttonsOrCallback?: AlertButton[] | ((value: string) => void),
    options?: PromptOptions,
) {
    let buttons: AlertButton[]
    if (typeof buttonsOrCallback === "function") {
        const cb = buttonsOrCallback
        buttons = [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: (value) => cb(value ?? "") },
        ]
    } else if (buttonsOrCallback && buttonsOrCallback.length) {
        buttons = buttonsOrCallback
    } else {
        buttons = [{ text: "OK" }]
    }

    enqueue({
        id: uid(),
        kind: "prompt",
        title,
        message,
        buttons,
        cancelable: options?.cancelable ?? true,
        onDismiss: options?.onDismiss,
        icon: options?.icon,
        size: options?.size ?? "default",
        defaultValue: options?.defaultValue ?? "",
        placeholder: options?.placeholder,
        inputType: options?.type === "secure-text" ? "password" : "text",
    })
}

/**
 * React Native–style imperative alert. Import and call from anywhere —
 * event handlers, effects, async code, even outside React.
 *
 * Requires <AlertHost /> mounted once near the root of your app.
 */
export const Alert = { alert, prompt }

/* -------------------------------------------------------------------------- */
/*                                  Renderer                                   */
/* -------------------------------------------------------------------------- */

// Base UI reasons that represent a user trying to dismiss the dialog.
const DISMISS_REASONS = ["escape-key", "outside-press", "focus-out"]
// Roughly matches the `duration-100` exit animation on AlertDialogContent.
const EXIT_MS = 150

function variantFor(style?: AlertButtonStyle) {
    if (style === "destructive") return "destructive" as const
    if (style === "cancel") return "outline" as const
    return "default" as const
}

function AlertInstance({ item }: { item: AlertItem }) {
    const [open, setOpen] = React.useState(true)
    const [value, setValue] = React.useState(item.defaultValue)
    const exitTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
        return () => {
            if (exitTimer.current) clearTimeout(exitTimer.current)
        }
    }, [])

    // Play the close animation, then drop the item from the queue so the
    // next queued alert (if any) can surface.
    const close = React.useCallback(() => {
        setOpen(false)
        if (!exitTimer.current) {
            exitTimer.current = setTimeout(() => remove(item.id), EXIT_MS)
        }
    }, [item.id])

    const press = (button: AlertButton) => {
        button.onPress?.(item.kind === "prompt" ? value : undefined)
        close()
    }

    const dismiss = () => {
        const cancelButton = item.buttons.find((b) => b.style === "cancel")
        cancelButton?.onPress?.(item.kind === "prompt" ? value : undefined)
        item.onDismiss?.()
        close()
    }

    // Preferred button (fired on Enter) = last non-cancel button.
    const preferred = [...item.buttons].reverse().find((b) => b.style !== "cancel")

    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen, eventDetails) => {
                if (nextOpen) return
                // A non-cancelable alert can only be closed via its buttons.
                if (!item.cancelable && DISMISS_REASONS.includes(eventDetails.reason)) {
                    eventDetails.cancel()
                    return
                }
                if (DISMISS_REASONS.includes(eventDetails.reason)) {
                    dismiss()
                }
            }}
        >
            <AlertDialogContent size={item.size}>
                <AlertDialogHeader>
                    {item.icon ? <AlertDialogMedia>{item.icon}</AlertDialogMedia> : null}
                    <AlertDialogTitle>{item.title}</AlertDialogTitle>
                    {item.message ? <AlertDialogDescription>{item.message}</AlertDialogDescription> : null}
                </AlertDialogHeader>

                {item.kind === "prompt" ? (
                    <Input
                        autoFocus
                        type={item.inputType}
                        value={value}
                        placeholder={item.placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && preferred) {
                                e.preventDefault()
                                press(preferred)
                            }
                        }}
                    />
                ) : null}

                <AlertDialogFooter>
                    {item.buttons.map((button, i) => (
                        <AlertDialogAction
                            key={`${button.text}-${i}`}
                            variant={variantFor(button.style)}
                            autoFocus={item.kind === "alert" && button === preferred}
                            onClick={() => press(button)}
                        >
                            {button.text}
                        </AlertDialogAction>
                    ))}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

/**
 * Mount once at the root of your app (next to your <Toaster />, etc.).
 * Renders whatever alert is currently at the front of the queue.
 */
export function AlertHost() {
    const items = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const current = items.at(0)
    if (!current) return null
    // key => fresh open/input state each time a new alert surfaces
    return <AlertInstance key={current.id} item={current} />
}
