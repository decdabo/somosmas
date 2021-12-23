import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

export const SearchActivities = () => {
    const [activitiesList, setActivitiesList] = useState([]);
    
    const GetSearch = async (value) => {
        try {
            const dataSearch = await axios.get(`${process.env.REACT_APP_API}/activities?seach=${value}`)
            return dataSearch;
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e, handleChange, values) => {
        handleChange(e);
        const { value } = values;
        const searchName = value.toLowerCase()

        try {
            GetSearch(searchName)
                .then(res => setActivitiesList(res))
                .catch(e => console.log(e));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik
            initialValues={{
                searchText: '',
            }}
            validate={(values) => {
                let errors = {}
                if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.searchText)) {
                    errors.searchText = 'El nombre del héroe solo debe contener letras'
                }
                return errors;
            }}
        >
            {({ values, handleChange, errors }) => (
                <div className="container h-25 my-5">
                    <div className="row w-100">
                        <hr />
                        <input
                            autoComplete="off"
                            className="form-control form-control-lg mb-3"
                            type="text"
                            name="searchText"
                            id="searchText"
                            value={values.searchText}
                            placeholder="Busque una actividad"
                            aria-label=".form-control-lg example"
                            onChange={(e) => handleInputChange(e, handleChange, e.target)}
                        />
                        {errors.searchText && <h4 className="fs-6 text-danger">{errors.searchText}</h4>}
                        <hr />
                    </div>
                    {
                        (activitiesList.status === 200 && !errors.searchText)
                            ? (<h1>Sexo</h1>)
                            : (<h4 className="fs-6 text-danger">{activitiesList.error}</h4>)
                    }
                </div>
            )}

        </Formik>
    );
}