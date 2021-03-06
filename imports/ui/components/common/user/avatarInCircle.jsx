import React from "react";
const IMGPATH = cv.IMGPATH;

const avatarInCircle = props => {
  //console.log('avatarInCircle', props);
  let { avatarSrc, size, color, float, border } = props;
  let content = "";
  if (!color) color = "orange";
  if (!size) size = "40";

  let style = {
    border: `solid ${size / 10}px ${color}`,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.7}px`,
    paddingTop: `${size * 0.35}px`
  };
  if (border) style.border = border;

  if (!avatarSrc) {
    let h = Math.floor(Math.random() * 360);
    let bgColor = `hsl(${h}, 80%, 80%)`;
    //style.backgroundColor = bgColor;
    let abc = "qwertyuiopasdfghjklzxcvbnm";
    let abcLength = abc.length;
    content = abc[Math.floor(Math.random() * abcLength)];
  } else {
    style.background = `url('${IMGPATH +
      avatarSrc}') transparent center center no-repeat`;
    style.backgroundSize = "cover";
  }

  if (float) {
    style.float = float;
  }

  return (
    <div className="avatarInCircle" style={style}>
      {content}
    </div>
  );
};

export default avatarInCircle;
