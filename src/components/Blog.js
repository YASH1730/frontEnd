import React, {useEffect} from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from "@mui/material";

import Aos from 'aos';
import 'aos/dist/aos.css'

//css
import "../assets/custom/css/blog.css";

// images
import banner from "../assets/img/Blog/blog_banner.jpg";
import table from "../assets/img/Blog/table.jpg";
import chair from "../assets/img/Blog/chair.jpg";
import bed from "../assets/img/Blog/bed.jpg";
import door from "../assets/img/Blog/door.jpg";


export default function Blog() {

    useEffect(()=>{
Aos.init({duration : 2000})
    },[])

  // function for rendring the cards

  const cardData = [
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      {
          image : table,
          title : 'Table'
      },
      {
          image : chair,
          title : 'Chair'
      },
      {
          image : bed,
          title : 'King Bed'
      },
      {
          image : door,
          title : 'Door'
      },
      
  ]

  function cardGenrator(card) {
    return (
    <Grid item data-aos = 'fade-up' sx = {12} md = {3} >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height = '200'
            className = 'cardMedia'
            image= {card.image}
            alt={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
      </Grid>
    );
  }

  return (
    <>
      {/* Title  */}
      <title>Blog</title>

      {/* Top container  */}
      <Grid container className="banner">
        <Grid item xs={12} className="bannerText">
          <Typography variant="h4">Blog</Typography>
          <Typography align="left" variant="h6">
            
            WoodShala
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              backgroundPosition: "center",
              background: `linear-gradient(rgb(243 243 243 / 15%), rgb(80 39 0 / 66%)) 0% 0% / 100% 100%, url(${banner})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            className="banner"
          />
        </Grid>
      </Grid>
      {/* Ends Top container  */}

      {/* Card Section */}

      <Grid container className = 'cardContainer' spacing = {8}>
      
      {
          cardData.map((card)=>{
            return  cardGenrator(card)
        })
      }
      </Grid>

      {/* Ends Card Section */}

      {/* Footer  */}
      <Grid container className = 'footter'>
          
      </Grid>
      {/* End Footer  */}
    </>
  );
}
