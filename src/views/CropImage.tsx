import { useCallback, useState } from "react";

import ImageCropper from "../components/ImageCropper";
import FileDropZone from "../components/FileDropZone";
import AppSlider from "../components/AppSlider";
import { BiCloudDownload } from "react-icons/bi";

export default function CropImage() {
  const [remoteImage, setRemoteImage] = useState("");
  const [localImage, setLocalImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [rotation, setRotation] = useState(0);

  const isImageSelected = remoteImage || localImage ? true : false;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setRemoteImage("");
    setLocalImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const downloadImage = async () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    const name = `${Date.now()}_wallpaper`;
    link.download = name;
    link.href = URL.createObjectURL(croppedImage);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isImageSelected)
    return (
      <div className="space-y-4 w-full p-4">
        <input
          className="w-full p-2 rounded border-2 border-gray-300 focus:border-gray-700 outline-none focus:outline-none transition"
          placeholder="https://images.unsplash.com/photo-1691673236501..."
          value={remoteImage}
          onChange={({ target }) => {
            setLocalImage("");
            setRemoteImage(target.value);
          }}
        />

        <FileDropZone onDrop={onDrop} />
      </div>
    );

  return (
    <div className="flex">
      <div className="space-y-4 w-96 p-4">
        <input
          className="w-full p-2 rounded border-2 border-gray-300 focus:border-gray-700 outline-none focus:outline-none transition"
          placeholder="https://images.unsplash.com/photo-1691673236501..."
          value={remoteImage}
          onChange={({ target }) => {
            setLocalImage("");
            setRemoteImage(target.value);
          }}
        />

        <FileDropZone onDrop={onDrop} />

        <AppSlider
          min={0}
          max={360}
          defaultValue={0}
          value={rotation}
          label="Rotate"
          onChange={handleOnRotation}
        />

        <AppSlider
          min={1}
          max={3}
          value={zoom}
          label="Zoom"
          defaultValue={1}
          onChange={handleOnZoom}
        />

        <button
          className="flex items-center justify-center p-2 bg-gray-400 hover:bg-gray-700 transition rounded space-x-1 uppercase text-white w-full drop-shadow"
          onClick={downloadImage}
        >
          <BiCloudDownload size={24} />
          <span>Download</span>
        </button>
      </div>

      <div className="h-screen p-4 flex-1 flex items-center justify-center">
        <ImageCropper
          zoom={zoom}
          onZoomChange={handleOnZoom}
          rotation={rotation}
          onRotationChange={setRotation}
          source={remoteImage || localImage}
          onCrop={setCroppedImage}
          width={1080}
          height={1920}
        />
      </div>
    </div>
  );
}
