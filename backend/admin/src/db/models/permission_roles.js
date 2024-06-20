import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class permission_roles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    permission_roles_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'PermissionRolesId'
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'RoleID'
      },
      field: 'RoleID'
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permissions',
        key: 'PermissionID'
      },
      field: 'PermissionID'
    }
  }, {
    sequelize,
    tableName: 'permission_roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PermissionRolesId" },
        ]
      },
      {
        name: "Role_fk",
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
      {
        name: "Permission_fk",
        using: "BTREE",
        fields: [
          { name: "PermissionID" },
        ]
      },
    ]
  });
  }
}
