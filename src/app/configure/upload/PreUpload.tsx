import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hook";
import { setImageLink } from "@/lib/redux/features/imageSlice";

const PRE_UPLOADED_IMAGE = [
  "https://firebasestorage.googleapis.com/v0/b/casepanda-22941.appspot.com/o/21ccd98e43daff9742d8fefa5f190520.jpg?alt=media&token=6d8cce63-4cb2-46fd-bf28-6f34eab394ab",
  "https://firebasestorage.googleapis.com/v0/b/casepanda-22941.appspot.com/o/d9a9f47b31dd8290da11121bfa72517a.jpg?alt=media&token=efd39a1b-5aa2-4e5a-be7e-3cede70a3e28",
  "https://firebasestorage.googleapis.com/v0/b/casepanda-22941.appspot.com/o/e63b6ca5d6e1d6a683a7d55263fab37a.jpg?alt=media&token=3e6c2c09-c6f4-4487-83ca-86c2bccfa404",
  "https://firebasestorage.googleapis.com/v0/b/casepanda-22941.appspot.com/o/f684023585a6f95d88371f268f3b61b3.jpg?alt=media&token=53afd625-2d25-4a29-81fb-cb2aa331b56a",
];

const PreUpload = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handleSelect = () => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    const selectedImage = PRE_UPLOADED_IMAGE[currentIndex];
    dispatch(setImageLink({ imageLink: selectedImage }));
    router.push("/configure/design");
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Slect From Design
        </h1>
      </div>
      <div
        className="embla bg-white shadow-lg rounded-lg overflow-hidden"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {PRE_UPLOADED_IMAGE.map((image, index) => (
            <div
              className="embla__slide min-w-full relative flex justify-center items-center"
              key={index}
            >
              <img
                src={image}
                alt={`Pre-uploaded ${index + 1}`}
                className="object-cover w-full max-h-56 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          disabled={!canScrollPrev}
          className={`p-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition ${
            !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#8249;
        </button>
        <Button onClick={handleSelect}>Select Image</Button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          disabled={!canScrollNext}
          className={`p-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition ${
            !canScrollNext ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default PreUpload;
