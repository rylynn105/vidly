import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import Filter from './common/filter';

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4, //pagination render 4 items on each page, so 3 pages in total
        currentPage: 1,
        genres: [],
        selectedGenre: null,
    };

    componentDidMount() {
        this.setState({
            movies: getMovies(),
            genres: [{ _id: 'allGenre', name: 'All Genres' }, ...getGenres()],
        });
    }

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

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreFilter = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            currentPage,
            genres,
            selectedGenre,
            movies: allMovies,
        } = this.state;

        if (count === 0) return <p>There is no movie in the databse</p>;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
                : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <Filter
                        genres={genres}
                        selectedGenre={selectedGenre}
                        movies={allMovies}
                        onGenreSelected={this.handleGenreFilter}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in database.</p>
                    <MoviesTable
                        movies={movies}
                        onLikeToggle={this.handleLiked}
                        onDelete={this.handleDelete}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
