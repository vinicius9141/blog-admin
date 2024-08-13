import React, { useEffect, useState } from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

// Função para extrair a URL da primeira imagem do conteúdo
function extractImageUrl(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
}

function MainBanner() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesQuery = query(
          collection(db, "blog-admin-artigos"), 
          where("visible", "==", true), // Apenas artigos visíveis
          orderBy("createdAt", "desc"), 
          limit(4)
        );
        const articlesSnapshot = await getDocs(articlesQuery);
        const articlesData = articlesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            imageUrl: extractImageUrl(data.content), // Extrai a URL da primeira imagem
          };
        });

        console.log("Artigos carregados:", articlesData);
        setArticles(articlesData);
      } catch (error) {
        console.error("Erro ao buscar artigos: ", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="2fr 1fr" gridTemplateRows="1fr 1fr" gridGap={4} mb={8}>
      {articles.length > 0 && (
        <>
          {/* Artigo Principal à Esquerda */}
          <Box gridColumn="1 / 2" gridRow="1 / 3" position="relative">
            <Image 
              src={articles[0].imageUrl || "https://via.placeholder.com/800x600"}  // Usando a URL da imagem extraída
              alt={articles[0].title} 
              objectFit="cover" 
              width="100%" 
              height="100%" 
              borderRadius="lg" 
            />
            <Box 
              position="absolute" 
              bottom={0} 
              left={0} 
              right={0} 
              p={4} 
              bg="rgba(0, 0, 0, 0.5)" 
              borderBottomRadius="lg"
            >
              <Text fontSize="sm" color="green.400">{articles[0].category}</Text>
              <Heading 
                as={Link} 
                to={`/article/${articles[0].id}`} 
                fontSize="xl" 
                color="white"
              >
                {articles[0].title}
              </Heading>
            </Box>
          </Box>

          {/* Artigos à Direita */}
          {articles.slice(1).map((article, index) => (
            <Box key={article.id} gridColumn="2 / 3" gridRow={index + 1} position="relative">
              <Image 
                src={article.imageUrl || "https://via.placeholder.com/400x300"}  // Usando a URL da imagem extraída
                alt={article.title} 
                objectFit="cover" 
                width="100%" 
                height="100%" 
                borderRadius="lg" 
              />
              <Box 
                position="absolute" 
                bottom={0} 
                left={0} 
                right={0} 
                p={4} 
                bg="rgba(0, 0, 0, 0.5)" 
                borderBottomRadius="lg"
              >
                <Text fontSize="sm" color="green.400">{article.category}</Text>
                <Heading 
                  as={Link} 
                  to={`/article/${article.id}`} 
                  fontSize="md" 
                  color="white"
                >
                  {article.title}
                </Heading>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

export default MainBanner;
