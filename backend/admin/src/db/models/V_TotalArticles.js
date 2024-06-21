import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_TotalArticles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    sequelize,
    tableName: 'V_TotalArticles',
    timestamps: false
  });
  }
}
