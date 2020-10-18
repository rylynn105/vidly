import React from 'react';
import Like from './common/like';

function Movie(props) {
    return (
        <tbody>
            <tr>
                <td>{props.movie.title}</td>
                <td>{props.movie.genre.name}</td>
                <td>{props.movie.numberInStock}</td>
                <td>{props.movie.dailyRentalRate}</td>
                <td>
                    <Like
                        liked={props.movie.liked}
                        onLikeToggle={() => props.onLikeToggle(props.movie)}
                    />
                </td>
                <td>
                    <button
                        onClick={() => props.onDelete(props.movie._id)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    );
}
export default Movie;
