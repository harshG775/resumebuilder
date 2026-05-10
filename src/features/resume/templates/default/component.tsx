import type { ResumeValues } from "#/lib/schemas/resume-schema"
import s from "./style.module.css"

interface ComponentProps {
    data: ResumeValues
}


function component({ data }: ComponentProps) {
    const { basics } = data

    return (
        <div className={s.resume}>
            {/* ===== HEADER ===== */}
            <header className={s.header}>
                <h1 className={s.name}>{basics.name}</h1>
                {basics.headline && <p className={s.headline}>{basics.headline}</p>}

                {/* Contact Information */}
                <div className={s.contactInfo}>
                    {basics.email && (
                        <div className={s.contactItem}>
                            <span className={s.contactLabel}>Email:</span>
                            <a href={`mailto:${basics.email}`}>{basics.email}</a>
                        </div>
                    )}
                    {basics.phone && (
                        <div className={s.contactItem}>
                            <span className={s.contactLabel}>Phone:</span>
                            <span>{basics.phone}</span>
                        </div>
                    )}
                    {basics.location && (
                        <div className={s.contactItem}>
                            <span className={s.contactLabel}>Location:</span>
                            <span>{basics.location}</span>
                        </div>
                    )}
                    {basics.website.showLink && basics.website.url && (
                        <div className={s.contactItem}>
                            <a href={basics.website.url} target="_blank" rel="noopener noreferrer">
                                {basics.website.label || basics.website.url}
                            </a>
                        </div>
                    )}
                </div>

                {/* Custom Links */}
                {basics.customFields && basics.customFields.length > 0 && (
                    <ul className={s.linksList}>
                        {basics.customFields.map((link) => (
                            <li key={link.id}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className={s.link}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </header>
        </div>
    )
}

export default component
