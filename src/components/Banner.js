import React, { useEffect,useState,useContext } from "react";
import {Notify} from '../App'
import { useDropzone } from "react-dropzone";
import {listBanner,addBanner} from '../services/service'
import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

export default function Banner() {

  const dispatchAlert = useContext(Notify);


  const {
    acceptedFiles,

    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handelAddBanner = (e) =>{

    e.preventDefault()

    const FD = new FormData();

    FD.append('banner_image', acceptedFiles[0], acceptedFiles[0].name);
    FD.append('banner_title',e.target.banner_title.value);

    const  res = addBanner(FD)

    res.then((data)=>{
        console.log(data)
        dispatchAlert.setNote({
          open : true,
          variant : 'success',
          message : "Banner Added successfully !!!"
    
        })
      })
      .catch((err)=>{
        console.log(err)
        dispatchAlert.setNote({
          open : true,
          variant : 'error',
          message : "May be duplicate found !!!"
    
        })
      })


  }

  const [Row, setRows] = useState()

  useEffect(() => {
    listBanner()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row) => {

          return ({
            id: row._id,
            banner_title: row.banner_title,
            banner_URL: row.banner_URL,
            banner_status: row.banner_Status,
            action: row._id
          })
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "banner_title",
      headerName: "Banner Title",
      width: 200,
    },
    {
      field: 'banner_URL',
      align: 'center',
      headerName: 'Banner Preview',
      width: 200,
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='category' /></div>,
    },
    {
      field: "banner_status",
      headerName: "Banner Status",
      width: 200,
    },
   

  ];

    function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
        //   filterModel={{
        //     items: [{ columnField: 'category_name', operatorValue: 'contains', value: `${search}` }],
        //   }}
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    );
  }





  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Banner Panel
      </Typography>

      {/* Section 1  */}
      <Grid
        container
        p={3}
        pt={0}
        pb={0}
        sx={{
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
        }}
      >
        <Grid item xs={10}>
          <form method="post" onSubmit={handelAddBanner} enctype='multipart/form-data'   className="formStyle">
            <Box
              sx={{
                "& .MuiTextField-root": { mt: 2 },
                margin: "auto",
              }}
            >
              <section className="dorpContainer">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag & drop your staff image here, or click to select image
                  </p>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside>
                  <h5>File Name</h5>
                  <ul>{acceptedFileItems}</ul>
                </aside>
              </section>

              <TextField
                fullWidth
                autoComplete={false}
                id="fullWidth"
                label="Banner Title"
                type="text"
                name = 'banner_title'
                variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                type = 'submit'
                sx={{ marginTop: "5%", marginBottom: "8%", float: "right" }}
              >
                Add Banner
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
        <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Banner List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
