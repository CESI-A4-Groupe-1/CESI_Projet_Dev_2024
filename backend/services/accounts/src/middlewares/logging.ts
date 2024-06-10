export function logging(app: any) {
    app.use((req: any, res: any, next: any) => {
        console.log(req.method, req.url);
        console.log(req.headers);
        next();
    });
}