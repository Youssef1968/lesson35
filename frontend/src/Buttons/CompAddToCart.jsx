import styled from "@emotion/styled";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CompAddToCart = ({ vrSource }) => {
  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });

    return myProduct.quantity;
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  }));
  const dispatch = useDispatch();

  
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  return (
    <div>
      {selectedProductsID.includes(vrSource.id) ? (
        <div
          className="mira_231024_160947_300"
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            className="mira_231024_160956_717"
            color="primary"
            sx={{ ml: "10px" }}
            onClick={() => {
              dispatch(increaseQuantity(vrSource));
            }}
          >
            <Add className="mira_231024_161008_526" fontSize="small" />
          </IconButton>

          <StyledBadge
            badgeContent={productQuantity(vrSource)}
            color="primary"
          />

          <IconButton
            className="mira_231024_161027_005"
            color="primary"
            sx={{ mr: "10px" }}
            onClick={() => {
              dispatch(decreaseQuantity(vrSource));
            }}
          >
            <Remove className="mira_231024_161037_996" fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <Button
          className="mira_231024_161055_406"
          sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(addToCart(vrSource));
          }}
        >
          <ShoppingCart sx={{ mr: "10px" }} />
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default CompAddToCart;
