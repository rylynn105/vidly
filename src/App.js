import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import { getMovies } from './services/fakeMovieService';

class App extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = (movieId) => {
        this.setState({
            movies: this.state.movies.filter((m) => m._id !== movieId),
        });
    };

    handleLiked = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;

        this.setState({ movies });
    };

    render() {
        return (
            <main className="container">
                <h5>Showing {this.state.movies.length} movies in database.</h5>
                <Movies
                    movies={this.state.movies}
                    onDelete={this.handleDelete}
                    onLikeToggle={this.handleLiked}
                />
            </main>
        );
    }
}

export default App;
