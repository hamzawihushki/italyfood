import React, { useEffect, useMemo, useState } from "react";
import NiceCard from "./NiceCard";
import { motion } from "framer-motion";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
export default function OurTeam() {
  const [showType, setShowType] = useState("All");

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=it")
      .then(function (response) {
        // handle success
        setItems(response.data.meals);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  console.log(items, "the items is");

  function handleTypeShow(e) {
    setShowType(e.target.value);
  }

  const seaFood = useMemo(() => {
    return items.filter((t) => {
      console.log("Seafood");
      return t.strCategory == "Seafood";
    });
  }, [items]);
  const beef = useMemo(() => {
    return items.filter((t) => {
      console.log("beef");
      return t.strCategory == "Beef";
    });
  }, [items]);
  const Side = useMemo(() => {
    return items.filter((t) => {
      console.log("Side");
      return t.strCategory == "Side";
    });
  }, [items]);

  let finalShow = items;

  if (showType == "Seafood") {
    finalShow = seaFood;
  } else if (showType == "Beef") {
    finalShow = beef;
  } else if (showType == "Side") {
    finalShow = Side;
  }
  return (
    <>
      <ToggleButtonGroup
        value={showType}
        exclusive
        onChange={handleTypeShow}
        aria-label="text alignment"
        className="wrapper-toggle"
      >
        <ToggleButton
          value="All"
          aria-label="left aligned"
          className="type-btn"
        >
          All
        </ToggleButton>
        <ToggleButton
          value="Seafood"
          aria-label="centered"
          className="type-btn"
        >
          Sea Food
        </ToggleButton>
        <ToggleButton
          value="Beef"
          aria-label="right aligned"
          className="type-btn"
        >
          Beef
        </ToggleButton>
        <ToggleButton
          value="Side"
          aria-label="right aligned"
          className="type-btn"
        >
          Side
        </ToggleButton>
      </ToggleButtonGroup>

      <motion.div
        className="container"
        style={{ marginBlock: "0" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="italic-text-dark text-center py-5 my-5">{showType}</h1>
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          {finalShow.map((item) => (
            <motion.div key={item.idMeal} variants={itemVariants}>
              <NiceCard
                image={item.strMealThumb}
                name={item.strMeal}
                id={item.idMeal}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
