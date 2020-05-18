import React from 'react';

const USCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

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
        this.requestHandler();
    }

    requestHandler() {
        
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchTerm;
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        };
        console.log(baseUrl)
        fetch(baseUrl, options)
          .then(res => {
            if(!res.ok) {
              throw new Error('You suck');
            }
            return res.json();
          })
          .then(data => {
            console.log(data);
            let library = [];
            data.items.forEach(item => {
              const book = {
                author: "",
                title: "",
                price: "Not Available",
                imageUrl: "",
                description: ""
              }
    
              if(item.volumeInfo.authors === undefined) {
                book.author = 'No author available';
              } else {
                book.author = item.volumeInfo.authors;
              }
    
              if(item.saleInfo.retailPrice === undefined) {
                book.price = 'No price available';
              } else {
                book.price = USCurrencyFormat.format(item.saleInfo.retailPrice.amount);
              }
    
              if(item.volumeInfo.description === undefined) {
                book.description = 'No description available';
              } else {
                book.description = item.volumeInfo.description;
              }
    
              book.title = item.volumeInfo.title;
              book.imageUrl = item.volumeInfo.imageLinks.thumbnail;
    
              library.push(book);
    
            }) 
            
            console.log(library);
            this.props.changeLibrary(library);
          })
          .catch(err => {
            console.log(err.message);
          });
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