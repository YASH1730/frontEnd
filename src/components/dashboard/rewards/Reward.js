import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { listCustomer, addDraft, listCoupon } from "../../../services/service";
import "../../../assets/custom/css/category.css";

import { DataGrid } from "@mui/x-data-grid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import { useDispatch } from "react-redux";
import { setAlert, setForm } from "../../../store/action/action";

import question from "../../../assets/img/question.svg";
import { useConfirm } from "material-ui-confirm";

export default function Reward() {
  const [search, setSearch] = useState({
    email: undefined,
    CID: undefined,
    date: "",
  });
  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    coupon_code: undefined,
    valid_from: undefined,
    expiry: undefined,
    filter: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  const fetchData = async () => {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    listCoupon({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      coupon_code: pageState.coupon_code,
      valid_from: pageState.valid_from,
      expiry: pageState.expiry,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              coupon_code: row.coupon_code,
              coupon_type: row.coupon_type,
              flat_amount: row.flat_amount,
              times: row.times,
              off: row.off || 0,
              valid_from: row.valid_from.split("T")[0],
              expiry: row.expiry.split("T")[0],
              coupon_description: row.coupon_description,
              action: row,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => {});
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },

    {
      field: "coupon_code",
      headerName: "Coupon Name",
      width: 150,
      align: "center",
    },
    {
      field: "coupon_type",
      headerName: "Coupon Type",
      width: 100,
      align: "center",
    },
    {
      field: "times",
      headerName: "Times",
      width: 100,
      align: "center",
    },
    {
      field: "flat_amount",
      headerName: "Flat Amount (Rs)",
      width: 100,
      align: "center",
    },

    {
      field: "off",
      headerName: "Off (%)",
      width: 100,
      align: "center",
    },
    {
      field: "valid_from",
      headerName: "Valid From",
      width: 150,
      align: "center",
    },
    {
      field: "expiry",
      headerName: "Expiry",
      width: 150,
      align: "center",
    },
    {
      field: "coupon_description",
      headerName: "Coupon Description",
      width: 250,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="categoryImage">
          <Tooltip title="edit">
            <IconButton
              onClick={(e) => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "update_coupon",
                    payload: params,
                  })
                );
              }}
              aria-label="update"
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <IconButton
              onClick={(e) => {
                confirmBox(e, addDraft, {
                  DID: "",
                  AID: params.formattedValue.coupon_code,
                  type: "Coupon",
                  operation: "deleteCoupon",
                  _id: params.formattedValue._id,
                });
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

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

    confirm(
      { description: `Customer will be removed from Database !!!` },
      option
    )
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
      })
      .catch((err) => {
        console.log("Operation cancelled because. ", err);
      });
  };
  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          filterModel={{
            items: [
              {
                columnField: "coupon_caode",
                operatorValue: "contains",
                value: `${pageState.title}`,
              },
            ],
          }}
          pagination
          page={pageState.page - 1}
          limit={pageState.limit}
          pageSize={pageState.limit}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, limit: newPageSize }))
          }
          columns={columns}
        />
      </div>
    );
  }

  const clearFilter = () => {
    return setPageState((old) => ({
      ...old,
      coupon_code: undefined,
      valid_from: undefined,
      expiry: undefined,
      filter: !old.filter,
    }));
  };

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Reward
      </Typography>
      <br></br>
      {/* Section 1  */}
      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: " space-evenly !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={3.3}>
          <TextField
            fullWidth
            // autoComplete={false}
            size="small"
            id="demo-helper-text-aligned-no-helper"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">CODE</InputAdornment>
              ),
            }}
            value={pageState.code_name}
            name="code_name"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={3.2}>
          <TextField
            fullWidth
            size="small"
            id="demo-helper-text-aligned-no-helper"
            type="date"
            name="valid_from"
            value={pageState.valid_from}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Valid Date</InputAdornment>
              ),
            }}
            label="Valid From"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={3.2}>
          <TextField
            fullWidth
            size="small"
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            type="date"
            name="expiry"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Expiry Date</InputAdornment>
              ),
            }}
            value={pageState.expiry}
            label="Expiry"
            onChange={handleSearch}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
          xs={12}
          md={1.5}
        >
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => {
              setPageState((old) => ({ ...old, filter: !old.filter }));
            }}
          >
            <FilterAltIcon />
          </Button>
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            onClick={clearFilter}
          >
            <FilterAltOffIcon />
          </Button>
        </Grid>
      </Grid>
      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}
      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component={"span"} variant="h6">
              {" "}
              Coupon List{" "}
            </Typography>
            <Button
              onClick={() => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "add_coupon",
                  })
                );
              }}
              color="primary"
              variant="contained"
            >
              <AddIcon />
            </Button>
          </div>
          <DataGridView />
        </Grid>
      </Grid>
      {/* data grid ends  */}
    </Box>
  );
}
