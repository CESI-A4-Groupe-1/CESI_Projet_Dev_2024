import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_GraphPrix extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    benef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'Benef'
    },
    jours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'Jours'
    }
  }, {
    sequelize,
    tableName: 'V_GraphPrix',
    timestamps: false
  });
  }
}
