import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Delete } from '../../Services/privateApiService';


export const ItemList = ({ data }) => {
    const [msg, setMsg] = useState('');

    const handleDelete = async() => {
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
        <td className="screen__items">
            <div className="screen__text">
                <h3 className="screen__title">{data.name}</h3>
                <div className="screen__div-button">
                    {
                     data.order ?
                         (<h5>Order: {data.order}</h5>)
                         : (<h5>No order</h5>)
                    }
                    <div className="screen__buttons">
                        <Link to={`/backoffice/Slides/create/${data.id}`}>
                            <i className="fas fa-edit"></i>
                        </Link>
                        <button onClick={handleDelete}>
                            <i className="fas fa-trash-alt" onClick={handleDelete}></i>
                        </button>
                    </div>
                </div>
            </div>
            <img
                className="screen__image"
                src={data.image}
                alt={data.image}
            />
            <h5>{msg}</h5>
        </td>
    );
};
