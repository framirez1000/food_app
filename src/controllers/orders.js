
import _ from 'lodash';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';
import misc from '../helpers/misc';
import services from '../services/services';
import models from '../database/models';

const {
  created,
  serverError,
  success,
} = statusCodes;
const { orderSuccess, orderUpdateSuccess } = messages;
const {
  successResponse,
  errorResponse,
  parseOrderContents,
} = misc;
const { saveData, saveManyRows, updateByCondition } = services;
const { Order, Contents } = models;

export default class Orders {
  static placeOrder = async (req, res) => {
    try {
      const { total, contents, paymentId } = req.body;
      const orderObject = {
        userId: req.userData.id,
        total,
        status: 'pending',
        paymentId,
      };
      const orderData = await saveData(Order, orderObject);
      const orderId = orderData.id;
      const orderContentsData = await parseOrderContents(contents, orderId);
      await saveManyRows(Contents, orderContentsData);
      return successResponse(res, created, orderSuccess, null, orderData);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  static getSpecificOrder = async (req, res) => {
    try {
      console.log('Fetching order Ok');
      return successResponse(res, success, null, null, req.orderData);
    } catch (error) {
        console.log('Fetching order Not Ok');
        return errorResponse(res, serverError, error);
    }
  };

  /**
   * @description method that returns the list of all orders
   * @param {object} req
   * @param {object} res
   * @returns {object} Success | error response object
   */
   static getOrdersList = async (req, res) => {
    try {
      return successResponse(res, success, null, null, req.ordersList);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  /**
   * @description Method that returns the updated order
   * @param {object} req
   * @param {object} res
   * @returns {object} Success | error response object
   */
  static updateOrder = async (req, res) => {
    try {
      const { status } = req.body;
      const condition = { id: req.orderData.id };
      const data = { status };
      const { dataValues } = await updateByCondition(Order, data, condition);
      return successResponse(res, success, orderUpdateSuccess, null, dataValues);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };
};