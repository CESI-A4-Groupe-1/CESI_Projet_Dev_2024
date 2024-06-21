import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_PrixComm extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
      field: 'ID'
    },
    total_comm: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'TotalComm'
    },
    dat: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'V_PrixComm',
    timestamps: false
  });
  }
}
