# resize-image-ratio

This library allows to you for resizing images with custom width and height and keeps the same mime type from origin and give a preview image of resizing image.

## Use

```
    const inputFile;
    const width = 640;
    const height = 480;

    const resizedFile = resizeImageRatio.resize(inputFile,width,height);

    console.log(resizedFile);

    {
        file: fileResized,
        preview: fileResizedPreview
    }
```
