module.exports = (sequelize, DataTypes) => {
  const DateItem = sequelize.define('DateItem', {
	startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
	enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
  DateItem.associate = (models) => {
    DateItem.belongsTo(models.User, {
      foreignKey: 'dateId',
      onDelete: 'CASCADE',
    });
  };
  return DateItem;
};
