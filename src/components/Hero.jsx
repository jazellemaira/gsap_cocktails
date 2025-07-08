import React from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SplitText } from "gsap/all"

const Hero = () => {
  useGSAP(() => {
    // new SplitText() is a GSAP utility that splits text into characters or words for animation
    const heroSplit = new SplitText(".title", { type: "chars, words" })
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" })

    // add a class to each character of the title for styling
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

    // animation for the title
    gsap.from(heroSplit.chars, {
      yPercent: 100, // start from below
      duration: 1.8,
      ease: "expo.out", // expo.out is a smooth springy easing
      stagger: 0.06, // stagger the animation for each character creating a wave effect
    })

    // animation for the subtitle
    gsap.from(paragraphSplit.lines, {
      opacity: 0, // start from invisible
      yPercent: 100, // start from below
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1, // delay the paragraph animation to start after the title animation
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero", // the hero section is the trigger for this animation
          start: "top top", // when the top of the hero section hits the top of the viewport
          end: "bottom top", // when the bottom of the hero section hits the top of the viewport
          scrub: true, // smooth scrubbing effect
        },
      })
      .to("#hero .right-leaf", { y: 200 }, 0) // animate the right leaf down by 200 pixels
      .to("#hero .left-leaf", { y: -200 }, 0) // animate the left leaf up by 200 pixels
  }, [])
  // [] empty array means that the effect will only run once when the component mounts
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">NEGRONI</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
