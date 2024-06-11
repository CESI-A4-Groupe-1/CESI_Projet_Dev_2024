import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Articles, ArticlesId } from './articles';
import type { Commandes, CommandesId } from './commandes';

export interface CommandeListAttributes {
  id: number;
  id_article: number;
  id_commande: number;
  quantite: number;
}

export type CommandeListPk = "id";
export type CommandeListId = CommandeList[CommandeListPk];
export type CommandeListOptionalAttributes = "id";
export type CommandeListCreationAttributes = Optional<CommandeListAttributes, CommandeListOptionalAttributes>;

export class CommandeList extends Model<CommandeListAttributes, CommandeListCreationAttributes> implements CommandeListAttributes {
  id!: number;
  id_article!: number;
  id_commande!: number;
  quantite!: number;

  // CommandeList belongsTo Articles via id_article
  id_article_article!: Articles;
  getId_article_article!: Sequelize.BelongsToGetAssociationMixin<Articles>;
  setId_article_article!: Sequelize.BelongsToSetAssociationMixin<Articles, ArticlesId>;
  createId_article_article!: Sequelize.BelongsToCreateAssociationMixin<Articles>;
  // CommandeList belongsTo Commandes via id_commande
  id_commande_commande!: Commandes;
  getId_commande_commande!: Sequelize.BelongsToGetAssociationMixin<Commandes>;
  setId_commande_commande!: Sequelize.BelongsToSetAssociationMixin<Commandes, CommandesId>;
  createId_commande_commande!: Sequelize.BelongsToCreateAssociationMixin<Commandes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CommandeList {
    return sequelize.define('CommandeList', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'ID'
      },
      field: 'ID_article'
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commandes',
        key: 'ID'
      },
      field: 'ID_commande'
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Quantite'
    }
  }, {
    tableName: 'commande_list',
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
        name: "ID_article",
        using: "BTREE",
        fields: [
          { name: "ID_article" },
        ]
      },
      {
        name: "ID_commande",
        using: "BTREE",
        fields: [
          { name: "ID_commande" },
        ]
      },
    ]
  }) as typeof CommandeList;
  }
}
