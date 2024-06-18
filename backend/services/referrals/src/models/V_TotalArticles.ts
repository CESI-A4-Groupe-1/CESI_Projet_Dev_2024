import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VTotalArticlesAttributes {
  id: number;
  id_commande: number;
  id_article: number;
  quantite: number;
  prix: number;
  total_ind: number;
}

export type VTotalArticlesPk = "id";
export type VTotalArticlesId = VTotalArticles[VTotalArticlesPk];
export type VTotalArticlesOptionalAttributes = "id" | "total_ind";
export type VTotalArticlesCreationAttributes = Optional<VTotalArticlesAttributes, VTotalArticlesOptionalAttributes>;

export class VTotalArticles extends Model<VTotalArticlesAttributes, VTotalArticlesCreationAttributes> implements VTotalArticlesAttributes {
  id!: number;
  id_commande!: number;
  id_article!: number;
  quantite!: number;
  prix!: number;
  total_ind!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof VTotalArticles {
    return sequelize.define('VTotalArticles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
      field: 'ID'
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_commande'
    },
    id_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_article'
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Quantite'
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_ind: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      field: 'TotalInd'
    }
  }, {
    tableName: 'V_TotalArticles',
    timestamps: false
  }) as typeof VTotalArticles;
  }
}
