import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import BasicInfo from "../../pageSections/resumeBuilder/resumePreview/basicInfo/BasicInfo.jsx";
import Summary from "../../pageSections/resumeBuilder/resumePreview/summary/Summary.jsx";
import Skills from "../../pageSections/resumeBuilder/resumePreview/skills/Skills.jsx";
import Education from "../../pageSections/resumeBuilder/resumePreview/education/Education.jsx";
import Experience from "../../pageSections/resumeBuilder/resumePreview/experience/Experience.jsx";
import Projects from "../../pageSections/resumeBuilder/resumePreview/projects/Projects.jsx";
import Certifications from "../../pageSections/resumeBuilder/resumePreview/certifications/Certifications.jsx";
import Languages from "../../pageSections/resumeBuilder/resumePreview/languages/Languages.jsx";
import Interests from "../../pageSections/resumeBuilder/resumePreview/interests/Interests.jsx";
import Declaration from "../../pageSections/resumeBuilder/resumePreview/declaration/Declaration.jsx";
import CustomSection from "../../pageSections/resumeBuilder/resumePreview/customsection/CustomSection.jsx";


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
        <div className="grid grid-cols-[20rem_1fr]">
            <div className="border border-gray-600">
                <h1>Resume Builder</h1>
            </div>
            <main className="">
                <TransformWrapper 
                initialScale={1}
                >
                    <Controls />
                    <TransformComponent>
                        <div className=" mx-auto grid place-content-center h-screen w-[calc(100vw-20rem)]">
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
