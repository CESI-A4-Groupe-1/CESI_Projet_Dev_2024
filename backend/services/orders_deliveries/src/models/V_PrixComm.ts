import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VPrixCommAttributes {
  id: number;
  total_comm?: number;
  dat?: Date;
}

export type VPrixCommPk = "id";
export type VPrixCommId = VPrixComm[VPrixCommPk];
export type VPrixCommOptionalAttributes = "id" | "total_comm" | "dat";
export type VPrixCommCreationAttributes = Optional<VPrixCommAttributes, VPrixCommOptionalAttributes>;

export class VPrixComm extends Model<VPrixCommAttributes, VPrixCommCreationAttributes> implements VPrixCommAttributes {
  id!: number;
  total_comm?: number;
  dat?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof VPrixComm {
    return sequelize.define('VPrixComm', {
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
    tableName: 'V_PrixComm',
    timestamps: false
  }) as typeof VPrixComm;
  }
}
