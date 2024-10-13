

import { PrismaClient } from '@prisma/client';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { TaskArray, TaskType } from '../components/Tasks/TaskType';
import { idValidation, titleValidation, updateValidation } from '../components/Tasks/validationTask';
const prisma = new PrismaClient();

export const server = {
    postTask: defineAction({
        input: titleValidation,
        handler: async (input) => {
            return await prisma.tasks.create({ data: { userId: 1, title: input.title } });
        }
    }),
    getTasks: defineAction({
        handler: async (): Promise<[] | TaskArray> => {
            try {
                return await prisma.tasks.findMany() as TaskArray;
            } catch (e) {
                console.error(e);
                return []
            }
        }
    }),
    updateTasks: defineAction({
        input: updateValidation,
        handler: async (input): Promise<TaskType> => {
            try {
                return await prisma.tasks.update({ where: { id: input.id }, data: { title: input.title, isDone: input.isDone } });
            } catch (e) {
                console.error(e);
                throw new Error('Error updating task');
            }
        }
    }),
    deleteTask: defineAction({
        input: idValidation,
        handler: async (input): Promise<TaskType> => {
            try {
                return await prisma.tasks.delete({ where: { id: input.id } });
            } catch (e) {
                console.error(e);
                throw new Error('Error deleted task');
            }
        }
    }),
    getOne: defineAction({
        input: idValidation,
        handler: async (input): Promise<TaskType | null> => {
            try {
                return await prisma.tasks.findFirst({ where: { id: input.id } });
            } catch (e) {
                console.error(e);
                throw new Error('Error not task');
            }
        }
    })

}