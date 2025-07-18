import React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import GridImage1 from "../assets/images/abt1.png"
import GridImage2 from "../assets/images/abt2.png"
import GridImage3 from "../assets/images/abt3.png"
import GridImage4 from "../assets/images/abt4.png"
import GridImage5 from "../assets/images/abt5.png"

const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#about h2", { type: "words" })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: { trigger: "#about", start: "top center" },
    })

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
        duration: 1,
        ease: "expo.out",
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          stagger: 0.04,
          duration: 1,
          ease: "power1.inOut",
        },
        // this will start the animation 0.5 seconds before the previous one ends
        "-=0.5"
      )
  })
  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>{" "}
              from muddle to garnish
            </h2>
          </div>
          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.{" "}
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src={GridImage1} alt="grid-img-1" />
        </div>
        <div className="md:col-span-6">
          <div className="noisy" />
          <img src={GridImage2} alt="grid-img-2" />
        </div>
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src={GridImage5} alt="grid-img-5" />
        </div>
      </div>
      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src={GridImage3} alt="grid-img-3" />
        </div>
        <div className="md:col-span-4">
          <div className="noisy" />
          <img src={GridImage4} alt="grid-img-4" />
        </div>
      </div>
    </div>
  )
}

export default About
