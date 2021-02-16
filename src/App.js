import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=b99bb164";

function App() {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.Response === "True") {
					setMovies(res.Search);
					setLoading(false);
				} else {
					setErrorMessage(res.Error);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	const search = (searchValue) => {
		setLoading(true);
		setErrorMessage(null);
		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=b99bb164`)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((jsonResponse) => {
				console.log(jsonResponse);
				if (jsonResponse.Response === "True") {
					setMovies(jsonResponse.Search);
					setLoading(false);
				} else {
					setErrorMessage(jsonResponse.Error);
					setLoading(false);
				}
			});
	};

	return (
		<div className="App">
			<Header text="HOOKED" />
			<Search search={search} />
			<p className="App-intro">Sharing a few of our favourite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => <Movie key={`${index}-${movie.Title}`} movie={movie} />)
				)}
			</div>
		</div>
	);
}

export default App;
