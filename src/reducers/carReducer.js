import {
  FETCH_CARS,
  FETCH_CAR_DETAIL,
  FETCH_FUEL,
  FETCH_BRAND,
  FETCH_TRANSMISSION,
  FETCH_CAR_SELLER,
} from "../actions/types";

const initialState = {
  cars: [],
  car: {},
  fuel: "",
  transmission: "",
  brand: "",
  seller: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case FETCH_FUEL:
      return {
        ...state,
        fuel: action.payload,
      };
    case FETCH_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    case FETCH_TRANSMISSION:
      return {
        ...state,
        transmission: action.payload,
      };
    case FETCH_CAR_DETAIL:
      return {
        ...state,
        car: action.payload,
      };
    case FETCH_CAR_SELLER:
      return {
        ...state,
        seller: action.payload,
      };
    default:
      return state;
  }
}
