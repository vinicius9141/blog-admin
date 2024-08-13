import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import ArticleEditor from "./ArticleEditor";

function AdminPanel() {
  const [view, setView] = useState("addArticle");

  return (
    <Box p={5}>
      <Heading mb={4}>Painel Administrativo</Heading>
      <Button onClick={() => setView("addArticle")} mb={2}>Adicionar Artigo</Button>
      {/* Aqui você pode adicionar mais opções para navegação no painel, se necessário */}

      {view === "addArticle" && <ArticleEditor />}
    </Box>
  );
}

export default AdminPanel;
