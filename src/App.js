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
      searchTerm: "",
      errorMsg: "", 
      error: false
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

  changeError(error, errorMsg)  {
    console.log(error);
    this.setState({
      errorMsg: errorMsg,
      error: error
    })
  }

  render() {
    const bookInfo = this.state.books.map(book => {
      return <BookInfo author={book.author} description={book.description} url={book.imageUrl} price={book.price} title={book.title} />
    })

    const errorHtml = this.state.error ? <div>{this.state.errorMsg}</div> : '';


    return (
      
      <div className='App'>
        <>
          <header>
            <h1>Google Book Search</h1>
          </header>
          <main>
            <SearchForm title={this.state.title} changeSearchTerm={term => this.changeSearchTerm(term)} searchTerm={this.state.searchTerm} changeLibrary={lib => this.changeLibrary(lib)} changeError={(e,msg) => this.changeError(e,msg)}/>
            <FilterForm searchTerm={this.state.searchTerm} changeLibrary={lib => this.changeLibrary(lib)} changeError={(e,msg) => this.changeError(e,msg)} />
            {errorHtml}
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