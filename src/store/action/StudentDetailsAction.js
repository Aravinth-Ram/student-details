import { retrieveStudentDetails } from "../../API/studentsDetailsAPI";

export const receiveStudentData = val => {
  return {
    type: "GET_STUDENT_DATA",
    studentData: val
  };
};

export const getStudentData = () => {
  return dispatch => {
    return retrieveStudentDetails().then(response => {
      dispatch(receiveStudentData(response.data));
    });
  };
};
