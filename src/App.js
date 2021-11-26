import "./App.css";
import React, { useEffect, useState } from "react";
import MovieRow from "./MovieRow";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Tab, Tabs, Box, CircularProgress } from "@mui/material";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [value, setValue] = React.useState("trending");
  const [isLoading, setIsLoading] = useState(false);
  const tabUrls = {
    trending_url: `https://api.themoviedb.org/3/trending/movie/week?api_key=9156787f23dfee8a782b0e9433615a76`,
    topRated_url: `https://api.themoviedb.org/3/movie/top_rated?api_key=9156787f23dfee8a782b0e9433615a76&language=en-US&page=1`,
    upcoming_url: `https://api.themoviedb.org/3/movie/upcoming?api_key=9156787f23dfee8a782b0e9433615a76&language=en-US&page=1`,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const searchHandler = async (val) => {
    setSearchVal(val);
    if (val !== "") {
      try {
        setIsLoading(true);
        let response = await fetch(`
      https://api.themoviedb.org/3/search/movie?api_key=9156787f23dfee8a782b0e9433615a76&query=${val}`);
        let ans = await response.json();
        setIsLoading(false);
        console.log(ans.results);
        moviesRows(ans.results);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    } else {
      userBasedMovies(tabUrls.trending_url);
    }
  };

  const userBasedMovies = async (url) => {
    try {
      setIsLoading(true);
      let response = await fetch(url);
      let ans = await response.json();
      setIsLoading(false);
      console.log(ans.results);
      moviesRows(ans.results);
    } catch (err) {
      console.error(err);
    }
  };

  const moviesRows = (moviesData) => {
    let moviesArr = [];
    moviesData?.length > 0 &&
      moviesData.forEach((movie) => {
        // console.log(src);
        const rows = <MovieRow movie={movie} />;
        moviesArr.push(rows);
      });
    setMoviesData(moviesArr);
  };

  useEffect(() => {
    setSearchVal("");
    userBasedMovies(tabUrls.trending_url);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let url = "";
    if (value === "trending") {
      url = tabUrls.trending_url;
    } else if (value === "top_rated") {
      url = tabUrls.topRated_url;
    } else if (value === "upcoming") {
      url = tabUrls.upcoming_url;
    }
    userBasedMovies(url);
  }, [value]);

  console.log("searchVal", searchVal);

  return (
    <div className="App">
      <table
        style={{
          backgroundColor: "#000",
          display: "block",
          color: "#FF4500",
        }}
      >
        <tbody>
          <tr>
            <td>
              <img src="Logo.png" alt="Logo" />
            </td>
            <td>
              <h2> Movie Searcher </h2>
            </td>
            <td style={{ marginLeft: "30%" }}>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="trending" label="Trending" />
                  <Tab value="top_rated" label="Top Rated" />
                  <Tab value="upcoming" label="Upcoming" />
                </Tabs>
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
      <TextField
        style={{
          width: "99%",
          border: "5px solid #b30000",
          borderRadius: "50px",
        }}
        value={searchVal}
        placeholder="Search Movies"
        onChange={(e) => searchHandler(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isLoading ? <CircularProgress size="3" /> : moviesData}
      {!isLoading && searchVal === "" && (
        <h3 style={{ color: "#ff0000", backgroundColor: "#000" }}>
          {value.toUpperCase()} Movies
        </h3>
      )}
    </div>
  );
}

export default App;
