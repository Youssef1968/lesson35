import "./product-details.css";
import { useGetOneProductQuery } from "Redux/productsApi";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./product-details.css";
import { useRef, useState } from "react";
import CompAddToCart from "../../Buttons/CompAddToCart";

const ProductDetails = () => {
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneProductQuery(id);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }
  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>

            <p>{data.description}</p>

            <div className="mira_231024_151858_212 thumb" ref={myRef}>
              {data.imageLink.map((img, index) => (
                <img
                  className="mira_231024_154042_011"
                  src={img}
                  alt=""
                  key={index}
                  onClick={() => {
                    setindex(index);

                    const images = myRef.current.children;

                    for (let i = 0; i < images.length; i++) {
                      images[i].className = images[i].className.replace(
                        "active",
                        ""
                      );
                    }
                    images[index].className = "active";
                  }}
                />
              ))}
            </div>

            <CompAddToCart vrSource={data} />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
