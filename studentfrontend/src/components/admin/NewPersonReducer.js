import { ACTION_TYPES } from "../../constants";

export const INITIAL_STATE = {
  id: 0,
  firstName: "",
  lastName: "",
  gender: "",
  role: "FACULTY",
  phone: "",
  sections: [],
  email: "",
  dob: "",
  location: {
    city: "",
    state: "",
    address: "",
  },
};

export const newPersonFormReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.CHANGE_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTION_TYPES.RESET_STATE:
      return action.payload;
    default:
      return state;
  }
};
