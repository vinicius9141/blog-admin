import React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";

function ArticleCard({ article }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={4}>{article.title}</Heading>
      {article.imageUrl ? (
        <Image src={article.imageUrl} alt={article.title} borderRadius="md" />
      ) : (
        <Box 
          height="200px" 
          borderRadius="md" 
          bg="gray.200" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Text color="gray.500">Sem Imagem</Text>
        </Box>
      )}
      <Text mt={4}>{article.content}</Text>
    </Box>
  );
}

export default ArticleCard;
