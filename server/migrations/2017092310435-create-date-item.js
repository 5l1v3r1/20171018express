module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('DateItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startdate: {
		  type: Sequelize.DATE,
		  allowNull: false,
	  },
	  enddate: {
		  type: Sequelize.DATE,
		  allowNull: false,
		}
	  ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dateId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'dateId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('DateItems'),
};
