import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "components/partials/app/service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const feedbackSlice = createSlice({
  name: "appFeedback",
  initialState: {
    openProjectModal: false,
    openSubmitModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    feedback: [],
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    toggleSubmitModal: (state, action) => {
      state.openSubmitModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    push: (state, action) => {
      state.feedback.unshift(action.payload);
      toast.success("Add Successfully", {
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
    update: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.feedback.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.feedback.splice(index, 1, {
        feedbackFormId: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        questions: action.payload.questions,
      });
    },
    setForm: (state, action) => {
      state.feedback = action.payload;
    },

    remove: (state, action) => {
      const id = action.payload;
      state.feedback = state.feedback.filter((item) => item.id !== id);
      toast.success("Remove Successfully", {
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
  },
});

export const {
  openModal,
  push,
  toggleAddModal,
  remove,
  toggleEditModal,
  toggleSubmitModal,
  update,
  setForm,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
