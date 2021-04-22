import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import { GET_VEHICLES_QUERY, SEARCH_VEHICLES } from 'graphql/queries';

import { Input } from 'components/';
import { PageContainter, TableContainer } from './styles';

import { numberOfVisibleRows } from 'constants/index';

export type VehicleType = {
  bike_id: string;
  is_disabled: number;
  is_reserved: number;
  lat: number;
  lon: number;
};

const BikeList = () => {
  const [vehicleData, setVehicleData] = useState<VehicleType[]>([]);
  const history = useHistory();

  const { loading, data } = useQuery(GET_VEHICLES_QUERY, {
    onError(err) {
      alert(JSON.stringify(err.message));
    },
    onCompleted({ vehicles }) {
      setVehicleData(vehicles);
    },
  });

  const [searchVehicles, { loading: searching }] = useLazyQuery(
    SEARCH_VEHICLES,
    {
      onCompleted({ searchVehicles }) {
        setVehicleData(searchVehicles);
        console.log(searchVehicles, 'completed result');
      },
    }
  );

  const tableColumns = [
    {
      field: 'bike_id',
      headerName: 'ID',
      width: 150,
      valueGetter: (params: any) => {
        return params?.row.bike_id;
      },
    },
    {
      field: 'vehicle_type',
      headerName: 'Vehicle Type',
      width: 150,
    },
    {
      field: 'is_reserved',
      headerName: 'Reserved Status',
      width: 250,
    },
    {
      field: 'is_disabled',
      headerName: 'Disabled Status',
      width: 250,
    },
    {
      field: '',
      headerName: 'Vehicle Status',
      width: 250,
      valueGetter: (params: any) => {
        return params?.row.is_disabled && params?.row.is_reserved ? 'Not Available' : 'AVailable';
      },
    },
  ];

  const handleChange = (e: any) => {
    !e.target.value
      ? setVehicleData(data?.vehicles)
      : searchVehicles({ variables: { id: e.target.value } });
  };

  const renderSearch = (props: any) => <Input {...props} />;

  return (
    <PageContainter>
      <TableContainer>
        <DebounceInput
          minLength={1}
          label='Search'
          debounceTimeout={300}
          onChange={handleChange}
          element={renderSearch}
        />
        <DataGrid
          rows={vehicleData}
          columns={tableColumns}
          pageSize={numberOfVisibleRows}
          loading={loading || searching}
          getRowId={(row) => row.bike_id}
          onRowClick={(row) => history.push(`/bikes/${row.id}`)}
        />
      </TableContainer>
    </PageContainter>
  );
};

export default BikeList;
