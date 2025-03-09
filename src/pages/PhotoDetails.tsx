import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Typography, CircularProgress, Card, CardMedia, CardContent, Box, Button } from "@mui/material";
import { usePhotoStore } from "../store/usePhotoStore";

const API_URL = "https://api.unsplash.com/photos";

const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const searchQuery = usePhotoStore((state) => state.searchVal); 

  const { data: photo, isLoading, error } = useQuery({
    queryKey: ["photo", id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/${id}`, {
        params: { client_id: import.meta.env.VITE_API_KEY },
      });
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error || !photo) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" color="error">Error fetching photo details</Typography>
    </Box>
  );

  const handleBackToPhotos = () => {
    navigate(`/?query=${searchQuery}`);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "150px" }}>
      <Card elevation={3}>
        <CardMedia
          component="img"
          height="550px"
          image={photo?.urls?.regular}
          alt={photo?.alt_description || "No description available"}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {photo?.alt_description || "No description available"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Photo by <strong>{photo?.user?.name}</strong> on Unsplash
          </Typography>
          <Button
            variant="outlined"
            onClick={handleBackToPhotos} 
            sx={{ marginTop: 2 }}
          >
            Back to Photos
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PhotoDetails;
