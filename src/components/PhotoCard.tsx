import React from "react";
import { Card, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PhotoCardProps } from "../interfaces/types";




const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photo/${photo.id}`);
  };

  return (
    <Card 
      onClick={handleClick} 
      sx={{
        cursor: "pointer", 
        borderRadius: 0, 
        width: "200px", 
        height: "200px",
        overflow: "hidden", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        boxShadow: "none", 
      }} 
    >
      <CardActionArea sx={{ height: "100%", width: "100%" }}>
        <CardMedia
          component="img"
          image={photo.urls.small}
          alt={photo.alt_description} 
          sx={{
            objectFit: "contain", 
            height: "100%", 
            width: "100%", 
          }}
        />
      </CardActionArea>
    </Card>


  );
};

export default PhotoCard;
