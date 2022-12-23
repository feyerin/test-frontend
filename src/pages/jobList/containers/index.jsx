import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [list, setList] = useState([]);
    const [description, setDesription] = useState("");
    const [location, setLocation] = useState("");
    const [fulltime, setFulltime] = useState(false);

    const getList = () => {
        axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`)
        .then((res) => {
            setList(res.data);
        })
    }

    const searchList = () => {
        axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${description}&location=${location}&full_time=${fulltime}`)
        .then((res) => {
            setList(res.data);
        })
    }

    useEffect(() => {
        getList();
    }, [])
    
    return (
        <>
            <div className="card pb-5" >
                <section>
                    <form className="row g-3 p-5">
                        <div className="col-md-4">
                            <label className="form-label">Job Description</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="jobDescription"
                                value={description}
                                onChange={(e) => setDesription(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Location</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="location" 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>   
                        <div className="col-md-2 ">
                            <label className="visually-hidden">Location</label><br/>
                            <div className="form-check mt-3">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="location"
                                    onChange={() => setFulltime(!fulltime)}
                                />
                                <label className="form-check-label">
                                    Full Time Only
                                </label>
                            </div>
                        </div>   
                        <div className="col-md-2">
                            <label className="visually-hidden">Location</label><br/>
                            <button onClick={searchList} type="button" className="btn btn-secondary mt-2">search</button>
                        </div>  

                    </form>
                </section>

                <section>          
                    <div className="list-group ms-5 me-5">
                        <div className="list-group-item list-group-item-action">
                            <div className="fw-bolder pt-2">
                                <p style={{fontSize: "25px"}}>Showing {list.length} Job</p>
                            </div>
                        </div>
                        {
                            list.length > 0 ?
                            list.map((value, index) => {
                                return value !== null && (
                                        <Link key={index} style={{ textDecoration: 'none' }} to={`/detail?uuid=${value.id}`}>
                                            <div className="list-group-item list-group-item-action" aria-current="true" style={{cursor: "pointer"}}>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1" style={{color: "#45b6fe"}}>{value.title}</h5>
                                                    <small className="fw-bolder">{value.location}</small>
                                                </div>
                                                <div className="d-flex w-100 justify-content-between pt-2">
                                                    <span className="mb-1">{value.company} - <span style={{color:"lightgreen"}}>{value.type}</span></span> 
                                                    <small>3 days ago</small>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                            }) : (
                                <div className="list-group-item list-group-item-action" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1" style={{color: "#45b6fe"}}>Tidak ada data</h5>
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                </section>
            </div>
        </>
    )
}