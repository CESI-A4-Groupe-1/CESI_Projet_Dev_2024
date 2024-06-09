import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Livraisons, LivraisonsId } from './livraisons';
import type { LoggedSession, LoggedSessionId } from './logged_session';
import type { Restaurants, RestaurantsId } from './restaurants';
import type { Roles, RolesId } from './roles';

export interface CompteAttributes {
  id: number;
  nom?: string;
  prenom?: string;
  email?: string;
  role_id: number;
  date_anniv?: Date;
  password: string;
  telephone?: string;
  is_notified: number;
  path_pfp: string;
  created_at: Date;
  updated_at: Date;
  id_parain?: number;
  adresse?: string;
  deleted_at?: Date;
}

export type ComptePk = "id";
export type CompteId = Compte[ComptePk];
export type CompteOptionalAttributes = "id" | "nom" | "prenom" | "email" | "date_anniv" | "telephone" | "created_at" | "updated_at" | "id_parain" | "adresse" | "deleted_at";
export type CompteCreationAttributes = Optional<CompteAttributes, CompteOptionalAttributes>;

export class Compte extends Model<CompteAttributes, CompteCreationAttributes> implements CompteAttributes {
  id!: number;
  nom?: string;
  prenom?: string;
  email?: string;
  role_id!: number;
  date_anniv?: Date;
  password!: string;
  telephone?: string;
  is_notified!: number;
  path_pfp!: string;
  created_at!: Date;
  updated_at!: Date;
  id_parain?: number;
  adresse?: string;
  deleted_at?: Date;

  // Compte belongsTo Compte via id_parain
  id_parain_compte!: Compte;
  getId_parain_compte!: Sequelize.BelongsToGetAssociationMixin<Compte>;
  setId_parain_compte!: Sequelize.BelongsToSetAssociationMixin<Compte, CompteId>;
  createId_parain_compte!: Sequelize.BelongsToCreateAssociationMixin<Compte>;
  // Compte hasMany Livraisons via id_livreur
  livraisons!: Livraisons[];
  getLivraisons!: Sequelize.HasManyGetAssociationsMixin<Livraisons>;
  setLivraisons!: Sequelize.HasManySetAssociationsMixin<Livraisons, LivraisonsId>;
  addLivraison!: Sequelize.HasManyAddAssociationMixin<Livraisons, LivraisonsId>;
  addLivraisons!: Sequelize.HasManyAddAssociationsMixin<Livraisons, LivraisonsId>;
  createLivraison!: Sequelize.HasManyCreateAssociationMixin<Livraisons>;
  removeLivraison!: Sequelize.HasManyRemoveAssociationMixin<Livraisons, LivraisonsId>;
  removeLivraisons!: Sequelize.HasManyRemoveAssociationsMixin<Livraisons, LivraisonsId>;
  hasLivraison!: Sequelize.HasManyHasAssociationMixin<Livraisons, LivraisonsId>;
  hasLivraisons!: Sequelize.HasManyHasAssociationsMixin<Livraisons, LivraisonsId>;
  countLivraisons!: Sequelize.HasManyCountAssociationsMixin;
  // Compte hasMany LoggedSession via related_account
  logged_sessions!: LoggedSession[];
  getLogged_sessions!: Sequelize.HasManyGetAssociationsMixin<LoggedSession>;
  setLogged_sessions!: Sequelize.HasManySetAssociationsMixin<LoggedSession, LoggedSessionId>;
  addLogged_session!: Sequelize.HasManyAddAssociationMixin<LoggedSession, LoggedSessionId>;
  addLogged_sessions!: Sequelize.HasManyAddAssociationsMixin<LoggedSession, LoggedSessionId>;
  createLogged_session!: Sequelize.HasManyCreateAssociationMixin<LoggedSession>;
  removeLogged_session!: Sequelize.HasManyRemoveAssociationMixin<LoggedSession, LoggedSessionId>;
  removeLogged_sessions!: Sequelize.HasManyRemoveAssociationsMixin<LoggedSession, LoggedSessionId>;
  hasLogged_session!: Sequelize.HasManyHasAssociationMixin<LoggedSession, LoggedSessionId>;
  hasLogged_sessions!: Sequelize.HasManyHasAssociationsMixin<LoggedSession, LoggedSessionId>;
  countLogged_sessions!: Sequelize.HasManyCountAssociationsMixin;
  // Compte hasMany Restaurants via id_restaurateur
  restaurants!: Restaurants[];
  getRestaurants!: Sequelize.HasManyGetAssociationsMixin<Restaurants>;
  setRestaurants!: Sequelize.HasManySetAssociationsMixin<Restaurants, RestaurantsId>;
  addRestaurant!: Sequelize.HasManyAddAssociationMixin<Restaurants, RestaurantsId>;
  addRestaurants!: Sequelize.HasManyAddAssociationsMixin<Restaurants, RestaurantsId>;
  createRestaurant!: Sequelize.HasManyCreateAssociationMixin<Restaurants>;
  removeRestaurant!: Sequelize.HasManyRemoveAssociationMixin<Restaurants, RestaurantsId>;
  removeRestaurants!: Sequelize.HasManyRemoveAssociationsMixin<Restaurants, RestaurantsId>;
  hasRestaurant!: Sequelize.HasManyHasAssociationMixin<Restaurants, RestaurantsId>;
  hasRestaurants!: Sequelize.HasManyHasAssociationsMixin<Restaurants, RestaurantsId>;
  countRestaurants!: Sequelize.HasManyCountAssociationsMixin;
  // Compte belongsTo Roles via role_id
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Compte {
    return sequelize.define('Compte', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Nom'
    },
    prenom: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Prenom'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'RoleID'
      },
      field: 'RoleID'
    },
    date_anniv: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_notified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    path_pfp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_parain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'compte',
        key: 'ID'
      },
      field: 'Id_parain'
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'compte',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Id_parain",
        using: "BTREE",
        fields: [
          { name: "Id_parain" },
        ]
      },
      {
        name: "RoleID",
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
    ]
  }) as typeof Compte;
  }
}
