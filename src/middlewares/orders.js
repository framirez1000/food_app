
import _ from 'lodash';
import orders from '../validations/orders';
import helpers from '../helpers/misc';
import models from '../database/models';
import services from '../services/services';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';

const { placeOrder, getOrder, updateOrder } = orders;
const {
  returnErrorMessages,
  errorResponse,
} = helpers;

const { Order, Contents, User } = models;
const { findOrderByConditionAll, findAllOrders } = services;
const { notFound, serverError, conflict } = statusCodes;
const { orderNotFound, ordersListNotFound, orderUpdateConflict } = messages;

const validatePlaceOrder = async (req, res, next) => {
  const { error } = placeOrder(req.body);
  returnErrorMessages(error, res, next);
};


const validateGetOrder = async (req, res, next) => {
  //console.log('Middwr: ');
  const { error } = getOrder(req.params);
  returnErrorMessages(error, res, next);
};

const findOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const orderData = await findOrderByConditionAll(Order, condition, Contents, User);
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

const findUserOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    const condition = { id, userId };
    //console.log('Midlwr Find Ids: ' + id + ' ' + userId);
    const orderData = await findOrderByConditionAll(Order, condition, Contents, User);
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    //console.log('Midlwr Find Ids2: ' + orderData.dataValues);
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

const findOrdersList = async (req, res, next) => {
  try {
    const orders = await findAllOrders(Order, Contents, User);
    if (_.isEmpty(orders)) {
      return errorResponse(res, notFound, ordersListNotFound);
    }
    req.ordersList = orders;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

/**
 * @description Wrapper function that exposes updateOrder validation errors
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Callback function
 */
 const validateUpdateOrder = async (req, res, next) => {
  console.log('Midlwr validateUpdateOrder :' );
  const { error } = updateOrder(req.body);
  console.log('Midlwr validateUpdateOrder error: ' + error);
  returnErrorMessages(error, res, next);
};

/**
 * @description Checks if the new status equals the existing status and returns an error
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Callback function
 */
const checkOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existingStatus = req.orderData.status;
    console.log('Midlwr chkOrderStatus: ' + status + ' ' + existingStatus);
    if (status === existingStatus) {
      return errorResponse(res, conflict, orderUpdateConflict);
    }
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

export default {
  validatePlaceOrder,
  validateGetOrder,
  findOrderById,
  findOrdersList,
  findUserOrderById,
  validateUpdateOrder,
  checkOrderStatus,
};