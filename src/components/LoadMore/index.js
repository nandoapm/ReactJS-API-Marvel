import React from "react";
import './styles.css'

export default function ButtonLoadMore(props) {
    return <button onClick={props.loadMore} className="btn-load-more">mais...</button>
}
