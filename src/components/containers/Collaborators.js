import React, { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import TemplatePage from '../TemplatePage';
import { GetAllCollaborators } from '../../services/FirestoreService';

import { nivelFormat, phoneNumberFormat } from '../../helpers/collaboratorsHelpers'

const columns = [
  { field: 'name', headerName: 'Nome Completo', width: 300 },
  { field: 'email', headerName: 'E-mail', width: 300 },
  { field: 'phoneNumber', headerName: 'Telefone', width: 200 },
  {
    field: 'nivel',
    headerName: 'Nivel',
    width: 90,
  }
];


export function DataTable() {

  let [collaboratorsItem, setCollaboratorsItem] = useState()
  const collaborators = GetAllCollaborators()
  useEffect(() => {
    if(collaborators){
      const collaboratorsData = collaborators.map(function(item){
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phoneNumber: phoneNumberFormat(item.phone),
          nivel: nivelFormat(item.role)
        }
      });
      setCollaboratorsItem(collaboratorsData)
    }
  },[collaborators])
  
  if(collaboratorsItem){
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={collaboratorsItem}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
  }
}
export default function Collaborators() {

  return (
    <TemplatePage conteudo={<DataTable />} name={'Colaboradores'}></TemplatePage>
  );
}