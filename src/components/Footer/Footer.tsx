// import styles from "./Footer.module.scss"; // Styles

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//       <div className="container">
//         <h1>
//           New Style | Simple E-Commerce Website |{" "}
//           <a href="https://github.com/parunchxi/React-Simple-Ecommerce-Website">
//             Github
//           </a>
//         </h1>
//       </div>
//       <div className={styles.bg}></div>
//     </footer>
//   );
// };

// export default Footer;


import styles from "./Footer.module.scss";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h2>New Style</h2>
          <p>An elegant e-commerce experience crafted to redefine online shopping with simplicity and style.</p>
        </div>

        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Visit Our Store</h3>
          <address>
            123 Vintage Avenue<br />
            Styletown, ST 12345<br />
            Mon-Fri: 9am - 6pm<br />
            Sat-Sun: 10am - 4pm
          </address>
        </div>
      </div>

      <div className={styles.social}>
        <h3>Connect With Us</h3>
        <div className={styles.socialIcons}>
          <a href="https://github.com/Yash182023/Elder_Ring" aria-label="Website"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/yash-sharma-3xz/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="yashsharmaat2004@gmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>Elder Ring Limited &copy; All rights reserved | <a href="https://github.com/Yash182023/Elder_Ring">Github</a></p>
      </div>
      
      <div className={styles.bg}></div>
    </footer>
  );
};

export default Footer;