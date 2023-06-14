import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import DataTable from "../../Utility/DataGrid";
//css
import "../../../assets/custom/css/catalog.css";
import { useDispatch } from "react-redux";
import { setAlert, setForm } from "../../../store/action/action";
import { deleteCatalog, listCatalog } from "../../../services/service";
import { Delete } from "@mui/icons-material";

function Catalog() {
  const initialState = {
    columns: [
      { field: "id", headerName: "Id", width: 50 },
      { field: "catalog_type", headerName: "Catalog", width: 130 },
      { field: "SKU", headerName: "SKU", width: 130 },
      { field: "title", headerName: "Title", width: 330 },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (e)=>RenderButton(e,state),
      },
    ],
    rows: [],
    search: "",
    catalog_type: "",
    searchCol: "SKU",
  };
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCatalog();
  }, []);

  async function fetchCatalog() {
    let res = await listCatalog(state.catalog_type);
    if (res.status === 200) {
      setState({
        type: "Set_Any",
        payload: {
          rows: res.data.data.map((row, i) => {
            row.id = i + 1;
            row.action = row._id;
            return row;
          }),
        },
      });
    }
  }

  const catalog = [
    {
      name: "Best Seller",
      count: 10,
    },
    {
      name: "Trending",
      count: 10,
    },
    {
      name: "New Arrived",
      count: 10,
    },
    { name: "Full Catalog", count: 10 },
  ];



  function RenderButton(prams) {
    const dispatch = useDispatch();
    

    async function handleDelete(id) {
      let res = await deleteCatalog(id);

      if (res.data.status === 200) {
        setState({
          type : "After_Delete",
          payload:{
            id
          }
        })
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message,
          })
          );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: res.data.message,
          })
        );
      }
    }
    return (
      <>
        <IconButton onClick={() => handleDelete(prams.formattedValue)}>
          <Delete />
        </IconButton>
      </>
    );
  }
  return (
    <Box>
      <Box className="catalog-main-container">
        <Box className="heading">
          <Typography variant="h5">Catalog</Typography>
        </Box>
        <Box className="catalog-card-container flex">
          {catalog.map((row,i) => (
            <Box key={i} className="catalog-card-wrapper flex">
              <Typography variant="h6">{row.name}</Typography>
              <Typography variant="body1">{row.count}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="catalog-button-container flex-row">
          <TextField label="Search SKU" onChange={(e)=>setState({type  : 'Set_Any',payload : {search : e.target.value}})} fullWidth size="small" name="search" />
          <Button
            onClick={() =>
              dispatch(
                setForm({
                  state: true,
                  formType: "addCatalog",
                  payload: {},
                  setState,
                  localState : state
                })
              )
            }
            size="small"
            variant="contained"
          >
            Add Product
          </Button>
        </Box>
        <Box className="catalog-list-container">
          <DataTable state={state} />
        </Box>
      </Box>
    </Box>
  );
};

// global ==================== state
function reducer(state, action) {
  switch (action.type) {
    case "Set_Display_Data":
      return (state = { ...state, ...action.payload });
    case "After_Delete":
    const newData = state.rows.filter(row=>(row.action!==action.payload.id))
      return (state = { ...state, rows : [...newData] });
    case "Set_Any":
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
}
export default Catalog;
