"use client";
import React, { useState, useEffect } from "react";
import "../../app/api/dogs/route";
import TabsSwitch from "./cartDetails/TabSwitch";
import UpcomingOrders from "./upcoming/upcomingOrders";
import UpcomingOrdersModal from "./upcoming/upcomingOrdersModal";
import FutureOrders from "./future/futureOrders";
import FutureOrdersModal from "./future/FutureOrdersModal";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  if (!orders) {
    return <div>Loading...</div>;
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUOMOpen, setUOMOpen] = useState(false); // UOM : Upcoming Orders Modal
  const [isFOMOpen, setFOMOpen] = useState(false); //FOM : Future Orders Modal
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/dogs");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOpenModal = (order) => {
    if (order) {
      setSelectedOrder(order);
      setFOMOpen(true);
    } else {
      console.error("Invalid order passed to handleOpenModal");
    }
  };

  const handleCloseUpcomingModal = () => {
    setUOMOpen(false);
  };

  const handleCloseFutureModal = () => {
    setFOMOpen(false);
  };

  const handleCancelModal = () => {
    setFOMOpen(false);
  };

  const handleSaveDate = async (dogName, newDate) => {
    try {
      const response = await fetch("/api/dogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dogName, deliveryDate: newDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to update delivery date.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.dogName === dogName
            ? { ...order, deliveryDate: newDate }
            : order
        )
      );
      setFOMOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading Orders...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  const shippedOrders = orders.filter((order) => order.status === "Shipped");
  const PendingOrders = orders.filter((order) => order.status === "Pending");

  return (
    <div
      aria-label="MainContainer"
      className=" flex items-center bg-green justify-center mt-10 min-h-screen w-full bg-green-50"
    >
      <div
        aria-label="InnerContainer"
        className=" flex flex-col  p-5 bg-gray-100 border border-gray-300 rounded-3xl w-full max-w-3xl"
      >
        <div className="flex mb-4 items-center ">
          <button aria-label="backBtn" className=" text-green-700 m-5">
            <img width="20px" src="/left-arrow.svg" alt="back btn" />
          </button>
          <TabsSwitch />
        </div>

        <div aria-label="UpcomingOrders" className=" text-gray-600 mt-3 ml-1">
          <UpcomingOrders orders={shippedOrders} setModalOpen={setUOMOpen} />
        </div>
        <div aria-label="FutureOrders">
          <FutureOrders orders={PendingOrders} onOpenModal={handleOpenModal} />
        </div>
      </div>
      <UpcomingOrdersModal
        orders={shippedOrders}
        isOpen={isUOMOpen}
        onOpenModal={handleOpenModal}
        onClose={handleCloseUpcomingModal}
      />
      <FutureOrdersModal
        isOpen={isFOMOpen}
        onOpenModal={handleOpenModal}
        onCancel={handleCancelModal}
        onSave={handleSaveDate}
        orderDetails={selectedOrder}
      />
    </div>
  );
};

export default Profile;
