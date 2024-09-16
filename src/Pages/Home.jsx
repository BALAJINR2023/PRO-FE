// Home.js
import styles from "./Home.module.css"
import CombinedLocationInput from "./location";

// import LocationSearch from "./carbokkings/Location";
const Home = () => {
  return (
    <div className={styles.backgroundImage}>
        <div className={styles.content}>
            <h1>WELCOME TO ZOOMCAR</h1>
            <p>Your Premier Self-Drive Car Rental Service</p>
            <div>
            <CombinedLocationInput/>
            </div>
        </div>
        
    </div>
);
}
export default Home;
