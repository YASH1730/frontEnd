import { Create, CreateRounded, TurnLeftOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDraft, getOrderDetails, pushOrder } from "../../../services/service";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import default_image from "../../../assets/img/question.svg";
import ReactHtmlParser from "react-html-parser";
import config from '../../../config.json'
import "../../../assets/custom/css/orderPreview.css";

// redux
import { useDispatch } from "react-redux";
import { setForm, setAlert } from "../../../store/action/action";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const PreviewOrder = ({ history }) => {
  let { _id } = useParams();

  let dispatch = useDispatch();
  let [data, setData] = useState({ order: undefined, custom: [], product: [] });
  let [open, setOpen] = useState({
    open: false,
    product: null,
    items: data.order && data.order.items,
  });

  useEffect(() => {
    if (_id) getData();
  }, [_id]);

  async function getData() {
    let res = await getOrderDetails(_id);
    if (res.status === 200) {
      setData({
        order: res.data.data,
        custom: res.data.custom_product,
        product: res.data.product,
      });

    }
  }

  return (
    <>
      <SetFullfilForm
        data={open}
        setAlert={setAlert}
        dispatch={dispatch}
        quantity={data.order && data.order.quantity}
        setData={setOpen}
        order={data.order && data.order.O}
      />
      <Box sx={{ pl: 4, pr: 4 }}>
        {data.order && (
          <Grid container sx={{ gap: "1rem", alignItems: "baseline" }}>
            {/* top head  */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <IconButton color={"primary"} onClick={() => history("/order")}>
                <ArrowCircleLeftIcon />
              </IconButton>
              <Typography variant="h5" sx={{ display: "inline" }}>
                {data.order.O}
              </Typography>
              {/* Status  */}
              <Box
                pl={1}
                pr={1}
                sx={{
                  borderRadius: "15px",
                  backgroundColor:
                    data.order.status === "completed"
                      ? "#23d92387"
                      : data.order.status === "processing"
                      ? "#d9c25687"
                      : "#d9565687",
                  color: "#545454cf",
                }}
              >
                <Typography variant="caption">
                  {data.order.status.toUpperCase()}
                </Typography>
              </Box>
              {/* full filed */}
              {/* <Box
                pl={1}
                pr={1}
                sx={{
                  borderRadius: "15px",
                  backgroundColor: data.order.fulfilled
                    ? "#23d92387"
                    : "#d9c25687",
                  color: "#545454cf",
                }}
              >
                <Typography variant="caption">
                  {data.order.fulfilled ? "Fulfilled" : "Unfulfilled"}
                </Typography>
              </Box> */}
              {/* store  */}
              <Box
                pl={1}
                pr={1}
                sx={{
                  borderRadius: "15px",
                  backgroundColor: "#d9c25687",
                  color: "#545454cf",
                }}
              >
                <Typography variant="caption">
                  {data.order.sale_channel}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right", color: "grey" }}>
                <Typography variant={"caption"}>
                  {new Date(data.order.order_time).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right", color: "grey" }}>
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(
                      setForm({
                        formType: "edit_order",
                        payload: data,
                        state: true,
                      })
                    );
                  }}
                >
                  <Tooltip title="Edit">
                    <CreateRounded />
                  </Tooltip>
                </IconButton>
              </Box>
              {/* <Box sx={{ display: 'block', width: '100%', pl: 6 }}>
                            <Typography variant={'caption'}>
                                {new Date(data.order.order_time).toString()}
                            </Typography>
                        </Box> */}
            </Grid>
            {/* top head ends*/}
            {/* leftWing */}
            <Grid item xs={12} md={8} className="leftWing">
              <Grid container sx={{ gap: "1rem", alignItems: "baseline" }}>
                {/* Items */}
                <Grid
                  item
                  xs={12}
                  p={2}
                  sx={{ boxShadow: 1, borderRadius: 3 }}
                  className="items"
                >
                  <Typography variant="body1">Products</Typography>
                  <ProductCards
                    item={data.order.items}
                    product={data.product}
                    data = {data}
                    setOpen={setOpen}
                    custom={data.custom}
                    quantity={data.order.quantity}
                    prdouctPrice={data.order.product_price}
                  />
                </Grid>
                {/* Items ends */}
                {/* Customizations */}
                {data.order.customizations.length > 0 && (
                  <Grid
                    item
                    xs={12}
                    p={2}
                    sx={{ boxShadow: 1, borderRadius: 3 }}
                    className="items"
                  >
                    <Typography variant="body1">Customizations</Typography>
                    <Customize custom={data.order.customizations || []} />
                  </Grid>
                )}
                {/* Customizations ends */}
                {/* Payment */}
                <Grid
                  item
                  xs={12}
                  p={2}
                  sx={{ boxShadow: 1, borderRadius: 3 }}
                  className="items"
                >
                  <Typography variant="body1">Payment</Typography>
                  <Payment
                    pay={{
                      total: data.order.total,
                      subTotal: data.order.subTotal,
                      paid: data.order.paid,
                      discount: data.order.discount,
                      pay_method_remaining: data.order.pay_method_remaining,
                      pay_method_advance: data.order.pay_method_advance,
                      quantity:
                        data.order.quantity &&
                        Object.values(data.order.quantity).reduce(
                          (row, num) => (row += parseInt(num)),
                          0
                        ),
                    }}
                  />
                </Grid>
                {/* Customizations ends */}
              </Grid>
            </Grid>
            {/* leftWing end*/}
            {/* right Wing */}
            <Grid item xs={12} md={3.5}>
              <Grid container sx={{ gap: "1rem", alignItems: "baseline" }}>
                {/* note */}
                {data.order.note !== "" && (
                  <Grid
                    item
                    xs={12}
                    p={2}
                    sx={{ boxShadow: 1, borderRadius: 3 }}
                    className="items"
                  >
                    <Typography variant="body1">Note</Typography>
                    <Box p={1}>{ReactHtmlParser(data.order.note)}</Box>
                  </Grid>
                )}
                {/* note ends */}
                {/* customer */}
                <Grid
                  item
                  xs={12}
                  p={2}
                  sx={{ boxShadow: 1, borderRadius: 3 }}
                  className="items"
                >
                  <Typography variant="body1">Customer</Typography>
                  <Customer
                    customer={{
                      CID: data.order.CID,
                      customer_name: data.order.customer_name,
                      customer_email: data.order.customer_email,
                      customer_mobile: data.order.customer_mobile,
                      city: data.order.city,
                      state: data.order.state,
                      shipping: data.order.shipping,
                      billing: data.order.billing,
                      GST: data.order.GST,
                      has_GST: data.order.has_GST,
                      classification: data.order.classification,
                      customer_type: data.order.customer_type,
                    }}
                  />
                </Grid>
                {/* customer ends*/}
                {/* fulfilled */}
                {data.order.fulfilled && (
                  <Grid
                    item
                    xs={12}
                    p={2}
                    sx={{ boxShadow: 1, borderRadius: 3 }}
                    className="items"
                  >
                    <Typography variant="body1">Fulfilled</Typography>
                    <Fulfilled
                      fulfilled={{
                        AWB: data.order.AWB,
                        pic_before_dispatch: data.order.pic_before_dispatch,
                        courier_company: data.order.courier_company,
                        inventory_location: data.order.inventory_location,
                      }}
                    />
                  </Grid>
                )}
                {/* Other ends*/}
                {/* other */}
                <Grid
                  item
                  xs={12}
                  p={2}
                  sx={{ boxShadow: 1, borderRadius: 3 }}
                  className="items"
                >
                  <Typography variant="body1">Other Information</Typography>
                  <Other
                    other={{
                      sales_person: data.order.sales_person,
                      pic_before_dispatch: data.order.pic_before_dispatch,
                      PO: data.order.PO,
                    }}
                  />
                </Grid>
                {/* Other ends*/}
              </Grid>
            </Grid>
            {/* right Wing end*/}
          </Grid>
        )}
      </Box>
    </>
  );
};

function ProductCards({
  product,
  custom,
  quantity,
  setOpen,
  item,
  prdouctPrice,
  data
}) {
  return (
    <>
      {product.length > 0 &&
        product.map((row, key) => (
          <Box key={key}>
            {" "}
            <Box className="productCard">
              <img
                width={"70px"}
                src={row.product_image[0] || default_image}
                alt="productIMG"
              />
              <Typography id="title" variant="body2">
                {row.product_title}
                <br />
                <Typography variant="caption">{row.SKU}</Typography>
              </Typography>
              <Typography variant="body2">
                ₹{prdouctPrice[row.SKU]} X {quantity[row.SKU]}
              </Typography>
              <Typography variant="body2">
                ₹{parseInt(prdouctPrice[row.SKU]) * parseInt(quantity[row.SKU])}
              </Typography>
            </Box>
            <Box className="fullfilledBtn">
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  setOpen((old) => ({
                    open: true,
                    product: row,
                    item: item[row.SKU],
                    qty: quantity[row.SKU],
                    items: item,
                    customer_name :  data.order.customer_name, 
                    customer_email :  data.order.customer_email, 
                    customer_mobile :  data.order.customer_mobile, 
                    order_id :  data.order.O,  
                  }))
                }
              >
                {item[row.SKU].fullfilled ? "Fulfilled" : "Fullfill"}
              </Button>
            </Box>
            <Divider />
          </Box>
        ))}
      {/* // for custom */}
      {custom.length > 0 &&
        custom.map((row) => (
          <>
            <Box className="productCard">
              <img
                width={"70px"}
                src={row.product_image[0] || default_image}
                alt="productIMG"
              />
              <Typography id="title" variant="body2">
                {row.product_title}
                <br />
                <Typography variant="caption">{row.CUS}</Typography>
              </Typography>
              <Typography variant="body2">
                ₹{row.selling_price} X {quantity[row.CUS]}
              </Typography>
              <Typography variant="body2">
                ₹{parseInt(row.selling_price) * parseInt(quantity[row.CUS])}
              </Typography>
            </Box>
            <Box className="fullfilledBtn">
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  setOpen((old) => ({
                    open: true,
                    product: row,
                    item: item[row.SKU],
                    items: item,
                    customer_name :  data.order.customer_name, 
                    customer_email :  data.order.customer_email, 
                    customer_mobile :  data.order.customer_mobile, 
                    order_id :  data.order.O, 
                  }))
                }
              >
                {item[row.SKU].fullfilled ? "Fulfilled" : "Fullfill"}
              </Button>
            </Box>
            <Divider />
          </>
        ))}
    </>
  );
}

function SetFullfilForm({ data, setData, dispatch, setAlert, order }) {
  const supplierCompany = [
    "DTDC",
    "Bluedart",
    "Safexpress",
    "ATS",
    "Ekart",
    "XpressBees",
    "DEV(Direct Courier)",
    "Shree Maruti Courier",
  ];

  function handleClose() {
    setData({
      product: null,
      open: false,
      item: null,
    });
  }

  function handleChange(e) {
    // console.log(e.target.value);
    if (e.target.name === "fullfilled") {
      setData((old) => ({
        ...old,
        item: { ...old.item, [e.target.name]: e.target.checked },
      }));
    } else {
      setData((old) => ({
        ...old,
        item: { ...old.item, [e.target.name]: e.target.value },
      }));
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const FD = new FormData();

      FD.append("DID", "");
      FD.append("AID", order);
      FD.append("type", "Order");
      FD.append("operation", "addOrderFulfilment");
      FD.append(
        "items",
        JSON.stringify({ ...data.items, [data.product["SKU"]]: data.item })
      );

      // for SHIPWAY INTEGRATION 
      // const shipwayData = {
      //  "username": config.shipwayUser
      // ,"password": config.shipwayKey
      // ,"carrier_id": "1"
      // ,"awb": data.trackingId
      // ,"order_id":`${data.order_id +'-'+ data.product.SKU}`
      // ,"first_name": data.customer_name
      // ,"last_name": data.customer_name
      // ,"email": data.customer_email
      // ,"phone": data.customer_mobile
      // ,"products": "N/A"
      // ,"company": "Woodshala"
      // }

      let res = await addDraft(FD);
      // let shipWayRes = await pushOrder(shipwayData);

      // console.log(shipWayRes)

      if (res.status === 200) {
        handleClose();

        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something went wrong !!!",
        })
      );
    }
  }

  return (
    <>
      {/* {console.log(data)} */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={data.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={data.open}>
          <Box sx={style} onSubmit={handleSubmit} component="form">
            <Typography
              id="transition-modal-title"
              variant="body1"
              component="h2"
            >
              Fulfilled ({data.product && data.product["SKU"]})
            </Typography>
            {data.item && (
              <>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="trackingId"
                  onChange={handleChange}
                  label="Tracking Id"
                  value={data.item.trackingId || ""}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="qty"
                  type="number"
                  onChange={handleChange}
                  label="Quantity"
                  value={
                    data.item.qty >= 0 && data.item.qty <= data.qty
                      ? data.item.qty
                      : 0
                  }
                />
                <TextField
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  onChange={handleChange}
                  name="shipping_carrier"
                  label="Shipping Carrier"
                  value={data.item.shipping_carrier || ""}
                >
                  {supplierCompany.map((row, i) => (
                    <MenuItem key={i} value={row}>
                      {row}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.item.fullfilled || false}
                      onChange={handleChange}
                      name="fullfilled"
                    />
                  }
                  label="Fullfilled"
                />
                <Button type="submit" variant="contained" size="small">
                  Apply
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

// FULFILLMENT ENDS 
function Customize({ custom }) {
  return (
    <>
      {custom.length > 0 &&
        custom.map((row, key) => (
          <Box key={key}>
            {" "}
            <Box className="customCard">
              <Typography variant="subtitle1">SKU : {row.SKU}</Typography>
              {row.cusPolish === "yes" && (
                <>
                  <Stack className="stackCustom">
                    {row.polish_images.length > 0 && (
                      <div>
                        <Typography variant="subtitle2">
                          Polish Images
                        </Typography>
                        {row.polish_images.map((row) => (
                          <img width={"70px"} src={row} alt="images" />
                        ))}
                      </div>
                    )}
                    <Divider />
                    <div>
                      <Typography variant="subtitle2">Polish Note</Typography>
                      <Typography variant="subtitle2">
                        {row.polish_note}
                      </Typography>
                    </div>
                  </Stack>
                </>
              )}
              {row.design === "yes" && (
                <>
                  <Stack className="stackCustom">
                    {row.design_images.length > 0 && (
                      <div>
                        <Typography variant="subtitle2">
                          Design Images
                        </Typography>
                        {row.polish_images.map((row) => (
                          <img width={"70px"} src={row} alt="images" />
                        ))}
                      </div>
                    )}
                    <Divider />
                    <div>
                      <Typography variant="subtitle2">Design Note</Typography>
                      <Typography variant="subtitle2">
                        {row.design_note}
                      </Typography>
                    </div>
                  </Stack>
                </>
              )}
            </Box>
            <Divider />
          </Box>
        ))}
    </>
  );
}

function Payment({ pay }) {
  return (
    <>
      <Stack className="stackCustom">
        <div>
          <Typography variant="subtitle2">Payment Method </Typography>
          <Typography variant="subtitle2">
            {pay.pay_method_remaining}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Subtotal</Typography>
          <Typography variant="subtitle2">
            ({pay.quantity} items) ₹{pay.subTotal}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Discount</Typography>
          <Typography variant="subtitle2">
            ({pay.discount}%) -₹{parseInt((pay.subTotal / 100) * pay.discount)}
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontWeight: "600 !important" }} variant="subtitle2">
            Total
          </Typography>
          <Typography sx={{ fontWeight: "600 !important" }} variant="subtitle2">
            ₹{pay.total}
          </Typography>
        </div>
        <Divider />
        <div>
          <Typography variant="subtitle2">Paid by customer</Typography>
          <Typography variant="subtitle2">₹{pay.paid}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">Payment Method Used</Typography>
          <Typography variant="subtitle2">{pay.pay_method_advance}</Typography>
        </div>
      </Stack>
    </>
  );
}

function Customer({ customer }) {
  return (
    <>
      <Stack p={1} className="customer">
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "600 !important" }}>
            {customer.customer_name}
          </Typography>
          <Typography variant="body2">{customer.customer_email}</Typography>
          <Typography variant="body2">{customer.customer_mobile}</Typography>
          <Typography variant="body2">{customer.city}</Typography>
          <Typography variant="body2">{customer.state}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "600 !important" }}>
            Shipping
          </Typography>
          <Typography variant="body2">{customer.shipping}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "600 !important" }}>
            Billing
          </Typography>
          <Typography variant="body2">{customer.billing}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "600 !important" }}>
            Other details
          </Typography>
          <Typography variant="body2">CID : {customer.CID}</Typography>
          <Typography variant="body2">GST : {customer.has_GST}</Typography>
          {customer.has_GST === "yes" && (
            <Typography variant="body2">GST Number : {customer.GST}</Typography>
          )}
          <Typography variant="body2">
            Classified : {customer.classification}
          </Typography>
          <Typography variant="body2">
            Type : {customer.customer_type}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

function Fulfilled({ fulfilled }) {
  return (
    <>
      <Box>
        <Typography variant="body2">AWB : {fulfilled.AWB}</Typography>
        <Typography variant="body2">
          Courier Company : {fulfilled.courier_company}
        </Typography>
        <Typography variant="body2">
          Inventory Location : {fulfilled.inventory_location}
        </Typography>
      </Box>
    </>
  );
}

function Other({ other }) {
  return (
    <>
      <Box>
        <Typography variant="body2">
          Picture Before Dispatch : {other.pic_before_dispatch}
        </Typography>
        <Typography variant="body2">
          Sales Person : {other.sales_person}
        </Typography>
        <Typography variant="body2">PO : {other.PO}</Typography>
      </Box>
    </>
  );
}


export default PreviewOrder;
