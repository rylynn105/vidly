import React, { Component } from 'react';

class Movie extends Component {
    render() {
        return (
            <tbody>
                <tr>
                    <td>{this.props.movie.title}</td>
                    <td>{this.props.movie.genre.name}</td>
                    <td>{this.props.movie.numberInStock}</td>
                    <td>{this.props.movie.dailyRentalRate}</td>
                    <td>
                        <button
                            onClick={() =>
                                this.props.onClick(this.props.movie._id)
                            }
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
}

export default Movie;
