import styles from './HostCounter.module.css';

const HostCounter = () => {
  return (
    <div className={styles.hostCounter}>
      <div className={styles.hostCounterContainer}>
        <div className={styles.hostCounterEle}>
          <h3 className={styles.hostCounterEleNumber}>25,000+</h3>
          <p className={styles.hostCounterEleText}>Verified Cars</p>
        </div>
        <div className={styles.hostCounterEle}>
          <h3 className={styles.hostCounterEleNumber}>20,000+</h3>
          <p className={styles.hostCounterEleText}>Trusted Hosts</p>
        </div>
        <div className={styles.hostCounterEle}>
          <h3 className={styles.hostCounterEleNumber}>2 Billion+</h3>
          <p className={styles.hostCounterEleText}>KMs Driven</p>
        </div>
        <div className={styles.hostCounterEle}>
          <h3 className={styles.hostCounterEleNumber}>38+ Cities</h3>
          <p className={styles.hostCounterEleText}>And Counting...</p>
        </div>
        <div className={styles.hostCounterEle}>
          <h3 className={styles.hostCounterEleNumber}>20+ Airports</h3>
          <p className={styles.hostCounterEleText}>Live On Zoomcar platform</p>
        </div>
      </div>
    </div>
  );
};

export default HostCounter;
