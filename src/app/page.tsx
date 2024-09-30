"use client";
import Tilt from "@/components/tilt";
import Image from "next/image";
import FallingSakura from "@/components/sakura";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quicksand, Dancing_Script } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Define the props interface for FooterLink
interface FooterLinkProps {
  href: string;
  text: string;
  isOrangeTheme: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  text,
  isOrangeTheme,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`font-medium transition-colors duration-100 ${
      isOrangeTheme
        ? "text-slate-100 hover:text-white"
        : "text-pink-600 hover:text-pink-700"
    }`}
  >
    {text}
  </a>
);

export default function Home() {
  const [isOrangeTheme, setIsOrangeTheme] = useState(false);
  const [sakuraSpeed, setSakuraSpeed] = useState(0.5);
  const [imageKey, setImageKey] = useState(0);

  const handleThemeSwitch = () => {
    setIsOrangeTheme((prev) => !prev);
    setImageKey((prev) => prev + 1);
  };

  const handleTiltHover = () => {
    setSakuraSpeed(0.01);
  };

  const handleTiltLeave = () => {
    setSakuraSpeed(0.5);
  };

  const imageSrc = isOrangeTheme ? "/n.jpg" : "/h.jpg";
  const textMessage = isOrangeTheme ? "Dattebayo..." : "Have a great day!";

  return (
    <motion.div
      className={`${
        dancingScript.className
      } min-h-screen flex flex-col overflow-hidden relative items-center justify-center p-8 md:p-12 transition-colors duration-300 ${
        isOrangeTheme
          ? "bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600"
          : "bg-gradient-to-br from-violet-300 via-pink-200 to-pink-100"
      }`}
      animate={{ opacity: [0, 1], transition: { duration: 0.5 } }}
    >
      <FallingSakura
        speed={sakuraSpeed}
        className="absolute"
        totalPetals={25}
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 right-6 bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
        onClick={handleThemeSwitch}
        aria-label="Toggle Theme"
      >
        Toggle Theme
      </motion.button>

      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 20 }}
        className="bg-white bg-opacity-95 rounded-3xl p-6 md:p-12 max-w-md md:max-w-xl w-full transform transition-all duration-500 flex flex-col items-center justify-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
      >
        <h1
          className={`${quicksand.className} text-3xl md:text-4xl text-gray-900 mb-4 text-center`}
        >
          Discover the 3D Tilt
        </h1>
        <p className="text-gray-600 text-base md:text-lg text-center mb-8">
          Experience the interactive 3D tilt effect by hovering over the card
          below.
        </p>

        <Tilt
          scale={1.1}
          perspective={1000}
          className={`${
            isOrangeTheme
              ? "bg-gradient-to-r from-orange-300 to-orange-500"
              : "bg-gradient-to-br from-violet-300 to-pink-300"
          } rounded-2xl p-4 md:p-8 relative flex flex-col items-center justify-between w-full max-w-[320px] md:max-h-[320px] transition-all duration-700 aspect-square shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]`}
        >
          <div
            className="absolute w-full h-full z-[1]"
            onMouseEnter={handleTiltHover}
            onMouseLeave={handleTiltLeave}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={imageKey}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center overflow-hidden rounded-full shadow-2xl grow pop-out-[30px]"
            >
              <Image
                src={imageSrc}
                alt="Tilt Image"
                width={500}
                height={500}
                className="rounded-full border-[1px] h-full aspect-square w-full object-cover p-[1px] border-white"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={imageKey}
              initial={{ opacity: 0, translateY: 10, }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
              transition={{ duration: 0.3 }}
              className="text-white px-4 py-1 drop-shadow-md mt-2 h-[10px] pop-out-[60px]"
            >
              {textMessage}
            </motion.p>
          </AnimatePresence>
        </Tilt>
      </motion.div>

      <footer className="absolute bottom-5 text-sm md:text-base text-center flex sm:gap-10 sm:flex-row flex-col">
        <p>
          Explore the project repository on &nbsp;
          <FooterLink
            href="https://github.com/original-repo"
            text="GitHub"
            isOrangeTheme={isOrangeTheme}
          />
          .
        </p>
        <p>
          Original Repo &nbsp;
          <FooterLink
            href="https://github.com/original-repo"
            text="GitHub"
            isOrangeTheme={isOrangeTheme}
          />
          .
        </p>
        <p>
          Thanks to&nbsp;
          <FooterLink
            href="https://codepen.io/rudtjd2548/pen/qBpVzxP"
            text="Codepen"
            isOrangeTheme={isOrangeTheme}
          />
          .
        </p>
      </footer>
    </motion.div>
  );
}
