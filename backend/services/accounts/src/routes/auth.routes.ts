import authController from "../controllers/auth.controller"
// module.exports = (app: any) => {
//     app.post('/api/auth/register', authController.register)
// }

export default function (app: any) {
    app.post('/register', (new authController()).register)
    app.post('/login', (new authController()).login)
    app.post('/authenticate', (new authController()).authenticate)
}