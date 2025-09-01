import React from 'react';
import DataTable from 'react-data-table-component';

const Datatablecomponent = (WrappedComponent) => {
  return function DataTableHOC(props) {
    const defaultStyles = {
      rows: {
        style: { fontSize: '14px' }
      },
      headCells: {
        style: { fontWeight: 'bold', backgroundColor: '#f8f9fa' }
      }
    };

    return (
      <DataTable
        pagination
        highlightOnHover
        striped
        customStyles={defaultStyles}
        {...props}
      />
    );
  };
}

export default Datatablecomponent