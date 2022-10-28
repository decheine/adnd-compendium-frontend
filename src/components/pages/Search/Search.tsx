
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
// import './Navbar.css';
// import './Sidebar.css';
import { GLOBALS } from '../../../data/GLOBALS';
import MonsterLink from '../../MonsterLink';

import MonsterList from '../../MonsterList';

library.add(fas, faBars)

// React component with a text field that calls a search api

type SearchProps = {
    searchTerm: string,
}

// Search function that calls the search api
function Search(props: SearchProps) {
    const [search, setSearch] = useState(props.searchTerm);
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event: any) => {
        setSearch(event.target.value);
        console.log("searchresults len", searchResults.length)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(search);
        fetch(`${GLOBALS.API_ENDPOINT}/api/search/title/${search}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSearchResults(data.items);
            });
        
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <label>
                    Search:
                    <input type="text" value={search} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ul>
                {
                // if searchResults is an Array
                Array.isArray(searchResults) &&
                searchResults.map((item: any) => (
                    <li key={item.id}>
                        <Link to={item.html_url}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// stateprops
type StateProps = {
    searchTerm: string,
    searchResults: Array<string>
}


class SearchComponent extends React.Component<{}, StateProps> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            searchTerm: "",
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(data: any) {
        console.log(data);
        this.setState({ searchResults: data });
    }

    handleChange(event: any) {
        this.setState({ searchTerm: event.target.value });
        
        // if(event.target.value.length > 2){
        //     console.log("searching for", event.target.value);
        // }
        // console.log("searchresults len", this.state.searchResults)

        event.preventDefault();
        if(event.target.value.length < 1){
            console.log("search term too short");
            return;
        }
        console.log("submitting", event.target.value);
        // Call the search api
        fetch(`${GLOBALS.API_ENDPOINT}/api/search/title/${event.target.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ searchResults: data});
            });
        console.log("searchresults len", this.state.searchResults.length)
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if(event.target.value.length < 1){
            console.log("search term too short");
            return;
        }
        console.log("submitting", event.target.value);
        // Call the search api
        fetch(`${GLOBALS.API_ENDPOINT}/api/search/title/${event.target.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ searchResults: data});
            });
        console.log("searchresults len", this.state.searchResults.length)
    }

    Submit = (e: any) =>{
        e.preventDefault();
        if(e.target.searchfield.value < 1){
            console.log("search term too short");
            return;
        }
        console.log("submitting", e.target.searchfield.value);
        // Call the search api
        fetch(`${GLOBALS.API_ENDPOINT}/api/search/title/${e.target.searchfield.value}`)
            .then(response => response.json())
            .then(data => {
                console.log("setting state data:", data);
                this.setState({ searchResults: data});
            });
        console.log("searchresults len", this.state.searchResults.length)

    };

    render() {
        return (
            <>
            
            <div className="Search">
                <form onSubmit={this.Submit} className="search-form">
                    <label >
                        <input type="text" id="searchfield" className="searchfield" onChange={ this.handleChange }  />
                    </label>
                    {/* <input type="submit" value="Submit" className="submit-button" /> */}
                </form>
                {/* <Search searchTerm={this.state.searchTerm}/> */}
                {/* <input type="text" value={this.state.searchTerm} onChange={this.handleChange} /> */}
                {/* <button onClick={() => this.props.search(this.state.searchTerm)}>Search</button> */}
            </div>
            <div className="results">
                {/* <ul>
                    {
                    this.state.searchResults.map((item: any) => (
                        <li key={item}>
                            <MonsterLink monster_key={item} key={item}/>
                        </li>
                    ))}
                </ul> */}
                {/* If searchTerm length is 2 or less, make a monster list with empty array */}
                {this.state.searchTerm.length > 2 
                ? <MonsterList monster_keys={this.state.searchResults} url_suffix={"/search/"}/>
                : <MonsterList monster_keys={[]} url_suffix={"/search/"}/>}
                
            </div>
            </>
        )
    }
}

export default SearchComponent;