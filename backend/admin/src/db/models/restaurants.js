import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class restaurants extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    }
  }, {
    sequelize,
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
  });
  }
}
