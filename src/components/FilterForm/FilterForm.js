import React from 'react';

class FilterForm extends React.Component {

    render() {
        return (
            <div className="filter-form">
              <label htmlFor="print-type">Print Type</label>
              <select id="print-type">
                <option value="no-type">All</option>
                <option value="books">Books</option>
                <option value="magazines">Magazines</option>
              </select>
              <label htmlFor="book-type">Book Type</label>
              <select id="book-type">
                <option value="no-filter">No Filter</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
        )
    }
}

export default FilterForm;