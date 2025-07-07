import { Button } from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
export const LikeButtonComp = () => {
 
  const [like, setLike] = useState(false);
 const handleClick = () => {
    setLike((prev)=>!prev);
  };
  let iconShow;
  if (like === true) {
    iconShow = <FavoriteIcon />;
  } else {
    iconShow = <FavoriteBorderIcon />;
  }
  return (
    <>
      <Button onClick={handleClick}>
        {iconShow}
        {/* {like ? <FavoriteIcon/> : <FavoriteBorderIcon/>} */}
      </Button>
    </>
  );
};
