import React, { useEffect, useRef } from "react";

interface FallingSakuraProps {
  speed?: number; // Speed of the sakura petals
  className?: string; // Custom class name for styling
  totalPetals?: number; // Total number of petals
  imageUrl?: string; // URL for the petal image
  direction?: "down" | "up" | "left" | "right" | "diagonal"; // Direction of falling petals
}

class Petal {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  flip: number;
  flipSpeed: number;
  xSpeed: number = 0;
  ySpeed: number = 0;

  constructor(speed: number, direction: string) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
    this.w = 25 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();
    this.flipSpeed = Math.random() * 0.03;
    this.setSpeed(speed, direction);
  }

  setSpeed(speed: number, direction: string) {
    this.xSpeed = (1.5 + Math.random() * 2) * speed;
    this.ySpeed = speed;

    switch (direction) {
      case "up":
        this.ySpeed = -speed;
        break;
      case "left":
        this.xSpeed = -speed;
        break;
      case "right":
        this.xSpeed = speed;
        break;
      case "diagonal":
        this.xSpeed = (1.5 + Math.random() * 2) * speed;
        this.ySpeed = speed;
        break;
      default:
        this.ySpeed = speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D, petalImg: HTMLImageElement) {
    if (this.y > window.innerHeight || this.x > window.innerWidth) {
      this.reset(petalImg); // Pass the petalImg to reset
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
    );
  }

  reset(petalImg: HTMLImageElement) {
    this.x = -petalImg.width;
    this.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
    this.flip = Math.random();
    this.setSpeed(Math.random(), "down"); // Reset speed with a random value
  }

  animate(
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    petalImg: HTMLImageElement
  ) {
    const mouseInfluenceX = mouseX * 5;
    const mouseInfluenceY = mouseX * 2;

    this.x += this.xSpeed + mouseInfluenceX;
    this.y += this.ySpeed + mouseInfluenceY;
    this.flip += this.flipSpeed;
    this.draw(ctx, petalImg);
  }
}

const FallingSakura: React.FC<FallingSakuraProps> = ({
  speed = 1.0,
  className = "",
  totalPetals = 100,
  imageUrl = "https://djjjk9bjm164h.cloudfront.net/petal.png",
  direction = "down",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalArray = useRef<Petal[]>([]);
  const petalImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;

    petalImgRef.current = new Image();
    petalImgRef.current.src = imageUrl;

    petalImgRef.current.onload = () => {
      if (petalArray.current.length === 0) {
        for (let i = 0; i < totalPetals; i++) {
          petalArray.current.push(new Petal(speed, direction));
        }
      }
      render(ctx);
    };

    let mouseX = 0;
    function touchHandler(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        mouseX = e.touches[0].clientX / window.innerWidth;
      } else {
        mouseX = e.clientX / window.innerWidth;
      }
    }

    window.addEventListener("mousemove", touchHandler);
    window.addEventListener("touchmove", touchHandler);

    function render(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalArray.current.forEach(
        (petal) => petal.animate(ctx, mouseX, petalImgRef.current!) // Pass petalImg here
      );
      requestAnimationFrame(() => render(ctx));
    }

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", touchHandler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, [imageUrl, totalPetals]);

  useEffect(() => {
    // Update speeds of existing petals when speed or direction changes
    petalArray.current.forEach((petal) => petal.setSpeed(speed, direction));
  }, [speed, direction]);

  return <canvas ref={canvasRef} className={className} />;
};

export default FallingSakura;
