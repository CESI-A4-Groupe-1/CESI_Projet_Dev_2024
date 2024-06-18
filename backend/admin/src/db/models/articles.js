import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class articles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    }
  }, {
    sequelize,
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
  });
  }
}
