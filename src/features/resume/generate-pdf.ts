// src/lib/generate-pdf.ts (Simplified Logic)
// import { renderToStaticMarkup } from "react-dom/server"

export async function generateResumeHtml(templateId: string, data: any) {
    // const html = renderToStaticMarkup("")
    // import cssContent from "./style.module.css?inline"

    return `
    <html>
      <head>
        <style>${"template.styleContent"}</style>
      </head>
      <body>${"html"}</body>
    </html>
  `
}
