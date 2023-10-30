import { Box } from "@mui/system";
import "./Home.css";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useNavigate } from "react-router-dom";
import CompAddToCart from "../../Buttons/CompAddToCart";

const Home = () => {
  const theme = useTheme();
  // data =>ALL products
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const navitage = useNavigate();

  if (isLoading) {
    return (
      <Box className="mira_231024_160640_495" sx={{ display: "flex" }}>
        <CircularProgress className="mira_231024_160736_843" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="mira_231024_160753_909" sx={{ display: "flex" }}>
        <Typography
          className="mira_231024_160800_037"
          variant="h1"
          color="error"
        >
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }
  console.log(data);
  if (data) {
    return (
      <Stack
        className="mira_231024_160820_038"
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => {
          return (
            <Card
              className="mira_231024_160826_973 card"
              key={item.id}
              sx={{ maxWidth: 277, mb: 6, mx: 2 }}
            >
              <CardMedia
                className="mira_231024_160835_941"
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navitage(`product-details/${item.id}`);
                }}
              />
              <CardContent className="mira_231024_160846_839">
                <Typography
                  className="mira_231024_160918_421"
                  variant="body2"
                  color="text.secondary"
                >
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                className="mira_231024_160938_569"
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                <CompAddToCart vrSource={item} />

                <Typography
                  className="mira_231024_161104_609"
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
