import * as React from 'react';

class OrderFromLink extends React.Component {

  render() {
    const row = this.props.row;

    if (row.orderLink) {
      return (
        <a href={row.orderLink} target="_blank" rel="noreferrer">
          {row.from}
        </a>
      );
    }

    return (<span>{row.from}</span>);
  }
}

export default OrderFromLink;
