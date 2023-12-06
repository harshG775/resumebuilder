import ResumeDataObject from "../../../ResumeDataObject";

import BasicInfo_editor from "./basicInfo_editor/BasicInfo_editor";

export default function ResumeEditor() {
	return (
		<div className="h-screen overflow-y-scroll border border-gray-600">
			<h1>Resume Editor</h1>
			<div className="grid gap-y-2">
				<BasicInfo_editor data={ResumeDataObject.basic_info} />
				<div className="mt-4">
					<h4>Summary</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Skills</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Education</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Experience</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Projects</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Certifications</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Languages</h4>
					<ul></ul>
				</div>
				<div className="mt-4">
					<h4>Interests</h4>
					<ul></ul>
				</div>

				<div className="mt-4">
					<h4>Custom Section</h4>
					<ul></ul>
				</div>

				<div className="mt-4">
					<h4>Declaration</h4>
					<ul></ul>
				</div>
			</div>
		</div>
	);
}
