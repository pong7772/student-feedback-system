// "use client";

// import { push, toggleSubmitModal } from "./store";
// import { fetchData } from "@/components/partials/app/service";
// import FormGroup from "@/components/ui/FormGroup";
// import Modal from "@/components/ui/Modal";
// import Textarea from "@/components/ui/Textarea";
// import Textinput from "@/components/ui/Textinput";
// import { yupResolver } from "@hookform/resolvers/yup";
// import React, { useState } from "react";
// import Flatpickr from "react-flatpickr";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import Select, { components } from "react-select";
// import { v4 as uuidv4 } from "uuid";
// import * as yup from "yup";

// const styles = {
//   multiValue: (base, state) => {
//     return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
//   },
//   multiValueLabel: (base, state) => {
//     return state.data.isFixed
//       ? { ...base, color: "#626262", paddingRight: 6 }
//       : base;
//   },
//   multiValueRemove: (base, state) => {
//     return state.data.isFixed ? { ...base, display: "none" } : base;
//   },
//   option: (provided, state) => ({
//     ...provided,
//     fontSize: "14px",
//   }),
// };

// const SubmitFeedback = () => {
//   const { openSubmitModal } = useSelector((state) => state.feedback);
//   const dispatch = useDispatch();

//   const FormValidationSchema = yup
//     .object({
//       name: yup.string().required("Title is required"),
//       // id: yup.number().required("id is required"),
//     })
//     .required();

//   const {
//     register,
//     control,
//     reset,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     resolver: yupResolver(FormValidationSchema),
//     mode: "all",
//     defaultValues: {
//       questions: [
//         {
//           questionText: "",
//           rating: "",
//           questionNumber: "",
//         },
//       ],
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   const onSubmit = async (data) => {
//     try {
//       await fetchData("/feedback-form/create", data, "POST").then((res) => {
//         if (res) {
//           dispatch(push(res));
//           dispatch(toggleSubmitModal(false));
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     reset();
//   };

//   return (
//     <div>
//       <Modal
//         title="Submit Feedback"
//         labelclassid="btn-outline-dark"
//         activeModal={openSubmitModal}
//         onClose={() => dispatch(toggleSubmitModal(false))}
//       >
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
//           <Textinput
//             name="feedbackFormId"
//             label="Feedback ID"
//             type={yup.number}
//             placeholder="Enter Feedback id"
//             register={register}
//             error={errors.id}
//           />
//           {fields.map((question, index) => (
//             <div key={question.id} className="space-y-4">
//               <Textinput
//                 name={`questions[${index}].questionText`}
//                 label={`Question ${index + 1} Text`}
//                 placeholder={`Enter Question ${index + 1} Text`}
//                 register={register}
//                 error={errors?.questions?.[index]?.questionText}
//               />

//               <Textinput
//                 name={`questions[${index}].rating`}
//                 label={`Question ${index + 1} Rating`}
//                 type="number"
//                 placeholder={`Enter Rating for Question ${index + 1}`}
//                 register={register}
//                 error={errors?.questions?.[index]?.rating}
//               />

//               <Textinput
//                 name={`questions[${index}].questionNumber`}
//                 label={`Question ${index + 1} Number`}
//                 type="number"
//                 placeholder={`Enter Question ${index + 1} Number`}
//                 register={register}
//                 error={errors?.questions?.[index]?.questionNumber}
//               />

//               {index === fields.length - 1 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     append({ questionText: "", rating: "", questionNumber: "" })
//                   }
//                 >
//                   +
//                 </button>
//               )}

//               {index !== 0 && (
//                 <button type="button" onClick={() => remove(index)}>
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}

//           <div className="ltr:text-right rtl:text-left">
//             <button className="btn btn-dark  text-center">Submit</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default SubmitFeedback;


import { push, toggleSubmitModal } from "./store";
import { fetchData } from "@/components/partials/app/service";
import Modal from "@/components/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";


const SubmitFeedback = () => {
  const { openSubmitModal } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        title="Submit Feedback"
        labelclassid="btn-outline-dark"
        activeModal={openSubmitModal}
        onClose={() => dispatch(toggleSubmitModal(false))}
      >
        {/* Use the CreateFeedbackForm component here */}
        {/* <CreateFeedbackForm /> */}
      </Modal>
    </div>
  );
};

export default SubmitFeedback;
