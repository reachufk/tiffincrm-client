import { useState, useEffect } from "react";
import { Grid, Switch, Box } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState(['categoryA', 'categoryB', 'categoryC', 'categoryD', 'categoryE', 'categoryF', 'categoryG']);
  const navigate = useNavigate();

  useEffect(() => {
    //   PostService.getAllPublicPosts().then(
    //     (response) => {
    //       setPosts(response.data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }, []);
    // setCategories([])
  }, [])

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    if (checked) {
      setCategories(['categoryA', 'categoryC', 'categoryE', 'categoryG']);
    } else {
      setCategories(['categoryA', 'categoryB', 'categoryC', 'categoryD', 'categoryE', 'categoryF', 'categoryG']);
    }
  };

  const handleCategoryClick = ({ id }) => {
    navigate(`/category/${id}`);
  };

  return (
    <>
      <Switch color='success' checked={checked} onChange={handleChange} />
      <span>Veg</span>
      <Box sx={{ flexGrow: 1, marginTop: '1vh' }}>
        <Grid container spacing={1}>
          {
            categories.map((category, index) => (
              <Grid key={index} item xs={6} md={3} onClick={() => handleCategoryClick({
                category,
                id: index
              })} >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  );
};

export default Categories;