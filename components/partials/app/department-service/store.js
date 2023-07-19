// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// import { toast } from "react-toastify";

// export const appDepSlice = createSlice({
//   name: "appDep",
//   initialState: {
//     openProjectModal: false,
//     isLoading: null,
//     editItem: {},
//     editModal: false,
//     deps: [
//       {
//         id: uuidv4(),
//         name: "Software Engineer ",
//         createdAt: "2022-10-03",
//       },
//       {
//         id: uuidv4(),
//         createdAt: "2022-10-03",
//         name: "Architecture ",
//       },
//     ],
//   },
//   reducers: {
//     toggleAddModal: (state, action) => {
//       state.openProjectModal = action.payload;
//     },
//     toggleEditModal: (state, action) => {
//       state.editModal = action.payload;
//     },
//     pushDep: (state, action) => {
//       state.deps.unshift(action.payload);

//       toast.success("Add Successfully", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     },
//     removeDep: (state, action) => {
//       state.deps = state.deps.filter(
//         (item) => item.id !== action.payload
//       );
//       toast.warning("Remove Successfully", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     },
//     updateDep: (state, action) => {
//       // update project and  store it into editItem when click edit button

//       state.editItem = action.payload;
//       // toggle edit modal
//       state.editModal = !state.editModal;
//       // find index
//       let index = state.deps.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       // update project
//       state.deps.splice(index, 1, {
//         id: action.payload.id,
//         name: action.payload.name,
//         des: action.payload.des,
//         startDate: action.payload.startDate,
//         updateDate: action.payload.updateDate,
//         role: action.payload.role,
//         department: action.payload.department,
//         password: action.payload.password,
//         confirm_password: action.payload.confirm_password
//       });
//     },
//   },
// });

// export const {
//   openModal,
//   pushDep,
//   toggleAddModalDep,
//   removeDep,
//   toggleEditModal,
//   updateDep,
// } = appDepSlice.actions;
// export default appDepSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "components/partials/app/service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const fetch = async () => {
  try {
    const user = JSON.parse(window?.localStorage.getItem("users"));
    const user_id = user?.id;
    if (!user_id) return;
    const profile = await fetchData(`/user/get-user?id=${user_id}`, {}, "GET");
    if (profile) {
      return {
        ...profile,
        skill: "Frontend Developer",
        image: "/assets/images/avatar/av-1.svg",
      };
    } else {
      return {
        skill: "Frontend Developer",
        image: "/assets/images/avatar/av-1.svg",
      };
    }
  } catch (error) {
    toast.error("Error", {
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
};

const initProfile = async () => {
  const profile = await fetch();
  console.log(profile);
  return profile;
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
    // {
    //     id: uuidv4(),
    //     role: "Admin",
    //     name: "visothipong ",
    //     email : "visothipong@gmail.com",
    //     phone: '12313243214',
    //     location: "Home# 320/N, Road# 71/B, phnom penh, Cambodia",
    //     batch: "8",
    //     class: "A",
    //     course: "Math",
    //     department: "IT",
    //     password: "123456",
    //     confirm_password: "123456",
    // skill: "Frontend Developer",
    // image: '/assets/images/avatar/av-1.svg',
    //     startDate: "2022-10-03",
    //     updateDate: "2022-10-06",
    //   },
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
} = appProfileSlice.actions;
export default appProfileSlice.reducer;
