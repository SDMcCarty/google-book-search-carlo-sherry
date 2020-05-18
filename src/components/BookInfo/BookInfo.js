import React from 'react';

class BookInfo extends React.Component {

    render() {
        return (
            <div className="book-info">
                <h2>{this.props.title}</h2>
                <div className="info-wrapper">
                    <div className="thumbnail">
                        {this.props.url}
                    </div>
                    <div className="book-details">
                    <p>{this.props.author}</p>
                    <p>{this.props.price}</p>
                    <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookInfo;