import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
  Modal,
  Fade,
  Backdrop,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
// import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import question from "../../../assets/img/question.svg";
import DifferenceIcon from "@mui/icons-material/Difference";
import {
  getListProduct,
  categoryList,
  getSubCatagories,
  addDraft,
  deleteProduct,
  getLinkedProduct,
  getArticlesId,
  unlinkFromVariations,
  linkToVariations,
} from "../../../services/service";
import {
  DataGrid
} from "@mui/x-data-grid";
// import Pagination from '@mui/material/Pagination';
import { useDispatch } from "react-redux";
import { setAlert, setForm } from "../../../store/action/action";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { Message } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import ModalBox from "../../Utility/ModalBox";
import LanIcon from '@mui/icons-material/Lan';
export default function Products(props) {
  // store
  const dispatch = useDispatch();

  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    title: "",
    category: undefined,
    SKU: undefined,
    subCategory: undefined,
    filter: false,
  });


  const [open, setModelBox] = useState({
    open: false,
    data: null,
    setRow: setPageState,
  });

  // this state is for the universal state
  const [modelState, setModelState] = useState({
    open: false,
    content: <></>,
    width: 500,
    unlink: []
  })

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
      { description: `This change will displayed in product listing !!!` },
      option
    )
      .then(async () => {
        let res = await action(id);

        if (res) {
          setCheck(
            check.map((row, index) => {
              // //// console.log(parseInt(id[1]) === index)
              if (parseInt(id[1]) === index) return !row;
              else return row;
            })
          );
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
              message: "Something went wrong !!!",
            })
          );
        }
      })
      .catch((err) => {
        // console.log("Operation cancelled because. ", err);
      });
  };

  const [check, setCheck] = useState([]);

  // catalog State
  const [catalog, setCatalog] = useState({
    category: [],
    subCategory: [],
  });

  async function fetchData() {
    try {
      setPageState((lastState) => ({
        ...lastState,
        isLoading: true,
      }));

      let response = await getListProduct({
        page: pageState.page,
        limit: pageState.limit,
        total: pageState.total,
        title: pageState.title,
        category: pageState.category,
        SKU: pageState.SKU,
        subCategory: pageState.subCategory,
      });
      if (response.status === 200) {
        // set status check
        setCheck(
          response.data.data.map((row, index) => {
            return row.status;
          })
        );

        setPageState((lastState) => ({
          ...lastState,
          data: response.data.data.map((row, index) => {
            return {
              id: index + 1,
              SKU: row.SKU,
              product_title: row.product_title,
              category_name: row.category_name,
              sub_category_name: row.sub_category_name,
              specification_image: row.specification_image,
              mannequin_image: row.mannequin_image,
              status: row.status,
              featured_image: row.featured_image,
              action: row,
            };
          }),
          isLoading: false,
          total: response.data.total,
          filter: false,
        }));
      }
    } catch (err) {
      // console.log(err)
      dispatch(
        setAlert({
          open: true,
          message: "Problem in loading list.",
          variant: "error",
        })
      );
    }
  }

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [pageState.page, pageState.limit, pageState.filter]);

  async function fetchCategories() {
    let cat = await categoryList();
    let subCat = await getSubCatagories();

    if (cat.status === 200 && subCat.status === 200)
      setCatalog({
        category: cat.data.data,
        subCategory: subCat.data.data,
      });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "SKU", headerName: "SKU", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Switch
          onChange={handleSwitch}
          name={`${params.row.action._id + " " + (params.row.id - 1)}`}
          checked={check[params.row.id - 1]}
        ></Switch>
      ),
    },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          {" "}
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "specification_image",
      headerName: "Specification Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "mannequin_image",
      headerName: "Mannequin Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "product_title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 150,
    },
    {
      field: "sub_category_name",
      headerName: "Sub Category Name",

      width: 110,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Update">
            <IconButton
              onClick={() => {
                //// console.log(params)

                dispatch(
                  setForm({
                    state: true,
                    formType: "update_product",
                    payload: params,
                  })
                );
              }}
              aria-label="update"
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Create Variations">
            <IconButton
              onClick={() => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "variation",
                    payload: params,
                    setRow: setPageState,
                  })
                );
              }}
            >
              <DifferenceIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Duplicate">
            <IconButton
              onClick={() =>
                setModelBox({
                  open: true,
                  data: params.formattedValue,
                  setRow: setPageState,
                })
              }
            >
              <CopyrightIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton
              onClick={() => {
                // console.log(params);
                props.history(`/productDetails/${params.row.SKU}`);
              }}
              aria-label="update"
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Variation Linking">
            <IconButton
              onClick={() => handleVariationLinking(params.row.action)}
              aria-label="update"
            >
              <LanIcon />
            </IconButton>
          </Tooltip>
          {/* // ============== delete product */}
          <IconButton
            onClick={(e) => {
              return confirmBox(e, deleteProduct, params.formattedValue._id);
            }
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  async function handleVariationLinking(product) {
    return setModelState({
      ...modelState, open: true, content: <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6'>Variation Linking</Typography>
          </Grid>
          {/* // Linked Products */}
          <Grid item xs={12}>
            <LinkedProduct product={product} setState= {setModelState} />
          </Grid>
          {/* Add new products under the ACIN */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item sx={12}>
                <Typography variant="body1">Add Product as Variants</Typography>
              </Grid>
              <Grid item xs={12} p={1}>
                <SelectProducts ACIN = {product.ACIN}  setState = {setModelState} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    })
  }

  const handleSwitch = (e) => {
    // //// console.log(e.target.name)
    // //// console.log(check)

    const id = e.target.name.split(" ")[0];

    // console.log(id)

    return confirmBox(e, addDraft, {
      DID: "",
      AID: id,
      type: "Product",
      operation: "updateProductStatus",
      _id: id,
      status: e.target.checked,
    });
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
                columnField: "product_title",
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

  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const clearFilter = () => {
    return setPageState((old) => ({
      ...old,
      title: "",
      category: undefined,
      SKU: undefined,
      subCategory: undefined,
      filter: !old.filter,
    }));
  };

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <ModalBox
        state={modelState} setState={setModelState}
      ></ModalBox>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Products
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          gap: "10px",
          alignItems: "center !important",
        }}
      >
        <Grid xs={12} md={2.5}>
          <TextField
            fullWidth
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="Search by Title"
            onChange={handleSearch}
            value={pageState.title}
            name="title"
            type="text"
          />
        </Grid>
        <Grid xs={12} md={2.5}>
          <TextField
            fullWidth
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            value={pageState.SKU}
            inputProps={{ style: { textTransform: "uppercase" } }}
            onChange={handleSearch}
            name="SKU"
            type="text"
          />
        </Grid>

        <Grid xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size="small"
            label="Category"
            name="category"
            value={pageState.category || "None"}
            onChange={handleSearch}
          >
            {catalog.category.map((option) => (
              <MenuItem key={option.category_name} value={option.category_name}>
                {option.category_name}
              </MenuItem>
            ))}
            <MenuItem key={"None"} value={"None"}>
              None
            </MenuItem>
          </TextField>
        </Grid>
        <Grid className="flex" xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size="small"
            label="Sub Category"
            name="subCategory"
            value={pageState.subCategory || "None"}
            onChange={handleSearch}
          >
            {catalog.subCategory.map(
              (option) =>
                pageState.category === option.category_name && (
                  <MenuItem
                    key={option.sub_category_name}
                    value={option.sub_category_name}
                  >
                    {option.sub_category_name}
                  </MenuItem>
                )
            )}
            <MenuItem key={"None"} value={"None"}>
              None
            </MenuItem>
          </TextField>
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
      <br />
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component={"span"} variant="h6">
              {" "}
              Product List{" "}
            </Typography>

            <Button
              color="primary"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                dispatch(setForm({ state: true, formType: "product" }));
              }}
            >
              Add Product
            </Button>
          </div>
          <DataGridView />
        </Grid>
      </Grid>

      {/* data grid ends  */}

      {/* make duplicate product */}
      <DuplicateProduct open={open} setOpen={setModelBox} dispatch={dispatch} />
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function DuplicateProduct({ open, setOpen, dispatch }) {
  const [checked, setChecked] = useState({
    Specification: false,
    Images: false,
    Features: false,
    Miscellaneous: false,
    Inventory_Shipping: false,
    SEO: false,
    Extra_Details: false,
  });

  const Specifications = [
    "product_title",
    "category_name",
    "category_id",
    "sub_category_name",
    "sub_category_id",
    "primary_material",
    "primary_material_name",
    "length_main",
    "breadth",
    "height",
    "polish",
    "polish_name",
    "assembly_required",
    "assembly_part",
    "MRP",
    "selling_price",
    "showroom_price",
    "discount_limit",
    "mobile_store",
    "online_store",
    "range",
    "assembly_level",
    "continue_selling",
  ];

  const Images = [
    "product_image",
    "featured_image",
    "mannequin_image",
    "specification_image",
  ];

  const Features = [
    "rotating_seats",
    "eatable_oil_polish",
    "no_chemical",
    "straight_back",
    "lean_back",
    "weaving",
    "knife",
    "not_suitable_for_Micro_Dish",
    "tilt_top",
    "inside_compartments",
    "stackable",
    "ceramic_tiles",
    "ceramic_tiles_qty",
    "ceramic_tiles_included",
    "ceramic_tiles_name",
    "ceramic_drawers",
    "ceramic_drawers_included",
    "ceramic_drawers_name",
  ];

  const Miscellaneous = [
    "weight_capacity",
    "joints",
    "drawer",
    "drawer_count",
    "back_style",
  ];

  const Inventory = [
    "warehouse",
    "warehouse_name",
    "polish_time",
    "manufacturing_time",
    "returnDays",
    "COD",
    "returnable",
    "package_length",
    "package_height",
    "package_breadth",
    "quantity",
    "unit",
    "bangalore_stock",
    "jodhpur_stock",
    "package_weight",
  ];

  const SEO = [
    "product_description",
    "seo_title",
    "seo_description",
    "seo_keyword",
    "selling_points",
  ];

  const Extra = [
    "CVW",
    "hinge",
    "hinge_qty",
    "hinge_name",
    "knob",
    "knob_qty",
    "knob_name",
    "handle",
    "handle_qty",
    "handle_name",
    "door",
    "door_qty",
    "door_name",
    "fitting",
    "fitting_name",
    "dial_size",
    "seating_size_width",
    "seating_size_depth",
    "seating_size_height",
    "fabric",
    "fabric_qty",
    "fabric_name",
    "wall_hanging",
    "legs",
    "mirror",
    "mirror_length",
    "mirror_width",
    "silver",
    "silver_weight",
    "upholstery",
    "trolley",
    "trolley_material",
    "tax_rate",
    "status",
    "wheel",
    "wheel_included",
    "wheel_qty",
    "wheel_name",
    "mattress",
    "mattress_length",
    "mattress_breadth",
    "plywood",
    "top_size_breadth",
    "top_size_length",
    "ceramic_drawers_qty",
    "variations",
    "parent_SKU",
    "amazon_url",
    "flipkart_url",
    "jiomart_url",
    "wood_weight",
    "metal_weight",
  ];

  function handleClose() {
    // console.log(open.data);
    setOpen((old) => ({ ...old, open: false }));
    setChecked({
      Specification: false,
      Images: false,
      Features: false,
      Miscellaneous: false,
      Inventory_Shipping: false,
      SEO: false,
      Extra_Details: false,
    });
  }
  function handleChange(e) {
    setChecked((old) => ({ ...old, [e.target.name]: e.target.checked }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    let finalCopyObj = {};

    // for separation of copyable fields

    if (checked.Specification) {
      Specifications.map((field) => {
        if (field === "category_id" || field === "category_name")
          finalCopyObj = { ...finalCopyObj, [field]: open.data.category_id };
        else if (field === "sub_category_id" || field === "sub_category_name")
          finalCopyObj = {
            ...finalCopyObj,
            [field]: open.data.sub_category_id,
          };
        else finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };

        return { [field]: open.data[field] };
      });
    }
    if (checked.Images) {
      Images.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Features) {
      Features.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Miscellaneous) {
      Miscellaneous.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Inventory_Shipping) {
      Inventory.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.SEO) {
      SEO.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Extra_Details) {
      Extra.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }

    dispatch(
      setForm({
        state: true,
        formType: "product",
        payload: finalCopyObj,
      })
    );
    handleClose();
  }
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open.open}>
            <Box sx={style}>
              <Typography variant="h6">Duplicate Product</Typography>
              <Typography variant="body1">
                Product SKU :: {open.data && open.data.SKU}
              </Typography>
              <form method="post" onSubmit={handleSubmit}>
                <FormGroup sx={{ p: 1 }}>
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    control={
                      <Checkbox
                        size={"small"}
                        name="Specification"
                        onChange={handleChange}
                        checked={checked.Specification}
                      />
                    }
                    label="Specification"
                  />
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Images"
                        onChange={handleChange}
                        checked={checked.Images}
                      />
                    }
                    label="Images"
                  /> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Features"
                        onChange={handleChange}
                        checked={checked.Features}
                      />
                    }
                    label="Features"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Miscellaneous"
                        checked={checked.Miscellaneous}
                        onChange={handleChange}
                      />
                    }
                    label="Miscellaneous"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Inventory_Shipping"
                        onChange={handleChange}
                        checked={checked.Inventory_Shipping}
                      />
                    }
                    label="Inventory & Shipping"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="SEO"
                        checked={checked.SEO}
                        onChange={handleChange}
                      />
                    }
                    label="SEO"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Extra_Details"
                        checked={checked.Extra_Details}
                        onChange={handleChange}
                      />
                    }
                    label="Extra Details"
                  />
                </FormGroup>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button size="small" variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" size="small" variant="contained">
                    Create Duplicate
                  </Button>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

// these are the part of the variation link and Unlink

// component for selecting multiple projects at a time 
function SelectProducts({ACIN,setState}) {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState({ P_SKU: [] })
  const [products, setProductToAdd] = useState()

  async function handleSearch(e) {
    const delayDebounceFn = setTimeout(() => {
      getArticlesId({ search: e.target.value })
        .then((res) => {
          setArticles((old) => ({
            P_SKU: res.data.P_SKU,
          }));
        })
        .catch((err) => {
          setArticles((old) => ({
            P_SKU: []
          }));
        });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }

  async function handleSubmit() {
    let FD = new FormData();

    FD.append("products",products.product_articles);
    FD.append("ACIN",ACIN)

    let res =await linkToVariations(FD)
    if(res.data.status === 200)
    dispatch(setAlert({
      variant : "success",
      open : true,
      message : res.data.message || "Products has been linked."
    }))
  else
  dispatch(setAlert({
    variant : "error",
    open : true,
    message : res.data.message || "Error while performing the operation."
  }))

  setState(old => ({...old,open : false}))
  }

  return (<>
    <Autocomplete
      disablePortal
      size="small"
      fullWidth
      noOptionsText={"ex : P-01001"}
      multiple
      autoHighlight
      id="combo-box-demo"
      options={articles.P_SKU.map((row) => {
        return row.SKU;
      })}
      renderInput={(params) => (
        <TextField
          onKeyUpCapture={handleSearch}
          value={articles.product_articles || ""}
          {...params}
          label="Product SKU"
        />
      )}
      onChange={(e, newMember) =>
        setProductToAdd((old) => ({
          ...old,
          product_articles: newMember,
        }))
      }
    />
    <Box sx={{ float: "right" }} mt={1}>
      <Button onClick={handleSubmit} variant="contained" size="small">Link</Button>
    </Box>
  </>)
}

function LinkedProduct({ product, setState}) {
const dispatch = useDispatch()
  const [children, setChildren] = useState([])
  const [unlink, setUnlink] = useState([])
  useEffect(() => {
    handleGetProductVariants(product.ACIN);
  }, [product])
  useEffect(() => {
    //  handleGetProductVariants(product.ACIN);
  }, [unlink])

  async function handleSubmit(id) {
    let FD = new FormData();

    if(id)
    FD.append('products', id);
    else
    FD.append('products', unlink);

    let res = await unlinkFromVariations(FD)

    if(res.data.status === 200)
      dispatch(setAlert({
        variant : "success",
        open : true,
        message : res.data.message || "Products has been unlinked."
      }))
    else
    dispatch(setAlert({
      variant : "error",
      open : true,
      message : res.data.message || "Error while performing the operation."
    }))

    setState(old => ({...old,open : false}))
  }


  async function handleGetProductVariants() {
    const res = await getLinkedProduct(product.ACIN);
    setChildren([...res.data.data])
  }


  function handleUnlink(e) {
    if (e.target.checked === true)
      return setUnlink(old => [...old, e.target.name])

    return setUnlink(old => old.filter(row => row !== e.target.name))

  }

  return <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid item sx={12} ><Typography variant="body1">Linked Products</Typography></Grid>
        {children.map(row => product.SKU !== row.SKU && <Grid key={row._id} item xs={12} p={1} >
          <FormControlLabel control={<Checkbox onChange={handleUnlink} size="small" name={row._id} >
          </Checkbox>} label={
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="body1">{row.SKU}</Typography>
              <Box >
              <Typography sx={{textOverflow:'ellipsis',maxWidth:"250px",overflow : 'hidden',whiteSpace : "nowrap"}} variant="body1" >{row.product_title}</Typography>
              </Box>
            </Box>
          } />
          <Box sx={{ float: "right" }}>
            <Button disabled = {unlink.length > 0 ? true :false} variant="contained" onClick={old => handleSubmit(row._id)} size="small" >Unlink</Button>
          </Box>
        </Grid>)}
      </Grid>
    </Grid>
    {unlink.length > 0 && <Grid item xs={12}>
      <Box sx={{ float: "right" }}>
        <Button variant="contained" size="small" onClick={()=>handleSubmit()} >Unlink Selected</Button>
      </Box>
    </Grid>}
  </Grid>
}