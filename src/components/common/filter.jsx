import React from 'react';

const Filter = (props) => {
    const {
        genres,
        selectedGenre,
        onGenreSelected,
        textProperty,
        valueProperty,
    } = props;
    return (
        <ul className="list-group">
            {genres.map((genre) => (
                <li
                    key={genre[valueProperty]}
                    className={
                        selectedGenre === genre
                            ? 'list-group-item active'
                            : 'list-group-item'
                    }
                    onClick={() => onGenreSelected(genre)}
                >
                    {genre[textProperty]}
                </li>
            ))}
        </ul>
    );
};

Filter.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
};

export default Filter;
