import React from "react"
import { Link } from "react-router-dom"

import './styles.css'

export default function Card(props) {
    function imageCard() {
        const {path, extension} = props.selected.thumbnail
        return `${path}/portrait_xlarge.${extension}`
    }
    return (
        <section className="card">
            <Link to={{ pathname: `/profile/${props.selected.id}` }}>
                <picture className="image">
                    <img src={imageCard()} alt={props.selected.name} />
                </picture>
                <div className="container"></div>
                <div className="name">
                    <h4>{props.selected.name}</h4>
                </div>
            </Link>
        </section>
    )
}
