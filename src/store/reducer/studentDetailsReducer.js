import initialState from "./initialState";

const studentDetailsReducer = (state = initialState, action) => {
  if (action.type === "GET_STUDENT_DATA") {
    return {
      ...state,
      studentData: action.studentData,
    };
  }
  return state;
};

export default studentDetailsReducer;