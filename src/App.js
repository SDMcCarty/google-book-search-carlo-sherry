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

  render() {
    //console.log(this.state.searchTerm);
    console.log(this.state.books);

    const bookInfo = this.state.books.map(book => {
      return <BookInfo author={book.author} description={book.description} url={book.imageUrl} price={book.price} title={book.title} />
    })

    return (
      
      <div className='App'>
        <>
          <header>
            <h1>Google Book Search</h1>
          </header>
          <main>
            <SearchForm title={this.state.title} changeSearchTerm={term => this.changeSearchTerm(term)} searchTerm={this.state.searchTerm} changeLibrary={lib => this.changeLibrary(lib)}/>
            <FilterForm searchTerm={this.state.searchTerm} changeLibrary={lib => this.changeLibrary(lib)} />
  
            <section>
              {bookInfo}
            </section>
          </main>
        </>
      </div>
    );
  }

}

export default App;