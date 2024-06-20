import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class roles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'RoleID'
    },
    role_title: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'RoleTitle'
    },
    role_description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'RoleDescription'
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
    ]
  });
  }
}
