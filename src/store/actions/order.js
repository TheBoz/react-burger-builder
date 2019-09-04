import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Action Containers

// sync
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

// async
export const purchaseBurger = (orderData) => {
  return dispatch => {

    dispatch(purchaseBurgerStart());

    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });    
  }
}


export const fetchOrdersSuccess = (orders) => {
  console.log('fetchOrdersSuccess action')
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  // console.log('fetchOrdersStart action')
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

// async
export const fetchOrders = () => {
  return dispatch => {

    dispatch(fetchOrdersStart());
   
    axios.get('/orders.json')
      .then(res => {
        console.log(res.data);
        // Convert firebase data to an array
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log('Success fetching orders', fetchedOrders)
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
    
  }
}

