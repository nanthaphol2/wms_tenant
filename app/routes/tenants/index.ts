import { Elysia, t } from "elysia";
import { getTenants, getTenantById, createTenants, deleteTenant, createUser, login } from "./handler";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { profile } from "bun:jsc";

const tenantRoutes = new Elysia({ prefix: "/tenants"})
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET!
        })
    )
    .use(cookie())
    .derive(async ({ jwt, cookie: {auth} }) => {
        const profile = await jwt.verify(auth.value)
        return {
            profile
        };
    })
    .post('login', async ({body, set, jwt, cookie: {auth}}) => {
        const res = await login(body);
        if(!res?.loggedin) {
            set.status = 401;
            return {
                message: "Unauthorize"
            };
        } else {
            const jwtsign = await jwt.sign({userId: res.userId})
            auth.set({
                value: jwtsign,
                httpOnly: true,
                maxAge: 7 * 86400
            });
            return {
                message: "Login success"
            };
        }
    }, {
        body: t.Object({user_name: t.String(), password: t.String()})
    })
    .guard({
        beforeHandle: ({set, profile}) => {
            if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }} 
    }, app => {
        app.get('/getAllTenant', async ({set, jwt, cookie: {auth}}) => {
            const profile = await jwt.verify(auth.value);
            if (!profile) {
                set.status = 401
                return 'Unauthorized'
            }
            return getTenants();
        });
        app.get('/getTenantById/:tenant_id', async ({profile, params: {tenant_id}}) => {
            return getTenantById(tenant_id)
        }, {params: t.Object({tenant_id: t.String()})});
        app.post('/createTenant', async ({body}) => createTenants(body), {body: t.Object({tenant_name: t.String()})});
        app.delete('/deleteTenant/:tenant_id', async ({params: {tenant_id}}) => deleteTenant(tenant_id), {params: t.Object({tenant_id: t.String()})});
        app.post('/createUser', async ({body}) => createUser(body), {body: t.Object({user_name: t.String(), password: t.String()})});
        return app;
    });

export default tenantRoutes;