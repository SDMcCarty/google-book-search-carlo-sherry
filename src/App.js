import React from 'react';
import FilterForm from './components/FilterForm/FilterForm';
import SearchForm from './components/SearchForm/SearchForm';
import BookInfo from './components/BookInfo/BookInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // book: []
      author: 'Author',
      title: 'Title',
      price: 5,
      url: 'URL',
      description: 'Description',

      searchTerm: "" 
    }

  }

  changeSearchTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

//   componentDidMount() {
//     // https://www.googleapis.com/books/v1/volumes?q=norse&filter=free-ebooks&printType=all

//     const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

// }

  render() {
    console.log(this.state.searchTerm);
    return (
      
      <div className='App'>
        <>
          <header>
            <h1>Google Book Search</h1>
          </header>
          <main>
            <SearchForm title={this.state.title} changeSearchTerm={this.changeSearchTerm} searchTerm={this.state.searchTerm}/>
            <FilterForm />
  
            <section>
              <BookInfo author={this.state.author} title={this.state.title} price={this.state.price} url={this.state.url} description={this.state.description} />
            </section>
          </main>
        </>
      </div>
    );
  }

}

export default App;