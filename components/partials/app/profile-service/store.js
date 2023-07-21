import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "components/partials/app/service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initProfile = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    return item
      ? {
          ...JSON.parse(item),
          image: "/assets/images/avatar/av-1.svg",
          skill: "Ui/Ux Designer",
        }
      : {};
  }
};

export const appProfileSlice = createSlice({
  name: "appProfile",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {
      id: "",
      role: "",
      firstname: "",
      lastname: "",
      email: "",
    },
    editModal: false,
    profiles: initProfile(),
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    reloadData: (state, action) => {
      state.profiles = initProfile();
    },
    setUserProfile: (state, action) => {
      state.profiles = action.payload;
    },

    removeUserProfile: (state, action) => {
      state.profiles = state.profiles.filter(
        (item) => item.id !== action.payload
      );
      toast.warning("Remove Successfully", {
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
    updateUserProfile: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // update profile
      state.profiles = {
        ...state.profiles,
        ...action.payload,
      };
    },
  },
});

export const {
  openModal,
  toggleAddModal,
  removeUserProfile,
  toggleEditModal,
  updateUserProfile,
  reloadData,
  setUserProfile,
} = appProfileSlice.actions;
export default appProfileSlice.reducer;
