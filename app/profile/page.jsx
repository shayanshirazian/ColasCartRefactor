"use client";
import React, { useState, useEffect } from "react";
import "../../app/api/dogs/route";
import TabsSwitch from "./cartDetails/TabSwitch";
import UpcomingOrders from "./upcoming/upcomingOrders"
import UpcomingOrdersModal from "./upcoming/upcomingOrdersModal";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  if (!orders) {
    return <div>Loading...</div>;
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpcomingOrdersModalOpen, setUpcomingOrdersModalOpen] =
    useState(false);
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
      setModalOpen(true);
    } else {
      console.error("Invalid order passed to handleOpenModal");
    }
  };

  const handleCloseUpcomingModal = () => {
    setUpcomingOrdersModalOpen(false);
  };

  if (loading) return <p className="text-center mt-4">Loading Orders...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  const shippedOrders = orders.filter((order) => order.status === "Shipped");

  return (
    <div className="MainContainer flex items-center bg-green justify-center mt-10 min-h-screen w-full bg-green-50">
      <div className="InnerContainer flex flex-col  p-5 bg-gray-100 border border-gray-300 rounded-3xl w-full max-w-3xl">
        <div className="flex mb-4 items-center ">
          <button className="backBtn text-green-700 m-5">
            <img width="20px" src="/left-arrow.svg" alt="back btn" />
          </button>
          <TabsSwitch />
        </div>

        <div className="Upcoming Orders text-gray-600 mt-3 ml-1">
          <UpcomingOrders
            orders={shippedOrders}
            setModalOpen={setUpcomingOrdersModalOpen}
          />
        </div>
      </div>
      <UpcomingOrdersModal
        orders={shippedOrders}
        isOpen={isUpcomingOrdersModalOpen}
        onOpenModal={handleOpenModal}
        onClose={handleCloseUpcomingModal}
      />

     
    </div>
  );
};

export default Profile;
