import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {Get} from '../../Services/privateApiService'
import "./styles/members.scss";

const Members = () => {
    
    const [list, setList] = useState([])

    const getList = async () => {
        
        
        const response = await Get('members')
        setList(response.data)
    }
    
    useEffect(() => {
        getList()
    }, [])




    return (
        <div className="container">
            {
                list.map(item => (
                    <div className="card" key={ item.id}>
                        <figure>
                            <img src={item.image} alt="imagen" />
                        </figure>
                            <div className="content">
                                <h4 className="content-title">{item.name}</h4>
                            <h3 className="content-description">{item.description}</h3>
                            <div className='links'>

                                <Link className="content-description link" to={`/${item.facebookUrl }`} >Facebook</Link>
                            
                                <Link className="content-description link" to={`/${item.linkedinUrl }`}>Linkedin</Link>
                            </div>
                                
                            </div>
                    </div>
                ))
            }
            
            
        </div>
    )
}

export default Members
