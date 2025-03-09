import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import PhotoCard from "../components/PhotoCard";
import { Photo } from "../interfaces/types";
import { usePhotoStore } from "../store/usePhotoStore"; 

const SEARCH_API_URL = "https://api.unsplash.com/search/photos";
const RANDOM_API_URL = "https://api.unsplash.com/photos/random";
const IMAGES_PER_PAGE = 20;

const HomePage: React.FC = () => {
  const { searchVal, setSearchVal, currentPage, setCurrentPage } = usePhotoStore(); 

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [randomPhotosCache, setRandomPhotosCache] = useState<Photo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [cache, setCache] = useState<Record<string, { results: Photo[], total: number }>>({});

  const searchTimeout = useRef<number | null>(null);

  useEffect(() => {
    const fetchRandomPhotos = async () => {
      if (searchVal) return;
      try {
        if (randomPhotosCache.length === 0) {
          const response = await axios.get(RANDOM_API_URL, {
            params: {
              count: IMAGES_PER_PAGE, 
              client_id: import.meta.env.VITE_API_KEY,
            },
          });
          setRandomPhotosCache(response.data);
          setPhotos(response.data);
          setTotalPages(1); 
        }
      } catch (error) {
        console.error("Error fetching random photos:", error);
      }
    };
    
  
    fetchRandomPhotos();
  }, [searchVal]);
  
  useEffect(() => {
    if (searchVal.length > 2) {
      handleSearch(searchVal, currentPage);
    } else if (!searchVal) {
      const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
      const paginatedPhotos = randomPhotosCache.slice(startIndex, startIndex + IMAGES_PER_PAGE);
      setPhotos(paginatedPhotos);
    }
  }, [currentPage, searchVal]);
  

  const handleSearch = async (query: string, page: number = 1) => {
    setSearchVal(query);
    setCurrentPage(page);

    const cacheKey = `${query}-${page}`;
    if (cache[cacheKey]) {
      setPhotos(cache[cacheKey].results);
      setTotalPages(Math.ceil(cache[cacheKey].total / IMAGES_PER_PAGE));
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length > 2) {
      searchTimeout.current = window.setTimeout(async () => {
        try {
          const response = await axios.get(SEARCH_API_URL, {
            params: {
              query: query,
              per_page: IMAGES_PER_PAGE,
              page: page,
              client_id: import.meta.env.VITE_API_KEY,
            },
          });

          setPhotos(response.data.results);
          setTotalPages(Math.ceil(response.data.total / IMAGES_PER_PAGE));
          setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: { results: response.data.results, total: response.data.total },
          }));
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      }, 500);
    } else {
      setPhotos([]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background: "white",
          padding: 2,
          marginTop: "100px",
        }}
      >
        <SearchForm onSearch={(query) => handleSearch(query, 1)} />
      </Box>

      {photos.length > 0 ? (
        <>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={3}
            width="100%"
            minHeight="100vh"
          >
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={2}
              maxWidth="1200px"
              width="100%"
              padding={2}
            >
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </Box>
          </Box>

          {(searchVal.length > 2 ) && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                sx={{ marginRight: 2 }}
              >
                Previous
              </Button>
              <Typography variant="body1" sx={{ alignSelf: "center" }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                sx={{ marginLeft: 2 }}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      ) : searchVal.length > 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          No photos found
        </Typography>
      ) : null}
    </Container>
  );
};

export default HomePage;
