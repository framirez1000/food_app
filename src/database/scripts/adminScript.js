import dotenv from 'dotenv';
import models from '../models';
import misc from '../../helpers/misc';
import roles from '../../utils/roles';

dotenv.config();

const { User } = models;
const { generateHashedPassword } = misc;
const { ADMIN } = roles;

const createAdmin = async () => {
  const password = await generateHashedPassword(process.env.ADMIN_PASSWORD);
  const adminData = {
    firstName: 'Fran',
    lastName: 'Ramirez',
    phoneNumber: process.env.ADMIN_PHONE,
    password: password,
    address: 'KK 185 St, 211, 10th Floor, 1',
    status: true,
    role: ADMIN,
  };
  await User.findOrCreate({
    where: {
      phoneNumber: adminData.phoneNumber,
      role: ADMIN,
    },
    defaults: adminData,
  });
};

createAdmin();

export default createAdmin;