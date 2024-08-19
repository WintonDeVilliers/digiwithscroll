import { useEffect, useState } from "react";
import FirstCallHeader from "@/components/FirstCallHeader";
import styles from "../styles/Scripts.module.css";

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isClient, setIsClient] = useState(false);
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false); // New state

  useEffect(() => {
    // Mark the component as mounted on the client side
    setIsClient(true);

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
    // Clear all checkboxes
    setCompletedSteps([false, false, false, false, false]);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const toggleShowUncheckedOnly = () => {
    setShowUncheckedOnly((prev) => !prev);
  };

  const progress = (completedSteps.filter(Boolean).length / 22) * 100;

  if (!isClient) {
    return null; // Avoid rendering until on the client side
  }

  return (
    <>
      <FirstCallHeader />

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div />
      <div>
        <div id="OPEN" className={styles.open_section}>
          <h1 className={styles.headline}>
            <mark className={styles.mark}>INTRODUCTION</mark>
          </h1>
        </div>

        <div className={styles.cardContainer}>
          {completedSteps.map((isCompleted, index) =>
            !showUncheckedOnly || !isCompleted ? (
              <div key={index} className={styles.card}>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label>Card {index + 1}</label>
              </div>
            ) : null
          )}
        </div>

        <div className={styles.resetButtonContainer}>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button onClick={toggleShowUncheckedOnly}>
            {showUncheckedOnly ? "Show All Cards" : "Show Unchecked Cards Only"}
          </button>
        </div>
      </div>
    </>
  );
}
