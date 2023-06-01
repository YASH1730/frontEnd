import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useReducer } from "react";
import "../../../assets/custom/css/order_status.css";

// utils
import DataTable from "../../Utility/DataGrid";
import { getOrderByID } from "../../../services/service";

const Inventory2 = () => {
  const initialSate = {
    columns: [],
    rows: [],
    module: "",
    stage: 0,
  };

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
          <MetaItems setState={setState} />
          {/* //  Dashboard */}
          <Dashboard state={state} setState={setState} />
        </Grid>
      </Grid>
    </Box>
  );
};

function MetaItems({ setState }) {
  let status = [
    {
      status: "Manufacturing",
      value: 10,
      stage: 1,
    },
    {
      status: "Manufactured",
      value: 10,
      stage: 2,
    },
    {
      status: "Caning",
      value: 10,
      stage: 3,
    },
    {
      status: "Polish",
      value: 10,
      stage: 4,
    },
    {
      status: "Packing",
      value: 10,
      stage: 5,
    },
    {
      status: "Packed",
      value: 10,
      stage: 6,
    },
    {
      status: "Committed",
      value: 10,
      stage: 7,
    },
    {
      status: "Total Articles",
      value: 10,
      stage: 0,
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        { field: "O", headerName: "Order Id", width: 130 },
        { field: "SKU", headerName: "SKU", width: 130 },
        { field: "quantity", headerName: "Quantity", width: 130 },
        {
          field: "action",
          headerName: "Operations",
          width: 300,
          renderCell: OperationsButton,
        },
      ],
    },
  ];

  function handleStage(stage, columns) {
    setState({
      type: "Set_Any",
      payload: {
        stage,
        columns,
      },
    });
  }

  return (
    <Box className={"order-status-meta"}>
      {status.map((item, key) => (
        <Box
          key={key}
          onClick={() => handleStage(item.stage,item.columns)}
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
        <Typography variant="h6">Hello World</Typography>
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

function OperationsButton({ stage }) {
  return (
    <>
      <Button variant="outlined" size="small">
        Send for Manufacturing
      </Button>
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
