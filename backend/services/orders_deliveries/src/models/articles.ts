import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CommandeList, CommandeListId } from './commande_list';
import type { Section, SectionId } from './section';

export interface ArticlesAttributes {
  id: number;
  nom: string;
  prix: number;
  id_section: number;
  description?: string;
  image?: string;
}

export type ArticlesPk = "id";
export type ArticlesId = Articles[ArticlesPk];
export type ArticlesOptionalAttributes = "id" | "description" | "image";
export type ArticlesCreationAttributes = Optional<ArticlesAttributes, ArticlesOptionalAttributes>;

export class Articles extends Model<ArticlesAttributes, ArticlesCreationAttributes> implements ArticlesAttributes {
  id!: number;
  nom!: string;
  prix!: number;
  id_section!: number;
  description?: string;
  image?: string;

  // Articles hasMany CommandeList via id_article
  commande_lists!: CommandeList[];
  getCommande_lists!: Sequelize.HasManyGetAssociationsMixin<CommandeList>;
  setCommande_lists!: Sequelize.HasManySetAssociationsMixin<CommandeList, CommandeListId>;
  addCommande_list!: Sequelize.HasManyAddAssociationMixin<CommandeList, CommandeListId>;
  addCommande_lists!: Sequelize.HasManyAddAssociationsMixin<CommandeList, CommandeListId>;
  createCommande_list!: Sequelize.HasManyCreateAssociationMixin<CommandeList>;
  removeCommande_list!: Sequelize.HasManyRemoveAssociationMixin<CommandeList, CommandeListId>;
  removeCommande_lists!: Sequelize.HasManyRemoveAssociationsMixin<CommandeList, CommandeListId>;
  hasCommande_list!: Sequelize.HasManyHasAssociationMixin<CommandeList, CommandeListId>;
  hasCommande_lists!: Sequelize.HasManyHasAssociationsMixin<CommandeList, CommandeListId>;
  countCommande_lists!: Sequelize.HasManyCountAssociationsMixin;
  // Articles belongsTo Section via id_section
  id_section_section!: Section;
  getId_section_section!: Sequelize.BelongsToGetAssociationMixin<Section>;
  setId_section_section!: Sequelize.BelongsToSetAssociationMixin<Section, SectionId>;
  createId_section_section!: Sequelize.BelongsToCreateAssociationMixin<Section>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Articles {
    return sequelize.define('Articles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Nom'
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    id_section: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'section',
        key: 'ID'
      },
      field: 'ID_section'
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
    tableName: 'articles',
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
        name: "ID_section",
        using: "BTREE",
        fields: [
          { name: "ID_section" },
        ]
      },
    ]
  }) as typeof Articles;
  }
}
