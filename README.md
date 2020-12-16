# resize-image-ratio

## Use

npm i --save @quevlu/resize-image-ratio

```
    import resizeImageRatio from "./resize-image-ratio";

    const file;
    const width = 1680;
    const height = 1050;

    const fileObject = resizeImageRatio.resize(file,width,height);

    console.log(fileObject);
```

## Important

Always return the image with mime type jpeg. I will have to handle different mime types.
