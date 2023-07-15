import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import DataTable from "../../Utility/DataGrid";
//css
import "../../../assets/custom/css/catalog.css";
import { useDispatch } from "react-redux";
import { setAlert, setForm } from "../../../store/action/action";
import { addDraft, deleteCatalog, listCatalog, listPurseOrder } from "../../../services/service";
import { Delete } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";

function PurchaseOrder() {
  const initialState = {
    columns: [
      { field: "id", headerName: "Id", width: 50 },
      { field: "PID", headerName: "PID", width: 130 },
      { field: "product_articles", headerName: "Products", width: 130 },
      { field: "hardware_articles", headerName: "Hardware", width: 330 },
      { field: "note", headerName: "Note", width: 330 },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (e)=>RenderButton(e,state),
      },
    ],
    rows: [],
    search: "",
    searchCol: "PID",
  };
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCatalog();
  }, []);

  async function fetchCatalog() {
    let res = await listPurseOrder();
    if (res.status === 200) {
      setState({
        type: "Set_Any",
        payload: {
          rows: res.data.data.map((row, i) => {
            row.id = i + 1;
            row.action = row.PID;
            return row;
          }),
        },
      });
    }
  }
 

  function RenderButton(prams) {
    const dispatch = useDispatch();
    

  const confirm = useConfirm();

  const option = {
    labels: {
      confirmable: "Proceed",
      cancellable: "Cancel",
    },
  };

     // confirmBox
  const confirmBox = (e, action, id) => {
    e.preventDefault();

    confirm({ description: `Review will be removed from Database !!!` }, option)
      .then(async () => {
        let res = await action(id);

        if (res) {
          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: res.data.message,
            })
          );
        }
        else{
          dispatch(
            setAlert({
              open: true,
              variant: "error",
              message: "Something went wrong !!!",
            })
          );
        }
      })
      .catch((err) => {
        // console.log("Operation cancelled because. ", err);
      });
  };

    async function handleDelete(id,e) {
        confirmBox(e, addDraft, {
          DID: "",
          AID: id,
          type: "Purchase Order",
          operation: "deletePurchaseOrder",
          PID: id,
        })
    }
    return (
      <>
        <IconButton onClick={(e) => handleDelete(prams.formattedValue,e)}>
          <Delete />
        </IconButton>
      </>
    );
  }
  return (
    <Box>
      <Box className="catalog-main-container">
        <Box className="heading">
          <Typography variant="h5">Purchase Order</Typography>
        </Box>
        {/* <Box className="catalog-card-container flex">
          {catalog.map((row,i) => (
            <Box key={i} className="catalog-card-wrapper flex">
              <Typography variant="h6">{row.name}</Typography>
              <Typography variant="body1">{row.count}</Typography>
            </Box>
          ))}
        </Box> */}
        <Box className="catalog-button-container flex-row">
          <TextField label="Search SKU" onChange={(e)=>setState({type  : 'Set_Any',payload : {search : e.target.value}})} fullWidth size="small" name="search" />
          <Button
            onClick={() =>
              dispatch(
                setForm({
                  state: true,
                  formType: "purchase_order",
                  payload: {},
                  setState,
                  localState : state
                })
              )
            }
            size="small"
            variant="contained"
          >
            Create Order
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
export default PurchaseOrder;
