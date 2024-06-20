import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Compte, CompteId } from './compte';

export interface NotificationsAttributes {
  notif_id: number;
  user_id: number;
  device_token: string;
}

export type NotificationsPk = "notif_id";
export type NotificationsId = Notifications[NotificationsPk];
export type NotificationsOptionalAttributes = "notif_id";
export type NotificationsCreationAttributes = Optional<NotificationsAttributes, NotificationsOptionalAttributes>;

export class Notifications extends Model<NotificationsAttributes, NotificationsCreationAttributes> implements NotificationsAttributes {
  notif_id!: number;
  user_id!: number;
  device_token!: string;

  // Notifications belongsTo Compte via user_id
  user!: Compte;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Compte>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Compte, CompteId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Compte>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notifications {
    return sequelize.define('Notifications', {
    notif_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'NotifID'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'ID'
      },
      field: 'UserID'
    },
    device_token: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      field: 'DeviceToken'
    }
  }, {
    tableName: 'notifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NotifID" },
        ]
      },
      {
        name: "UserFK",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  }) as typeof Notifications;
  }
}
