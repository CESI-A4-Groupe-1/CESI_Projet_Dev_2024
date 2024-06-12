import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CommandeList, CommandeListId } from './commande_list';
import type { Livraisons, LivraisonsId } from './livraisons';
import type { Restaurants, RestaurantsId } from './restaurants';

export interface CommandesAttributes {
  id: number;
  id_client: number;
  id_restaurant: number;
  id_livraison?: number;
  created_at: Date;
  updated_at?: Date;
  validated_at?: Date;
  denied_at?: Date;
}

export type CommandesPk = "id";
export type CommandesId = Commandes[CommandesPk];
export type CommandesOptionalAttributes = "id" | "id_livraison" | "created_at" | "updated_at" | "validated_at" | "denied_at";
export type CommandesCreationAttributes = Optional<CommandesAttributes, CommandesOptionalAttributes>;

export class Commandes extends Model<CommandesAttributes, CommandesCreationAttributes> implements CommandesAttributes {
  id!: number;
  id_client!: number;
  id_restaurant!: number;
  id_livraison?: number;
  created_at!: Date;
  updated_at?: Date;
  validated_at?: Date;
  denied_at?: Date;

  // Commandes hasMany CommandeList via id_commande
  commande_lists!: CommandeList[];
  getCommande_lists!: Sequelize.HasManyGetAssociationsMixin<CommandeList>;
  setCommande_lists!: Sequelize.HasManySetAssociationsMixin<CommandeList, CommandeListId>;
  addCommande_list!: Sequelize.HasManyAddAssociationMixin<CommandeList, CommandeListId>;
  addCommande_lists!: Sequelize.HasManyAddAssociationsMixin<CommandeList, CommandeListId>;
  createCommande_list!: Sequelize.HasManyCreateAssociationMixin<CommandeList>;
  removeCommande_list!: Sequelize.HasManyRemoveAssociationMixin<CommandeList, CommandeListId>;
  removeCommande_lists!: Sequelize.HasManyRemoveAssociationsMixin<CommandeList, CommandeListId>;
  hasCommande_list!: Sequelize.HasManyHasAssociationMixin<CommandeList, CommandeListId>;
  hasCommande_lists!: Sequelize.HasManyHasAssociationsMixin<CommandeList, CommandeListId>;
  countCommande_lists!: Sequelize.HasManyCountAssociationsMixin;
  // Commandes belongsTo Livraisons via id_livraison
  id_livraison_livraison!: Livraisons;
  getId_livraison_livraison!: Sequelize.BelongsToGetAssociationMixin<Livraisons>;
  setId_livraison_livraison!: Sequelize.BelongsToSetAssociationMixin<Livraisons, LivraisonsId>;
  createId_livraison_livraison!: Sequelize.BelongsToCreateAssociationMixin<Livraisons>;
  // Commandes belongsTo Restaurants via id_restaurant
  id_restaurant_restaurant!: Restaurants;
  getId_restaurant_restaurant!: Sequelize.BelongsToGetAssociationMixin<Restaurants>;
  setId_restaurant_restaurant!: Sequelize.BelongsToSetAssociationMixin<Restaurants, RestaurantsId>;
  createId_restaurant_restaurant!: Sequelize.BelongsToCreateAssociationMixin<Restaurants>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Commandes {
    return sequelize.define('Commandes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_client'
    },
    id_restaurant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'ID'
      },
      field: 'ID_restaurant'
    },
    id_livraison: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'livraisons',
        key: 'ID'
      },
      field: 'ID_livraison'
    },
    validated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    denied_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'commandes',
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
        name: "ID_livraison",
        using: "BTREE",
        fields: [
          { name: "ID_livraison" },
        ]
      },
      {
        name: "ID_restaurant",
        using: "BTREE",
        fields: [
          { name: "ID_restaurant" },
        ]
      },
    ]
  }) as typeof Commandes;
  }
}
