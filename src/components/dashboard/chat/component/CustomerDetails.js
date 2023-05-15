import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import avatar from "../../../../assets/img/avatar.svg";

const CustomerDetails = ({ localState }) => {
  return (
    <Fragment>
      <Box className="customer-details-wrapper">
        <Header />
        {console.log(localState.cusData)}
        {localState.cusData ? (
          <GeneralDetails data={localState.cusData} />
        ) : (
          <Box className="noContent">
            <Typography variant="body2">
              {" "}
              <p>&#128542;</p> Sorry no data found.
            </Typography>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

function Header() {
  return (
    <Fragment>
      <Box className="customer-details-header">
        <Typography variant="h6">Customer Details</Typography>
      </Box>
    </Fragment>
  );
}
function GeneralDetails({ data }) {
  return (
    <Fragment>
      <Box className="customer-general-details">
        {/* general-details */}
        <Box className="customer-general-details-bubble">
          <Typography sx={{ fontWeight: 600 }} align="center" variant="body2">
            General Details
          </Typography>
          <Box className="customer-general-details-bubble-inner">
            <Box className="customer-general-details-image">
              <img src={data.profile_image || avatar} alt="profile_image" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }} variant="caption">
                Name
              </Typography>
              <Typography variant="body1">{data.username}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }} variant="caption">
                Email
              </Typography>
              <Typography variant="body1">{data.email}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }} variant="caption">
                Mobile
              </Typography>
              <Typography variant="body1">{data.mobile}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }} variant="caption">
                CID
              </Typography>
              <Typography variant="body1">{data.CID}</Typography>
            </Box>
          </Box>
        </Box>
        {/* general-details */}
        {/* Shipping address */}
        {data.address.length > 0 && (
          <Box className="customer-general-details-bubble">
            <Typography sx={{ fontWeight: 600 }} align="center" variant="body2">
              Shipping Address
            </Typography>
            <Box className="customer-general-details-bubble-inner">
              {data.address.map((row, i) => (
                <Box key={i}>
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    Address 1
                  </Typography>
                  <Typography variant="body1">{row.address}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {/* Shipping address ends */}
        {/* Billing address */}
        {data.billing.length > 1 && (
          <Box className="customer-general-details-bubble">
            <Typography sx={{ fontWeight: 600 }} align="center" variant="body2">
              Billing Address
            </Typography>
            <Box className="customer-general-details-bubble-inner">
              {data.billing.map((row, i) => (
                <Box key={i}>
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    Address 1
                  </Typography>
                  <Typography variant="body1">{row.address}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {/* Billing address ends */}
      </Box>
    </Fragment>
  );
}

export default CustomerDetails;
