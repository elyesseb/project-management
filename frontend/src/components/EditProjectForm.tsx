import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";
import { getProjectById, updateProject } from "../services/projectService";
import { Project } from "../interfaces/Project";
import { getAllCategories } from "../services/categoryService";

interface CategoryOption {
  value: number;
  label: string;
}

const EditProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await getProjectById(Number(id));
      setProject(fetchedProject);
      setTitle(fetchedProject.title);
      setDescription(fetchedProject.description || "");

      const formattedCategories = fetchedProject.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setSelectedCategories(formattedCategories);
    };

    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      const formattedOptions = fetchedCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoryOptions(formattedOptions);
    };

    fetchProject();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
        const categoryIds = selectedCategories.map((cat) => cat.value);

        console.log('Submitting project data:', {
            title,
            description,
            categoryIds,
        });

        try {
            await updateProject(project.id, {
                title,
                description,
                categoryIds,
            });
            navigate("/projects");
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }
};

  const handleCategoryChange = (selected: MultiValue<CategoryOption>) => {
    setSelectedCategories((selected as CategoryOption[]) || []);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Select isMulti options={categoryOptions} value={selectedCategories} onChange={handleCategoryChange} placeholder="Select categories" />
      <Button type="submit" colorScheme="blue">
        Update Project
      </Button>
    </Box>
  );
};

export default EditProjectForm;
