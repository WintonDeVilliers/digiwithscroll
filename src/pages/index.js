import { useEffect, useState } from "react";
import FirstCallHeader from "@/components/FirstCallHeader";
import styles from "../styles/Scripts.module.css";

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);

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

      <div />
      <div>
        <div id="OPEN" className={styles.open_section}>
          <h1 className={styles.headline}>
            <mark className={styles.mark}>INTRODUCTION</mark>
          </h1>
        </div>
        <div className={styles.cards}>
          <div
            className={`${styles.card} ${
              activeCard === 0 ? styles["red-highlight"] : ""
            }`}
          >
            <h4>Mandatory Regulatory Compliance</h4>
            <p>
              Introduction Good day, may I please speak to (Customer Name)?
              <br />
              My name is (Consultants Name) and I am calling you from African
              Bank.
              <br />
            </p>
            <p>
              ***(CustomerName), African Bank would like to invite you to apply
              for our exciting products such as a personal loan, consolidation
              loan or a credit card.
            </p>
            <p>For us to complete the application it might take ±10 minutes</p>
            <p>Which of these products are you interested in applying for?</p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[0]}
                onChange={() => handleCheckboxChange(0)}
              />
              Completed
            </label>
          </div>
          <div
            className={`${styles.card} ${
              activeCard === 1 ? styles["orange-highlight"] : ""
            }`}
          >
            <h4>Internal Compliance</h4>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRDCARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[1]}
                onChange={() => handleCheckboxChange(1)}
              />
              Completed
            </label>
          </div>
          <div
            className={`${styles.card} ${
              activeCard === 2 ? styles["red-highlight"] : ""
            }`}
          >
            <h4>Mandatory Regulatory Compliance</h4>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <p>
              CARDCARDCARDCARDCARDCARDCARDCACARDCARDCARDCARDCARDCARDCARDCARDRD
            </p>
            <label>
              <input
                type="checkbox"
                checked={completedSteps[2]}
                onChange={() => handleCheckboxChange(2)}
              />
              Completed
            </label>
          </div>
        </div>

        <div className={styles.resetButtonContainer}>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
