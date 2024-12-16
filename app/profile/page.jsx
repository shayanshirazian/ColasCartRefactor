import React from "react";
import TabSwitch from "./cartDetails/TabSwitch";

const Profile = () => {
  return (
    <div className="MainContainer flex items-center bg-green justify-center mt-10 min-h-screen w-full bg-green-50">
      <div className="InnerContainer flex flex-col  p-5 bg-gray-100 border border-gray-300 rounded-3xl w-full max-w-3xl">
        <div className="flex mb-4 items-center ">
          <button className="backBtn text-green-700 m-5">
            <img width="20px" src="/left-arrow.svg" alt="back btn" />
          </button>
          <TabSwitch />
        </div>
      </div>
    </div>
  );
};

export default Profile;
