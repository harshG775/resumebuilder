// import { useForm } from "@tanstack/react-form"
// import {
//     Field,
//     FieldContent,
//     FieldDescription,
//     FieldError,
//     FieldGroup,
//     FieldLabel,
//     FieldLegend,
//     FieldSeparator,
//     FieldSet,
//     FieldTitle,
// } from "@/components/ui/field"
// import z from "zod"
// import { Input } from "#/components/ui/input"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "#/components/ui/button"
// import { Tag } from "lucide-react"

// export const BasicsSectionSchema = z.object({
//     name: z.string(),
//     headline: z.string(),
//     email: z.email(),
//     phone: z.string(),
//     location: z.string(),

//     website: z.object({
//         url: z.url().or(z.literal("")),
//         label: z.string(),
//     }),

//     links: z.array(
//         z.object({
//             id: z.string(),
//             url: z.url().or(z.literal("")),
//             label: z.string(),
//         }),
//     ),
// })
// export function BasicsSection({ form, idx }: { form: any; idx: number }) {
//     const base = `sections[${idx}].content` as const

//     return (
//         <FieldSet>
//             <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
//             <FieldGroup>
//                 <form.Field
//                     name={`${base}.name`}
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel htmlFor={field.name}>Name</FieldLabel>
//                             <Input
//                                 id={field.name}
//                                 value={field.state.value}
//                                 onBlur={field.handleBlur}
//                                 onChange={(e) => field.handleChange(e.target.value)}
//                                 autoComplete="off"
//                             />
//                         </Field>
//                     )}
//                 />

//                 <form.Field
//                     name={`${base}.headline`}
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel htmlFor={field.name}>Headline</FieldLabel>
//                             <Input
//                                 id={field.name}
//                                 value={field.state.value}
//                                 onBlur={field.handleBlur}
//                                 onChange={(e) => field.handleChange(e.target.value)}
//                                 autoComplete="off"
//                             />
//                         </Field>
//                     )}
//                 />

//                 <form.Field
//                     name={`${base}.email`}
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                             <Input
//                                 type="email"
//                                 id={field.name}
//                                 value={field.state.value}
//                                 onBlur={field.handleBlur}
//                                 onChange={(e) => field.handleChange(e.target.value)}
//                                 autoComplete="off"
//                             />
//                         </Field>
//                     )}
//                 />
//                 <form.Field
//                     name={`${base}.phone`}
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
//                             <Input
//                                 type="tel"
//                                 id={field.name}
//                                 value={field.state.value}
//                                 onBlur={field.handleBlur}
//                                 onChange={(e) => field.handleChange(e.target.value)}
//                                 autoComplete="off"
//                             />
//                         </Field>
//                     )}
//                 />

//                 <form.Field
//                     name={`${base}.location`}
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel htmlFor={field.name}>Location</FieldLabel>
//                             <Input
//                                 id={field.name}
//                                 value={field.state.value}
//                                 onBlur={field.handleBlur}
//                                 onChange={(e) => field.handleChange(e.target.value)}
//                                 autoComplete="off"
//                             />
//                         </Field>
//                     )}
//                 />
//                 <div className="flex gap-2 items-end">
//                     <form.Field name={`${base}.website.url`}>
//                         {(field) => (
//                             <Field>
//                                 <FieldLabel htmlFor={field.name}>Website</FieldLabel>
//                                 <Input
//                                     value={field.state.value}
//                                     onBlur={field.handleBlur}
//                                     onChange={(e) => field.handleChange(e.target.value)}
//                                     placeholder="https://"
//                                 />
//                             </Field>
//                         )}
//                     </form.Field>

//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button variant="outline">
//                                 <Tag />
//                             </Button>
//                         </PopoverTrigger>

//                         <PopoverContent>
//                             <FieldLabel>Label</FieldLabel>

//                             <form.Field name="website.label">
//                                 {(field) => (
//                                     <Input
//                                         value={field.state.value}
//                                         onChange={(e) => field.handleChange(e.target.value)}
//                                     />
//                                 )}
//                             </form.Field>
//                         </PopoverContent>
//                     </Popover>
//                 </div>
//                 <form.Field
//                     name={`${base}.links`}
//                     mode="array"
//                     children={(field) => (
//                         <Field>
//                             <FieldLabel>Links</FieldLabel>

//                             {field.state.value.map((item: any, idx: number) => (
//                                 <div key={item.id} className="flex gap-2 mb-2">
//                                     <form.Field name={`${base}.links[${idx}].url`}>
//                                         {(field) => (
//                                             <Input
//                                                 value={field.state.value}
//                                                 onChange={(e) => field.handleChange(e.target.value)}
//                                                 placeholder="https://"
//                                             />
//                                         )}
//                                     </form.Field>

//                                     <form.Field name={`${base}.links[${idx}].label`}>
//                                         {(field) => (
//                                             <Input
//                                                 value={field.state.value}
//                                                 onChange={(e) => field.handleChange(e.target.value)}
//                                                 placeholder="Label"
//                                             />
//                                         )}
//                                     </form.Field>

//                                     <Button type="button" variant="outline" onClick={() => field.removeValue(idx)}>
//                                         Remove
//                                     </Button>
//                                 </div>
//                             ))}

//                             <Button
//                                 type="button"
//                                 onClick={() => field.pushValue({ id: crypto.randomUUID(), url: "", label: "" })}
//                             >
//                                 Add Link
//                             </Button>
//                         </Field>
//                     )}
//                 />
//             </FieldGroup>
//         </FieldSet>
//     )
// }
