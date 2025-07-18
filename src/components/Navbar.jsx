import React from "react"
import { navLinks } from "../constants/index.js"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import Logo from "../assets/images/logo.png"

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top", // when the bottom of the nav hits the top of the viewport
      },
    })
    // this will animate the nav bar when it hits the top of the viewport
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000095",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    )
  })

  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src={Logo} alt="logo" />
          <p className="brightness-125">Wijn &times; Wens</p>
        </a>
        <ul>
          {/* open a new dynamic block of code {} that contains the index.js object*/}
          {/* navLinks.map() is a method that loops through the navLinks array and returns a new array of elements */}
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
