import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

const prisma = new PrismaClient();

export const addProject = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, categoryIds } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const project = await prisma.project.create({
            data: {
                title,
                description,
                userId,
                categories: {
                    connect: categoryIds.map((id: number) => ({ id })),
                },
            },
        });
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            include: { categories: true },
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id, 10) },
            include: { categories: true },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, categoryIds } = req.body;
    const userId = req.userId;

    try {
        const project = await prisma.project.findUnique({ where: { id: Number(id) } });

        if (project?.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorised' });
        }

        const updatedProject = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                categories: {
                    set: categoryIds.map((id: number) => ({ id })),
                },
            },
        });
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const project = await prisma.project.findUnique({ where: { id: Number(id) } });

        if (project?.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorised' });
        }

        await prisma.project.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting project', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjectsByCategory = async (req: AuthenticatedRequest, res: Response) => {
    const { categoryId } = req.query;
    const categoryIdNumber = parseInt(categoryId as string, 10);
    const userId = req.userId;

    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: userId,
                categories: {
                    some: {
                        id: categoryIdNumber,
                    },
                },
            },
            include: { categories: true },
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects by category', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserProjects = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const projects = await prisma.project.findMany({
            where: { userId },
            include: { categories: true },
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching user projects', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};