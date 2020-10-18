import React, { Component } from 'react';
import Movie from './movie';

class Movies extends Component {
    render() {
        return (
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

                {this.props.movies.map((movie) => {
                    return (
                        <Movie
                            key={movie._id}
                            movie={movie}
                            onDelete={this.props.onDelete}
                            onLikeToggle={this.props.onLikeToggle}
                        />
                    );
                })}
            </table>
        );
    }
}

export default Movies;
