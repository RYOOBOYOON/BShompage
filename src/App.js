import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Player from "./container/player";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import HoverImage from "react-hover-image";

const StyledToggle = styled(ToggleButton)(({ selectedColor }) => ({
  backgroundColor: "white !important",
  // padding: "",
  borderColor: "transparent",
}));

function App() {
  const blob = [
    require("./static/wav/recognition/recognition.wav"),
    require("./static/wav/noise/noise0.wav"),
  ];

  const blob1 = [
    require("./static/wav/separation/separation0.wav"),
    require("./static/wav/direction/direction0.wav"),
  ];

  const [item, setitem] = useState(blob[0]);
  const [selectedButton, setSelectedButton] = useState(0);

  const mainImagepath = `./static/img/skill/skill`;

  // OnClick ??
  let selectitem = [];
  for (let i = 0; i < blob.length; i++) {
    selectitem[i] = () => {
      setitem((previtem) => blob[i]);
    };
  }

  let selectitem1 = [];
  for (let i = 0; i < blob1.length; i++) {
    selectitem1[i] = () => {
      setitem((previtem) => blob1[i]);
    };
  }

  // skill 버튼 중 하나를 클릭했을 때
  const buttonChange = (event, value) => {
    if (value !== null) {
      setSelectedButton(value);
    }
  };

  return (
    <div className="App">
      <Player
        file={item}
        setFile={setitem}
        index={item}
        selBtn={selectedButton}
      />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Stack spacing={2} direction="row">
          <ToggleButtonGroup
            exclusive
            value={selectedButton}
            onChange={buttonChange}
          >
            {selectitem.map((sel, index) => (
              <StyledToggle value={index} onClick={sel}>
                <HoverImage
                  className="hoverImage"
                  src={require(`${mainImagepath}${index}.png`)}
                  hoverSrc={require(`${mainImagepath}${index}_1.png`)}
                  style={{
                    cursor: "pointer",
                    width: "284.78px",
                    height: "170.87px",
                  }}
                />
              </StyledToggle>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Stack spacing={2} direction="row">
          <ToggleButtonGroup
            exclusive
            value={selectedButton}
            onChange={buttonChange}
            style={{ boxSizing: "border-box !important" }}
          >
            {selectitem1.map((sel, index) => (
              <StyledToggle
                variant="outline"
                value={index + 2}
                key={index + 2}
                onClick={sel}
              >
                <HoverImage
                  src={require(`${mainImagepath}${index + 2}.png`)}
                  hoverSrc={require(`${mainImagepath}${index + 2}_1.png`)}
                  style={{
                    cursor: "pointer",
                    width: "284.78px",
                    height: "170.87px",
                  }}
                />
              </StyledToggle>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </div>
  );
}

export default App;
