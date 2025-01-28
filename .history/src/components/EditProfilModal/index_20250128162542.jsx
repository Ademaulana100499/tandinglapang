import React, { useEffect } from "react";
import useEditProfil from "@/hooks/useEditProfil";
import Swal from "sweetalert2";

const EditProfileModal = ({ isOpen, setIsOpen, data }) => {
  const { handleFormEditProfil, setFormData, formData, isLoading } =
    useEditProfil(setIsOpen);

  // Initialize form with data if available
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        password: "",
        c_password: "",
      });
    }
  }, [data, setFormData]);

  // Modal rendering
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <form onSubmit={handleFormEditProfil}>
          <h2>Edit Profil</h2>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Phone Number Input */}
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.c_password}
            onChange={(e) =>
              setFormData({ ...formData, c_password: e.target.value })
            }
          />

          {/* Submit Button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
