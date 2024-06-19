import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class V_GestionComm extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'COMMANDE',
      primaryKey: true
    },
    contenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'CONTENU'
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'PRIX'
    },
    resto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'RESTO_ID'
    },
    resto_nom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'RESTO_NOM'
    },
    livreur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'LIVREUR_ID'
    },
    livreur_nom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'LIVREUR_NOM'
    },
    livraison_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'LIVRAISON_ID'
    },
    livraison_etat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'LIVRAISON_ETAT'
    },
    client_adresse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'CLIENT_ADRESSE'
    }
  }, {
    sequelize,
    tableName: 'V_GestionComm',
    timestamps: false
  });
  }
}
