type result = {
  image: HTMLImageElement;
  height: number;
  width: number;
  scale: number;
  actualSize: {
    width: number;
    height: number;
  };
  orientation: "portrait" | "landscape";
};

export const loadImage = (
  uri: string,
  desiredWidth: number,
  desiredHeight: number
): Promise<result> => {
  let finalWidth: number = 0;
  let finalHeight: number = 0;
  const image = new Image();
  image.src = uri;

  return new Promise((resolve) => {
    image.onload = function () {
      const { width, height } = image;

      const widthFit = desiredWidth / width; /* targetWidth / actual width */
      const heightFit =
        desiredHeight / height; /* targetHeight / actual width */
      const scale = widthFit > heightFit ? heightFit : widthFit;

      finalWidth = width * scale;
      finalHeight = height * scale;

      /**
       * if the size is less then the desired one ie:
       * we want the 100 X 100 image but the size is less the 100 both (width or height)
       * if this is happened we will add the difference to both width and height to maintain the aspect ratio
       * **/
      if (finalWidth < desiredWidth) {
        const difference = desiredWidth / finalWidth;
        finalWidth = finalWidth * difference;
        finalHeight = finalHeight * difference;
      }

      if (finalHeight < desiredHeight) {
        const difference = desiredHeight / finalHeight;
        finalWidth = finalWidth * difference;
        finalHeight = finalHeight * difference;
      }

      /**
       * if we divide the finalWidth by the actualWidth of the image and multiply by 100
       * it will give use the percentage like by how many percentage we decrease the image
       * **/
      const initialScale = (finalWidth / width) * 100;

      const orientation = height > width ? "portrait" : "landscape";

      resolve({
        image,
        height: finalHeight,
        width: finalWidth,
        scale: initialScale,
        orientation,
        actualSize: {
          width,
          height,
        },
      });
    };
  });
};
