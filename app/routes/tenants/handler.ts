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