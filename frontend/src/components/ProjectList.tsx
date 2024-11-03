import { useEffect, useState } from "react";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Select, Text } from "@chakra-ui/react";
import { getUserProjects, deleteProject, getProjectsByCategory } from "../services/projectService";
import { Project } from "../interfaces/Project";
import { getAllCategories } from "../services/categoryService";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selectedCategory) {
          const filteredProjects = await getProjectsByCategory(selectedCategory);
          setProjects(filteredProjects);
          if (filteredProjects.length === 0) {
            setError("No project with the category");
          }
        } else {
          const fetchedProjects = await getUserProjects();
          setProjects(fetchedProjects);
        }
      } catch (err) {
        setError("Error while fetching projects");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
    fetchProjects();
  }, [selectedCategory]);

  const handleDelete = async (projectId: number) => {
    await deleteProject(projectId);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <Box>
      <Select placeholder="Select category" onChange={(e) => setSelectedCategory(Number(e.target.value))}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      {loading && <Text>Loading projects...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {projects.length === 0 && !loading && !error && <Text>No projects.</Text>}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Categories</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr key={project.id}>
              <Td>{project.title}</Td>
              <Td>{project.description}</Td>
              <Td>{project.categories.map((category) => category.name).join(", ")}</Td>
              <Td>
                <Button colorScheme="blue" mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProjectList;
