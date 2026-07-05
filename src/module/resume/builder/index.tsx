import { useAppForm } from "#/hooks/form"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"

type BuilderProps = {
    resumeValue: ResumeValues
}
export default function Builder({ resumeValue }: BuilderProps) {
    const form = useAppForm({
        defaultValues: resumeValue,
        validators: { onChange: ResumeZodSchema },
    })
    return <div>{JSON.stringify(form.state.values)}</div>
}
