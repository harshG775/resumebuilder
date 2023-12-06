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


export default function ResumeBuilder() {
    const Controls = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
            <>
                <button onClick={() => zoomIn()}>Zoom In</button>
                <button onClick={() => zoomOut()}>Zoom Out</button>
                <button onClick={() => resetTransform()}>Reset</button>
            </>
        );
    };
    
	return (
        <TransformWrapper
                initialScale={1}
                // initialPositionX={200}
                // initialPositionY={100}
            >
            <main className="grid grid-cols-[10rem_1fr_10rem]">
                <div>
                    <h1>left</h1>
                    <Controls />
                </div>
                <TransformComponent>
                    <div className="mx-auto grid place-content-center h-screen w-screen">
                        <div className="scale-50 w-a4 h-a4 m-4 mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

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
                <div>
                    <h1>right</h1>
                </div>
            </main>
        </TransformWrapper>

	);
}
