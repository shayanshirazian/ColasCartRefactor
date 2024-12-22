import React from "react";
import OrderDetailsCart from "../profile/cartDetails/OrderDetailsCart";

const FutureOrders = ({ orders, onOpenModal }) => {
  if (!orders || !Array.isArray(orders)) {
    return <p>No Orders Available</p>;
  }
  return (
    <>
      <div
        aria-label="Future Orders"
        className="text-gray-600 mt-3 ml-1">
          {`Future Orders`}</div>
      {orders.map((order, index) => (
        <div key={index}>
          <OrderDetailsCart
            order={order}
            onOpenModal={onOpenModal}
            hasEdit={true}
          />
        </div>
      ))}
    </>
  );
};

export default FutureOrders;
