import { useEffect, useState } from "react";
import FirstCallHeader from "@/components/FirstCallHeader";
import styles from "../styles/Scripts.module.css";

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false); // New state

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(`.${styles.card}`);
      let found = null;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isInView) {
          found = index;
        }
      });

      setActiveCard(found);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case of already scrolled
    handleScroll();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[index] = !updatedSteps[index];
    setCompletedSteps(updatedSteps);
  };

  const handleReset = () => {
    setCompletedSteps([false, false, false]);
    setActiveCard(null); // Reset the highlighted card
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const toggleShowUncheckedOnly = () => {
    setShowUncheckedOnly((prev) => !prev);
  };

  const progress =
    (completedSteps.filter(Boolean).length / completedSteps.length) * 100;

  return (
    <>
      <FirstCallHeader />

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div id="OPEN" className={styles.open_section}>
        <h1 className={styles.headline}>
          <mark className={styles.mark}>INTRODUCTION</mark>
        </h1>
      </div>

      <div className={styles.cards}>
        {!showUncheckedOnly || !completedSteps[0] ? (
          <div
            className={`${styles.card} ${
              activeCard === 0 ? styles["red-highlight"] : ""
            }`}
          >
            <h4>Card 1</h4>
            <p>Card content for card 1.</p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[0]}
                onChange={() => handleCheckboxChange(0)}
              />
              Completed
            </label>
          </div>
        ) : null}

        {!showUncheckedOnly || !completedSteps[1] ? (
          <div
            className={`${styles.card} ${
              activeCard === 1 ? styles["red-highlight"] : ""
            }`}
          >
            <h4>Card 2</h4>
            <p>Card content for card 2.</p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[1]}
                onChange={() => handleCheckboxChange(1)}
              />
              Completed
            </label>
          </div>
        ) : null}

        {!showUncheckedOnly || !completedSteps[2] ? (
          <div
            className={`${styles.card} ${
              activeCard === 2 ? styles["red-highlight"] : ""
            }`}
          >
            <h4>Card 3</h4>
            <p>Card content for card 3.</p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[2]}
                onChange={() => handleCheckboxChange(2)}
              />
              Completed
            </label>
          </div>
        ) : null}
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
        <button
          className={styles.toggleButton}
          onClick={toggleShowUncheckedOnly}
        >
          {showUncheckedOnly ? "Show All Cards" : "Show Unchecked Cards Only"}
        </button>
      </div>
    </>
  );
}
