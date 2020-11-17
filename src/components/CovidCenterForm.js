import React, { useState, useEffect } from 'react';

const CovidCenterForm = (props) => {
    const initialFieldValues = {
        name: '',
        state: '',
        type: '',
        category: ''
    }

    var [values, setValues] = useState(initialFieldValues)


    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.covidCenterObjects[props.currentId]
            })
    }, [props.currentId, props.covidCenterObjects])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i class="fas fa-hospital"></i>
                    </div>
                </div>
                <input className="form-control" name="name" placeholder="Hospital Name"
                    value={values.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i class="far fa-flag"></i>
                        </div>
                    </div>

                    <input className="form-control" name="state" placeholder="Enter State"
                        value={values.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i class="fab fa-empire"></i>
                        </div>
                    </div>
                    <input className="form-control" name="type" placeholder="Government/Private"
                        value={values.type}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group input-group ">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i class="fas fa-warehouse"></i>
                        </div>
                    </div>
                    <input className="form-control" name="category" placeholder="Enter Category"
                        value={values.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            <div className="form-group">
                <input type="submit" value={props.currentId == "" ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default CovidCenterForm;