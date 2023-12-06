import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import BasicInfo from "../../pageSections/resumeBuilder/basicInfo/BasicInfo";
import Summary from "../../pageSections/resumeBuilder/summary/Summary";
import Skills from "../../pageSections/resumeBuilder/skills/Skills";
import Education from "../../pageSections/resumeBuilder/education/Education";
import Experience from "../../pageSections/resumeBuilder/experience/Experience";
import Projects from "../../pageSections/resumeBuilder/projects/Projects";
import Certifications from "../../pageSections/resumeBuilder/certifications/Certifications";
import Languages from "../../pageSections/resumeBuilder/languages/Languages";
import Interests from "../../pageSections/resumeBuilder/interests/Interests";
import Declaration from "../../pageSections/resumeBuilder/declaration/Declaration";
import CustomSection from "../../pageSections/resumeBuilder/customsection/CustomSection.jsx";


const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <div className="absolute bottom-4 left-[10rem] right-0 p-4 z-50">
            <div className="flex gap-4 mx-auto">
                <div>
                    other Controls
                </div>
                <ul className="grid gap-2 grid-flow-col">
                    <li><button onClick={() => zoomIn()}>Zoom In</button></li>
                    <li><button onClick={() => zoomOut()}>Zoom Out</button></li>
                    <li><button onClick={() => resetTransform()}>Center</button></li>
                </ul>
            </div>
        </div>
    );
};
export default function ResumeBuilder() {

    
	return (
        <div className="grid grid-cols-[10rem_1fr]">
            <div className="border border-gray-600">
                <h1>Resume Builder</h1>
            </div>
            <main className="">
                <TransformWrapper>
                    <Controls />
                    <TransformComponent>
                        <div className=" mx-auto grid place-content-center h-screen w-[calc(100vw-10rem)]">
                            <div className="scale-50 w-a4 h-a4 mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

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
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </main>
        </div>
	);
}
