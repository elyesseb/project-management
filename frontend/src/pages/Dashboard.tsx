import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
// import ProjectList from "./ProjectList";
import AddProjectForm from "../components/AddProjectForm";
import ProjectList from "../components/ProjectList";

enum DashboardSection {
  ProjectList,
  AddProject,
}

const Dashboard = () => {
  const [section, setSection] = useState<DashboardSection>(DashboardSection.ProjectList);

  return (
    <Box display="flex" p={4}>
      <VStack align="flex-start" width="200px" p={4} borderRight="1px solid #ddd">
        <Button onClick={() => setSection(DashboardSection.ProjectList)} colorScheme="teal">
          View Projects
        </Button>
        <Button onClick={() => setSection(DashboardSection.AddProject)} colorScheme="teal">
          Add Project
        </Button>
      </VStack>

      <Box flex="1" p={4}>
        {section === DashboardSection.ProjectList && <ProjectList />}
        {section === DashboardSection.AddProject && <AddProjectForm />}
      </Box>
    </Box>
  );
};

export default Dashboard;
