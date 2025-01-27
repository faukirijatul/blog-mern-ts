import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { login } from "../store/slices/userSlice";

const fetchGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  }
};

export const CustomGoogleLoginButton = () => {
  const dispatch : AppDispatch = useDispatch();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;

      try {
        const userInfo = await fetchGoogleUserInfo(accessToken);

        const data = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        };

        dispatch(login(data));
      } catch (error) {
        console.error(error);
        toast.error((error as Error).message);
      }
    },
    onError: (error) => {
        toast.error((error as Error).message);
    },
  });

  const handleClick = () => {
    handleGoogleLogin();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Login
    </button>
  );
};
