import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Articles, ArticlesId } from './articles';
import type { Restaurants, RestaurantsId } from './restaurants';

export interface SectionAttributes {
  id: number;
  id_restaurant: number;
  titre_section: string;
  description?: string;
}

export type SectionPk = "id";
export type SectionId = Section[SectionPk];
export type SectionOptionalAttributes = "id" | "description";
export type SectionCreationAttributes = Optional<SectionAttributes, SectionOptionalAttributes>;

export class Section extends Model<SectionAttributes, SectionCreationAttributes> implements SectionAttributes {
  id!: number;
  id_restaurant!: number;
  titre_section!: string;
  description?: string;

  // Section belongsTo Restaurants via id_restaurant
  id_restaurant_restaurant!: Restaurants;
  getId_restaurant_restaurant!: Sequelize.BelongsToGetAssociationMixin<Restaurants>;
  setId_restaurant_restaurant!: Sequelize.BelongsToSetAssociationMixin<Restaurants, RestaurantsId>;
  createId_restaurant_restaurant!: Sequelize.BelongsToCreateAssociationMixin<Restaurants>;
  // Section hasMany Articles via id_section
  articles!: Articles[];
  getArticles!: Sequelize.HasManyGetAssociationsMixin<Articles>;
  setArticles!: Sequelize.HasManySetAssociationsMixin<Articles, ArticlesId>;
  addArticle!: Sequelize.HasManyAddAssociationMixin<Articles, ArticlesId>;
  addArticles!: Sequelize.HasManyAddAssociationsMixin<Articles, ArticlesId>;
  createArticle!: Sequelize.HasManyCreateAssociationMixin<Articles>;
  removeArticle!: Sequelize.HasManyRemoveAssociationMixin<Articles, ArticlesId>;
  removeArticles!: Sequelize.HasManyRemoveAssociationsMixin<Articles, ArticlesId>;
  hasArticle!: Sequelize.HasManyHasAssociationMixin<Articles, ArticlesId>;
  hasArticles!: Sequelize.HasManyHasAssociationsMixin<Articles, ArticlesId>;
  countArticles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Section {
    return sequelize.define('Section', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_restaurant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'ID'
      },
      field: 'ID_restaurant'
    },
    titre_section: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Description'
    }
  }, {
    tableName: 'section',
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
        name: "ID_restaurant",
        using: "BTREE",
        fields: [
          { name: "ID_restaurant" },
        ]
      },
    ]
  }) as typeof Section;
  }
}
