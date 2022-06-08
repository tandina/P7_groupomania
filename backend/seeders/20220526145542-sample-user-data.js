'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@groupomania.group',
      admin: true,
      deleted: false,
      password: '$2b$12$chJfTCR.ytlyHCcyq0GdMOwZI.OLaUakIAZLkRNugqP444P33G/Qq',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
