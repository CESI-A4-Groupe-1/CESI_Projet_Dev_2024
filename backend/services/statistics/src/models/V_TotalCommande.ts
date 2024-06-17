import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VTotalCommandeAttributes {
  id: number;
  id_commande: number;
  total_prix?: number;
}

export type VTotalCommandePk = "id";
export type VTotalCommandeId = VTotalCommande[VTotalCommandePk];
export type VTotalCommandeOptionalAttributes = "id" | "total_prix";
export type VTotalCommandeCreationAttributes = Optional<VTotalCommandeAttributes, VTotalCommandeOptionalAttributes>;

export class VTotalCommande extends Model<VTotalCommandeAttributes, VTotalCommandeCreationAttributes> implements VTotalCommandeAttributes {
  id!: number;
  id_commande!: number;
  total_prix?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof VTotalCommande {
    return sequelize.define('VTotalCommande', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
      field: 'ID'
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_commande'
    },
    total_prix: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'TotalPrix'
    }
  }, {
    tableName: 'V_TotalCommande',
    timestamps: false
  }) as typeof VTotalCommande;
  }
}
