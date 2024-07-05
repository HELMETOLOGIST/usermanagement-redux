import React, { useEffect, useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pictureUpdate, fetchUserData } from '../../../features/user';

const Profile = () => {
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user?.user);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      dispatch(fetchUserData());
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (user?.profile_image) {
      setImage(user.profile_image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUpload = () => {
    if (image && user?.id) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('username', user.username);
      formData.append('email', user.email);

      dispatch(pictureUpdate({ id: user.id, formData }))
        .unwrap()
        .then(() => {
          toast.success('Profile picture updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error);
          toast.error('Failed to update profile picture. Please try again.');
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl p-5 rounded-xl blur-effect">
        <div className="rounded-full overflow-hidden opacity-65 cursor-pointer border border-gray-200 h-8 w-8 flex items-center justify-center">
          <IoHomeOutline className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-center font-extrabold text-white text-xl">Profile</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="w-full h-40 cursor-pointer flex justify-center items-center"
            >
              {image ? (
                <img
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
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
            </div>
          </div>
          <hr className="opacity-70" />
          <div className="mt-2">
            <div className="flex justify-center items-center">
              <h2 className="text-center font-normal capitalize text-white text-xl opacity-80">
                {user?.username?.toUpperCase()}
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <h2 className="text-center font-light text-white text-lg opacity-80">
                {user?.email}
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleImageUpload}
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
