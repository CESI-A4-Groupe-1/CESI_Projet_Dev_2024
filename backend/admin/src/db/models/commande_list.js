import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class commande_list extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    sequelize,
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
  });
  }
}
