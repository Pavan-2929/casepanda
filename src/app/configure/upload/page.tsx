"use client";

import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import React, { useState } from "react";
import DropZone, { FileRejection } from "react-dropzone";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "@/firebase";
import { useAppDispatch } from "@/lib/redux/hook";
import { useToast } from "@/components/ui/use-toast";
import { setImageLink } from "@/lib/redux/features/imageSlice";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const UplaodPage = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(15);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onDragAccepted = (acceptedFile: File[]) => {
    setIsDragOver(true);
    const [image] = acceptedFile;
    handleFileUpload(image);
    setIsDragOver(false);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      title: "error",
      description: "Invalid file format",
      variant: "destructive",
    });
  };

  const handleFileUpload = (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          console.log(downloadURL);

          dispatch(setImageLink({ imageLink: downloadURL }));
          setIsRedirecting(true);
          router.push("/configure/design");
        });
      }
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "h-full p-2 bg-zinc-900/5 my-[60px] rounded-sm ring-1 ring-inset ring-gray-900/10",
        { "bg-blue-900/10 ring-blue-900/25": isDragOver }
      )}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <DropZone
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDropAccepted={onDragAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="py-32 select-none flex flex-col justify-center items-center"
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500" />
              ) : isUploading || isRedirecting ? (
                <Loader2 className="animate-spin w-6 h-6 text-zinc-500" />
              ) : (
                <Image className="text-zinc-500 h-6 w-6" />
              )}
              <div className="text-gray-700 my-2">
                {isUploading ? (
                  <div className="flex flex-col mx-auto text-center justify-center gap-y-2">
                    <p>Uploding...</p>
                    <Progress
                      value={uploadProgress}
                      className="text-primary bg-gray-300 w-40"
                    />
                  </div>
                ) : isRedirecting ? (
                  <div>Redircting | Please wait</div>
                ) : (
                  <div>
                    <p className="text-[15px] font-medium tracking-wide">
                      <span className="font-semibold">Click to Upload</span> or
                      drag and drop
                    </p>
                  </div>
                )}
              </div>
              <p className="text-gray-500  tracking-tight text-[15px]">
                PNG, JPG or JPEG{" "}
              </p>
            </div>
          )}
        </DropZone>
      </motion.div>
    </motion.div>
  );
};

export default UplaodPage;
