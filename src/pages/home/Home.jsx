// import { useContext } from "react";
// import Context_db from "../../client_db/Context_db";
// import { Actions } from "../../client_db/Reducer_db";
// export default function Home() {
//     const [state, dispatch] = useContext(Context_db);

// 	const handleClick = () => {
// 		dispatch({
// 			actionType: Actions.TOGGLE_MENU,
// 			payload: !state.isOpen,
// 		});
// 	};

// 	return (
// 		<div>
// 			<h1>App :{`${state.isOpen}`}</h1>

// 			<button onClick={handleClick}>toggle</button>
// 		</div>
// 	);
// }
import ResumeDataObject from "../../ResumeDataObject";
export default function Home() {
    console.log(ResumeDataObject)
	return (
		<div>
			<Resume />
		</div>
	);
}

function Resume() {
	return (
		<>
			<Basic />
			<Summary />
			<Skills />
			<Education />
			<Experience />
			<Projects />
			<Certifications />
			<Languages />
			<Interests />
			<Declaration />
            <CustomSection/>
		</>
	);
}
// Basic.js
function Basic() {
	return (
		<div>
			<h1>John Doe</h1>
			<p>Web Developer</p>
			<p>Email: john.doe@example.com</p>
			<p>Phone: 123-456-7890</p>
			{/* Add more information as needed */}
		</div>
	);
}

// Summary.js
function Summary() {
	return (
		<div>
			<h2>Summary</h2>
			<p>
				Dynamic and skilled Front-End Developer proficient in React.js,
				HTML, CSS, JavaScript, and more. Experienced in building
				responsive and user-friendly web applications.
			</p>
		</div>
	);
}

// Skills.js
function Skills() {
	return (
		<div>
			<h2>Skills</h2>
			<ul>
				<li>React.js</li>
				<li>HTML, CSS, JavaScript</li>
				<li>Responsive Design</li>
				{/* Add more skills as needed */}
			</ul>
		</div>
	);
}

// Education.js
function Education() {
	return (
		<div>
			<h2>Education</h2>
			<p>
				Bachelor of Science in Computer Science - XYZ University (2015 -
				2019)
			</p>
			{/* Add more education details as needed */}
		</div>
	);
}

// Experience.js
function Experience() {
	return (
		<div>
			<h2>Experience</h2>
			<p>Front-end Developer at ABC Company (June 2019 - Present)</p>
			{/* Add more work experience details as needed */}
		</div>
	);
}

// Projects.js
function Projects() {
	return (
		<div>
			<h2>Projects</h2>
			<p>
				natsu-streamz -{" "}
				<a href='https://natsu-streamz.netlify.app/'>Link</a>
			</p>
			{/* Add more project details as needed */}
		</div>
	);
}

// Certifications.js
function Certifications() {
	return (
		<div>
			<h2>Certifications</h2>
			<p>
				Certified React.js Developer - Example Certification Institute
			</p>
			{/* Add more certification details as needed */}
		</div>
	);
}

// Languages.js
function Languages() {
	return (
		<div>
			<h2>Languages</h2>
			<p>Proficient in English and Fluent in Hindi</p>
			{/* Add more language details as needed */}
		</div>
	);
}

// Interests.js
function Interests() {
	return (
		<div>
			<h2>Interests</h2>
			<p>Web development, Open-source contributions, Reading</p>
			{/* Add more interests as needed */}
		</div>
	);
}

// Declaration.js
function Declaration() {
	return (
		<div>
			<h2>Declaration</h2>
			<p>
				I hereby declare that all the details given above are true to
				the best of my knowledge and belief.
			</p>
		</div>
	);
}
function CustomSection() {
	return <div></div>;
}
