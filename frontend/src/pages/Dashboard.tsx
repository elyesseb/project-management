import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import AddProjectForm from "../components/AddProjectForm";
import ProjectList from "../components/ProjectList";
import AddCategoryForm from "../components/AddCategoryForm";
import { Category } from "../interfaces/Category";

enum DashboardSection {
  ProjectList,
  AddProject,
  AddCategory,
}

const Dashboard = () => {
  const [section, setSection] = useState<DashboardSection>(DashboardSection.ProjectList);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <Box display="flex" p={4}>
      <VStack align="flex-start" width="200px" p={4} borderRight="1px solid #ddd">
        <Button onClick={() => setSection(DashboardSection.ProjectList)} colorScheme="teal">
          View Projects
        </Button>
        <Button onClick={() => setSection(DashboardSection.AddProject)} colorScheme="teal">
          Add Project
        </Button>
        <Button onClick={() => setSection(DashboardSection.AddCategory)} colorScheme="teal">
          Add Category
        </Button>
      </VStack>

      <Box flex="1" p={4}>
        {section === DashboardSection.ProjectList && <ProjectList />}
        {section === DashboardSection.AddProject && <AddProjectForm />}
        {section === DashboardSection.AddCategory && <AddCategoryForm onCategoryAdded={handleCategoryAdded} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
