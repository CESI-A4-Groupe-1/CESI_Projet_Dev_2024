import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permissions, PermissionsId } from './permissions';
import type { Roles, RolesId } from './roles';

export interface PermissionRolesAttributes {
  permission_roles_id: number;
  role_id?: number;
  permission_id?: number;
}

export type PermissionRolesPk = "permission_roles_id";
export type PermissionRolesId = PermissionRoles[PermissionRolesPk];
export type PermissionRolesOptionalAttributes = "permission_roles_id" | "role_id" | "permission_id";
export type PermissionRolesCreationAttributes = Optional<PermissionRolesAttributes, PermissionRolesOptionalAttributes>;

export class PermissionRoles extends Model<PermissionRolesAttributes, PermissionRolesCreationAttributes> implements PermissionRolesAttributes {
  permission_roles_id!: number;
  role_id?: number;
  permission_id?: number;

  // PermissionRoles belongsTo Permissions via permission_id
  permission!: Permissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<Permissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<Permissions, PermissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permissions>;
  // PermissionRoles belongsTo Roles via role_id
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PermissionRoles {
    return sequelize.define('PermissionRoles', {
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
  }) as typeof PermissionRoles;
  }
}
