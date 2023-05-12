import { React, useRef, useState } from "react";

const Newpage = () => {
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0);

  const id = useRef("");
  const price = useRef("");
  const name = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const productId = id.current.value;
    const productPrice = price.current.value;
    const productName = name.current.value;
    const obj = { productId, productPrice, productName };
    localStorage.setItem(productId, JSON.stringify(obj));

    setProducts((prevState) => {
      return [...prevState, obj];
    });

    setSum((prevSum) => {
      return +prevSum + +productPrice;
    });
  };

  const deleteHandler = (e) => {
    localStorage.removeItem(id.current.value);
    e.target.parentElement.remove();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="id">Product ID: </label>
        <input type="number" ref={id} />
        <br />
        <label htmlFor="price">Selling Price: </label>
        <input type="number" ref={price} />
        <br />
        <label htmlFor="name">Product Name: </label>
        <input type="text" ref={name} />
        <br />
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h1>Products</h1>
        {products.length !== 0 &&
          products.map((item) => {
            return (
              <div>
                <ul>
                  <li key={item.productId}>
                    {item.productId} {item.productPrice} {item.productName}{" "}
                    <button id={item.productId} onClick={deleteHandler}>
                      DELETE
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
      <h3>total worth of products:{sum}</h3>
    </div>
  );
};

export default Newpage;
