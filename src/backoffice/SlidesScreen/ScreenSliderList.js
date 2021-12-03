import React from 'react';
import { Link } from 'react-router-dom';

import { mock } from './mock';
import { ItemList } from './ItemList';
import './screenslide.scss';

export const ScreenSliderList = () => {
    return (
        <table className="screen__main">
            <tr className="screen__head-container">
                <th className="screen__head-title">Listado de Slides</th>
                <Link
                    to="/backoffice/Slides/create"
                    className="screen__create-button"
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
