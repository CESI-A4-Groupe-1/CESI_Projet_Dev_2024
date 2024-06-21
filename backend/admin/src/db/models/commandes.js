import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class commandes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_client'
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
    id_livraison: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'livraisons',
        key: 'ID'
      },
      field: 'ID_livraison'
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    validated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    denied_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'commandes',
    timestamps: true,
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
        name: "ID_livraison",
        using: "BTREE",
        fields: [
          { name: "ID_livraison" },
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
