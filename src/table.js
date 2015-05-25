'use strict';

import React from 'react';
import TableHeading from './table-heading';
import TableBody from './table-body';
import RowDefinition from './row-definition';

class Table extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    //translate the definition object to props for Heading / Body
    var tableProperties = Table.propertiesToJS(this.props.children);
    return this.props.data.length > 0 ?
      (
        <table>
          <TableHeading columns={Object.keys(this.props.data[0])} columnProperties={tableProperties.columnProperties}/>
          <TableBody {...this.props} tableProperties={tableProperties}/>
        </table>
      ) : null;
  }

  static propertiesToJS(row) {
    //if we don't have children return an empty metatdata object
    if(!row) {
      return {
        rowProperties: null,
        columnProperties: []
      };
    }

    let columnProperties = {};

    //if an array
    if(!!row.props.children && Array.isArray(row.props.children)) {
      row.props.children.forEach(child => columnProperties[child.props.id] = child.props);
    } else if (row.props.children) {
    //if just an object
      columnProperties[row.props.children.props.id] = row.props.children.props;
    }

    var rowProps = Object.assign({}, row.props);
    delete rowProps.children;

    return {
      rowProperties: rowProps,
      columnProperties
    };
  }

}

Table.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(RowDefinition)
    // React.PropTypes.arrayOf(React.PropTypes.instanceOf(ColumnDefinition))
  ])
};

Table.contextTypes = {
  data: React.PropTypes.array
};

export default Table;
