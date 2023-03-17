import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";
import {
  getAbandonedOrder,
  changeOrderStatus,
  getWishlist,
} from "../../../services/service";
import "../../../assets/custom/css/category.css";

import { DataGrid } from "@mui/x-data-grid";

export default function Wishlist() {
  // context
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    data: [],
    mostLiked: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    CID: undefined,
    date: "",
    filter: false,
  });

  async function fetchData() {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    getWishlist({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      CID: pageState.CID,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              CID: row.CID,
              product_id: row.product_id,
              username:
                row.customer.length > 0
                  ? row.customer[0].username
                  : "Not Provided",
              email:
                row.customer.length > 0
                  ? row.customer[0].email
                  : "Not Provided",
              mobile:
                row.customer.length > 0
                  ? row.customer[0].mobile
                  : "Not Provided",
              quantity: row.quantity,
              action: row._id,
            };
          }),
          mostLiked: data.data.mostLiked.map((row, index) => {
            return {
              id: index + 1,
              product_id: row._id,
              product_title: row.product[0].product_title,
              likes: row.count,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  const [status, setStatus] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "CID",
      headerName: "Customer ID",
      width: 150,
    },
    {
      field: "product_id",
      headerName: "Product Id",
      width: 150,
      align: "center",
    },
    {
      field: "username",
      headerName: "Customer Name",
      width: 150,
      align: "center",
    },
    {
      field: "email",
      headerName: "Customer Email",
      width: 250,
      align: "center",
    },
    {
      field: "mobile",
      headerName: "Customer Mobile",
      width: 250,
      // type: "number",
      align: "center",
    },

    // {
    //   field: "quantity",
    //   headerName: "Product $ Quantity",
    //   width: 200,
    // },
    // {
    //   field: "action",
    //   headerName: "Actions",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div className="categoryImage">
    //       {/* <IconButton
    //         onClick={() => {
    //           dispatch(setForm({
    //             state: true,
    //             formType: "update_order",
    //             payload: params,
    //             row: Row,
    //             setRow: setRows
    //           }));
    //         }}
    //         aria-label="delete"
    //       >
    //         <CreateIcon />
    //       </IconButton> */}
    //       {/* <IconButton onClick={() => {
    //         deleteOrder(params.formattedValue).then((res) => {
    //           setPageState(old => ({
    //             ...old, total: old.total - 1,
    //             data: old.data.filter((set) => {
    //               return set.action !== params.formattedValue;
    //             })
    //           }));

    //           dispatch(setAlert({
    //             open: true,
    //             variant: 'success',
    //             message: 'Order Deleted !!!'
    //           }))
    //         })
    //       }} aria-label="delete"  >
    //         <DeleteIcon />
    //       </IconButton> */}
    //     </div>
    //   ),
    // },
  ];

  const MostLiked_columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "product_id",
      headerName: "Product Id",
      width: 100,
      align: "center",
    },
    {
      field: "product_title",
      headerName: "Title",
      width: 150,
      align: "center",
    },
    {
      field: "likes",
      headerName: "Like",
      width: 50,
      // type: "number",
      align: "center",
    },
  ];

  const clearFilter = () => {
    return setPageState((old) => ({
      ...old,
      O: undefined,
      date: "",
      customer_name: undefined,
      customer_email: undefined,
      order_time: "",
      filter: !old.filter,
    }));
  };

  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  // data grid for data view
  function DataGridView({ columns, height, showLiked }) {
    return (
      <div style={{ height: height, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "order_time",
                operatorValue: "contains",
                value: `${pageState.date}`,
              },
            ],
          }}
          rows={showLiked ? pageState.mostLiked : pageState.data}
          rowCount={showLiked ? pageState.mostLiked.length : pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          pageSize={pageState.limit}
          page={pageState.page - 1}
          limit={pageState.limit}
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

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Box>
        <Typography component={"span"} sx={{ display: "block" }} variant="h5">
          Wishlist
        </Typography>
      </Box>
      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          alignItems: "center !important",
          gap: "10px",
        }}
      >
        <Grid xs={12} md={10.4}>
          <TextField
            size="small"
            fullWidth
            id="demo-helper-text-aligned-no-helper"
            type="text"
            placeholder="ex xxx-xxx-xxx"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">CID</InputAdornment>
              ),
            }}
            value={pageState.CID || ""}
            name="CID"
            onChange={handleSearch}
          />
        </Grid>

        <Grid
          xs={12}
          md={1.5}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
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

      {/* data grid & create order  */}

      <Grid
        container
        scaping={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <Grid
          item
          p={2}
          xs={7.8}
          sx={{ boxShadow: 1, borderRadius: 5, maxHeight: 500 }}
        >
          <Typography component={"span"} variant="h6">
            {" "}
            Wishlist{" "}
          </Typography>
          <br></br>
          <DataGridView columns={columns} height={400} showLiked={false} />
        </Grid>
        <Grid
          item
          p={2}
          xs={4}
          sx={{ boxShadow: 1, borderRadius: 5, maxHeight: 500 }}
        >
          <Typography component={"span"} variant="h6">
            {" "}
            Most Liked
          </Typography>
          <br></br>
          <DataGridView
            columns={MostLiked_columns}
            height={400}
            showLiked={true}
          />
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
