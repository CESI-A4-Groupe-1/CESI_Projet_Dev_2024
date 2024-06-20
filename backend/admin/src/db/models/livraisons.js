import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class livraisons extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_livreur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'ID'
      }
    },
    adresse_depart: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse_livraison: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type_transport: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    validated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    picked_up_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'livraisons',
    timestamps: true,
    updatedAt: false,
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
        name: "id_livreur",
        using: "BTREE",
        fields: [
          { name: "id_livreur" },
        ]
      },
    ]
  });
  }
}
