import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PermissionRoles, PermissionRolesId } from './permission_roles';

export interface PermissionsAttributes {
  permission_id: number;
  code?: string;
  description?: string;
}

export type PermissionsPk = "permission_id";
export type PermissionsId = Permissions[PermissionsPk];
export type PermissionsOptionalAttributes = "permission_id" | "code" | "description";
export type PermissionsCreationAttributes = Optional<PermissionsAttributes, PermissionsOptionalAttributes>;

export class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
  permission_id!: number;
  code?: string;
  description?: string;

  // Permissions hasMany PermissionRoles via permission_id
  permission_roles!: PermissionRoles[];
  getPermission_roles!: Sequelize.HasManyGetAssociationsMixin<PermissionRoles>;
  setPermission_roles!: Sequelize.HasManySetAssociationsMixin<PermissionRoles, PermissionRolesId>;
  addPermission_role!: Sequelize.HasManyAddAssociationMixin<PermissionRoles, PermissionRolesId>;
  addPermission_roles!: Sequelize.HasManyAddAssociationsMixin<PermissionRoles, PermissionRolesId>;
  createPermission_role!: Sequelize.HasManyCreateAssociationMixin<PermissionRoles>;
  removePermission_role!: Sequelize.HasManyRemoveAssociationMixin<PermissionRoles, PermissionRolesId>;
  removePermission_roles!: Sequelize.HasManyRemoveAssociationsMixin<PermissionRoles, PermissionRolesId>;
  hasPermission_role!: Sequelize.HasManyHasAssociationMixin<PermissionRoles, PermissionRolesId>;
  hasPermission_roles!: Sequelize.HasManyHasAssociationsMixin<PermissionRoles, PermissionRolesId>;
  countPermission_roles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Permissions {
    return sequelize.define('Permissions', {
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
  }) as typeof Permissions;
  }
}
