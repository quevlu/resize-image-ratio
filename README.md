# resize-image-ratio

## Use

npm i --save @quevlu/resize-image-ratio

```
    import resizeImageRatio from "@quevlu/resize-image-ratio";

    const file;
    const width = 1680;
    const height = 1050;

    const resizedFile = resizeImageRatio.resize(file,width,height);

    console.log(resizedFile);
```

## Important

Always return the image with mime type jpeg. I will have to handle different mime types.
