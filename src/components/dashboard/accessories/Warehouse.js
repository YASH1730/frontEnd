import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { getSupplier, getWarehouse } from "../../../services/service";
import "../../../assets/custom/css/category.css";

import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from "@mui/x-data-grid";
// import Pagination from '@mui/material/Pagination';

import { setForm } from "../../../store/action/action";
import { useDispatch } from "react-redux";

export default function Warehouse() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const [Row, setRows] = useState([]);

  useEffect(() => {
   fetchWarehouse()
  }, []);

  async function fetchWarehouse(){
    let data = await getWarehouse()
    if(data) {

      setRows(
        data.data.map((row, index) => {
          return {
            id: index + 1,
            name: row.name,
            address: row.address,
            action: row,
          };
        })
      );
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Warehouse",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 400,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="categoryImage">
          <IconButton
            onClick={() => {
              dispatch(
                setForm({
                  state: true,
                  formType: "update_warehouse",
                  payload: params,
                  row: Row,
                  setRow: setRows,
                })
              );
            }}
            aria-label="delete"
          >
            <CreateIcon />
          </IconButton>
          {/* <IconButton onClick={() => { deleteCategory(params.formattedValue).then((res)=>{
          dispatch({type : Notify,payload : {
            open : true,
            variant : 'success',
            message : 'Category Deleted !!!'
          })
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
         */}
        </div>
      ),
    },
  ];

  const handelSearch = (e) => {
    //// console.log(e.target.value)
    setSearch(e.target.value);
  };

  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "name",
                operatorValue: "contains",
                value: `${search}`,
              },
            ],
          }}
          rows={Row}
          columns={columns}
          disableSelectionOnClick

          // components={{
          //   Pagination: CustomPagination,
          // }}
        />
      </div>
    );
  }

  return (
    <>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Warehouse
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "space-between !important",
          alignItems: "center !important",
          // gap: "15px",
        }}
      >
        <Grid xs={12} md={9}>
          <TextField
            fullWidth
            // autoComplete={false}
            size="small"
            id="demo-helper-text-aligned-no-helper"
            label="Search Warehouse"
            type="text"
            onChange={handelSearch}
          />
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch(
                setForm({
                  state: true,
                  formType: "add_warehouse",
                  row: Row,
                  setRow: setRows,
                })
              );
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Warehouse
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={"span"} variant="h6">
            {" "}
            Warehouse List
          </Typography>
          <br></br>
          <DataGridView/>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
