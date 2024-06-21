import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_GraphPrix extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    benef: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'Benef'
    },
    jours: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'Jours',
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'V_GraphPrix',
    timestamps: false
  });
  }
}
