'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@groupomania.group',
      admin: true,
      deleted: false,
      password: '$2a$12$2kK46n9r3YvNy4llKpQfy.2IMhYcZADDto0IuAZpwB3KkSnP.W5qi',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
