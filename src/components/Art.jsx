import React from "react"
import { featureLists, goodLists } from "../constants/index.js"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"
import Cocktail from "../assets/images/under-img.jpg"
import Check from "../assets/images/check.png"

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useGSAP(() => {
    const startValue = isMobile ? "top 20%" : "top top"

    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start: startValue,
        end: "bottom center",
        scrub: 1.5,
        pin: true, // pin the section while scrolling
      },
    })

    maskTimeline
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to("#masked-content", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      })
  })
  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade text-amber-100 saturate-60">The Art</h2>
        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src={Check} alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
          <div className="cocktail-img">
            <img
              src={Cocktail}
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>
          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src={Check} alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="masked-container">
          <h2 className="will-fade text-gradient">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p className="text-shadow-amber-100 text-shadow-xs">
              This isn’t just a drink. It’s a carefully crafted moment made{" "}
              <span className="text-amber-100 brightness-125 text-shadow-none">
                just for you
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Art
