/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import { v4 as uuidv4 } from "uuid";

import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import PauseIcon from "@mui/icons-material/Pause";
import Grid from "@mui/material/Grid";

import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";

import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledWave = styled(Paper)(({ theme }) => ({
  backgroundColor: "#DDEDFF",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 550,
}));

const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#F3F9FE",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 550,
  height: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function Player({ file, setFile, selBtn }) {
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readyPlaying, setReadyPlaying] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [separationButton, setseparationButton] = useState(0);
  const separationImg = [
    require("../static/img/separation/separation0.png"),
    require("../static/img/separation/separation1.png"),
    require("../static/img/separation/separation2.png"),
  ];

  const [directionButton, setdirectionButton] = useState(0);
  const directionImg = [
    require("../static/img/direction/direction0.png"),
    require("../static/img/direction/direction1.png"),
    require("../static/img/direction/direction2.png"),
    require("../static/img/direction/direction3.png"),
    require("../static/img/direction/direction4.png"),
  ];

  const [region, setRegion] = useState([
    {
      id: "region-1",
      start: 0,
      color: "transparent",
      drag: false,
      resize: false,
    },
  ]);

  const [checked, setChecked] = useState(false);
  console.log("checked1", checked);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let currentTime;
  const wavesurferId = `wavesurfer--${uuidv4()}`;

  // 플레이어 로딩이 완료되었을 때 실행됨
  useEffect(() => {
    if (playClicked === true) {
      //페이지 첫 로딩시 재생을 막음
      wavesurfer.current.regions.list["region-1"].play();
    }
    setReadyPlaying(false);
  }, [readyPlaying]);

  // 플레이어 초기화
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#${wavesurferId}`,
      waveColor: "#747474",
      progressColor: "#5568CF",
      barWidth: 6,
      cursorWidth: 5,
      cursorColor: "lightgray",
      normalize: true,
      responsive: true,
      fillParent: true,
      barRadius: 3,
      barGap: 3,
      barMinHeight: 1,
      backend: "WebAudio",
      height: 100,
      plugins: [
        RegionsPlugin.create({
          regions: region,
        }),
      ],
    });

    // 재생 중 일시정지 / 재생
    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    wavesurfer.current.on("ready", () => setReadyPlaying(true));
  }, []);

  // 파일명이 바뀔 때 실행됨(버튼 클릭시, 스위치 on/off 시)
  useEffect(() => {
    currentTime = wavesurfer.current.getCurrentTime();
    wavesurfer.current.load(file);
    setRegion([
      {
        id: "region-1",
        start: currentTime,
        end: wavesurfer.current.getDuration,
        color: "transparent",
        drag: false,
        resize: false,
      },
    ]);
  }, [file]);

  // region이 변할 때 실행됨
  useEffect(() => {
    wavesurfer.current.clearRegions();
    wavesurfer.current.addRegion(region[0]);
  }, [region]);

  // selBtn 값이 바뀌면 start를 0으로 바꿈
  useEffect(() => {
    setChecked(false);
    currentTime = 0;
    wavesurfer.current.load(file);
    setRegion([
      {
        id: "region-1",
        start: currentTime,
        end: wavesurfer.current.getDuration,
        color: "transparent",
        drag: false,
        resize: false,
      },
    ]);
  }, [selBtn]);

  // 일시정지
  const togglePlayback = () => {
    setPlayClicked(true);
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const toggleAddregion = () => {
    if (checked) {
      setFile(require("../static/wav/recognition/recognition.wav"));
    } else {
      setFile(require("../static/wav/recognition/recognition_1.wav"));
    }
  };

  // 재생버튼모양
  let transportPlayButton;
  if (!isPlaying) {
    transportPlayButton = (
      <IconButton onClick={togglePlayback}>
        <PlayArrowIcon sx={{ width: 35, height: 35, color: "#FFFFFF" }} />{" "}
      </IconButton>
    );
  } else {
    transportPlayButton = (
      <IconButton onClick={togglePlayback}>
        <PauseIcon sx={{ width: 35, height: 35, color: "#FFFFFF" }} />{" "}
      </IconButton>
    );
  }

  // 노이즈 캔슬링 온,오프
  const noiseCancel = () => {
    if (checked) {
      setFile(require("../static/wav/noise/noise0.wav"));
    } else {
      setFile(require("../static/wav/noise/noise1.wav"));
    }
  };

  const nullchangeZero = () => {
    if (file === null) {
      setFile(0);
    }
  };

  return (
    <>
      <StyledWave
        justifyContent="center"
        alignItems="center"
        sx={{
          my: 1,
          mx: "auto",
          p: 2,
          marginBottom: 0,
          borderRadius: 3,
        }}
      >
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 75, height: 75, bgcolor: "#FFFFFF" }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: "#006CD0" }}>
                {transportPlayButton}{" "}
              </Avatar>
            </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Grid item id={wavesurferId} />{" "}
          </Grid>
        </Grid>
      </StyledWave>
      <StyledCard
        sx={{
          mx: "auto",
          marginTop: -1,
          marginBottom: 6,
          borderRadius: 0,
        }}
      >
        {selBtn === 0 ? (
          <Grid
            style={{ heigth: 100 }}
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>기술 미적용</Grid>
            <Grid item>
              <Switch
                id="region"
                checked={checked} // relevant state for your case
                onChange={handleChange} // relevant method to handle your change
                onClick={toggleAddregion}
                size={"medium"}
              />
            </Grid>
            {checked === true ? (
              <Grid item style={{ color: "#006CD0" }}>
                기술 적용
              </Grid>
            ) : (
              <Grid item>기술 적용</Grid>
            )}
          </Grid>
        ) : selBtn === 1 ? (
          <Grid
            style={{ heigth: 100 }}
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>기술 미적용</Grid>
            <Grid item>
              <Switch
                id="noise"
                checked={checked} // relevant state for your case
                onChange={handleChange} // relevant method to handle your change
                onClick={noiseCancel}
              />
            </Grid>
            {checked === true ? (
              <Grid item style={{ color: "#006CD0" }}>
                기술 적용
              </Grid>
            ) : (
              <Grid item>기술 적용</Grid>
            )}
          </Grid>
        ) : selBtn === 2 ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            {separationImg.map((Image, index) => (
              <Grid
                item
                onClick={() =>
                  setFile(
                    require(`../static/wav/separation/separation${index}.wav`)
                  )
                }
              >
                <img
                  onClick={() => setseparationButton(index)}
                  src={
                    separationButton === index
                      ? require(`../static/img/separation/separation${index}_1.png`)
                      : Image
                  }
                  style={{ cursor: "pointer", width: "76px", height: "66px" }}
                />
              </Grid>
            ))}
          </Grid>
        ) : selBtn === 3 ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            {directionImg.map((Image, index) => (
              <Grid
                item
                onClick={() =>
                  setFile(
                    require(`../static/wav/direction/direction${index}.wav`)
                  )
                }
              >
                <img
                  onClick={() => setdirectionButton(index)}
                  src={
                    directionButton === index
                      ? require(`../static/img/direction/direction${index}_1.png`)
                      : Image
                  }
                  style={{ cursor: "pointer", width: "76px", height: "66px" }}
                />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </StyledCard>
    </>
  );
}

export default Player;
