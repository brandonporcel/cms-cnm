import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SanityImageAssetDocument } from "next-sanity";

import urlFor from "@/lib/sanityImage";

function Poster({ url, alt }: { url: SanityImageAssetDocument; alt: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="w-[90px] h-[125px] relative mb-1" onClick={openModal}>
        <Image
          src={urlFor(url).url()}
          alt={alt}
          className="object-cover rounded-xl cursor-pointer"
          fill
        />
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors cursor-pointer h-10 w-10"
                aria-label="Close modal"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>X</span>
              </motion.button>

              <motion.div
                className="relative w-full h-full max-w-2xl max-h-[80vh]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Image
                  src={urlFor(url).url() || "/placeholder.svg"}
                  alt={alt}
                  className="object-contain rounded-xl"
                  fill
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Poster;
