import React from 'react';
import FilterForm from './components/FilterForm/FilterForm';
import SearchForm from './components/SearchForm/SearchForm';
import BookInfo from './components/BookInfo/BookInfo';

const USCurrencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: "" 
    }

  }

  changeSearchTerm(term) {
    console.log(`App state changed`);
    this.setState({
      searchTerm: term
    })
  }

  changeLibrary(lib) {
    this.setState({
      books: lib
    })
  }

  componentDidUpdate() {
    console.log(`Ran componentDidUpdate`);

    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchTerm;
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(baseUrl, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('You suck');
        }
        return res.json();
      })
      .then(data => {
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
            book.price = item.saleInfo.retailPrice.amount;
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

        this.setState ({
          books: library
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    

  } 

  render() {
    //console.log(this.state.searchTerm);
    //console.log(this.state.books);
    return (
      
      <div className='App'>
        <>
          <header>
            <h1>Google Book Search</h1>
          </header>
          <main>
            <SearchForm title={this.state.title} changeSearchTerm={term => this.changeSearchTerm(term)} searchTerm={this.state.searchTerm} changeLibrary={lib => this.changeLibrary(lib)}/>
            <FilterForm />
  
            <section>
              <BookInfo  />
            </section>
          </main>
        </>
      </div>
    );
  }

}

export default App;