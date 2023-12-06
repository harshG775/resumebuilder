import { useState } from "react";

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
    const [isLeftBarOpen, setIsLeftBarOpen] = useState(false);
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);
    const handleLeftBar =()=>{
        setIsLeftBarOpen(!isLeftBarOpen)
    }
    const handleRightBar =()=>{
        setIsRightBarOpen(!isRightBarOpen)
    }
	return (
        <div className="grid grid-cols-[10rem_1fr_10rem]">
            <div>
                <button onClick={handleLeftBar}>toggle</button>
                right side
            </div>
            <main className="overflow-scroll ">
                <div className=" w-[210mm] h-[297mm] m-4 mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
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
                </div>
            </main>
            <div>
                <button onClick={handleRightBar}>toggle</button>
                right side
            </div>
        </div>
	);
}