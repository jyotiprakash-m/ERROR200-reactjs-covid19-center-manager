import React, { useState, useEffect } from 'react';
import CovidCenterForm from "./CovidCenterForm";
import {fireDb as firebaseDb} from "../firebase";
import { auth } from "../firebase";

const CovidCenters = () => {

	var [currentId, setCurrentId] = useState('');
    var [covidCenterObjects, setcovidCenterObjects] = useState({})

    //Once components load complete
    
    useEffect(() => {
        firebaseDb.child('covidCenters').on('value', snapshot => {
            if (snapshot.val() != null) {
                setcovidCenterObjects({
                    ...snapshot.val()
                });
            }
            else
            setcovidCenterObjects({})

        })
    }, [])

// Function use for push and set data in database

    const addOrEdit = (obj) => {
        if (currentId == '')
            firebaseDb.child('covidCenters').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else
            firebaseDb.child(`covidCenters/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
    }

    // Function Use for Delete data from database

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            firebaseDb.child(`covidCenters/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
    }


  return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Covid Center Manager</h1>
                    <button onClick={() => auth.signOut()}>Sign out</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <CovidCenterForm {...({ currentId, covidCenterObjects, addOrEdit })} ></CovidCenterForm>
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Hospital</th>
                                <th>State</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(covidCenterObjects).map((key) => (
                                    <tr key={key}>
                                        <td>{covidCenterObjects[key].name}</td>
                                        <td>{covidCenterObjects[key].state}</td>
                                        <td>{covidCenterObjects[key].type}</td>
                                        <td>{covidCenterObjects[key].category}</td>
                                        <td className="bg-light">
                                            <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CovidCenters;