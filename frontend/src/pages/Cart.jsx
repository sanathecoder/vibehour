import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, loading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const totalPrice = cartItems?.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl mb-6">
        Your Cart
      </h1>

      {cartItems?.map((item) => (
        <div
          key={item._id}
          className="flex justify-between border p-4 mb-3"
        >

          <p>{item.product.title}</p>

          <p>Qty: {item.quantity}</p>

          <p>
            ${item.product.price * item.quantity}
          </p>

        </div>
      ))}

      {/* TOTAL */}
      <div className="text-2xl mt-6 font-bold">
        Total: ${totalPrice}
      </div>

    </div>
  );
};

export default Cart;