import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "components/partials/app/service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const feedbackSlice = createSlice({
  name: "feedback",
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
    // push: (feedbackData) => async (dispatch) => {
    //   try {
    //     // Send a POST request to the server
    //     const response = await fetchData(
    //       "/api/v1/feedback-form/create", // Replace with your API endpoint for creating feedback
    //       feedbackData,"POST"
    //     );

    //     dispatch(pushSuccess(response.data));

    //     toast.success("Add Successfully", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Failed to add feedback", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    // },
    push: (state, action) => {
      state.deps.unshift(action.payload);

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
    // removeDep: (state, action) => {
    //   state.deps = state.deps.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   toast.warning("Remove Successfully", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // },
    update: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.feedback.findIndex((item) => item.id === action.payload.id);
      // update project
      state.feedback.splice(index, 1, {
        feedbackFormId: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        questions: action.payload.questions
      });
    },

    remove: (state, action) => {
      const id = action.payload;

      deleteFeedback(id)
        .then(() => {
          state.feedback = state.feedback.filter((item) => item.id !== id);

          toast.error("Failed to remove feedback", {});
        })
        .catch((error) => {
          console.error(error);
          toast.success("Remove Successfully", {});
        });
    },
  },
});

const deleteFeedback = async (id) => {
  try {
    const response = await fetchData(
      `feedback-form/delete?id=${id}`,
      {},
      "GET"
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete Feedback");
  }
};



export const {
  openModal,
  push,
  toggleAddModal,
  remove,
  toggleEditModal,
  toggleSubmitModal,
  update,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
