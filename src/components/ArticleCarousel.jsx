import React from "react";
import Slider from "react-slick";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ArticleCarousel({ posts }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {posts.map(post => (
        <Box key={post.id} p={5}>
          <Image src={post.imageUrl || "/path/to/default-image.jpg"} alt={post.title} />
          <Heading fontSize="lg" mt={4} as={Link} to={`/article/${post.id}`}>
            {post.title}
          </Heading>
          <Text mt={2}>{post.content.substring(0, 100)}...</Text>
        </Box>
      ))}
    </Slider>
  );
}

export default ArticleCarousel;
