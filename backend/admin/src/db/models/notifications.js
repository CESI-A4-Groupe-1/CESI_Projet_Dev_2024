import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class notifications extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    notif_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'NotifID'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'ID'
      },
      field: 'UserID'
    },
    device_token: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      field: 'DeviceToken'
    }
  }, {
    sequelize,
    tableName: 'notifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NotifID" },
        ]
      },
      {
        name: "UserFK",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
  }
}
