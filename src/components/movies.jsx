import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import Filter from './common/filter';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4, //pagination render 4 items on each page, so 3 pages in total
		currentPage: 1,
		genres: [],
		selectedGenre: null,
		sortColumn: { path: 'title', order: 'asc' },
	};

	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: [{ _id: '', name: 'All Genres' }, ...getGenres()],
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

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			movies: allMovies,
			sortColumn,
		} = this.state;

		if (count === 0) return <p>There is no movie in the databse</p>;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(
			filtered,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(sorted, currentPage, pageSize);

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
						sortColumn={sortColumn}
						onLikeToggle={this.handleLiked}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
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
