import React, { useRef, useState } from "react";
import { TextField, Box, Container, Typography } from "@mui/material";
import { SearchFormProps } from "../interfaces/types";

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query); 
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Box
        sx={{
          mt: 3,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          width: "450px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Search Photos
        </Typography>
        <TextField
          label="Enter keywords"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleChange}
          autoComplete="off"
          ref={searchInput}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
            '& .MuiInputLabel-root': {
              color: "#666",
            },
            '& .MuiInputBase-input': {
              color: "#333",
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default SearchForm;
