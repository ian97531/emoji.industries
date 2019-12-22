import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import Header from "../components/Header";

import { fontColor } from "../constants";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px"
  },
  sectionHeader: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontStyle: "Italic",
    color: fontColor,
    borderTop: `1px solid ${fontColor}`,
    paddingTop: "27px",
    width: "100%"
  },
  emojiBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "-15px",
    marginRight: "-17px"
  },
  emoji: {
    fontSize: "110px",
    paddingLeft: "10px",
    paddingRight: "11.5px"
  }
});

export default function Index() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header></Header>
      <Container maxWidth="md" className={classes.container}>
        <Typography
          className={classes.sectionHeader}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Smileys & People
        </Typography>
        <Box className={classes.emojiBox}>
          <Typography className={classes.emoji}>😀</Typography>
          <Typography className={classes.emoji}>😃</Typography>
          <Typography className={classes.emoji}>😄</Typography>
          <Typography className={classes.emoji}>😁</Typography>
          <Typography className={classes.emoji}>😆</Typography>
          <Typography className={classes.emoji}>😅</Typography>
          <Typography className={classes.emoji}>😂</Typography>
          <Typography className={classes.emoji}>🤣</Typography>
          <Typography className={classes.emoji}>😊</Typography>
          <Typography className={classes.emoji}>😇</Typography>
          <Typography className={classes.emoji}>🙂</Typography>
          <Typography className={classes.emoji}>🙃</Typography>
          <Typography className={classes.emoji}>😉</Typography>
          <Typography className={classes.emoji}>😌</Typography>
          <Typography className={classes.emoji}>😍</Typography>
          <Typography className={classes.emoji}>🥰</Typography>
          <Typography className={classes.emoji}>😘</Typography>
          <Typography className={classes.emoji}>😗</Typography>
          <Typography className={classes.emoji}>😙</Typography>
          <Typography className={classes.emoji}>😚</Typography>
          <Typography className={classes.emoji}>😋</Typography>
          <Typography className={classes.emoji}>😛</Typography>
          <Typography className={classes.emoji}>😝</Typography>
          <Typography className={classes.emoji}>😜</Typography>
          <Typography className={classes.emoji}>🤪</Typography>
          <Typography className={classes.emoji}>🤨</Typography>
          <Typography className={classes.emoji}>🧐</Typography>
          <Typography className={classes.emoji}>🤓</Typography>
          <Typography className={classes.emoji}>😎</Typography>
          <Typography className={classes.emoji}>🤩</Typography>
          <Typography className={classes.emoji}>🥳</Typography>
          <Typography className={classes.emoji}>😏</Typography>
          <Typography className={classes.emoji}>😒</Typography>
          <Typography className={classes.emoji}>😞</Typography>
          <Typography className={classes.emoji}>😔</Typography>
          <Typography className={classes.emoji}>😟</Typography>
          <Typography className={classes.emoji}>😕</Typography>
          <Typography className={classes.emoji}>🙁</Typography>
          <Typography className={classes.emoji}>😣</Typography>
          <Typography className={classes.emoji}>😖</Typography>
          <Typography className={classes.emoji}>😫</Typography>
          <Typography className={classes.emoji}>😩</Typography>
          <Typography className={classes.emoji}>🥺</Typography>
          <Typography className={classes.emoji}>😢</Typography>
          <Typography className={classes.emoji}>😭</Typography>
          <Typography className={classes.emoji}>😤</Typography>
          <Typography className={classes.emoji}>😠</Typography>
          <Typography className={classes.emoji}>😡</Typography>
          <Typography className={classes.emoji}>🤬</Typography>
          <Typography className={classes.emoji}>🤯</Typography>
          <Typography className={classes.emoji}>😳</Typography>
          <Typography className={classes.emoji}>🥵</Typography>
          <Typography className={classes.emoji}>🥶</Typography>
          <Typography className={classes.emoji}>😱</Typography>
          <Typography className={classes.emoji}>😨</Typography>
          <Typography className={classes.emoji}>😰</Typography>
          <Typography className={classes.emoji}>😥</Typography>
          <Typography className={classes.emoji}>😓</Typography>
          <Typography className={classes.emoji}>🤗</Typography>
          <Typography className={classes.emoji}>🤔</Typography>
          <Typography className={classes.emoji}>🤭</Typography>
          <Typography className={classes.emoji}>🤫</Typography>
          <Typography className={classes.emoji}>🤥</Typography>
          <Typography className={classes.emoji}>😶</Typography>
          <Typography className={classes.emoji}>😐</Typography>
          <Typography className={classes.emoji}>😑</Typography>
          <Typography className={classes.emoji}>😬</Typography>
          <Typography className={classes.emoji}>🙄</Typography>
          <Typography className={classes.emoji}>😯</Typography>
          <Typography className={classes.emoji}>😦</Typography>
          <Typography className={classes.emoji}>😧</Typography>
          <Typography className={classes.emoji}>😮</Typography>
          <Typography className={classes.emoji}>😲</Typography>
          <Typography className={classes.emoji}>🥱</Typography>
          <Typography className={classes.emoji}>😴</Typography>
          <Typography className={classes.emoji}>🤤</Typography>
          <Typography className={classes.emoji}>😪</Typography>
          <Typography className={classes.emoji}>😵</Typography>
          <Typography className={classes.emoji}>🤐</Typography>
          <Typography className={classes.emoji}>🥴</Typography>
          <Typography className={classes.emoji}>🤢</Typography>
          <Typography className={classes.emoji}>🤮</Typography>
          <Typography className={classes.emoji}>🤧</Typography>
          <Typography className={classes.emoji}>😷</Typography>
          <Typography className={classes.emoji}>🤒</Typography>
          <Typography className={classes.emoji}>🤕</Typography>
          <Typography className={classes.emoji}>🤑</Typography>
          <Typography className={classes.emoji}>🤠</Typography>
          <Typography className={classes.emoji}>😈</Typography>
          <Typography className={classes.emoji}>👿</Typography>
          <Typography className={classes.emoji}>👹</Typography>
          <Typography className={classes.emoji}>👺</Typography>
          <Typography className={classes.emoji}>🤡</Typography>
          <Typography className={classes.emoji}>💩</Typography>
          <Typography className={classes.emoji}>👻</Typography>
          <Typography className={classes.emoji}>💀</Typography>
          <Typography className={classes.emoji}>☠️</Typography>
          <Typography className={classes.emoji}>👽</Typography>
          <Typography className={classes.emoji}>👾</Typography>
          <Typography className={classes.emoji}>🤖</Typography>
          <Typography className={classes.emoji}>🎃</Typography>
          <Typography className={classes.emoji}>😺</Typography>
          <Typography className={classes.emoji}>😸</Typography>
          <Typography className={classes.emoji}>😹</Typography>
          <Typography className={classes.emoji}>😻</Typography>
          <Typography className={classes.emoji}>😼</Typography>
          <Typography className={classes.emoji}>😽</Typography>
          <Typography className={classes.emoji}>🙀</Typography>
          <Typography className={classes.emoji}>😿</Typography>
          <Typography className={classes.emoji}>😾</Typography>
          <Typography className={classes.emoji}>🤲</Typography>
          <Typography className={classes.emoji}>👐</Typography>
          <Typography className={classes.emoji}>👏</Typography>
          <Typography className={classes.emoji}>🤝</Typography>
          <Typography className={classes.emoji}>👍</Typography>
          <Typography className={classes.emoji}>👎</Typography>
          <Typography className={classes.emoji}>👊</Typography>
          <Typography className={classes.emoji}>✊</Typography>
          <Typography className={classes.emoji}>🤛</Typography>
          <Typography className={classes.emoji}>🤜</Typography>
          <Typography className={classes.emoji}>🤞</Typography>
          <Typography className={classes.emoji}>🤟</Typography>
          <Typography className={classes.emoji}>🤘</Typography>
          <Typography className={classes.emoji}>👌</Typography>
          <Typography className={classes.emoji}>🤏</Typography>
          <Typography className={classes.emoji}>👈</Typography>
          <Typography className={classes.emoji}>👉</Typography>
          <Typography className={classes.emoji}>👆</Typography>
          <Typography className={classes.emoji}>👇</Typography>
          <Typography className={classes.emoji}>
            &#x1F477;&#x1F3FB;&#x200D;&#x2640;&#xFE0F;
          </Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
          <Typography className={classes.emoji}></Typography>
        </Box>
      </Container>
      <Container maxWidth="md" className={classes.container}>
        <Typography
          className={classes.sectionHeader}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Animals & Nature
        </Typography>
        <Box className={classes.emojiBox}></Box>
      </Container>
    </React.Fragment>
  );
}
