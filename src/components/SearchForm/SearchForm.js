import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    searchTermChanged(term) {
        this.setState({
            searchTerm: term
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted new search term!');
        const searchTerm = this.state.searchTerm;
        const titleTerm = searchTerm;
        this.props.changeSearchTerm(titleTerm);
    }



    render() {
        return (
            <form className="search-form">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" placeholder="Search for books" value={this.props.searchTerm} onChange={e => this.searchTermChanged(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default SearchForm;