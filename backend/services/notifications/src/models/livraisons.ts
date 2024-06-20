import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Commandes, CommandesId } from './commandes';
import type { Compte, CompteId } from './compte';

export interface LivraisonsAttributes {
  id: number;
  id_livreur: number;
  adresse_depart: string;
  adresse_livraison: string;
  type_transport?: string;
  created_at: Date;
  validated_at: Date;
  picked_up_at: Date;
  delivered_at: Date;
}

export type LivraisonsPk = "id";
export type LivraisonsId = Livraisons[LivraisonsPk];
export type LivraisonsOptionalAttributes = "id" | "type_transport" | "created_at";
export type LivraisonsCreationAttributes = Optional<LivraisonsAttributes, LivraisonsOptionalAttributes>;

export class Livraisons extends Model<LivraisonsAttributes, LivraisonsCreationAttributes> implements LivraisonsAttributes {
  id!: number;
  id_livreur!: number;
  adresse_depart!: string;
  adresse_livraison!: string;
  type_transport?: string;
  created_at!: Date;
  validated_at!: Date;
  picked_up_at!: Date;
  delivered_at!: Date;

  // Livraisons belongsTo Compte via id_livreur
  id_livreur_compte!: Compte;
  getId_livreur_compte!: Sequelize.BelongsToGetAssociationMixin<Compte>;
  setId_livreur_compte!: Sequelize.BelongsToSetAssociationMixin<Compte, CompteId>;
  createId_livreur_compte!: Sequelize.BelongsToCreateAssociationMixin<Compte>;
  // Livraisons hasMany Commandes via id_livraison
  commandes!: Commandes[];
  getCommandes!: Sequelize.HasManyGetAssociationsMixin<Commandes>;
  setCommandes!: Sequelize.HasManySetAssociationsMixin<Commandes, CommandesId>;
  addCommande!: Sequelize.HasManyAddAssociationMixin<Commandes, CommandesId>;
  addCommandes!: Sequelize.HasManyAddAssociationsMixin<Commandes, CommandesId>;
  createCommande!: Sequelize.HasManyCreateAssociationMixin<Commandes>;
  removeCommande!: Sequelize.HasManyRemoveAssociationMixin<Commandes, CommandesId>;
  removeCommandes!: Sequelize.HasManyRemoveAssociationsMixin<Commandes, CommandesId>;
  hasCommande!: Sequelize.HasManyHasAssociationMixin<Commandes, CommandesId>;
  hasCommandes!: Sequelize.HasManyHasAssociationsMixin<Commandes, CommandesId>;
  countCommandes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Livraisons {
    return sequelize.define('Livraisons', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_livreur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'ID'
      }
    },
    adresse_depart: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse_livraison: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type_transport: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    validated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    picked_up_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'livraisons',
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
        name: "id_livreur",
        using: "BTREE",
        fields: [
          { name: "id_livreur" },
        ]
      },
    ]
  }) as typeof Livraisons;
  }
}
