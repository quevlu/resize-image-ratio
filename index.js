var resizeImage = function (file, customWidth, customHeight) {
  var file = file;
  var reader = new FileReader();
  var image = new Image();
  var canvas = document.createElement("canvas");

  var dataURItoBlob = function (dataURI) {
    var bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    var mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var max = bytes.length;
    var ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };

  var resize = function () {
    var width = image.width;
    var height = image.height;

    const maxWidth = customWidth || 1280;
    const maxHeight = customHeight || 960;

    if (maxWidth < width || maxHeight < height) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = width * ratio;
      height = height * ratio;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    var dataUrl = canvas.toDataURL();
    return dataURItoBlob(dataUrl);
  };

  return new Promise(function (ok, no) {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }
    reader.onload = function (readerEvent) {
      image.onload = function () {
        return ok(resize());
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export default resizeImage;
