import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Compte, CompteId } from './compte';
import type { PermissionRoles, PermissionRolesId } from './permission_roles';

export interface RolesAttributes {
  role_id: number;
  role_title?: string;
  role_description?: string;
}

export type RolesPk = "role_id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "role_id" | "role_title" | "role_description";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
  role_id!: number;
  role_title?: string;
  role_description?: string;

  // Roles hasMany Compte via role_id
  comptes!: Compte[];
  getComptes!: Sequelize.HasManyGetAssociationsMixin<Compte>;
  setComptes!: Sequelize.HasManySetAssociationsMixin<Compte, CompteId>;
  addCompte!: Sequelize.HasManyAddAssociationMixin<Compte, CompteId>;
  addComptes!: Sequelize.HasManyAddAssociationsMixin<Compte, CompteId>;
  createCompte!: Sequelize.HasManyCreateAssociationMixin<Compte>;
  removeCompte!: Sequelize.HasManyRemoveAssociationMixin<Compte, CompteId>;
  removeComptes!: Sequelize.HasManyRemoveAssociationsMixin<Compte, CompteId>;
  hasCompte!: Sequelize.HasManyHasAssociationMixin<Compte, CompteId>;
  hasComptes!: Sequelize.HasManyHasAssociationsMixin<Compte, CompteId>;
  countComptes!: Sequelize.HasManyCountAssociationsMixin;
  // Roles hasMany PermissionRoles via role_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    return sequelize.define('Roles', {
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
  }) as typeof Roles;
  }
}
