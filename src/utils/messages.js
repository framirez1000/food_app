const messages = {
    emptyFirstName: 'First name is required',
    minFirstName: 'First name length must be greater than 3 characters',
    maxFirstName: 'First name length must be less than 30 characters',
    invalidFirstName: 'First name must contain only characters. Symbols and numbers not allowed',
    emptyLastName: 'Last name is required',
    minLastName: 'Last name length must be greater than 3 characters',
    maxLastName: 'Last name length must be less than 30 characters',
    invalidLastName: 'Last name must contain only characters. Symbols and numbers not allowed',
    emptyPhone: 'Phone number is required',
    minPhone: 'Phone number length must be 12',
    maxPhone: 'Phone number length must be 12',
    invalidPhone: 'Phone number must include the country code. For example: +250731110731',
    emptyAddress: 'Address is required',
    emptyPassword: 'Password is required',
    minPassword: 'Password length must be greater than 6',
    maxPassword: 'Phone number length must be less than 20',
    invalidPassword: 'Password must include at least a symbol and a number',
    signupConflict: 'Phone number already registered. Please login or create a new account',
    otpMessage: 'Your Zkk-ordering system verification code is: ',
    signupSuccessful: 'Account created successfully',  //first part
    emptyOTP: 'Please provide the OTP we sent to your phone number',
    invalidOTP: 'OTP must be a 6 digit number',
    wrongOTP: 'Invalid OTP! Please try again',
    verifySuccessful: 'Verification successful',
    invalidRequest: 'Invalid request, token not found',
    invalidToken: 'Invalid token, please login and try again',
    resendOTPSuccessful: 'OTP sent successfully',
    loginSuccessful: 'Logged in successfully',
    loginUserNotFound: 'User not found. Please check your credentials again',
    loginUserWrongCredentials: 'Invalid phone number or password. Please try again',
    logoutSuccessful: 'Logged out successfully',
    orderSuccess: 'Order placed successfully',
    orderEmpty: 'Your order must contain at least one item with itemId, itemName, cost, and quantity',
    invalidTotal: 'Total must be a positive number greater or equal to 1$',
    emptyTotal: 'Total is required',
    emptyContents: 'Contents is required',
    emptyItemName: 'Item name is required',
    emptyItemCost: 'Item cost is required',
    invalidItemCost: 'Item cost must be a positive number greater or equal to 1$',
    emptyItemQuantity: 'Item quantity is required',
    invalidItemQuantity: 'Item quantity must be a positive number greater or equal to 1',
    emptyPaymentId: 'PaymentId is required',
    invalidPaymentId: 'PaymentId must be a string',
    missingId: 'id is required',
    invalidId: 'id must be a number',
    orderNotFound: 'Order not found',
    adminOnlyResource: 'You are not allowed to use this resource',
    ordersListNotFound: 'No orders found at the moment',
    orderUpdateSuccess: 'Order updated successfully',
    orderUpdateConflict: 'Update failed. Order status exists already',
    orderUpdateEmptyStatus: 'Status is required',
    orderUpdateInvalidStatus: 'Status must be one of [accepted, onthemove, completed]',
    menuNotFound: 'Menu not found at the moment',
    emptyAmount: 'Amount is required',
    invalidAmount: 'Amount must be a positive number greater or equal to 1$',
  };
  
  export default messages;