import React from "react";
import { Link } from "react-router-dom";

import './styles.css'

var Card = (props) => {
    
    function buildFullImagePath() {
        const {path, extension} = props.selected.thumbnail;
        return `${path}/portrait_xlarge.${extension}`;
    }

    return (
        <article className="card">
            <Link to={{ pathname: `/profile/${props.selected.id}` }}>
                <picture className="image">
                    <img src={buildFullImagePath()} alt={props.selected.name} />
                </picture>
                <div className="name">
                    <h4>{props.selected.name}</h4>
                </div>
            </Link>
        </article>
    )
}

export default Card