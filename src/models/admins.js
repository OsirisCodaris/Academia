/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admins',
    {
      idadmins: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'idusers',
        },
      },
    },
    {
      sequelize,
      tableName: 'admins',
      timestamps: false,
    }
  )
  Admin.associate = (models) => {
    // associations can be defined here
    Admin.belongsTo(models.Users, {
      foreignKey: 'idusers',
    })
  }
  return Admin
}
