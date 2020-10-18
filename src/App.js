import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import { getMovies } from './services/fakeMovieService';

class App extends Component {
    state = {
        movies: getMovies(),
    };

    handleClick = (movieId) => {
        this.setState({
            movies: this.state.movies.filter((m) => m._id !== movieId),
        });
    };

    render() {
        return (
            <main className="container">
                <h5>Showing {this.state.movies.length} movies in database</h5>
                <Movies movies={this.state.movies} onClick={this.handleClick} />
            </main>
        );
    }
}

export default App;
