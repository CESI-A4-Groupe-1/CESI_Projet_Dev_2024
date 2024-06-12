import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VGestionCommAttributes {
  commande: number;
  contenu: number;
  prix?: number;
  resto_id: number;
  resto_nom: string;
  livreur_id: number;
  livreur_nom?: number;
  livraison_id: number;
  livraison_etat: string;
  client_adresse: string;
}

export type VGestionCommOptionalAttributes = "commande" | "contenu" | "prix" | "resto_id" | "livreur_id" | "livreur_nom" | "livraison_id" | "livraison_etat";
export type VGestionCommCreationAttributes = Optional<VGestionCommAttributes, VGestionCommOptionalAttributes>;

export class VGestionComm extends Model<VGestionCommAttributes, VGestionCommCreationAttributes> implements VGestionCommAttributes {
  commande!: number;
  contenu!: number;
  prix?: number;
  resto_id!: number;
  resto_nom!: string;
  livreur_id!: number;
  livreur_nom?: number;
  livraison_id!: number;
  livraison_etat!: string;
  client_adresse!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof VGestionComm {
    return sequelize.define('VGestionComm', {
    commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'COMMANDE'
    },
    contenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'CONTENU'
    },
    prix: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'PRIX'
    },
    resto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'RESTO_ID'
    },
    resto_nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
      allowNull: true,
      field: 'LIVREUR_NOM'
    },
    livraison_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'LIVRAISON_ID'
    },
    livraison_etat: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "",
      field: 'LIVRAISON_ETAT'
    },
    client_adresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'CLIENT_ADRESSE'
    }
  }, {
    tableName: 'V_GestionComm',
    timestamps: false
  }) as typeof VGestionComm;
  }
}
