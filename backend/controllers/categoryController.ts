import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({
            data: { name },
        });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { name } = req.body;
    try {
        const category = await prisma.category.update({
            where: { id },
            data: { name },
        });
        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.category.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting category', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};