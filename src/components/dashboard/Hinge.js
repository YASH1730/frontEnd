import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,Switch
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../store/Types";
import {Store } from "../../store/Context";
import { getHinge,editHinge } from '../../services/service'
import '../../assets/custom/css/category.css'


import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



export default function Hinge() {

  const [search, setSearch] = useState("");
  const [check,setCheck] = useState()

const {dispatch} = Store(); 

  const [Row, setRows] = useState()
  // function for get cetegory list

  useEffect(() => {
    getHinge()
      .then((data) => {
        setCheck(data.data.map((row,index)=>{
          return row.hinge_status
        }))

        setRows(data.data.map((row,index) => {

          return ({
            id: index+1,
            hinge_name: row.hinge_name,
            hinge_status: row.hinge_status,
            action: row._id
          })
        }))
      })
      .catch((err) => {
        //console.log(err)
      })
  }, []);


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "hinge_name",
      headerName: "Hinge Name",
      width: 200,
    },
    {
      field: "hinge_status",
      headerName: "Hinge Status",
      width: 200,
      renderCell: (params) => <Switch onChange ={handleSwitch} name = {`${params.row.action+' '+(params.row.id-1)}`}   checked = {check[params.row.id-1]}></Switch> ,

    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => 
      <div className="categoryImage" >
        <IconButton onClick={() => { 
         dispatch({type : OpenBox,payload : {
            state : true,
            formType : 'update_hinge',
            payload : params
          }}) 
        }} aria-label="delete"  >
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
      </div>,
    }

  ];


  const handleSwitch = (e)=>{
    const id = e.target.name.split(' ')

    const FD = new FormData()

    FD.append('_id',id[0])
    FD.append('hinge_status',e.target.checked)

    const res = editHinge(FD);

    res.then((data)=>{
      setCheck(check.map((row,index)=>{
        // //console.log(parseInt(id[1]) === index)
        if (parseInt(id[1]) === index)
        return !row
        else 
        return row
      }))
      // dispatch({type : Notify,payload : {
      //   open : true,
      //   variant : 'success',
      //   message : " Polish Status Updated Successfully !!!"
  
      // }})
    })
    .catch((err)=>{
      //console.log(err)
      dispatch({type : Notify,payload : {
        open : true,
        variant : 'error',
        message : "Something Went Wrong !!!"
  
      } })
    })

    
  

  } 

  const handelSearch = (e)=>{
    //console.log(e.target.value)
    setSearch(e.target.value)
  }


  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'hinge_name', operatorValue: 'contains', value: `${search}` }],
          }}
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{
            Pagination: CustomPagination,
          }}
          
        />
      </div>
    );
  }


  return (
    <>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
      Hinge
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={9}>
          <TextField
            fullWidth
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by hinge name"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
             dispatch({type : OpenBox,payload : { state: true, formType: "addHinge" }});
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Hinge
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Hinge List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
