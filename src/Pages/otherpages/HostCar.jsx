import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './HostCar.module.css'; // Import CSS module for custom styling

const HostCarSharingBenefits = () => {
  return (
    <div className="container">
    <div className="row align-items-center">
      <div className="col-md-2">
        <h2 className={`${styles.hostCarSharingBenefitsTitle} ${styles.leftTitle}`}>
          Why choose Zoomcar Self Drive Cars?
        </h2>
      </div>
      <div className="col-md-6">
        <div className={styles.hostCarSharingBenefitsFlex}>
          <div className={`${styles.hostCarSharingBenefitsBlock} ${styles.flexItem}`}>
            <img src="https://doav52ie4cv60.cloudfront.net/images/repair.svg" alt="Accessible" />
            <div className={styles.cardBody}>
              <h5 className={`${styles.hostCarSharingBenefitsBlockTitle}`}>Accessible</h5>
              <p className={`${styles.hostCarSharingBenefitsBlockDescription}`}>
                There’s always a Zoomcar near you
              </p>
            </div>
          </div>
          <div className={`${styles.hostCarSharingBenefitsBlock} ${styles.flexItem}`}>
            <img src="https://doav52ie4cv60.cloudfront.net/images/earning.svg" alt="Secure" />
            <div className={styles.cardBody}>
              <h5 className={`${styles.hostCarSharingBenefitsBlockTitle}`}>Secure</h5>
              <p className={`${styles.hostCarSharingBenefitsBlockDescription}`}>
                Pay 0 security deposit, get unlimited KMs
              </p>
            </div>
          </div>
          <div className={`${styles.hostCarSharingBenefitsBlock} ${styles.flexItem}`}>
            <img src="https://doav52ie4cv60.cloudfront.net/images/flexibility.svg" alt="Convenient" />
            <div className={styles.cardBody}>
              <h5 className={`${styles.hostCarSharingBenefitsBlockTitle}`}>Convenient</h5>
              <p className={`${styles.hostCarSharingBenefitsBlockDescription}`}>
                From Hatchbacks to SUVs, choose from 25,000+ cars
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HostCarSharingBenefits;
