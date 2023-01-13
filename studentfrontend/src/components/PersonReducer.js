import { ACTION_TYPES } from "../constants";

export const INITIAL_STATE = {
  id: 0,
  firstName: "",
  lastName: "",
  gender: "",
  role: "",
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

// ! CAN'T CURRENTLY HANDLE EDITS TO LOCATION OBJECT
export const formReducer = (state, action) => {
  const faculty = action.payload;

  switch (action.type) {
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        id: faculty.id,
        firstName: faculty.firstName,
        lastName: faculty.lastName,
        gender: faculty.gender,
        role: faculty.role,
        phone: faculty.phone,
        sections: faculty.sections,
        email: faculty.email,
        dob: faculty.dob,
        location: {
          city: faculty.address.split(",")[1],
          state: faculty.address.split(",")[2],
          address: faculty.address.split(",")[0],
        },
      };
    case ACTION_TYPES.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {};
    case ACTION_TYPES.RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
