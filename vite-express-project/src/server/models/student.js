import prisma from "../prisma.js";

export async function getAll() {
   const result =  await prisma.student.findMany();
   return result;
}

export async function  getById(id) {
    const result = await prisma.student.findFirst({where: {id: parseInt(id)}});
    return result;
}

export async function add(data) {
    const result = await prisma.student.create({data});
    return result;
}

export async function update(data) {
    const {id, ...restData } = data;
    const item = await getById(id);
    
    if(item) {
        try {
            const result = await prisma.student.update({where: {id: item.id}, data: restData});
            return result;
        }
        catch(error) {
            throw new Error(error);
        }
        
    }
    throw new Error(`Student not found with id: ${data.id}`);
}

export async function remove(id) {
    const item = await getById(id);
    if(item) {
        return await prisma.student.delete({where: {id: item.id}});
    }
    throw new Error(`Student not found with id: ${id}`);
}