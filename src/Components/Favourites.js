import React, { Component } from 'react';
import { movies } from './GetMovies';

export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'ALL GENRES',
            movies: [],
            currgenremovie: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        }
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('ALL GENRES');
        this.setState({
            genres: [...temp],
            movies: [...data]
        })

    }
    handleGenresChange = (genre) => {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        }
        // console.log(genre);
        this.setState({
            currgen: genre
        })
    }
    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return (objB.popularity - objA.popularity);
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityAsce = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return (objA.popularity - objB.popularity);
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return (objB.vote_average - objA.vote_average);
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingAsce = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return (objA.vote_average - objB.vote_average);
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }

    handleDelete=(id)=>{
        let newarr=[];
        newarr=this.state.movies.filter((movie)=>movie.id!=id);
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr));
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        }
        let filterarr = [];

        if (this.state.currText === '') {
            filterarr = this.state.movies;
        } else {
            filterarr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return (title.includes(this.state.currText.toLowerCase()));
            })
        }

        if (this.state.currgen != "ALL GENRES") {
            filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen)
        }

        let pages = Math.ceil(filterarr.length / this.state.limit);
        let pagearr = [];
        for (let i = 1; i <= pages; i++) {
            pagearr.push(i);
        }
        console.log(pagearr);
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;
        filterarr = filterarr.slice(si, ei);
        D:\React PepCoding\2.React\moviestrend
        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                                <ul className="list-group favourites-genres">
                                    {
                                        this.state.genres.map((genre) => (
                                            this.state.currgen == genre ?
                                                <li className="list-group-item genres-type" style={{ background: "#3f51b5", color: "white", fontWeight: "bold" }}>{genre}</li> :
                                                <li className="list-group-item genres-type" onClick={() => this.handleGenresChange(genre)} style={{ background: "white", color: "#3f51b5" }}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='col-lg-9 favourites-table col-sm-12'>
                                <div className='row'>
                                    <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => { this.setState({ currText: e.target.value }) }} />
                                    <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>{this.setState({limit:e.target.value})}}/>
                                </div>
                                <div className='row'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">TITLE</th>
                                                <th scope="col">GENRE</th>
                                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>POPULARITY<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsce}></i></th>
                                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>RATING<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsce}></i></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterarr.map((movieObj) => (
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '8rem', paddingRight: '1rem' }} />{movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-primary" onClick={()=>this.handleDelete(movieObj.id)}>DELETE</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pagearr.map((page) => (
                                                <li className="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
