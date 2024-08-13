import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { categories } from "../categories";  // Importando as categorias
import MainBanner from "./MainBanner"; // Importe o banner principal

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesQuery = query(collection(db, "blog-admin-artigos"), where("visible", "==", true), orderBy("createdAt", "desc"));
        const articlesSnapshot = await getDocs(articlesQuery);
        const articlesData = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesData);
      } catch (error) {
        console.error("Erro ao buscar artigos: ", error);
      }
    };

    fetchArticles();
  }, []);

  const renderCategorySection = (category) => {
    const filteredArticles = articles.filter(article => article.category === category.slug);

    if (filteredArticles.length === 0) return null;

    return (
      <Box key={category.slug} mb={10} className="conteiner">
        <Heading mb={4}>{category.name}</Heading>
        <SimpleGrid columns={[1, null, 3]} spacing={5}>
          {filteredArticles.map(article => (
            <Box key={article.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading fontSize="xl" mb={4}>{article.title}</Heading>
              <Box dangerouslySetInnerHTML={{ __html: article.content.substring(0, 200) + "..." }} />
              <Button as={Link} to={`/article/${article.id}`} mt={4} colorScheme="teal">
                Ler mais
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <Box p={5}>
      <MainBanner /> {/* Integração do banner principal na homepage */}
      {categories.map(category => renderCategorySection(category))}
    </Box>
  );
}

export default HomePage;
