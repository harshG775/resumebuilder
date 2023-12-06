import ResumeEditor from "../../pageSections/resumeBuilder/resumeEditor/ResumeEditor.jsx";
import ResumePreview from "../../pageSections/resumeBuilder/resumePreview/ResumePreview.jsx";
export default function ResumeBuilder() {
	return (
        <div className="grid grid-cols-[20rem_1fr]">
            <ResumeEditor/>
            <ResumePreview/>
        </div>
	);
}
