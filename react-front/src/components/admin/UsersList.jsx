import { Alert, CircularProgress } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getUsers } from '../../services/user.service'

const Users = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'users',
      { page: paginationModel.page, pageSize: paginationModel.pageSize },
    ],
    keepPreviousData: true,
    queryFn: () => getUsers(paginationModel.page, paginationModel.pageSize),
  })

  const [rowCount, setRowCount] = useState(data?.data?.total || 0)

  useEffect(() => {
    setRowCount((prevCount) => data?.data?.total || prevCount)
  }, [data?.data?.total, paginationModel])

  if (isError) {
    return <Alert severity='error'>{error.response.data.message}</Alert>
  }

  if (isLoading) return <CircularProgress />

  const rows =
    data?.data?.users?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
      birthday: user.birthday,
    })) || []

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },

    {
      field: 'Age',
      headerName: 'Age',
      type: 'number',
      width: 70,
      //calc age
      valueGetter: (params) => {
        //get today's date
        const today = new Date()
        //get birth date
        const birthDate = new Date(params.row.birthday)
        //calculate age
        let age = today.getFullYear() - birthDate.getFullYear()
        //get month difference
        const m = today.getMonth() - birthDate.getMonth()
        //decrease age if month is negative
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        return age
      },
    },
    {
      field: 'avatar',
      headerName: 'Image',
      sortable: false,
      width: 200,
      renderCell: (params) =>
        params.row.avatar && (
          <div
            style={{ display: 'flex', alignItems: 'center', margin: '10px' }}
          >
            <img
              src={params.row.avatar}
              alt={params.row.name}
              style={{
                width: '100px',
                objectFit: 'cover',
                height: '100px',
              }}
            />
          </div>
        ),
    },
  ]

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        pageSizeOptions={[5, 10, 15, 20, 25, 30]}
        checkboxSelection
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  )
}

export default Users
