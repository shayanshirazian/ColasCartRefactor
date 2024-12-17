import React from "react";
import Divider from "./Divider";

const orderDetailsCart = ({ order, onOpenModal, hasEdit }) => {
  const handleOpenModal = (order) => {
    onOpenModal(order);
  };
  return (
    <div aria-label="dog Box" className="m-3">
      <div className="flex justify-between m-2">
        <span
          aria-label="dogName"
          className="text-green-900 mt-2 ml-2 font-bold"
        >
          {order.dogName}
        </span>
        <span
          aria-label="status"
          className="bg-blue-100 text-blue-500 text-xs rounded-full px-3 py-2"
        >
          {order.status}
        </span>
      </div>
      <Divider />
      <div aria-label="Portions" className="flex justify-between m-2">
        <span className="text-gray-500 ml-3">Portions</span>
        <span className="text-green-700 mr-3">{order.portions}</span>
      </div>
      <Divider />
      <div
        aria-label="Recipes"
        className="flex justify-between items-center m-2"
      >
        <span className="text-gray-500 ml-3">Recipes:</span>
        <span className="text-green-700 mr-3">{order.recipes}</span>
      </div>
      <Divider />
      <div aria-label="Date" className="flex justify-between m-2">
        <span className="text-gray-500 w-[150px] ml-3">Delivery Date:</span>
        <div className="flex items-center">
          <span className="text-green-700 font-bold w-[120px] text-center flex flex-row justify-end mr-3">
            {order.deliveryDate}
          </span>
          {hasEdit ? (
            <span aria-label="edtirPenBtn">
              <img
                src="/Edit.svg"
                alt="editBtn"
                className="h-5 cursor-pointer"
                onClick={(isEdit) => (isEdit ? handleOpenModal(order) : null)}
              />
            </span>
          ) : null}
        </div>
      </div>
      <Divider />
    </div>
  );
};
export default orderDetailsCart;
