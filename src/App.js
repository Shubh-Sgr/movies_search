import "./App.css";
import React, { useEffect, useState } from "react";
import MovieRow from "./MovieRow";
import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal, setDebouncedSearchVal] = useState("");
  const [value, setValue] = useState("trending");
  const [isLoading, setIsLoading] = useState(false);

  const tabUrls = {
    trending_url: process.env.REACT_APP_TRENDING_URL,
    topRated_url: process.env.REACT_APP_TOP_RATED_URL,
    upcoming_url: process.env.REACT_APP_UPCOMING_URL,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userBasedMovies = async (url) => {
    try {
      setIsLoading(true);
      let response = await fetch(url);
      let ans = await response.json();
      setIsLoading(false);
      setMoviesData(ans.results);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    userBasedMovies(tabUrls.trending_url);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let url = "";
    if (value === "trending") url = tabUrls.trending_url;
    else if (value === "top_rated") url = tabUrls.topRated_url;
    else if (value === "upcoming") url = tabUrls.upcoming_url;

    userBasedMovies(url);
    // eslint-disable-next-line
  }, [value]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchVal(searchVal);
    }, 500); // Debounce time in ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  // Perform search when debounced value changes
  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedSearchVal.trim() !== "") {
        try {
          setIsLoading(true);
          let response = await fetch(`${process.env.REACT_APP_SEARCH_URL}${debouncedSearchVal}`);
          let ans = await response.json();
          setMoviesData(ans.results);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error(err);
        }
      } else {
        userBasedMovies(tabUrls.trending_url);
      }
    };

    searchMovies();
    // eslint-disable-next-line
  }, [debouncedSearchVal]);

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <img src="Logo.png" alt="Logo" style={{ height: "60px" }} />
        <Typography variant="h4" sx={{ ml: 2, color: "#FF4500", fontWeight: "bold" }}>
          Movie Searcher
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ width: "100%", backgroundColor: "#1e1e1e", p: 1, borderRadius: "12px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          centered
          sx={{
            "& button": {
              color: "#aaa",
              fontSize: "1rem",
              fontWeight: 500,
              mx: 2,
            },
            "& button.Mui-selected": {
              color: "#FF4500",
              fontWeight: 700,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#FF4500",
              height: "4px",
              borderRadius: "2px",
            },
          }}
        >
          <Tab value="trending" label="🔥 Trending" />
          <Tab value="top_rated" label="⭐ Top Rated" />
          <Tab value="upcoming" label="🎬 Upcoming" />
        </Tabs>
      </Box>

      {/* Search Bar */}
      <Container sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Movies"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          sx={{
            input: { color: "#fff" },
            bgcolor: "#121212",
            borderRadius: "50px",
            boxShadow: 3,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon sx={{ color: "#FF4500" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>

      {/* Movie Section */}
      <Container>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress size={60} sx={{ color: "#FF4500" }} />
          </Box>
        ) : (
          <>
            {!searchVal && (
              <Typography
                variant="h5"
                align="center"
                sx={{
                  mb: 3,
                  color: "#FF4500",
                  fontWeight: "bold",
                }}
              >
                {value.toUpperCase()} Movies
              </Typography>
            )}
            <Grid container spacing={3}>
              {moviesData?.length > 0 ? (
                moviesData.map((movie) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                    <MovieRow movie={movie} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" align="center">
                  No Movies Found
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;