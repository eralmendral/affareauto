import {
  FETCH_CARS,
  FETCH_CAR_DETAIL,
  FETCH_FUEL,
  FETCH_BRAND,
  FETCH_TRANSMISSION,
  FETCH_CAR_SELLER,
} from "./types";
import axios from "axios";
export const fetchCars = () => (dispatch) => {
  axios
    .get("/carsapi/cars/")
    .then((res) => {
      dispatch({
        type: FETCH_CARS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCarDetails = (id) => (dispatch) => {
  axios.get(`/carsapi/cars/${id}/`).then((res) => {
    dispatch({
      type: FETCH_CAR_DETAIL,
      payload: res.data,
    });
  });
};

export const fetchFuel = (id) => (dispatch) => {
  axios
    .get(`/carsapi/carfueltypes/${id}/`)
    .then((res) => {
      dispatch({
        type: FETCH_FUEL,
        payload: res.data.carfueltype,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchBrand = (id) => (dispatch) => {
  axios
    .get(`/carsapi/carsbrands/${id}/`)
    .then((res) => {
      dispatch({
        type: FETCH_BRAND,
        payload: res.data.carbrand,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchTransmission = (id) => (dispatch) => {
  axios
    .get(`/carsapi/cartransmissions/${id}/`)
    .then((res) => {
      dispatch({
        type: FETCH_TRANSMISSION,
        payload: res.data.cartransmissions,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchSellerInfo = (id) => (dispatch) => {
  axios
    .get(`/userapi/users/${id}/`)
    .then((res) => {
      console.log("Fetching seller information");
      dispatch({
        type: FETCH_CAR_SELLER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
