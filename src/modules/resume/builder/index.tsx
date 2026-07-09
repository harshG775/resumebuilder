import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { useAppForm } from "#/hooks/form"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"
import BuilderLayout from "./components/builder-layout"
import {
    BasicsSection,
    CertificationsSection,
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    SummarySection,
} from "./Editor"
import Preview from "./preview"

type BuilderProps = {
    resumeValue: ResumeValues
}
export default function Builder({ resumeValue }: BuilderProps) {
    const form = useAppForm({
        defaultValues: resumeValue,
        validators: { onChange: ResumeZodSchema },
    })

    return (
        <BuilderLayout
            title={form.state.values.basics.name || "Untitled resume"}
            editor={
                <FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">
                    <BasicsSection form={form} />
                    <FieldSeparator />
                    <SummarySection form={form} />
                    <FieldSeparator />
                    <SkillsSection form={form} />
                    <FieldSeparator />
                    <ExperienceSection form={form} />
                    <FieldSeparator />
                    <ProjectsSection form={form} />
                    <FieldSeparator />
                    <EducationSection form={form} />
                    <FieldSeparator />
                    <CertificationsSection form={form} />
                </FieldGroup>
            }
            design={<FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">design</FieldGroup>}
            preview={
                <div className="max-w-3xl w-full">
                    <form.Subscribe selector={(state) => state.values}>
                        {(values) => <Preview templateId="classic" values={values} />}
                    </form.Subscribe>
                </div>
            }
        />
    )
}
