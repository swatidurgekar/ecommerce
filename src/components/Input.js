import { React, useRef, useState } from "react";

const Input = () => {
  const [electronics, setElectronics] = useState([]);
  const [food, setFood] = useState([]);
  const [skincare, setSkincare] = useState([]);

  const id = useRef("");
  const price = useRef("");
  const name = useRef("");
  const category = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const productId = id.current.value;
    const productPrice = price.current.value;
    const productName = name.current.value;
    const productCategory = category.current.value;
    const obj = { productId, productPrice, productName, productCategory };
    localStorage.setItem(productId, JSON.stringify(obj));
    if (productCategory === "Electronics") {
      setElectronics((prevState) => {
        return [...prevState, obj];
      });
    }
    if (productCategory === "Food") {
      setFood((prevState) => {
        return [...prevState, obj];
      });
    }
    if (productCategory === "Skincare") {
      setSkincare((prevState) => {
        return [...prevState, obj];
      });
    }
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
        <label htmlFor="category">Choose a Category: </label>
        <select ref={category}>
          <option id="electronics">Electronics</option>
          <option id="food">Food</option>
          <option id="skincare">Skincare</option>
        </select>
        <br />
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h1>Products</h1>
        <h2>Electronic Items</h2>
        {electronics.length !== 0 &&
          electronics.map((item) => {
            return (
              <div>
                <ul>
                  <li key={item.productId}>
                    {item.productId} {item.productPrice} {item.productName}{" "}
                    {item.productCategory}
                    <button id={item.productId} onClick={deleteHandler}>
                      DELETE
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
        <h2>Food Items</h2>
        {food.length !== 0 &&
          food.map((item) => {
            return (
              <ul>
                <li key={item.productId}>
                  {item.productId} {item.productPrice} {item.productName}{" "}
                  {item.productCategory}
                  <button id="delete" onClick={deleteHandler(item.productId)}>
                    DELETE
                  </button>
                </li>
              </ul>
            );
          })}
        <h2>Skincare Items</h2>
        {skincare.length !== 0 &&
          skincare.map((item) => {
            return (
              <ul>
                <li key={item.productId}>
                  {item.productId} {item.productPrice} {item.productName}{" "}
                  {item.productCategory}
                  <button id="delete" onClick={deleteHandler}>
                    DELETE
                  </button>
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default Input;
