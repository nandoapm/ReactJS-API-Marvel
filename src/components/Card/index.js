import React from "react";
import { Link } from "react-router-dom";

var Card = (props) => {
    
    function buildFullImagePath() {
        const {path, extension} = props.selected.thumbnail;
        return `${path}/portrait_xlarge.${extension}`;
    }

    return (
        <article className="card">
            <Link to={{ pathname: `/profile/${props.selected.id}` }}>
                <picture className="thumbnail">
                    <img src={buildFullImagePath()} alt={props.selected.name} />
                </picture>
                <div className="card-content">
                    <h2>{props.selected.name}</h2>
                </div>
            </Link>
        </article>
    )
}

export default Card