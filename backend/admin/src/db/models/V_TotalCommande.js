import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_TotalCommande extends Model {
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
    total_prix: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'TotalPrix'
    }
  }, {
    sequelize,
    tableName: 'V_TotalCommande',
    timestamps: false
  });
  }
}
