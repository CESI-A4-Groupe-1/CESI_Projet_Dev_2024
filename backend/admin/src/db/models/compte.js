import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class compte extends Model {
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
      allowNull: true,
      field: 'Nom'
    },
    prenom: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'Prenom'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'RoleID'
      },
      field: 'RoleID'
    },
    date_anniv: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_notified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    path_pfp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_parain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'compte',
        key: 'ID'
      },
      field: 'Id_parain'
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compte',
    timestamps: true,
    paranoid: true,
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
        name: "Id_parain",
        using: "BTREE",
        fields: [
          { name: "Id_parain" },
        ]
      },
      {
        name: "RoleID",
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
    ]
  });
  }
}
