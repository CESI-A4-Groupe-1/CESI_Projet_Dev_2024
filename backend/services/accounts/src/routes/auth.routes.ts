import authController from "../controllers/auth.controller"
import UserController from "../controllers/user.controller";
// module.exports = (app: any) => {
//     app.post('/api/auth/register', authController.register)
// }

export default function (app: any) {
    app.post('/register', (new authController()).register)
    app.post('/login', (new authController()).login)
    app.get('/authenticate', (new authController()).authenticate)
    app.get('/users', (new UserController()).getUsers)
    app.get('/users/:user_id', (new UserController()).getUser)
}