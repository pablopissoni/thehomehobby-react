import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import "../../src/components/css/Slider.css"
// --- Images imports ---
import sliderDesktop1 from "../../public/slider-desktop1.png";
import sliderDesktop2 from "../../public/slider-desktop2.png";
import sliderDesktop3 from "../../public/slider-desktop3.png";
// import sliderMobile1 from "../../public/slider-mobile1.png";
// import sliderMobile2 from "../../public/slider-mobile2.png";
// import sliderMobile3 from "../../public/slider-mobile3.png";

export const Slider = () => {
    // -------- KeenSlider --------
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        autoplay: 1000,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });
    
    function Arrow(props) {
        const disabled = props.disabled ? " arrow--disabled" : ""
        return (
            <svg
            onClick={props.onClick}
            className={`arrow ${
                props.left ? "arrow--left" : "arrow--right"
            } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
        {props.left && (
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
        {!props.left && (
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
      </svg>
    )
}
// ^^^^^^^ KeenSlider ^^^^^^^


return (
    <>
      <div className="navigation-wrapper">
                <div
                    ref={sliderRef}
                    className="keen-slider"
                    style={{ height: "350px" }} // Ajusta la altura según tus necesidades
                >
        <img
            className="keen-slider__slide number-slide1"
            src={sliderDesktop1}
            alt="publicidad1"
          />
          <img
            className="keen-slider__slide number-slide2"
            src={sliderDesktop2}
            alt="publicidad1"
          />
          <img
            className="keen-slider__slide number-slide3"
            src={sliderDesktop3}
            alt="publicidad1"
          />
          {/* <div className="keen-slider__slide number-slide1">1</div>
          <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
          <div className="keen-slider__slide number-slide4">4</div>
          <div className="keen-slider__slide number-slide5">5</div>
          <div className="keen-slider__slide number-slide6">6</div> */}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
    </>
  )
}
