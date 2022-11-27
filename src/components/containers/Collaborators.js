import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import TemplatePage from '../TemplatePage';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nome Completo', width: 500 },
  {
    field: 'nivel',
    headerName: 'Nivel',
    width: 90,
  }
];

const rows = [
  { id: 1, name: 'Snow', nivel: 'Admin' },
  { id: 2, name: 'Lannister' , nivel: 'Admin' },
  { id: 3, name: 'Lannister',  nivel: 'Admin'},
  { id: 4, name: 'Stark', nivel: 'Admin'},
  { id: 5, name: 'Targaryen', nivel: 'Admin'},
  { id: 6, name: 'Melisandre', nivel: 'Admin'},
  { id: 7, name: 'Clifford', nivel: 'Admin'},
  { id: 8, name: 'Frances', nivel: 'Admin'},
  { id: 9, name: 'Roxie', nivel: 'Admin'},
];

export function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
export default function Collaborators() {

  return (
    <TemplatePage conteudo={<DataTable />} name={'Colaboradores'}></TemplatePage>
  );
}