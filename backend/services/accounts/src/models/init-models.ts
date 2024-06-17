import type { Sequelize } from "sequelize";
import { Articles as _Articles } from "./articles";
import type { ArticlesAttributes, ArticlesCreationAttributes } from "./articles";
import { Categories as _Categories } from "./categories";
import type { CategoriesAttributes, CategoriesCreationAttributes } from "./categories";
import { CommandeList as _CommandeList } from "./commande_list";
import type { CommandeListAttributes, CommandeListCreationAttributes } from "./commande_list";
import { Commandes as _Commandes } from "./commandes";
import type { CommandesAttributes, CommandesCreationAttributes } from "./commandes";
import { Compte as _Compte } from "./compte";
import type { CompteAttributes, CompteCreationAttributes } from "./compte";
import { Livraisons as _Livraisons } from "./livraisons";
import type { LivraisonsAttributes, LivraisonsCreationAttributes } from "./livraisons";
import { LoggedSession as _LoggedSession } from "./logged_session";
import type { LoggedSessionAttributes, LoggedSessionCreationAttributes } from "./logged_session";
import { Notifications as _Notifications } from "./notifications";
import type { NotificationsAttributes, NotificationsCreationAttributes } from "./notifications";
import { PermissionRoles as _PermissionRoles } from "./permission_roles";
import type { PermissionRolesAttributes, PermissionRolesCreationAttributes } from "./permission_roles";
import { Permissions as _Permissions } from "./permissions";
import type { PermissionsAttributes, PermissionsCreationAttributes } from "./permissions";
import { Restaurants as _Restaurants } from "./restaurants";
import type { RestaurantsAttributes, RestaurantsCreationAttributes } from "./restaurants";
import { Roles as _Roles } from "./roles";
import type { RolesAttributes, RolesCreationAttributes } from "./roles";
import { Section as _Section } from "./section";
import type { SectionAttributes, SectionCreationAttributes } from "./section";

export {
  _Articles as Articles,
  _Categories as Categories,
  _CommandeList as CommandeList,
  _Commandes as Commandes,
  _Compte as Compte,
  _Livraisons as Livraisons,
  _LoggedSession as LoggedSession,
  _Notifications as Notifications,
  _PermissionRoles as PermissionRoles,
  _Permissions as Permissions,
  _Restaurants as Restaurants,
  _Roles as Roles,
  _Section as Section,
};

export type {
  ArticlesAttributes,
  ArticlesCreationAttributes,
  CategoriesAttributes,
  CategoriesCreationAttributes,
  CommandeListAttributes,
  CommandeListCreationAttributes,
  CommandesAttributes,
  CommandesCreationAttributes,
  CompteAttributes,
  CompteCreationAttributes,
  LivraisonsAttributes,
  LivraisonsCreationAttributes,
  LoggedSessionAttributes,
  LoggedSessionCreationAttributes,
  NotificationsAttributes,
  NotificationsCreationAttributes,
  PermissionRolesAttributes,
  PermissionRolesCreationAttributes,
  PermissionsAttributes,
  PermissionsCreationAttributes,
  RestaurantsAttributes,
  RestaurantsCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  SectionAttributes,
  SectionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Articles = _Articles.initModel(sequelize);
  const Categories = _Categories.initModel(sequelize);
  const CommandeList = _CommandeList.initModel(sequelize);
  const Commandes = _Commandes.initModel(sequelize);
  const Compte = _Compte.initModel(sequelize);
  const Livraisons = _Livraisons.initModel(sequelize);
  const LoggedSession = _LoggedSession.initModel(sequelize);
  const Notifications = _Notifications.initModel(sequelize);
  const PermissionRoles = _PermissionRoles.initModel(sequelize);
  const Permissions = _Permissions.initModel(sequelize);
  const Restaurants = _Restaurants.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const Section = _Section.initModel(sequelize);

  CommandeList.belongsTo(Articles, { as: "id_article_article", foreignKey: "id_article"});
  Articles.hasMany(CommandeList, { as: "commande_lists", foreignKey: "id_article"});
  Restaurants.belongsTo(Categories, { as: "id_tag_category", foreignKey: "id_tag"});
  Categories.hasMany(Restaurants, { as: "restaurants", foreignKey: "id_tag"});
  CommandeList.belongsTo(Commandes, { as: "id_commande_commande", foreignKey: "id_commande"});
  Commandes.hasMany(CommandeList, { as: "commande_lists", foreignKey: "id_commande"});
  Compte.belongsTo(Compte, { as: "id_parain_compte", foreignKey: "id_parain"});
  Compte.hasMany(Compte, { as: "comptes", foreignKey: "id_parain"});
  Livraisons.belongsTo(Compte, { as: "id_livreur_compte", foreignKey: "id_livreur"});
  Compte.hasMany(Livraisons, { as: "livraisons", foreignKey: "id_livreur"});
  LoggedSession.belongsTo(Compte, { as: "related_account_compte", foreignKey: "related_account"});
  Compte.hasMany(LoggedSession, { as: "logged_sessions", foreignKey: "related_account"});
  Notifications.belongsTo(Compte, { as: "user", foreignKey: "user_id"});
  Compte.hasMany(Notifications, { as: "notifications", foreignKey: "user_id"});
  Restaurants.belongsTo(Compte, { as: "id_restaurateur_compte", foreignKey: "id_restaurateur"});
  Compte.hasMany(Restaurants, { as: "restaurants", foreignKey: "id_restaurateur"});
  Commandes.belongsTo(Livraisons, { as: "id_livraison_livraison", foreignKey: "id_livraison"});
  Livraisons.hasMany(Commandes, { as: "commandes", foreignKey: "id_livraison"});
  PermissionRoles.belongsTo(Permissions, { as: "permission", foreignKey: "permission_id"});
  Permissions.hasMany(PermissionRoles, { as: "permission_roles", foreignKey: "permission_id"});
  Commandes.belongsTo(Restaurants, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  Restaurants.hasMany(Commandes, { as: "commandes", foreignKey: "id_restaurant"});
  Section.belongsTo(Restaurants, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  Restaurants.hasMany(Section, { as: "sections", foreignKey: "id_restaurant"});
  Compte.belongsTo(Roles, { as: "role", foreignKey: "role_id"});
  Roles.hasMany(Compte, { as: "comptes", foreignKey: "role_id"});
  PermissionRoles.belongsTo(Roles, { as: "role", foreignKey: "role_id"});
  Roles.hasMany(PermissionRoles, { as: "permission_roles", foreignKey: "role_id"});
  Articles.belongsTo(Section, { as: "id_section_section", foreignKey: "id_section"});
  Section.hasMany(Articles, { as: "articles", foreignKey: "id_section"});

  return {
    Articles: Articles,
    Categories: Categories,
    CommandeList: CommandeList,
    Commandes: Commandes,
    Compte: Compte,
    Livraisons: Livraisons,
    LoggedSession: LoggedSession,
    Notifications: Notifications,
    PermissionRoles: PermissionRoles,
    Permissions: Permissions,
    Restaurants: Restaurants,
    Roles: Roles,
    Section: Section,
  };
}
