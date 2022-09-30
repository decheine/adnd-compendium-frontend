
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
                        <a href={item.html_url}>{item.name}</a>
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
        // console.log("setting state to", event.target.value);
        this.setState({ searchTerm: event.target.value });
        
        if(event.target.value.length > 2){
            console.log("searching for", event.target.value);
        } else {

        }
        console.log("searchresults len", this.state.searchResults)

    }

    handleSubmit(e: any) {
        e.preventDefault();
        if(e.target.value.length < 1){
            console.log("search term too short");
            return;
        }
        console.log("submitting", e.target.value);
        // Call the search api
        fetch(`${GLOBALS.API_ENDPOINT}/api/search/title/${e.target.value}`)
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
                <form onSubmit={this.Submit}>
                    <label >
                        Search:
                        <input type="text" id="searchfield" onChange={ this.handleChange }  />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {/* <Search searchTerm={this.state.searchTerm}/> */}
                {/* <input type="text" value={this.state.searchTerm} onChange={this.handleChange} /> */}
                {/* <button onClick={() => this.props.search(this.state.searchTerm)}>Search</button> */}
            </div>
            <div className="results">
                <ul>
                    {
                    // if searchResults is an Array
                    Array.isArray(this.state.searchResults) &&
                    this.state.searchResults.map((item: any) => (
                        <li key={item}>
                            <MonsterLink monster_key={item} key={item}/>
                        </li>
                    ))}
                </ul>
            </div>
            </>
        )
    }
}

export default SearchComponent;