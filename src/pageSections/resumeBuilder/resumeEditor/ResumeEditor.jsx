export default function ResumeEditor() {
	return (
		<div>
			<h1>Resume Editor</h1>
			<form>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="phone">Phone</label>
				<input type="tel" id="phone" name="phone" />
				<label htmlFor="address">Address</label>
				<input type="text" id="address" name="address" />
				<label htmlFor="linkedin">LinkedIn</label>
				<input type="url" id="linkedin" name="linkedin" />
				<label htmlFor="github">GitHub</label>
				<input type="url" id="github" name="github" />
			</form>
		</div>
	);
}
