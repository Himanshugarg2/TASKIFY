import React from "react";

function browserReducer(state, { type, payload }) {
  switch (type) {
    case "NAME":
      return {
        ...state,
        name: payload,
      };
    case "CONFIRM_NAME":
      return {
        ...state,
        nameConfirmed: true, // Mark name as confirmed
      };
    case "TIME":
      return {
        ...state,
        time: payload,
      };
    case "MESSAGE":
      return {
        ...state,
        message:
         payload>=0 && payload<=12 ? "Good Morning":payload>=13 && payload<=17? "Good Afternoon" :"Good Evening",
      };
    case "TASK":
      return {
        ...state,
        task: payload,
      };
    case "CLEAR":
      return {
        ...state,
        task: null,
      };
    default:
      return state;
  }
}

export default browserReducer;
