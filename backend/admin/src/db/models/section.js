import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class section extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    sequelize,
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
  });
  }
}
