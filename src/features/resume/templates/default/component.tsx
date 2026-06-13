import { RichText } from "#/components/ui/rich-text"
import type { ResumeValues } from "#/features/resume/resume-schema"
import s from "./styles.module.css"

interface ComponentProps {
    data: ResumeValues
}

function component({ data }: ComponentProps) {
    const { basics, order, sections } = data

    return (
        <div className={s.resume}>
            <header className={s.header}>
                <h1 className={s.name}>{basics.name}</h1>
                {basics.headline && <p className={s.headline}>{basics.headline}</p>}
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

            {order.map((section) => {
                switch (section) {
                    case "summary": {
                        const summary = sections[section]
                        if (summary?.hidden) return null
                        if (!summary?.content) return null

                        return (
                            <section key="summary" className={s.section}>
                                <h2 className={s.sectionTitle}>{summary.title}</h2>
                                <RichText content={summary.content} />
                            </section>
                        )
                    }

                    case "skills": {
                        const skills = sections[section]
                        if (skills?.hidden) return null

                        const visibleItems = skills?.items?.filter((item) => !item.hidden) ?? []
                        if (!visibleItems.length) return null

                        return (
                            <section key="skills" className={s.section}>
                                <h2 className={s.sectionTitle}>{skills.title}</h2>
                                <div className={s.skillsGrid}>
                                    {visibleItems.map((skill) => (
                                        <div key={skill.id} className={s.skillGroup}>
                                            {skill.name && <span className={s.skillGroupName}>{skill.name}:</span>}
                                            {skill.keywords?.length > 0 && (
                                                <span className={s.skillKeywords}>{skill.keywords.join(", ")}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    case "experience": {
                        const experience = sections[section]
                        if (experience?.hidden) return null

                        const visibleItems = experience?.items?.filter((item) => !item.hidden) ?? []
                        if (!visibleItems.length) return null

                        return (
                            <section key="experience" className={s.section}>
                                <h2 className={s.sectionTitle}>{experience.title}</h2>
                                <div className={s.itemList}>
                                    {visibleItems.map((item) => (
                                        <div key={item.id} className={s.item}>
                                            <div className={s.itemHeader}>
                                                <div className={s.itemMeta}>
                                                    <span className={s.itemTitle}>{item.position}</span>
                                                    <span className={s.itemOrg}>
                                                        {item.website?.showLink && item.website.url ? (
                                                            <a
                                                                href={item.website.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={s.link}
                                                            >
                                                                {item.company}
                                                            </a>
                                                        ) : (
                                                            item.company
                                                        )}
                                                    </span>
                                                    {item.location && (
                                                        <span className={s.itemLocation}>{item.location}</span>
                                                    )}
                                                </div>
                                                {item.period && <span className={s.itemPeriod}>{item.period}</span>}
                                            </div>
                                            {item.roles?.length > 0 && (
                                                <ul className={s.pointsList}>
                                                    {item.roles.map((role, idx) => (
                                                        <li key={idx} className={s.pointsItem}>
                                                            {role}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    case "projects": {
                        const projects = sections[section]
                        if (projects?.hidden) return null

                        const visibleItems = projects?.items?.filter((item) => !item.hidden) ?? []
                        if (!visibleItems.length) return null

                        return (
                            <section key="projects" className={s.section}>
                                <h2 className={s.sectionTitle}>{projects.title}</h2>
                                <div className={s.itemList}>
                                    {visibleItems.map((item) => (
                                        <div key={item.id} className={s.item}>
                                            <div className={s.itemHeader}>
                                                <div className={s.itemMeta}>
                                                    <span className={s.itemTitle}>{item.name}</span>
                                                    {item.keywords?.length > 0 && (
                                                        <span className={s.itemStack}>{item.keywords.join(" · ")}</span>
                                                    )}
                                                </div>
                                                <div className={s.itemRight}>
                                                    {item.links?.length > 0 && (
                                                        <div className={s.itemLinks}>
                                                            {item.links.map((link) => (
                                                                <a
                                                                    key={link.id}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={s.link}
                                                                >
                                                                    {link.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {item.period && <span className={s.itemPeriod}>{item.period}</span>}
                                                </div>
                                            </div>
                                            {item.description && (
                                                <ul className={s.pointsList}>
                                                    {item.description
                                                        .split("\n")
                                                        .map((line) => line.replace(/^•\s*/, "").trim())
                                                        .filter(Boolean)
                                                        .map((point, idx) => (
                                                            <li key={idx} className={s.pointsItem}>
                                                                {point}
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    case "education": {
                        const education = sections[section]
                        if (education?.hidden) return null

                        const visibleItems = education?.items?.filter((item) => !item.hidden) ?? []
                        if (!visibleItems.length) return null

                        return (
                            <section key="education" className={s.section}>
                                <h2 className={s.sectionTitle}>{education.title}</h2>
                                <div className={s.itemList}>
                                    {visibleItems.map((item) => (
                                        <div key={item.id} className={s.item}>
                                            <div className={s.itemHeader}>
                                                <div className={s.itemMeta}>
                                                    <span className={s.itemTitle}>{item.degree}</span>
                                                    <span className={s.itemOrg}>{item.school}</span>
                                                    {item.grade && (
                                                        <span className={s.itemGrade}>Grade: {item.grade}</span>
                                                    )}
                                                </div>
                                                {item.period && <span className={s.itemPeriod}>{item.period}</span>}
                                            </div>
                                            {item.description && (
                                                <p className={s.itemDescription}>{item.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    case "certifications": {
                        const certifications = sections[section]
                        if (certifications?.hidden) return null

                        const visibleItems = certifications?.items?.filter((item) => !item.hidden) ?? []
                        if (!visibleItems.length) return null

                        return (
                            <section key="certifications" className={s.section}>
                                <h2 className={s.sectionTitle}>{certifications.title}</h2>
                                <div className={s.itemList}>
                                    {visibleItems.map((item) => (
                                        <div key={item.id} className={s.item}>
                                            <div className={s.itemHeader}>
                                                <div className={s.itemMeta}>
                                                    <span className={s.itemTitle}>{item.title}</span>
                                                    <span className={s.itemOrg}>{item.issuer}</span>
                                                    {item.website?.showLink && item.website.url && (
                                                        <a
                                                            href={item.website.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={s.link}
                                                        >
                                                            {item.website.label || item.website.url}
                                                        </a>
                                                    )}
                                                </div>
                                                {item.date && <span className={s.itemPeriod}>{item.date}</span>}
                                            </div>
                                            {item.description && (
                                                <p className={s.itemDescription}>{item.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )
                    }

                    default:
                        return null
                }
            })}
        </div>
    )
}

export default component
