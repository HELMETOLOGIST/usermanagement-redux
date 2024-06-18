import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      

      <div className="w-full max-w-xl p-5 rounded-xl blur-effect">
      <div className="rounded-full overflow-hidden opacity-65 cursor-pointer border border-gray-200  h-8 w-8 flex items-center justify-center">
        <IoHomeOutline className="h-6 w-6 text-white" />
      </div>
        <h2 className="text-center font-extrabold text-white text-xl">
          Profile
        </h2>
        <form action="">
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="w-full h-40 cursor-pointer flex justify-center items-center"
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="object-cover w-32 rounded-full h-32"
                />
              ) : (
                <span className="text-gray-300">Select an image</span>
              )}
            </label>
            <div className="flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="w-34 h-10 glass-button bg-transparent cursor-pointer flex justify-center items-center  rounded-full "
              >
                <span className="text-white opacity-65">Choose File</span>
              </label>
            </div>
          </div>
          <hr className="opacity-70" />
          <div className="mt-2">
            <div className="flex justify-center items-center">
              <h2 className="text-center font-normal capitalize text-white text-xl opacity-80">
                NIJITH
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <h2 className="text-center font-light text-white text-lg opacity-80">
                nijithcv@gmail.com
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="glass-button font-semibold opacity-80 mt-3 bg-transparent rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-8 py-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
