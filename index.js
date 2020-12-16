var browserImageSize = require("browser-image-size");

const getSizeImage = async (file) => {
  return await browserImageSize(file).then((size) => size);
};

const needResizeImage = (
  width,
  height,
  customWidth = "",
  customHeight = ""
) => {
  const maxWidth = customWidth || 1280;
  const maxHeight = customHeight || 960;
  let newWidth = width;
  let newHeight = height;
  let needResize = false;

  if (maxWidth < width || maxHeight < height) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    newWidth = width * ratio;
    newHeight = height * ratio;
    needResize = true;
  }

  return {
    needResize: needResize,
    width: newWidth,
    height: newHeight,
  };
};

const resizeImage = (file, width, height) => {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  let image = new Image();
  image.src = file;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg");

  return dataUrl;
};

const canvasToBinary = (canvasImage) => {
  let BASE64_MARKER = ";base64,";
  let parts, contentType, raw;

  if (canvasImage.indexOf(BASE64_MARKER) == -1) {
    parts = canvasImage.split(",");
    contentType = parts[0].split(":")[1];
    raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }

  parts = canvasImage.split(BASE64_MARKER);
  contentType = parts[0].split(":")[1];
  raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

const createBackground = (file) => {
  return URL.createObjectURL(file);
};

const resize = async (file, customWidth = "", customHeight = "") => {
  let newFile;
  const blobUrl = URL.createObjectURL(file);
  const aspectRatio = await getSizeImage(blobUrl);
  const { width, height, needResize } = needResizeImage(
    aspectRatio.width,
    aspectRatio.height,
    customWidth,
    customHeight
  );

  if (needResize) {
    const resizedImage = resizeImage(blobUrl, width, height);
    newFile = canvasToBinary(resizedImage);
  } else {
    newFile = file;
  }

  const background = createBackground(newFile);

  return {
    file: newFile,
    background: background,
  };
};

export default resize;
