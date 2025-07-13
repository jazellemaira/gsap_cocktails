import React from "react"
import { openingHours, socials } from "../constants/index.js"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import FooterLeftLeaf from "../assets/images/footer-left-leaf.png"
import FooterRightLeaf from "../assets/images/footer-right-leaf.png"

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        ease: "power1.inOut",
      },
    })

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p ", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-leaf", {
        y: -50,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-leaf",
        {
          y: -50,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      )
  }, [])

  return (
    <footer id="contact">
      <img src={FooterRightLeaf} alt="right-leaf" id="f-right-leaf" />
      <img src={FooterLeftLeaf} alt="left-leaf" id="f-left-leaf" />
      <div className="content">
        <h2 className="text-amber-100 brightness-125">Where to Find Us</h2>
        <div>
          <h3>Visit Our Bar</h3>
          <p>Polderstraat 123, 1234 AB Leiden, Netherlands</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>+31 71 123 4567</p>
          <p>info@wijnenwens.nl</p>
        </div>
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
