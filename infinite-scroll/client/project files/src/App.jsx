import { useCallback, useEffect, useRef, useState } from "react";
import { parseLinkHeader } from "./parseLinkHeader";


const LIMIT = 10


export default function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextRef = useRef();

  async function fetchPhotos(url, { overwrite = false } = {}) {
    setIsLoading(true)
    try {

      await new Promise(res => setTimeout(res, 2000))
      
      const res = await fetch(url);
      nextRef.current = parseLinkHeader(res.headers.get("Link")).next;
  
      const photos = await res.json();
  
      if (overwrite) {
        setPhotos(photos);
      } else {
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...photos];
        });
      }
    } catch(err) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
   

    // setPhotos((prevPhotos) =>
    //   prevPhotos.length ? [...prevPhotos, ...photos] : photos
    // );
  }

  const imageRef = useCallback((image) => {
    if (image == null || nextRef.current == null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPhotos(nextRef.current);
        observer.unobserve(image);
      }
    });

    observer.observe(image);
  }, []);

  useEffect(() => {
    fetchPhotos(`http://127.0.0.1:3000/photos?_page=1&_limit=${LIMIT}`, {
      overwrite: true,
    });
  }, []);

  return (
    <div className="grid">
      {photos.map((photo, idx) => {
        return (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.title}
            ref={idx === photos.length - 1 ? imageRef : undefined}
          />
        );
      })}

      {isLoading && Array.from({ length: LIMIT }, (_, idx) => idx).map((n) => {
        return (
          <div key={n} className="skeleton">
            Loading...
          </div>
        );
      })}
    </div>
  );
}
