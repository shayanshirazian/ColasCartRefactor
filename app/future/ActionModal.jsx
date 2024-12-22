import React from "react";

const ActionModal = ({ isEditing, onSave, onCancel, onEdit }) => (
  <div className="flex justify-end mt-2">
    {isEditing ? (
      <>
        <button
          aria-label="Save"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
          onClick={onSave}
        >
          {`Save`}
        </button>
        <button
          aria-label="Cancel"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={onCancel}
        >
          {`Cancel`}
        </button>
      </>
    ) : (
      <button
        aria-label="Edit Btn"
        className="text-blue-500 hover:underline hover:text-green-700 text-sm m-4 -mt-3 mr-8"
        onClick={onEdit}
      >
        {`Edit`}
      </button>
    )}
  </div>
);

export default ActionModal;
