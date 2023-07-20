import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initialUsers = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    console.log(JSON.parse(item));
    return item ? JSON.parse(item) : {};
  }
};

// save users in local storage
const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    console.log(item);
    return item ? JSON.parse(item) : false;
  }
  return false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
    role: initialUsers()?.role,
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, username, password } = action.payload;
      const user = state.users.find((user) => user.username === username);
      if (user) {
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          username,
          password,
        });
        if (typeof window !== "undefined") {
          window?.localStorage.setItem("users", JSON.stringify(state.users));
        }
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },

    handleLogin: (state, action) => {
      const {
        userId,
        username,
        firstname,
        lastname,
        email,
        token,
        role,
        isAuth,
        accountId,
      } = action.payload;
      // check is token is valid or not and match with user
      if (typeof window !== "undefined") {
        const item = window?.localStorage.getItem("token");
        if (item && item !== token) {
          toast.error("Invalid token", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window?.localStorage.removeItem("isAuth");
          window?.localStorage.removeItem("users");
          window?.localStorage.removeItem("token");
          return;
        }
      }
      state.users = {
        userId,
        username,
        firstname,
        lastname,
        email,
        token,
        role,
        isAuth,
        accountId,
      };
      state.isAuth = isAuth;
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
        window?.localStorage.setItem(
          "token",
          JSON.stringify(state.users.token)
        );
        window?.localStorage.setItem("users", JSON.stringify(state.users));
      }
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },

    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
        window?.localStorage.removeItem("users");
        window?.localStorage.removeItem("token");
      }
      toast.success("User logged out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
