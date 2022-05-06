const resizeImage = (file, customWidth = null, customHeight = null) => {
	let reader = new FileReader();
	let image = new Image();
	let canvas = document.createElement("canvas");

	const dataURItoBlob = (dataURI) => {
		const bytes =
			dataURI.split(",")[0].indexOf("base64") >= 0
				? atob(dataURI.split(",")[1])
				: unescape(dataURI.split(",")[1]);
		const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
		const max = bytes.length;
		const ia = new Uint8Array(max);

		for (var i = 0; i < max; i++) {
			ia[i] = bytes.charCodeAt(i);
		}

		return new Blob([ia], { type: mime });
	};

	const resize = () => {
		let width = image.width;
		let height = image.height;

		const maxWidth = customWidth || 1280;
		const maxHeight = customHeight || 960;

		if (maxWidth < width || maxHeight < height) {
			const ratio = Math.min(maxWidth / width, maxHeight / height);
			width = width * ratio;
			height = height * ratio;
		}

		const mimeOfImage = image.currentSrc.match(/^(data:image\/[a-z]{1,})/g)[0];

		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(image, 0, 0, width, height);

		const dataUrl = canvas.toDataURL(mimeOfImage);

		return dataURItoBlob(dataUrl);
	};

	return new Promise((ok, no) => {
		if (!file.type.match(/image.*/)) {
			no(new Error("Not an image"));
			return;
		}

		reader.onload = (readerEvent) => {
			image.onload = () => ok(resize());
			image.src = readerEvent.target.result;
		};

		reader.readAsDataURL(file);
	});
};

const getFileAndBackground = async (file, width = null, height = null) => {
	const newFile = await resizeImage(file, width, height);

	return {
		file: newFile,
		preview: URL.createObjectURL(newFile)
	};
};

export default getFileAndBackground;
