import OrdersController from "../controllers/orders.controller"
import DeliveriesController from "../controllers/deliveries.controller";

export default function (app: any) {
    // logging middleware
    app.use((req: any, res: any, next: any) => {
        console.log(req.method, req.url);
        console.log(req.headers);
        next();
    });

    // routes
    app.get('/users/:user_id/orders', (new OrdersController()).userOrders)
    app.get('/restaurants/:resto_id/orders', (new OrdersController()).restOrders)
    app.post('/users/:user_id/orders', (new OrdersController()).createOrder)
    app.get('/orders/:order_id', (new OrdersController()).getOrder)
    app.put('/orders/:order_id/addarticles/:article_id', (new OrdersController()).updateAdd)
    app.put('/orders/:order_id/remarticles/:article_id', (new OrdersController()).updateRemove)
    app.put('/orders/:order_id/paid', (new OrdersController()).markOrderPaid)
    app.put('/orders/:order_id/denied', (new OrdersController()).markOrderDenied)
    app.put('/orders/:order_id/validated', (new OrdersController()).markOrderValidated)

    app.get('/deliveries/:delivery_id', (new DeliveriesController()).getDelivery)
    app.post('/orders/:order_id/delivery', (new DeliveriesController()).createDelivery)
    app.put('/deliveries/:delivery_id', (new DeliveriesController()).updateDelivery)
    app.put('/deliveries/:delivery_id/validated', (new DeliveriesController()).markDeliveryValidated)
    app.put('/deliveries/:delivery_id/pickedup', (new DeliveriesController()).markDeliveryPickedUp)
    app.put('/deliveries/:delivery_id/delivered', (new DeliveriesController()).markDeliveryDelivered)
}