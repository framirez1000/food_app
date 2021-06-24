import dotenv from 'dotenv';
import models from '../models';
import misc from '../../helpers/misc';
import roles from '../../utils/roles';

dotenv.config();

const { Menu } = models;

const createMenus = async () => {
  /*const adminData = {
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
  });*/
  await Menu.bulkCreate( [
    {
      name: 'Breakfast',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lunch/Dinner',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Drinks',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

createMenus();

export default createMenus;