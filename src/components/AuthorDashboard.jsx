import React, { useEffect, useState } from "react";
import { Box, Heading, Button, Stack } from "@chakra-ui/react";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AuthorDashboard() {
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, "blog-admin-artigos"), where("author", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const articlesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticles(articlesData);
    };

    fetchArticles();
  }, [user]);

  const handleEdit = (articleId) => {
    navigate(`/edit/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    try {
      await deleteDoc(doc(db, "blog-admin-artigos", articleId));
      setArticles(articles.filter(article => article.id !== articleId));
      toast.success("Artigo excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir o artigo.");
    }
  };

  const handleToggleVisibility = async (articleId, currentVisibility) => {
    try {
      const articleRef = doc(db, "blog-admin-artigos", articleId);
      await updateDoc(articleRef, { visible: !currentVisibility });
      setArticles(articles.map(article =>
        article.id === articleId ? { ...article, visible: !currentVisibility } : article
      ));
      toast.success(`Artigo ${currentVisibility ? 'ocultado' : 'exibido'} com sucesso!`);
    } catch (error) {
      toast.error("Erro ao atualizar a visibilidade do artigo.");
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Meus Artigos</Heading>
      <Stack spacing={4}>
        {articles.map((article) => (
          <Box key={article.id} p={5} shadow="md" borderWidth="1px">
            <Heading size="md">{article.title}</Heading>
            <Box mt={2} dangerouslySetInnerHTML={{ __html: article.content }} />
            <Button mt={4} onClick={() => handleEdit(article.id)} colorScheme="teal">
              Editar
            </Button>
            <Button mt={4} ml={2} onClick={() => handleDelete(article.id)} colorScheme="red">
              Excluir
            </Button>
            <Button mt={4} ml={2} onClick={() => handleToggleVisibility(article.id, article.visible)} colorScheme="yellow">
              {article.visible ? 'Ocultar' : 'Exibir'}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default AuthorDashboard;
