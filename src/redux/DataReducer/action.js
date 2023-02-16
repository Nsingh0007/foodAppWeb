import * as types from "./actionType";
import axios from "axios";
import { Products } from "../../Firebase/Collection";
const getData = (params) => async (dispatch) => {
  dispatch({ type: types.GET_DATA_R });
  return await Products.get()
    .then((res) => {
      var allproducts = [];
      res.docs?.map((products) => {
        allproducts.push({ ...products.data(), id: products.id });
      });
      var rankedSort = allproducts.sort((a, b) => a.rank - b.rank);
      console.log("getItem,", allproducts);
      dispatch({ type: types.GET_DATA_S, payload: rankedSort });
    })
    .catch((err) => {
      dispatch({ type: types.GET_DATA_F });
    });
};
const updateData = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_DATA_R });
  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/allproducts/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.UPDATE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_DATA_F });
    });
};
const deleteData = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_DATA_R });
  return axios
    .delete(`${process.env.REACT_APP_BASE_API}/allproducts/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.DELETE_DATA_F });
    });
};
export { getData, updateData, deleteData };
