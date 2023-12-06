import BasicInfo from "../home/basicInfo/BasicInfo";
import Summary from "../home/summary/Summary";
import Skills from "../home/skills/Skills";
import Education from "../home/education/Education";
import Experience from "../home/experience/Experience";
import Projects from "../home/projects/Projects";
import Certifications from "../home/certifications/Certifications";
import Languages from "../home/languages/Languages";
import Interests from "../home/interests/Interests";
import Declaration from "../home/declaration/Declaration";
import CustomSection from "../home/customsection/CustomSection.jsx";


export default function ResumeBuilder() {
	return (
		<>
			<BasicInfo />
			<Summary />
			<Skills />
			<Education />
			<Experience />
			<Projects />
			<Certifications />
			<Languages />
			<Interests />
            <CustomSection/>
			<Declaration />
		</>
	);
}