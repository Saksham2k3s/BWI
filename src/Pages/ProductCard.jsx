import React, { useContext } from "react";
import HooksContext from "../Context/HooksContext";



function ProductCard(props) {
 
  const context = useContext(HooksContext);
  const { mode, cart, setCart } = context;
  const { product,  } = props;
  const handleCart = () => {
   
   //check if item is already in cart
   const isPresent = cart.some((item) => item.id === product.id)
   if(!isPresent){
    const newItem = [...cart, product]
   setCart(newItem)
   console.log('Item added', cart);
   }
   else{
    console.log("Item Already Present");
   }
  
  };

  

  return (
    <>
      <div className="my-5 d-flex justify-content-center">
        <div
          className="card h-100 "
          style={{
            width: "18rem",
            backgroundColor: `${!mode ? "black" : "transparent"}`,
            border: `${mode ? " 2px solid black" : "2px solid #ff5200"}`,
          }}
         
          
        >
          <img
            className="card-img-top"
            src={product.images[0]}
            alt="Card imagecap"
          />
          <div
            className={`card-body text-${mode ? "dark" : "light"}`}
            style={{ backgroundColor: "transparent" }}
          >
            <div className=" d-flex justify-content-between card-title">
              <h6 className="card-title">{product.title}</h6>
              <h6 className="rating"> <i class="fa-solid fa-star staricon"></i> {product.rating}</h6>
            </div>
            <p className={`card-title text-${mode ? "dark" : "light"} text-justify`}>
              {product.description.length > 50
                ? `${product.description.slice(0, 50)}...`
                : product.description}
            </p>

            <div className="d-flex justify-content-between pt-5 ">
              <div className="price">
                <h5>
                  {" "}
                 $ {product.price}
                </h5>
              </div>

              <div className="cart-icon">
                <button className="cart-btn" onClick={handleCart}>
                  {" "}
                  <span className="text-white">
                    <i className="fa-solid fa-cart-shopping text-black"></i>
                  </span>{" "}
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
