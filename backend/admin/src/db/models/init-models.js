import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _articles from  "./articles.js";
import _categories from  "./categories.js";
import _commande_list from  "./commande_list.js";
import _commandes from  "./commandes.js";
import _compte from  "./compte.js";
import _livraisons from  "./livraisons.js";
import _logged_session from  "./logged_session.js";
import _notifications from  "./notifications.js";
import _permission_roles from  "./permission_roles.js";
import _permissions from  "./permissions.js";
import _restaurants from  "./restaurants.js";
import _roles from  "./roles.js";
import _section from  "./section.js";

export default function initModels(sequelize) {
  const articles = _articles.init(sequelize, DataTypes);
  const categories = _categories.init(sequelize, DataTypes);
  const commande_list = _commande_list.init(sequelize, DataTypes);
  const commandes = _commandes.init(sequelize, DataTypes);
  const compte = _compte.init(sequelize, DataTypes);
  const livraisons = _livraisons.init(sequelize, DataTypes);
  const logged_session = _logged_session.init(sequelize, DataTypes);
  const notifications = _notifications.init(sequelize, DataTypes);
  const permission_roles = _permission_roles.init(sequelize, DataTypes);
  const permissions = _permissions.init(sequelize, DataTypes);
  const restaurants = _restaurants.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const section = _section.init(sequelize, DataTypes);

  commande_list.belongsTo(articles, { as: "id_article_article", foreignKey: "id_article"});
  articles.hasMany(commande_list, { as: "commande_lists", foreignKey: "id_article"});
  restaurants.belongsTo(categories, { as: "id_tag_category", foreignKey: "id_tag"});
  categories.hasMany(restaurants, { as: "restaurants", foreignKey: "id_tag"});
  commande_list.belongsTo(commandes, { as: "id_commande_commande", foreignKey: "id_commande"});
  commandes.hasMany(commande_list, { as: "commande_lists", foreignKey: "id_commande"});
  compte.belongsTo(compte, { as: "id_parain_compte", foreignKey: "id_parain"});
  compte.hasMany(compte, { as: "comptes", foreignKey: "id_parain"});
  livraisons.belongsTo(compte, { as: "id_livreur_compte", foreignKey: "id_livreur"});
  compte.hasMany(livraisons, { as: "livraisons", foreignKey: "id_livreur"});
  logged_session.belongsTo(compte, { as: "related_account_compte", foreignKey: "related_account"});
  compte.hasMany(logged_session, { as: "logged_sessions", foreignKey: "related_account"});
  notifications.belongsTo(compte, { as: "user", foreignKey: "user_id"});
  compte.hasMany(notifications, { as: "notifications", foreignKey: "user_id"});
  restaurants.belongsTo(compte, { as: "id_restaurateur_compte", foreignKey: "id_restaurateur"});
  compte.hasMany(restaurants, { as: "restaurants", foreignKey: "id_restaurateur"});
  commandes.belongsTo(livraisons, { as: "id_livraison_livraison", foreignKey: "id_livraison"});
  livraisons.hasMany(commandes, { as: "commandes", foreignKey: "id_livraison"});
  permission_roles.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(permission_roles, { as: "permission_roles", foreignKey: "permission_id"});
  commandes.belongsTo(restaurants, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  restaurants.hasMany(commandes, { as: "commandes", foreignKey: "id_restaurant"});
  section.belongsTo(restaurants, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  restaurants.hasMany(section, { as: "sections", foreignKey: "id_restaurant"});
  compte.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(compte, { as: "comptes", foreignKey: "role_id"});
  permission_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(permission_roles, { as: "permission_roles", foreignKey: "role_id"});
  articles.belongsTo(section, { as: "id_section_section", foreignKey: "id_section"});
  section.hasMany(articles, { as: "articles", foreignKey: "id_section"});

  return {
    articles,
    categories,
    commande_list,
    commandes,
    compte,
    livraisons,
    logged_session,
    notifications,
    permission_roles,
    permissions,
    restaurants,
    roles,
    section,
  };
}
