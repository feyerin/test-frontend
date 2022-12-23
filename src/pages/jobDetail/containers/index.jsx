import React, { useState, useEffect } from "react";
import { ImArrowLeft } from 'react-icons/im';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Detail() {
    const queryParams = new URLSearchParams(window.location.search);
    const uuid = queryParams.get('uuid');
    
    const [detail, setDetail] = useState({})

    const getDetail = () => {
        axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${uuid}`)
        .then((res) => {
            setDetail(res.data);
        })
    }

    useEffect(() => {
        getDetail();
    }, [])
    return (
        <>
            <section>
                <div className="ps-5 pe-5 pt-3 pb-3">
                    <Link style={{ textDecoration: 'none' }} to={`/dashboard`}>
                        <div style={{cursor: "pointer"}}><ImArrowLeft className="pb-1"/> Back</div>
                    </Link>
                </div>
            </section>

            <section>
                <div className="card ms-5 me-5 bg-body rounded shadow">  
                    <div className="card-body" id="title">
                        <div>
                            <div className="d-flex w-100 pt-2">
                                <span className="mb-1 text-secondary">{detail.type}/<span>{detail.location}</span></span> 
                            </div>
                            <div className="d-flex w-100 ">
                                <h4 className="mb-1">{detail.title}</h4>
                            </div>
                        </div>
                        <hr/>
                        <div id="body">
                            <div className="w-100 pt-2">
                                <div>
                                    <h4 className="mb-1 fw-bold pb-3">description :</h4>
                                </div>
                                <div className="ps-3" style={{fontSize:13}}>
                                    <p><div dangerouslySetInnerHTML={{ __html: detail.description}} />{}</p>                           
                                </div>
                            </div>
                            <div className="w-100 pt-2">
                                <div>
                                    <h4 className="mb-1 fw-bold pb-3">How To Apply :</h4>
                                </div>
                                <div className="ps-3" style={{fontSize:13}}>
                                    <p><div dangerouslySetInnerHTML={{ __html: detail.how_to_apply}} />{}</p>                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
