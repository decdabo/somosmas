import React from 'react';
import { Link } from 'react-router-dom';

import { ItemList } from './ItemList';
import { mock } from './mock';

export const ScreenSliderList = () => {
    return (
        <table className="table__main">
            <tr className="table__head-container">
                <th className="table__head-title">Listado de Slides</th>
                <Link
                    to="/backoffice/Slides/create"
                    className="table__create-button"
                >
                    Create
                </Link>
            </tr>
            <tr>
                {
                    mock.map((data, i) => {
                        return (<ItemList key={i} data={data} />)
                    })
                }
            </tr>
        </table>
    );
}
