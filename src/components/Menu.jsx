"use client"

import React, { use } from "react"
import { allCocktails } from "../../constants"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

const Menu = () => {
  // Create a ref to the content div to manipulate its inner HTML
  const contentRef = React.useRef()
  // State to track the current index of the cocktail being displayed
  const [currentIndex, setCurrentIndex] = React.useState(0)

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 })

    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" }
    )

    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, ease: "power1.inOut" }
    )
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, ease: "power1.inOut" }
    )
  }, [currentIndex])

  useGSAP(() => {
    // Create a timeline for the cocktail section animations
    const cocktailTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    })

    // Animate the left and right leaves
    cocktailTimeline
      .to("#m-left-leaf", { x: 0, y: -100, opacity: 0.3 })
      .to("#m-right-leaf", { x: 0, y: 200, opacity: 0.3 }, "<")
  })

  const totalCocktails = allCocktails.length

  // Update the current index to the clicked cocktail's index
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails
    setCurrentIndex(newIndex)
    // % Modulo operation ensures that the index wraps around if it exceeds the total number of cocktails
    // This allows for infinite scrolling through the cocktail list
    // For example, if the index is 5 and there are 4 cocktails, it will wrap around to 1
    // If the index is -1, it will wrap around
    // to the last cocktail in the list
    // This is useful for implementing a carousel-like behavior
    // where clicking next or previous will cycle through the cocktails
    // without going out of bounds
    // The modulo operation ensures that the index is always within the bounds of the array
  }

  const getCocktailAt = (indexOffset) => {
    // Calculate the index of the cocktail based on the current index and the offset
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ]
  }
  const currentCocktail = getCocktailAt(0)
  const prevCocktail = getCocktailAt(-1)
  const nextCocktail = getCocktailAt(1)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img
        src="images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex

          return (
            <button
              key={cocktail.id}
              className={`cocktail-tab ${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-selected={isActive}
            >
              {cocktail.name}
            </button>
          )
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} alt="" className="object-contain" />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
