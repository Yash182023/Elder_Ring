// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { useScrollPosition } from "../../hook/useScrollPosition"; // Custom Hook
// import { CartContext } from "../../context/CartContext"; // Context
// import { FaShoppingCart } from "react-icons/fa"; // Icons
// import styles from "./Navbar.module.scss"; //Styles


// const Navbar = () => {
//   const scrollPosition = useScrollPosition();
//   const context = useContext(CartContext);
//   if (!context) {
//     return;
//   }
//   const { totalCart } = context;

//   return (
//     <>
//       <nav
//         className={`${styles.navbar} container ${
//           scrollPosition > 40 ? `${styles.scroll}` : ""
//         }`}
//       >
//         <div className={styles.logo}>
//           <Link to="/">
//             <img src="/favicon.svg" />
//             <h1>S4U</h1>
//           </Link>
//         </div>
//         <ul className={styles.link_group}>
//           <li>
//             <Link to="/cart" title="Cart">
//               <FaShoppingCart />
//               <span className={totalCart === 0 ? `${styles.zero}` : ""}>
//                 {totalCart}
//               </span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../../hook/useScrollPosition";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.scss";


const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { totalCart } = context;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${styles.navbar} container ${
        scrollPosition > 40 ? `${styles.scroll}` : ""
      }`}
    >
      <div className={styles.logo}>
        <Link to="/">
          <img src="/favicon_2.svg" alt="S4U Logo" />
          <h1>ELDER RING</h1>
        </Link>
      </div>

      <button 
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`${styles.nav_content} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.main_links}>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/pharma">Pharma</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

        <ul className={styles.link_group}>
          <li>
            <Link to="/cart" title="Shopping Cart">
              <FaShoppingCart />
              <span className={totalCart === 0 ? `${styles.zero}` : ""}>
                {totalCart}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
