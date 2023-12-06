import ResumeDataObject from "../../../../ResumeDataObject"
export default function BasicInfo() {
	const {name} = ResumeDataObject.basicInfo
	return (
		<div>
			<h1>{name}</h1>
			<p>Web Developer</p>
			<p>Email: john.doe@example.com</p>
			<p>Phone: 123-456-7890</p>
		</div>
	);
}
