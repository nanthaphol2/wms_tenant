import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import tenantRoutes from "../routes/tenants";

const app = new Elysia();
app.use(swagger()).group("/api", (api) => app.use(tenantRoutes)).listen(3000);

// const app = new Elysia()
//   .use(swagger()) 
//   .post( 
//     '/create-tenant', 
//     async ({ body }) => db.tenant_master.create(
//       { 
//         data: body,
//         // select: { 
//         //   tenant_id: true, 
//         //   tenant_name: true
//         // } 
//       }
//     ),
//     { 
//         body: t.Object({ 
//             tenant_name: t.String(), 
//         }),
//         // response: t.Object({ 
//         //   tenant_id: t.String(), 
//         //   tenant_name: t.String() 
//         // }) 
//     } 
    
//   )
//   .get( 
//     '/get-tenant', 
//     async () => db.tenant_master.findMany()
//   )  
//   .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
