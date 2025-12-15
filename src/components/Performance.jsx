import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {useMediaQuery} from "react-responsive";

import {performanceImages, performanceImgPositions} from "../constants/index.js";

const Performance = () => {
    const isMobile = useMediaQuery({query: "(max-width: 767px)"});
    const isTablet = useMediaQuery({query: "(min-width: 768px) and (max-width: 1023px)"});
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Text Animation
            gsap.fromTo(
                ".content p",
                {opacity: 0, y: 10},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".content p",
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Image Positioning Timeline
            const tl = gsap.timeline({
                defaults: {duration: 2, ease: "power1.inOut", overwrite: "auto"},
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Position Each Performance Image
            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;

                const selector = `.${item.id}`;

                const vars = {};

                let positionSet = item.desktop;
                if (isMobile) {
                    positionSet = item.mobile;
                } else if (isTablet) {
                    positionSet = item.tablet;
                }
                if (!positionSet) return;

                if (typeof positionSet.left === "number") vars.left = `${positionSet.left}%`;
                if (typeof positionSet.right === "number") vars.right = `${positionSet.right}%`;
                if (typeof positionSet.bottom === "number") vars.bottom = `${positionSet.bottom}%`;

                if (item.transform) vars.transform = item.transform;

                tl.to(selector, vars, 0);
            });
        },
        {scope: sectionRef, dependencies: [isMobile, isTablet]}
    );

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        className={item.id}
                        alt={item.alt || `Performance Image #${index + 1}`}
                    />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};
export default Performance;