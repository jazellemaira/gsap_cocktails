import React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { cocktailLists, mockTailLists } from "../constants/index.js"
import CocktailLeftLeaf from "../assets/images/cocktail-left-leaf.png"
import CocktailRightLeaf from "../assets/images/cocktail-right-leaf.png"

const Cocktails = () => {
  useGSAP(() => {
    // when the parallax effect on cocktail section will animate
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    })
    // what animation will happen
    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from("#c-right-leaf", {
        x: 100,
        y: 100,
      })
  })

  return (
    <section id="cocktails" className="noisy">
      <img src={CocktailLeftLeaf} alt="left-leaf" id="c-left-leaf" />
      <img src={CocktailRightLeaf} alt="right-leaf" id="c-right-leaf" />
      <div className="list">
        <div className="popular">
          <h2>Most Popular Cocktails:</h2>
          <ul>
            {/* instead of using (drink) multiple times, use the destructured version { name, country, detail, price} in the argument*/}
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Most Loved Mocktails:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Cocktails
