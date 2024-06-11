import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Restaurants, RestaurantsId } from './restaurants';

export interface CategoriesAttributes {
  id: number;
  titre: string;
}

export type CategoriesPk = "id";
export type CategoriesId = Categories[CategoriesPk];
export type CategoriesOptionalAttributes = "id";
export type CategoriesCreationAttributes = Optional<CategoriesAttributes, CategoriesOptionalAttributes>;

export class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  id!: number;
  titre!: string;

  // Categories hasMany Restaurants via id_tag
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Categories {
    return sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'categories',
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
    ]
  }) as typeof Categories;
  }
}
