import { useEffect, useState } from "react";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getUserProjects, deleteProject } from "../services/projectService";
import { Project } from "../interfaces/Project";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate(); // Utilisation de useNavigate

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getUserProjects();
      setProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: number) => {
    await deleteProject(projectId);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <Box>
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
                <Button colorScheme="blue" mr={2} onClick={() => navigate(`/projects/edit/${project.id}`)}>
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
