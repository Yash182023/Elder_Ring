// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext, CartItemProps } from "../context/CartContext"; // Context
// import Background from "../components/Background/Background";
// import CartItem from "../components/CartItem/CartItem";
// import styles from "./Cart.module.scss"; // Styles

// const Cart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     return;
//   }

//   const { cart, clearCart, totalCart, totalPrice } = context;

//   return (
//     <div className="container">
//       <div className={styles.cart}>
//         {totalCart > 0 ? (
//           <>
//             {cart.map((item: CartItemProps) => {
//               return <CartItem key={item.id} item={item} />;
//             })}
//             <h1 className={styles.total}>Total: ${totalPrice.toFixed(2)}</h1>
//             <div className={styles.button_group}>
//               <Link to="/">Continue Shopping</Link>
//               <div>
//                 <button className={styles.clear} onClick={clearCart}>
//                   Clear
//                 </button>
//                 <button
//                   className={styles.check_out}
//                   onClick={() => alert("Can't check out now")}
//                 >
//                   Check Out
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className={styles.no_item}>
//             <h1>Your cart is empty.</h1>
//             <Link to="/">Go Shopping</Link>
//           </div>
//         )}
//       </div>
//       <Background />
//     </div>
//   );
// };

// export default Cart;
//Claude's code

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext, CartItemProps } from "../context/CartContext";
import Background from "../components/Background/Background";
import CartItem from "../components/CartItem/CartItem";
import Checkout from "../components/Checkout/Checkout";
import styles from "./Cart.module.scss";

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const context = useContext(CartContext);

  if (!context) {
    return null;
  }

  const { cart, clearCart, totalCart, totalPrice } = context;

  if (showCheckout) {
    return (
      <Checkout 
        price={totalPrice} 
        productTitle={`Cart (${totalCart} items)`}
      />
    );
  }

  return (
    <div className="container">
      <div className={styles.cart}>
        {totalCart > 0 ? (
          <>
            {cart.map((item: CartItemProps) => {
              return <CartItem key={item.id} item={item} />;
            })}
            <h1 className={styles.total}>Total: ${totalPrice.toFixed(2)}</h1>
            <div className={styles.button_group}>
              <Link to="/">Continue Shopping</Link>
              <div>
                <button className={styles.clear} onClick={clearCart}>
                  Clear
                </button>
                <button
                  className={styles.check_out}
                  onClick={() => setShowCheckout(true)}
                >
                  Check Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.no_item}>
            <h1>Your cart is empty.</h1>
            <Link to="/">Go Shopping</Link>
          </div>
        )}
      </div>
      <Background />
    </div>
  );
};

export default Cart;