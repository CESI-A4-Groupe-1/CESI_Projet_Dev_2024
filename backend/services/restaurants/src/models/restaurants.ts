import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categories, CategoriesId } from './categories';
import type { Commandes, CommandesId } from './commandes';
import type { Compte, CompteId } from './compte';
import type { Section, SectionId } from './section';

export interface RestaurantsAttributes {
  id: number;
  id_restaurateur: number;
  nom: string;
  adresse: string;
  id_tag: number;
  description?: string;
  image?: string;
}

export type RestaurantsPk = "id";
export type RestaurantsId = Restaurants[RestaurantsPk];
export type RestaurantsOptionalAttributes = "id" | "description" | "image";
export type RestaurantsCreationAttributes = Optional<RestaurantsAttributes, RestaurantsOptionalAttributes>;

export class Restaurants extends Model<RestaurantsAttributes, RestaurantsCreationAttributes> implements RestaurantsAttributes {
  id!: number;
  id_restaurateur!: number;
  nom!: string;
  adresse!: string;
  id_tag!: number;
  description?: string;
  image?: string;

  // Restaurants belongsTo Categories via id_tag
  id_tag_category!: Categories;
  getId_tag_category!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setId_tag_category!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createId_tag_category!: Sequelize.BelongsToCreateAssociationMixin<Categories>;
  // Restaurants belongsTo Compte via id_restaurateur
  id_restaurateur_compte!: Compte;
  getId_restaurateur_compte!: Sequelize.BelongsToGetAssociationMixin<Compte>;
  setId_restaurateur_compte!: Sequelize.BelongsToSetAssociationMixin<Compte, CompteId>;
  createId_restaurateur_compte!: Sequelize.BelongsToCreateAssociationMixin<Compte>;
  // Restaurants hasMany Commandes via id_restaurant
  commandes!: Commandes[];
  getCommandes!: Sequelize.HasManyGetAssociationsMixin<Commandes>;
  setCommandes!: Sequelize.HasManySetAssociationsMixin<Commandes, CommandesId>;
  addCommande!: Sequelize.HasManyAddAssociationMixin<Commandes, CommandesId>;
  addCommandes!: Sequelize.HasManyAddAssociationsMixin<Commandes, CommandesId>;
  createCommande!: Sequelize.HasManyCreateAssociationMixin<Commandes>;
  removeCommande!: Sequelize.HasManyRemoveAssociationMixin<Commandes, CommandesId>;
  removeCommandes!: Sequelize.HasManyRemoveAssociationsMixin<Commandes, CommandesId>;
  hasCommande!: Sequelize.HasManyHasAssociationMixin<Commandes, CommandesId>;
  hasCommandes!: Sequelize.HasManyHasAssociationsMixin<Commandes, CommandesId>;
  countCommandes!: Sequelize.HasManyCountAssociationsMixin;
  // Restaurants hasMany Section via id_restaurant
  sections!: Section[];
  getSections!: Sequelize.HasManyGetAssociationsMixin<Section>;
  setSections!: Sequelize.HasManySetAssociationsMixin<Section, SectionId>;
  addSection!: Sequelize.HasManyAddAssociationMixin<Section, SectionId>;
  addSections!: Sequelize.HasManyAddAssociationsMixin<Section, SectionId>;
  createSection!: Sequelize.HasManyCreateAssociationMixin<Section>;
  removeSection!: Sequelize.HasManyRemoveAssociationMixin<Section, SectionId>;
  removeSections!: Sequelize.HasManyRemoveAssociationsMixin<Section, SectionId>;
  hasSection!: Sequelize.HasManyHasAssociationMixin<Section, SectionId>;
  hasSections!: Sequelize.HasManyHasAssociationsMixin<Section, SectionId>;
  countSections!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Restaurants {
    return sequelize.define('Restaurants', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_restaurateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'ID'
      },
      field: 'ID_restaurateur'
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Nom'
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Adresse'
    },
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'ID'
      },
      field: 'ID_tag'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Description'
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image'
    }
  }, {
    tableName: 'restaurants',
    timestamps: false,
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
        name: "ID_restaurateur",
        using: "BTREE",
        fields: [
          { name: "ID_restaurateur" },
        ]
      },
      {
        name: "ID_tag",
        using: "BTREE",
        fields: [
          { name: "ID_tag" },
        ]
      },
    ]
  }) as typeof Restaurants;
  }
}
