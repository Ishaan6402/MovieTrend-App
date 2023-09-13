import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div style={{ display: "flex", backgroundColor: "#f1c40f", alignItems: "center" }}>
                <Link to={'/'} style={{ textDecoration: "none" }}><h1 style={{ marginLeft: "1rem", marginTop: "1rem" }}>MoviesTrend</h1></Link>
                <Link to={'/favourites'} style={{ textDecoration: "none" }}><h2 style={{ marginLeft: "2rem", marginTop: "1.5rem" }}>Favourites</h2></Link>
            </div>
        )
    }
}
