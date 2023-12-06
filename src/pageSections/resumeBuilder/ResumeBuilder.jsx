import { useState } from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

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
                    <div className="mx-auto grid place-content-center h-screen w-[100vw-10rem]">
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
