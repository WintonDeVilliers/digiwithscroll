import styles from "../styles/Scripts.module.css";
import Link from "next/link";

export default function FirstCallHeader() {
  return (
    <div className={styles.csnavbar}>
      <div className={styles.dropdown}>
        <div className={styles.dropbtn}>
          <Link href="#OPEN">MENU</Link>
        </div>
        <div className={styles.dropdown_content}>
          <Link href="/">Home Page</Link>
          <Link href="/products">Products</Link>
          <Link href="/checklist">Check-List</Link>
          {/* <Link href="/future_feature">Future Thingz</Link> */}
        </div>
      </div>
      <div className={styles.dropdown}>
        <div className={styles.dropbtn}>
          <Link href="#OPEN">SCRIPTS</Link>
        </div>
        <div className={styles.dropdown_content}>
          <Link href="/real_offer_script">REAL OFFER</Link>
          <Link href="/funeral_script">FUNERAL</Link>
        </div>
      </div>
      <Link href="#OPEN">INTRO</Link>
      <Link href="#APPSTART">START</Link>
      <Link href="#APPOUTCOME">OUTCOME</Link>
      <Link href="#CLOSEOUT">CLOSE-OUT</Link>
      {/* <Link href="#CROSS-SELL">CROSS_SELL</Link> */}
      <img className={styles.csnav_img} src="africanbank.svg" alt="Pichere" />
    </div>
  );
}
