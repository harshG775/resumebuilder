import ResumeEditor from "../../pageSections/resumeBuilder/resumeEditor/ResumeEditor.jsx";
import ResumePreview from "../../pageSections/resumeBuilder/resumePreview/ResumePreview.jsx";
export default function ResumeBuilder() {
	return (
        <div className="grid grid-cols-[20rem_1fr]">
            <div className="border border-gray-600">
                <h1>Resume Builder</h1>
                <ResumeEditor/>
            </div>
            <ResumePreview/>
        </div>
	);
}
