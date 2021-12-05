import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Delete } from '../../Services/privateApiService';


export const ItemList = ({ data }) => {
    const [msg, setMsg] = useState('');

    const handleDelete = async () => {
        try {
            const deleteData = await Delete('slides', data.id);
            setMsg(deleteData.data.message);
            return deleteData.data;
        } catch (error) {
            console.log(error);
            setMsg('Esta publicación no existe')
        }
    };

    return (
        <td className="table__items">
            <div className="table__text">
                <h3 className="table__title">{data.name}</h3>
                <div className="table__div-button">
                    {
                        data.order ?
                            (<h5>Order: {data.order}</h5>)
                            : (<h5>No order</h5>)
                    }
                    <div className="table__buttons-box">
                        <Link
                            className="table__button-table edit-button"
                            to={`/backoffice/Slides/create/${data.id}`}
                        >
                            <i className="fas fa-edit"></i>
                        </Link>
                        <button onClick={handleDelete} className="table__button-table delete-button">
                            <i className="fas fa-trash-alt" onClick={handleDelete} />
                        </button>
                    </div>
                </div>
            </div>
            <h5 className="text-danger">{msg}</h5>
            <img
                className="table__image"
                src={data.image}
                alt={data.image}
            />
        </td>
    );
};
