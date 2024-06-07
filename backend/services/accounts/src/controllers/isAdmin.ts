import jwt from "jsonwebtoken";

export function isAdmin(req: any): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return false;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return false;
    }

    try {
        const decoded : any = jwt.verify(token, process.env.ACCESS_JWT_KEY!);
        console.log(decoded);
        console.log(decoded.role_id);
        return decoded.role_id === 1;
    } catch {
        return false;
    }
}