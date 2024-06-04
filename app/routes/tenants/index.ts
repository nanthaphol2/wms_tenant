import { Elysia, t } from "elysia";
import { getTenants, getTenantById, createTenants, deleteTenant } from "./handler";

const tenantRoutes = new Elysia({ prefix: "/tenants"})
    .get('/', () => getTenants())
    .get('/:tenant_id', ({params: {tenant_id}}) => getTenantById(tenant_id), {params: t.Object({tenant_id: t.String()})})
    .post('/', ({body}) => createTenants(body), {body: t.Object({tenant_name: t.String()})})
    .delete('/:tenant_id', ({params: {tenant_id}}) => deleteTenant(tenant_id), {params: t.Object({tenant_id: t.String()})});

export default tenantRoutes;