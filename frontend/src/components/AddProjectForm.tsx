import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Flex } from "@chakra-ui/react";
import { addProject } from "../services/projectService";
import { getAllCategories } from "../services/categoryService";
import Select, { MultiValue } from "react-select";

interface CategoryOption {
  value: number;
  label: string;
}

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      const options = fetchedCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoryOptions(options);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryIds = selectedCategories.map((cat) => cat.value);
    try {
      const newProject = await addProject({
        title,
        description,
        categoryIds,
      });
      console.log("Project created:", newProject);
      setTitle("");
      setDescription("");
      setSelectedCategories([]);
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  const handleCategoryChange = (selected: MultiValue<CategoryOption>) => {
    setSelectedCategories(selected as CategoryOption[]);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <VStack align="flex-start" spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select isMulti options={categoryOptions} value={selectedCategories} onChange={handleCategoryChange} placeholder="Select categories" />
        </FormControl>
        <Flex justify="flex-end" width="100%">
          <Button type="submit" colorScheme="blue" mt={2}>
            Add Project
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddProjectForm;
