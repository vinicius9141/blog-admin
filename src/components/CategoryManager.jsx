import { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function CategoryManager() {
  const [category, setCategory] = useState("");

  const handleAddCategory = async () => {
    try {
      await addDoc(collection(db, "categories"), {
        name: category,
        createdAt: new Date()
      });
      setCategory("");
      alert("Categoria adicionada com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar categoria: ", e);
    }
  };

  return (
    <Box>
      <Input
        placeholder="Nome da Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb={4}
      />
      <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
    </Box>
  );
}

export default CategoryManager;
