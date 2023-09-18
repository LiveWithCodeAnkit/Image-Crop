import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
}

export default function FileDropZone({ onDrop }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full border-2 border-gray-300 border-dashed rounded p-2 text-center h-20 flex items-center justify-center cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="">Drop your file here ...</p>
      ) : (
        <p>Drag & drop a file, or click to select files</p>
      )}
    </div>
  );
}
