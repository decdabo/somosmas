import React from 'react';
import { Formik } from 'formik';
import { Get } from '../../Services/publicApiService';
import { alertError } from '../../Services/alerts/Alerts';

export const SearchActivities = ({ setActivities }) => {

    const GetSearch = async (value) => {
        try {
            const dataSearch = await Get(`activities?search=${value}`)
            return dataSearch.data;
        } catch (error) {
            alertError(error);
        }
    }

    const handleInputChange = (e, handleChange, values) => {
        handleChange(e);
        const { value } = values;
        const searchName = value.toLowerCase()
        try {
            GetSearch(searchName)
                .then(res => { setActivities(res) })
                .catch(e => alertError(e));
        } catch (error) {
            alertError(error);
        }
    }

    return (
        <Formik
            initialValues={{
                searchText: '',
            }}
        >
            {({ values, handleChange }) => (
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
                        <hr />
                    </div>
                </div>
            )}
        </Formik>
    );
}