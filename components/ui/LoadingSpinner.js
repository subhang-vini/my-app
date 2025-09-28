import styles from "./LoadingSpinner.module.css";

/**
 * LoadingSpinner component for displaying a loading state
 */
export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.spinnerInner}></div>
      </div>
      <p className={styles.text}>Loading product...</p>
    </div>
  );
}
