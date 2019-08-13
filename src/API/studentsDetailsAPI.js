import axios from 'axios';

export function retrieveStudentDetails() {
    return axios
      .get("https://api.myjson.com/bins/1dlper")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
  