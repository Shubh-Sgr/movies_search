import React from "react";
import Button from "@mui/material/Button";
const MovieRow = (props) => {
  const { title, overview, poster_path, id } = props.movie;
  const src = `https://image.tmdb.org/t/p/w300/${poster_path}`;
  const viewDetailHandler = (id) => {
    const url = `https://www.themoviedb.org/movie/${id}`;
    window.location.href = url;
  };
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "300px" }}>
            <img src={src} alt="poster" />
          </td>
          <td className="tbText">
            <h3> Title: {title} </h3>
            <p>OverView: {overview} </p>
            <Button variant="contained" onClick={() => viewDetailHandler(id)}>
              View Details
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default MovieRow;
