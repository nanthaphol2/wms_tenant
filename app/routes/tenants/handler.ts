import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getTenants() {
    try{
        return await prisma.tenant_master.findMany();
    } catch (error) {
        console.error("Error getting data");
    }  
}

export async function createTenants(tenantdata: {tenant_name: string}) {
    try{
        const tenant = await prisma.tenant_master.create({data: tenantdata});
        if (!tenant) {
            throw new NotFoundError("Error creating tenant");
        }
    } catch (error) {
        console.error("Error getting data");
    }  
}

export async function getTenantById(tenant_id: string) {
    try{
        return await prisma.tenant_master.findFirst({where: {tenant_id}});
    } catch (error) {
        console.error("Error getting data by id");
    }  
}

export async function deleteTenant(tenant_id: string) {
    try{
        return await prisma.tenant_master.delete({where: {tenant_id}});
    } catch (error) {
        console.error("Error deleting data");
    }  
}

export async function createUser(userdata:{user_name: string, password: string}) {
    try{
        let usercreatedata: {
            user_name: string;
            password: string;
        } = {
            user_name: userdata.user_name,
            password: await Bun.password.hash(userdata.password, {
                algorithm: 'bcrypt',
            })
        };

        const tenant = await prisma.tenant_user.create({data: usercreatedata});
        if (!tenant) {
            throw new NotFoundError("Error creating tenant");
        }
    } catch (error) {
        console.error("Error getting data");
    }   
}

export async function login(userdata:{user_name: string, password: string}) {
    try{
        const user_name = userdata.user_name;
        const user = await prisma.tenant_user.findFirst({where: {user_name}});

        if(!user) {
            throw new NotFoundError("Error not found user");
        } 

        const ismatch = await Bun.password.verify(userdata.password, user.password);
        if(!ismatch) {
            throw new Error("Wrong password");
        }

        return {
            userId: user.user_id,
            loggedin: true
        }
    } catch (error) {
        console.error("Error authentication");
    }   
}