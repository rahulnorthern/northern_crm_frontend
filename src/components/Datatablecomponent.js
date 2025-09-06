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

    const mergedStyles = {
      ...defaultStyles,
      ...props.customStyles,
    };


    return (
      <DataTable
        pagination
        highlightOnHover
        striped
        customStyles={mergedStyles}
        {...props}
      />
    );
  };
}

export default Datatablecomponent