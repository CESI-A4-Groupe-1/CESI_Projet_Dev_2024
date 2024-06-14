import RestaurantController from "../controllers/restaurant.controller";
import {middlewares} from "../middlewares/middlewares";
import ArticleController from "../controllers/article.controller";
import MenusController from "../controllers/menus.controller";

export default function (app: any) {
    // logging middleware
    middlewares(app);
    app.post('/restaurants', (new RestaurantController()).createRestaurant)
    app.get('/restaurants', (new RestaurantController()).getRestaurants)
    app.get('/restaurants/:restaurant_id', (new RestaurantController()).getRestaurant)
    app.put('/restaurants/:restaurant_id', (new RestaurantController()).updateRestaurant)
    app.delete('/restaurants/:restaurant_id', (new RestaurantController()).deleteRestaurant)
    app.get('/restaurants/:restaurant_id/menus', (new MenusController()).getMenus)
    app.post('/restaurants/:restaurant_id/menus', (new MenusController()).createMenu)
    app.get('/menus/:menu_id', (new MenusController()).getMenu)
    app.put('/menus/:menu_id', (new MenusController()).updateMenu)
    app.delete('/menus/:menu_id', (new MenusController()).deleteMenu)
    app.get('/menus/:menu_id/articles', (new ArticleController()).getArticles)
    app.post('/menus/:menu_id/articles', (new ArticleController()).createArticle)
    app.get('/articles/:article_id', (new ArticleController()).getArticle)
    app.put('/articles/:article_id', (new ArticleController()).updateArticle)
    app.delete('/articles/:article_id', (new ArticleController()).deleteArticle)
}