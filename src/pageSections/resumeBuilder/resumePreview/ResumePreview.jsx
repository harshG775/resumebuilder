import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import BasicInfo from "./basicInfo/BasicInfo";
import Summary from "./summary/Summary";
import Skills from "./skills/Skills";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import Projects from "./projects/Projects";
import Certifications from "./certifications/Certifications";
import Languages from "./languages/Languages";
import Interests from "./interests/Interests";
import CustomSection from "./customSection/CustomSection";
import Declaration from "./declaration/Declaration";


const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <div className="absolute bottom-4  right-0 p-4 z-50">
            <div className="flex gap-4 mx-auto">
                <div>
                    other Controls
                </div>
                <ul className="grid gap-2 grid-flow-col">
                    <li><button onClick={() => zoomIn()}>Zoom In</button></li>
                    <li><button onClick={() => zoomOut()}>Zoom Out</button></li>
                    <li><button onClick={() => resetTransform()}>Reset</button></li>
                </ul>
            </div>
        </div>
    );
};

export default function ResumePreview() {
	return (
		<main className=' relative'>
			<TransformWrapper initialScale={1}>
				<Controls />
				<TransformComponent>
					<div className=' mx-auto grid place-content-center h-screen w-[calc(100vw-20rem)]'>
						<div className='scale-50 w-a4 h-a4 mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
							<BasicInfo/>
							<Summary />
							<Skills />
							<Education />
							<Experience />
							<Projects />
							<Certifications />
							<Languages />
							<Interests />
							<CustomSection />
							<Declaration />
						</div>
					</div>
				</TransformComponent>
			</TransformWrapper>
		</main>
	);
}
