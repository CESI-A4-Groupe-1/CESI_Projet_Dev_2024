import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class permissions extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    permission_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'PermissionID'
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Code'
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'Description'
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PermissionID" },
        ]
      },
    ]
  });
  }
}
