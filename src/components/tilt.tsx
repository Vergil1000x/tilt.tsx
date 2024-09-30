"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

interface TiltProps {
  maxTilt?: number;
  perspective?: number;
  easing?: string;
  scale?: number;
  speed?: number;
  disableAxis?: "x" | "y" | null;
  className?: string;
  children?: React.ReactNode;
}

interface MousePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Tilt: React.FC<TiltProps> = ({
  maxTilt = 20,
  perspective = 1000,
  easing = "cubic-bezier(.03,.98,.52,.99)",
  scale = 1,
  speed = 1000,
  disableAxis = null,
  className,
  children,
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [ticking, setTicking] = useState(false);
  const [mousePositions, setMousePositions] = useState<MousePosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const getMousePositions = useCallback((event: MouseEvent): MousePosition => {
    const element = tiltRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
    return { x: 0, y: 0, width: 0, height: 0 };
  }, []);

  const getValues = useCallback(() => {
    const { width, height, x, y } = mousePositions;
    const tiltX = (maxTilt / 2 - (x / width) * maxTilt).toFixed(2);
    const tiltY = ((y / height) * maxTilt - maxTilt / 2).toFixed(2);
    return { tiltX, tiltY };
  }, [maxTilt, mousePositions]); // Use mousePositions directly

  const updateTransforms = useCallback(() => {
    const element = tiltRef.current;
    if (!element) return;

    const { tiltX, tiltY } = getValues();
    element.style.transform = `perspective(${perspective}px) rotateX(${
      disableAxis === "x" ? 0 : tiltY
    }deg) rotateY(${
      disableAxis === "y" ? 0 : tiltX
    }deg) scale3d(${scale}, ${scale}, ${scale})`;

    // Handle pop-out elements
    const popOutElements = Array.from(
      element.querySelectorAll("[class*='pop-out-']")
    );

    popOutElements.forEach((popOutElement) => {
      const popOutLevel = (popOutElement as HTMLElement).className.match(
        /pop-out-\[(\d+)px\]/
      );
      const zValue = popOutLevel ? `${popOutLevel[1]}px` : "20px";
      (popOutElement as HTMLElement).style.transform = `translateZ(${zValue})`;
    });

    setTicking(false);
  }, [getValues, perspective, scale, disableAxis]);

  const requestTick = useCallback(() => {
    if (!ticking) {
      requestAnimationFrame(updateTransforms);
      setTicking(true);
    }
  }, [ticking, updateTransforms]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      setMousePositions(getMousePositions(event));
      requestTick();
    },
    [getMousePositions, requestTick]
  );

  const handleMouseEnter = useCallback(() => {
    const element = tiltRef.current;
    if (element) {
      element.style.transition = `transform ${speed}ms ${easing}`;
      requestTick(); // Start updating transforms right after entering
    }
  }, [easing, speed, requestTick]);

  const handleMouseLeave = useCallback(() => {
    const element = tiltRef.current;
    if (element) {
      element.style.transition = `transform ${speed}ms ${easing}`;
      setTimeout(() => {
        if (tiltRef.current) {
          tiltRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

          // Reset pop-out elements with transition
          const popOutElements = Array.from(
            element.querySelectorAll("[class*='pop-out-']")
          );
          popOutElements.forEach((popOutElement) => {
            (
              popOutElement as HTMLElement
            ).style.transition = `transform ${speed}ms ${easing}`;
            (popOutElement as HTMLElement).style.transform = `translateZ(0)`;
          });
        }
      }, speed);
    }
  }, [easing, speed, perspective]);

  useEffect(() => {
    const element = tiltRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={tiltRef}
      className={className}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default Tilt;
