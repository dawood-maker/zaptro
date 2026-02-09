import React, { useState } from "react";

function DeliveryForm({ deliveryInfo, setDeliveryInfo, handleSubmit, handleDetectLocation, loading }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`); // ✅ Log every input change
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetectLocationClick = () => {
    console.log("Detect Location button clicked"); // ✅ Log when detect location is clicked
    handleDetectLocation();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // ✅ Log form submission
    console.log("Current delivery info:", deliveryInfo); // ✅ Log delivery info on submit
    handleSubmit(e);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Delivery Info</h2>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={deliveryInfo.fullName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={deliveryInfo.address}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="city"
            value={deliveryInfo.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="postCode"
            placeholder="PostCode"
            value={deliveryInfo.postCode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={deliveryInfo.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="tel"
            name="phoneNo"
            placeholder="Phone No"
            value={deliveryInfo.phoneNo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition"
        >
          Place Order
        </button>

        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500 font-semibold">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <button
          type="button"
          onClick={handleDetectLocationClick}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition disabled:bg-gray-400"
        >
          {loading ? "Detecting..." : "Detect Location"}
        </button>
      </form>
    </div>
  );
}

export default DeliveryForm;
