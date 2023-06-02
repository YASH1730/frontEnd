import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import "../../../assets/custom/css/order_status.css";

// utils
import DataTable from "../../Utility/DataGrid";
import { getOrderByID, getOrderStatus, getStageList } from "../../../services/service";
import { setForm } from "../../../store/action/action";
import { useDispatch } from "react-redux";

const Inventory2 = () => {
  const initialSate = {
    columns: [],
    rows: [],
    module: "",
    stage: 0,
  };

  const dispatch = useDispatch()

  const [state, setState] = useReducer(reducer, initialSate);

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component={"span"} sx={{ display: "block" }} variant="h5">
            Order Status
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2} className="order-status-content-wrapper">
          {/* // meta  */}
          <MetaItems setState={setState} dispatch = {dispatch} state = {state} />
          {/* //  Dashboard */}
          <Dashboard state={state} setState={setState} />
        </Grid>
      </Grid>
    </Box>
  );
};

/// chile components

function MetaItems({ state, setState, dispatch }) {

  const [status,setStatus] = useState([
    {
      status: "Manufacturing",
      value: 10,
      stage: 1,
      next_status: "Manufactured",
    },
    {
      status: "Manufactured",
      value: 10,
      stage: 2,
      next_status: "Caning",
    },
    {
      status: "Caning",
      value: 10,
      stage: 3,
      next_status: "Polish",
    },
    {
      status: "Polish",
      value: 10,
      stage: 4,
      next_status: "Packing",
    },
    {
      status: "Packing",
      value: 10,
      stage: 5,
      next_status: "Packed",
    },
    {
      status: "Packed",
      value: 10,
      stage: 6,
      next_status: "Committed",
    },
    {
      status: "Committed",
      value: 10,
      stage: 7,
      next_status: "Completed",
    },
    {
      status: "Total Articles",
      value: 10,
      stage: 0,
      next_status: "Manufacturing",

    },
  ])

  useEffect(()=>{
    fetchStages()
  },[state.rows])

  useEffect(()=>{
    fetchOrderByStatus()
  },[state.current_status])

  async function fetchOrderByStatus(){

    const response =  await getOrderStatus({O:state.O,status:state.current_status})
    if (response.status === 200) {
      setState({
        type: "Set_Display_Data",
        payload: {
          rows: response.data.map((row, i) => {
            return {
              id: i + 1,
              O: row.O ,
              SKU: row.SKU ,
              quantity: row.quantity ,
              supplier_type : row.supplier_type ,
              supplier : row.staff !== 'undefined' ?  row.staff : row.supplier ,
              depart_date : row.depart_date ,
              location : row.location ,
              action: row,
            };
          }),
        },
      });
    }
  }

  async function fetchStages(){
    const stages = await getStageList()
    if(stages)
    {
      setStatus(
        status.map(row=>{
          return {...row,value : stages.data[row.status]}
        })
      )
    }
  }

  function handleStage(stage,current_status,next_status) {

    const columns = (current_status === "Get Order" ? [
      { field: "id", headerName: "ID", width: 70 },
      { field: "O", headerName: "Order Id", width: 130 },
      { field: "SKU", headerName: "SKU", width: 130 },
      { field: "quantity", headerName: "Quantity", width: 130 },
      {
        field: "action",
        headerName: "Operations",
        width: 300,
        renderCell: (params)=>OperationsButton(params,state,dispatch,current_status,"Manufacturing"),
      },
    ] : [ { field: "id", headerName: "ID", width: 70 },
    { field: "O", headerName: "Order Id", width: 130 },
    { field: "SKU", headerName: "SKU", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "supplier_type", headerName: "Supplier Type", width: 130 },
    { field: "supplier", headerName: "Supplier", width: 130 },
    { field: "depart_date", headerName: "Depart Date", width: 130 },
    { field: "location", headerName: "Location", width: 130 },
    {
      field: "action",
      headerName: "Operations",
      width: 300,
      renderCell: (params)=>OperationsButton(params,state,dispatch,current_status,next_status),
    }
  ])

    setState({
      type: "Set_Any",
      payload: {
        columns,
        stage,
        current_status,
        next_status 
      },
    });
  }

  return (
    <Box className={"order-status-meta"}>
      {status.map((item, key) => (
        <Box
          key={key}
          onClick={() => handleStage(item.stage,item.status,item.next_status)}
          className="order-status-meta-items flex"
        >
          <Typography variant="h6">{item.status}</Typography>
          <Typography sx={{ fontWeight: 600 }} variant="body1">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function Dashboard({ state, setState }) {
  async function fetchData() {
    const response = await getOrderByID(state.O);
    if (response.status === 200) {
      const SKUs = Object.keys(response.data.quantity);
      setState({
        type: "Set_Display_Data",
        payload: {
          rows: SKUs.map((row, i) => {
            return {
              id: i + 1,
              O: state.O,
              SKU: row,
              quantity: response.data.quantity[row],
              action: row,
            };
          }),
        },
      });
    }
  }

  function handleOID(e) {
    setState({
      type: "Set_Any",
      payload: {
        O: e.target.value,
      },
    });
  }

  return (
    <Box className="order-status-dashboard-container">
      <Box className="order-status-dashboard-heading">
        <Typography variant="h6">Dashboard {state.current_status}</Typography>
      </Box>
      <Box className="order-status-dashboard-search">
        <TextField
          label="Order ID"
          onChange={handleOID}
          fullWidth
          variant="outlined"
          size="small"
        />
        <Button size={"small"} onClick={fetchData} variant="contained" sx={{ width: "10%" }}>
          Get Order
        </Button>
      </Box>
      <Box className="order-status-dashboard-table">
        <DataTable state={state} />
      </Box>
    </Box>
  );
}

function OperationsButton(row, state , dispatch,current_status,next_stage) {

function openForm(){
  console.log(row,state)
  dispatch(setForm({
    state: true,
    formType: "order_status",
    payload: {
      stage : state.stage,
      next_stage,
      current_status,
      row
    },
  }))
}

  return (
    <>
    {row.row.quantity > 0 && 
      <Button variant="outlined" onClick={openForm} size="small">
        Send for {next_stage}
      </Button>}
    </>
  );
}



// global ==================== state
function reducer(state, action) {
  switch (action.type) {
    case "Set_Display_Data":
      return (state = { ...state, ...action.payload });
    case "Set_Any":
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
}

export default Inventory2;
