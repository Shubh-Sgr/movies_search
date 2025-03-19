import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const MovieRow = ({ movie }) => {
  const { title, overview, poster_path, id } = movie;
  const src = `https://image.tmdb.org/t/p/w300/${poster_path}`;
  const viewDetailHandler = (id) => {
    const url = `https://www.themoviedb.org/movie/${id}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      sx={{
        bgcolor: "#121212",
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        image={src}
        alt={title}
        sx={{ height: 450, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#FF4500" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: "#ccc" }}>
          {overview.length > 100 ? `${overview.slice(0, 100)}...` : overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          sx={{ bgcolor: "#FF4500", "&:hover": { bgcolor: "#cc3700" } }}
          onClick={() => viewDetailHandler(id)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieRow;
