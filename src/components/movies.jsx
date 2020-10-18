import React, { Component } from 'react';
import Movie from './movie';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4, //pagination render 4 items on each page, so 3 pages in total
        currentPage: 1,
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

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (count === 0) return <p>There is no movie in the databse</p>;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment>
                <p>Showing {count} movies in database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                    </thead>

                    {movies.map((movie) => {
                        return (
                            <Movie
                                key={movie._id}
                                movie={movie}
                                onDelete={this.handleDelete}
                                onLikeToggle={this.handleLiked}
                            />
                        );
                    })}
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Movies;
