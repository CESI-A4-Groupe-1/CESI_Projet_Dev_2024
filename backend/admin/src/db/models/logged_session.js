import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class logged_session extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    related_account: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'compte',
        key: 'ID'
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'logged_session',
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
        name: "related_account",
        using: "BTREE",
        fields: [
          { name: "related_account" },
        ]
      },
    ]
  });
  }
}
