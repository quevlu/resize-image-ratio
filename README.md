# resize-image-ratio

This library creates a new image file object and a preview from a file image object with a custom width an height keeping the same aspect ratio

## Use

```
    import resizeImageRatio from '@quevlu/resize-image-ratio';

    const width = 640;
    const height = 480;

    const resizedFile = await resizeImageRatio(fileObject,width,height);

    console.log(resizedFile);

    {
        file: fileResized,
        preview: fileResizedPreview
    }
```
