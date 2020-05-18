import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    searchTermChanged(term) {
        console.log(`Form state changed`);
        this.setState({
            searchTerm: term
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted new search term!');
        console.log(this.state.searchTerm);
        const searchTerm = this.state.searchTerm;
        const titleTerm = searchTerm;
        this.props.changeSearchTerm(titleTerm);
    }



    render() {
        return (
            <form className="search-form" onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" placeholder="Search for books" onChange={e => this.searchTermChanged(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default SearchForm;