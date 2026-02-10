import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";

const Profile = () => {
    const { user, setUser } = UserData();

    const [name, setName] = useState(user?.name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.avatar?.url);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("file", image);

        try {
            const { data } = await axios.put(
                `${server}/api/user/update-profile`,
                formData,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );

            setUser(data.user);
            toast.success(data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

useEffect(() => {
  if (user) {
    setName(user.name || "");
  }
}, [user]);

    return (
        <div className="max-w-xl mx-auto  bg-white shadow rounded-lg p-6">
            <div className="justify-center justify-items-center">
                <h2 className="text-2xl md:text-5xl font-bold text-blue-800 mb-6">My Profile</h2>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
                {/* Avatar */}
                <div className="items-center gap-4 justify-center justify-items-center">
                    <img
                        src={
                            image
                                ? preview
                                : user?.avatar?.url
                                    ? `${server}${user.avatar.url}`
                                    : "/default-user.png"
                        }
                        className="rounded-full h-60"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={imageHandler}
                        className="border p-2 mt-2 rounded border-blue-800 bg-blue-50"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <label className="block font-medium my-1">E-mail</label>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-3 py-2 rounded border bg-gray-200"
                    />
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;