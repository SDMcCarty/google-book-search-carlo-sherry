import React from 'react';

const USCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

class FilterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            printType: 'all',
            bookPrice: 'ebooks'
        }
    }

    handleTypeSelection(filter) {
        this.setState({
            printType: filter
        }, () => {
            this.handleRequest();
        })

        
    }

    handleBookSelection(filter) {
        this.setState({
            bookPrice: filter
        }, () => {
            this.handleRequest();
        })

        
    }

    handleRequest() {
        console.log(this.state.bookPrice);
        console.log(this.state.printType);
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + this.props.searchTerm + '&filter=' + this.state.bookPrice + '&printType=' + this.state.printType;
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        };

        console.log(baseUrl);
    
        fetch(baseUrl, options)
          .then(res => {
            if(!res.ok) {
              throw new Error('You suck');
            }
            return res.json();
          })
          .then(data => {
              console.log(data);
              if(data.totalItems !== 0) {
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
              } else {
                this.props.changeLibrary([]);
              }
          })
          .catch(err => {
            console.log(err.message);
          });
    }

    render() {
        return (
            <div className="filter-form">
              <label htmlFor="print-type">Print Type</label>
              <select id="print-type" name="print-type" onChange={e => this.handleTypeSelection(e.target.value)}>
                <option value="all">All</option>
                <option value="books">Books</option>
                <option value="magazines">Magazines</option>
              </select>
              <label htmlFor="book-type">Book Type</label>
              <select id="book-type" name="book-type" onChange={e => this.handleBookSelection(e.target.value)}>
                <option value="ebooks">No Filter</option>
                <option value="free-ebooks">Free</option>
                <option value="paid-ebooks">Paid</option>
              </select>
            </div>
        )
    }
}

export default FilterForm;