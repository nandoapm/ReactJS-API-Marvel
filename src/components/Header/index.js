import React from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'
import './styles.css'

export default function Header() {
    return (
        <header className="container-header">
            <div className="container-img">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    )
}
