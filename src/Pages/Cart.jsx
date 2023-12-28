import React, { useContext, useMemo } from "react";
import HooksContext from "../Context/HooksContext";


function MyCart() {
  const { cart, mode,setCart } = useContext(HooksContext);

  // Map to store the quantity of each item based on its id
  const [quantityMap, setQuantityMap] = React.useState(new Map());

  React.useEffect(() => {
    // Initialize quantityMap when the cart changes
    const newQuantityMap = new Map();
    cart.forEach((item) => newQuantityMap.set(item.id, 1));
    setQuantityMap(newQuantityMap);
  }, [cart]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setQuantityMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(id, (prevMap.get(id) || 1) + 1);
      return newMap;
    });
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setQuantityMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (newMap.get(id) > 1) {
        newMap.set(id, newMap.get(id) - 1);
      }
      return newMap;
    });
  };

   // Remove item from cart
   const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setQuantityMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(id);
      return newMap;
    });
  };

  // Memoize the total price calculation
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * quantityMap.get(item.id), 0);
  }, [cart, quantityMap]);

  return (
    <div className={`my-cart-container text-${mode ? 'black': 'white'}`}>
      <h1 className="text-center">My Cart <img src="https://cdn-icons-png.flaticon.com/128/3081/3081648.png" className="" alt="basketimg" /></h1>
      {cart.length === 0 ? (
        <h1 className="text-center mt-5">Your cart is empty.  <img src="https://cdn-icons-png.flaticon.com/128/5089/5089733.png" alt="" /></h1>
      ) : (
        <>
          <div className="container cart-options">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item my-4">
                <div className="d-flex justify-content-between">
                
                 <div>
                 <img src={item.images[0]} alt={item.title} className="cart-img" />
                 </div>
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    </div>
                    <div className="quantity">
                      <span className="increase" onClick={() => increaseQuantity(item.id)}> + </span>
                      <span className="quantity-number">{quantityMap.get(item.id)}</span>
                      <span className="decrease" onClick={() => decreaseQuantity(item.id)}> - </span>
                   
                  
                </div>
                <div className="item-price">
                  <span>Price: ${item.price}</span>
                  
                  </div>
                  <div className="total-price" >
                  <span>Total: ${item.price * quantityMap.get(item.id)}</span>
                  </div>
                  <div>
                    <button onClick={() => removeItem(item.id)} className="btn removebtn"><i className="fa-regular fa-trash-can"></i>  Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </div>
         
        </>
      )}
      <div className="container text-end p-3">
      <h4>Totalprice: $ {totalPrice}</h4>
      <button className="cart-btn ">Continue</button>
      </div>

    </div>
   
  );
}

export default MyCart;
