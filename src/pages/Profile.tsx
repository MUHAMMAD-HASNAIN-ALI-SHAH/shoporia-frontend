import React, { useEffect, useState } from "react";
import Footer from "@/components/Home/Footer/Footer";
import Navbar from "@/components/Home/Navbar/Navbar";
import { useProfileStore } from "@/store/useProfileStore";
import useAuthStore from "@/store/useAuthStore";

const Profile = () => {
  const { address, fetchMyAddress, saveAddress, loading, error } =
    useProfileStore();

  const { user } = useAuthStore();

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  const [initialForm, setInitialForm] = useState(form);

  useEffect(() => {
    fetchMyAddress();
  }, [fetchMyAddress]);

  useEffect(() => {
    if (address) {
      const newForm = {
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        country: address.country || "",
        phoneNumber: address.phoneNumber || "",
      };
      setForm(newForm);
      setInitialForm(newForm);
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAddress(form);
    setInitialForm(form);
  };

  const isChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

  return (
    <div className="w-full mt-36 bg-gray-50">
      <Navbar />
      <div className="mt-28 px-4">
        {/* Profile header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and address details.
          </p>
        </div>

        {/* User info card */}
        <div className="max-w-xl mx-auto p-6 mb-8 bg-white rounded-2xl shadow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="font-semibold text-gray-800">Username</h2>
            <p className="text-gray-600 mt-1 sm:mt-0">
              {user ? user.username : "No username available"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600 mt-1 sm:mt-0">
              {user ? user.email : "No email available"}
            </p>
          </div>
        </div>

        {/* Address form */}
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            My Address
          </h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "addressLine1", placeholder: "Address Line 1", required: true },
              { name: "addressLine2", placeholder: "Address Line 2" },
              { name: "city", placeholder: "City", required: true },
              { name: "state", placeholder: "State", required: true },
              { name: "postalCode", placeholder: "Postal Code", required: true },
              { name: "country", placeholder: "Country", required: true },
              { name: "phoneNumber", placeholder: "Phone Number", required: true },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}

            <button
              type="submit"
              disabled={loading || !isChanged}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
