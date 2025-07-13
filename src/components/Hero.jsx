import React from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive"
import HeroRightLeaf from "../assets/images/hero-right-leaf.png"
import HeroLeftLeaf from "../assets/images/hero-left-leaf.png"
import CocktailVideo from "../assets/videos/output.mp4"

const Hero = () => {
  const videoRef = React.useRef() // useRef is used to create a reference to the video element so we can control it

  const isMobile = useMediaQuery({ maxWidth: 767 }) // useMediaQuery is a hook that checks if the screen width is less than or equal to 767px (mobile devices)

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
      // animate the right leaf down by 200 pixels
      .to("#hero .right-leaf", { y: 200 }, 0)
      // animate the left leaf up by 200 pixels
      .to("#hero .left-leaf", { y: -200 }, 0)

    // if the screen is not mobile, play the video
    // start the video animation when the top of the hero section hits 50% of the viewport height on mobile, or center 60% on larger screens
    // end the video animation when the hero section is 120% of the viewport height on mobile, or when the bottom of the hero section hits the top of the viewport on larger screens
    const startValue = isMobile ? "top 50%" : "center 60%"
    const endValue = isMobile ? "120% top" : "bottom top"

    //  Video animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true, // pin the video in place during the scroll
      },
    })

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration, // play the video from start to end
      })
    }
  }, [])
  // [] empty array means that the effect will only run once when the component mounts
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">NEGRONI</h1>
        <img src={HeroLeftLeaf} alt="left-leaf" className="left-leaf" />
        <img src={HeroRightLeaf} alt="right-leaf" className="right-leaf" />
        <div className="body">
          <div className="content bg-black/40 lg:bg-transparent rounded-lg p-8 md:p-16">
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
      <div className="video absolute inset-0">
        {/* playsInline makes the video non-interactive */}
        <video
          ref={videoRef}
          src={CocktailVideo}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  )
}

export default Hero
