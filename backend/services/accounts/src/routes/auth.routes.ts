import authController from "../controllers/auth.controller"
import UserController from "../controllers/user.controller";
export default function (app: any) {
    // logging middleware
    app.use((req: any, res: any, next: any) => {
        console.log(req.method, req.url);
        console.log(req.headers);
        next();
    });
    // routes
    app.post('/register', (new authController()).register)
    app.post('/login', (new authController()).login)
    app.get('/authenticate', (new authController()).authenticate)
    app.get('/users', (new UserController()).getUsers)
    app.get('/users/:user_id', (new UserController()).getUser)
    app.put('/users/:user_id', (new UserController()).updateUser)
    app.delete('/users/:user_id', (new UserController()).deleteUser)
}