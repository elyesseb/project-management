import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { createCategory } from "../services/categoryService";
import { Category } from "../interfaces/Category";

interface AddCategoryFormProps {
  onCategoryAdded: (newCategory: Category) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newCategory = await createCategory({ name: categoryName });
      onCategoryAdded(newCategory);
      setCategoryName("");
    } catch (err) {
      setError("Erreur lors de la création de la catégorie.");
      console.error(err);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Input placeholder="Nom de la catégorie" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
      <Button type="submit" colorScheme="blue" mt={2}>
        Ajouter Catégorie
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default AddCategoryForm;
