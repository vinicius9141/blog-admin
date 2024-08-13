import React, { useEffect, useState } from "react";
import { Box, Heading, Image, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { AdSense } from "./AdSense";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "blog-admin-artigos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const articleData = docSnap.data();
          setArticle(articleData);

          // Fetch related articles based on the category
          fetchRelatedArticles(articleData.category);
        } else {
          console.error("Artigo não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar artigo:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const fetchRelatedArticles = async (category) => {
    try {
      const relatedQuery = query(
        collection(db, "blog-admin-artigos"),
        where("category", "==", category),
        where("visible", "==", true),
        limit(3) // Limita a 3 artigos relacionados
      );
      const relatedSnapshot = await getDocs(relatedQuery);
      const relatedData = relatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setRelatedArticles(relatedData.filter(item => item.id !== id)); // Exclui o artigo atual da lista
    } catch (error) {
      console.error("Erro ao buscar artigos relacionados: ", error);
    }
  };

  if (!article) {
    return <Text>Carregando...</Text>;
  }

  const imageUrl = article.imageUrl || extractImageUrl(article.content);

  return (
    <Box p={5}>
      <Heading mb={4}>{article.title}</Heading>
      {imageUrl && (
        <Image src={imageUrl} alt={article.title} width="100%" height="auto" mb={4} borderRadius="lg" />
      )}
      <Box mb={8} dangerouslySetInnerHTML={{ __html: article.content }} />

      {/* AdSense - Primeiro bloco de anúncios */}
      <AdSense />

      {/* Leia também - Seção com artigos relacionados */}
      {relatedArticles.length > 0 && (
        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>Leia também:</Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={5}>
            {relatedArticles.map(related => (
              <Box key={related.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Heading fontSize="lg" mb={4}>{related.title}</Heading>
                <Text mb={4} dangerouslySetInnerHTML={{ __html: related.content.substring(0, 200) + "..." }} />
                <Button as={Link} to={`/article/${related.id}`} colorScheme="teal">
                  Ler mais
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* AdSense - Segundo bloco de anúncios */}
      <AdSense />
    </Box>
  );
}

// Função para extrair a URL da primeira imagem do conteúdo
function extractImageUrl(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
}

export default ArticlePage;
