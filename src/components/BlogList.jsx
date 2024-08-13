import { useEffect, useState } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function BlogList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "blog-admin-artigos"));
      const articlesData = querySnapshot.docs.map((doc) => doc.data());
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  return (
    <Box p={5}>
      {articles.map((article, index) => (
        <Box key={index} mb={5}>
          <Heading size="md">{article.title}</Heading>
          <Text>{article.content}</Text>
          <Text color="gray.500">{article.category}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default BlogList;
