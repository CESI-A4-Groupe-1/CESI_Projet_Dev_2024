import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VGraphPrixAttributes {
  benef?: number;
  jours?: Date;
}

export type VGraphPrixOptionalAttributes = "benef" | "jours";
export type VGraphPrixCreationAttributes = Optional<VGraphPrixAttributes, VGraphPrixOptionalAttributes>;

export class VGraphPrix extends Model<VGraphPrixAttributes, VGraphPrixCreationAttributes> implements VGraphPrixAttributes {
  benef?: number;
  jours?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof VGraphPrix {
    return sequelize.define('VGraphPrix', {
    benef: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'Benef'
    },
    jours: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'Jours'
    }
  }, {
    tableName: 'V_GraphPrix',
    timestamps: false
  }) as typeof VGraphPrix;
  }
}
