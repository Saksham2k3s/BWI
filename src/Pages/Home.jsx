import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${search}`
        );
        const items = res.data.products;
        if (!items) {
          throw new Error("Internal error");
        }
       
        setData(items);
      } catch (error) {
        console.log("Error in fetching the data", error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <>
      <div className="home">
        <div className="container search text-center">
          <form action="">
            <input
            className="search-input"
              type="text"
              placeholder="Search By Item"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
          </form>
         
        </div>
        <div className="row">
          {data.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
