import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Compte, CompteId } from './compte';

export interface LoggedSessionAttributes {
  id: number;
  related_account?: number;
  token: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
}

export type LoggedSessionPk = "id";
export type LoggedSessionId = LoggedSession[LoggedSessionPk];
export type LoggedSessionOptionalAttributes = "id" | "related_account" | "created_at" | "updated_at";
export type LoggedSessionCreationAttributes = Optional<LoggedSessionAttributes, LoggedSessionOptionalAttributes>;

export class LoggedSession extends Model<LoggedSessionAttributes, LoggedSessionCreationAttributes> implements LoggedSessionAttributes {
  id!: number;
  related_account?: number;
  token!: string;
  created_at!: Date;
  updated_at!: Date;
  expires_at!: Date;

  // LoggedSession belongsTo Compte via related_account
  related_account_compte!: Compte;
  getRelated_account_compte!: Sequelize.BelongsToGetAssociationMixin<Compte>;
  setRelated_account_compte!: Sequelize.BelongsToSetAssociationMixin<Compte, CompteId>;
  createRelated_account_compte!: Sequelize.BelongsToCreateAssociationMixin<Compte>;

  static initModel(sequelize: Sequelize.Sequelize): typeof LoggedSession {
    return sequelize.define('LoggedSession', {
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
  }) as typeof LoggedSession;
  }
}
