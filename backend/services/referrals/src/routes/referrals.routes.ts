import ReferralsController from "../controllers/referrals.controller"
export default function (app: any) {
    // logging middleware
    app.use((req: any, res: any, next: any) => {
        console.log(req.method, req.url);
        console.log(req.headers);
        next();
    });

    // routes
    app.get('/users/:user_id/referee', (new ReferralsController()).getParain)
    app.put('/users/:user_id/refering/:referee_id', (new ReferralsController()).addParain)
}