import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const appDepSlice = createSlice({
  name: "appDep",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    deps: [],
    storeDepartment: [],
  },
  reducers: {
    toggleAddModalDep: (state, action) => {
      state.openProjectModal = action.payload;
    },
    toggleEditModalDep: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
    },
    pushDep: (state, action) => {
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
    removeDep: (state, action) => {
      state.deps = state.deps.filter((item) => item.id !== action.payload);
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
    setDep: (state, action) => {
      state.storeDepartment = action.payload;
    },
    updateDep: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.deps.findIndex((item) => item.id === action.payload.id);
      // update project
      state.deps.splice(index, 1, {
        ...state.deps[index],
      });
    },
  },
});

export const {
  openModal,
  pushDep,
  toggleAddModalDep,
  removeDep,
  toggleEditModalDep,
  updateDep,
  setDep,
} = appDepSlice.actions;
export default appDepSlice.reducer;
