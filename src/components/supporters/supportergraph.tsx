"use client";
import { useEffect, useRef } from "react";

export const SupporterGraph = ({
  supporterDetails,
}: {
  supporterDetails: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const overlayHeight = useRef<HTMLDivElement>(null);
  const scale = 1;
  useEffect(() => {
    if (!canvasRef.current || !containerRef || !supporterDetails) return;
    const overlay = document.getElementById("overlay");

    if (!overlay) return;
    overlay.innerHTML = "";
    const overlayHeightDiv = document.createElement("div");
    overlayHeightDiv.id = "overlayHeight";
    overlay.appendChild(overlayHeightDiv);

    const overlayHeight = document.getElementById("overlayHeight");
    if (!overlayHeight) return;
    const width = containerRef.current?.clientWidth || 0;
    const height = containerRef.current?.clientHeight || 0;
    let ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = width * scale;
    if (!ctx) return;
    canvasRef.current.height = height * scale;
    canvasRef.current.style.background = "#BFE88B";
    const positionChanger = (x: number, y: number) => {
      return {
        x: (x + width / 2) * scale,
        y: (height - y) * scale,
      };
    };

    const circles: any = [];

    const stepsPerBranch = 250;
    const len = 80;
    const moveX = len * Math.sin(Math.PI / 4);
    const moveY = len * Math.sin(Math.PI / 4);
    const howManyBranches =
      supporterDetails.events.length +
      supporterDetails.projects.length +
      supporterDetails.media.length;
    const allData = [
      ...supporterDetails.events.map((ev: any) => ({ ...ev, t: "events" })),
      ...supporterDetails.projects.map((ev: any) => ({ ...ev, t: "projects" })),
      ...supporterDetails.media.map((ev: any) => ({ ...ev, t: "medias" })),
    ];
    let canvasHeight =
      len * 2 + howManyBranches * len * Math.sin(Math.PI / 4) * 2;
    if (canvasHeight < height) canvasHeight = height;
    overlayHeightDiv.style.minHeight = canvasHeight + "px"; // Remove !important from here
    overlayHeightDiv.style.cssText +=
      "min-height: " + canvasHeight + "px !important;"; // Add it here
    const circleRadius = 64;

    const draw = (scrollTop = 0, first = false) => {
      // overlay.innerHTML = "";
      const overlayHeightDiv = document.createElement("div");
      overlayHeightDiv.id = "overlayHeight";
      // console.log("here");
      // overlayHeightDiv.style.minHeight = canvasHeight + "px"; // Remove !important from here
      // overlayHeightDiv.style.cssText +=
      //   "min-height: " + canvasHeight + "px !important;"; // Add it here
      // overlayHeightDiv.style.minHeight = canvasHeight + "px !important";
      // overlay.appendChild(overlayHeightDiv);
      const newCircles = [];
      for (let branchIndex = 0; branchIndex < howManyBranches; branchIndex++) {
        const branchStartY = branchIndex * len * Math.sin(Math.PI / 4) * 2;
        for (
          let i = 0, degree = -Math.PI / 4;
          i < stepsPerBranch;
          i++, degree += (Math.PI * 1) / stepsPerBranch
        ) {
          let positionStart = positionChanger(
            (Math.sin(degree) * len - moveX) * Math.pow(-1, branchIndex),
            branchStartY +
              Math.cos(degree) * len +
              moveY -
              (canvasHeight - height) +
              scrollTop
          );
          let positionEnd = positionChanger(
            (Math.sin(degree + Math.PI / stepsPerBranch) * len - moveX) *
              Math.pow(-1, branchIndex),
            branchStartY +
              Math.cos(degree + Math.PI / stepsPerBranch) * len +
              moveY -
              (canvasHeight - height) +
              scrollTop
          );
          ctx.beginPath();
          ctx.strokeStyle = "#529207";
          ctx.moveTo(positionStart.x, positionStart.y);
          ctx.lineTo(positionEnd.x, positionEnd.y);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        // Create Element
        let positionEnd = positionChanger(
          (Math.sin((Math.PI / 4) * 3 + Math.PI / stepsPerBranch) * len -
            moveX) *
            Math.pow(-1, branchIndex),
          branchStartY +
            Math.cos((Math.PI / 4) * 3 + Math.PI / stepsPerBranch) * len +
            moveY
        );
        if (first == true) {
          const circle = document.createElement("a");
          circle.href =
            window.location.origin +
            "/" +
            allData[branchIndex].t +
            "/" +
            allData[branchIndex].slug;
          circle.classList.add("circle");
          circle.style.left =
            positionEnd.x / scale -
            circleRadius +
            (len + 20) * Math.pow(-1, branchIndex + 1) +
            "px";
          circle.style.top =
            positionEnd.y / scale +
            (canvasHeight - height) -
            circleRadius * 2 -
            (len - Math.sin(Math.PI / 4)) +
            circleRadius +
            "px";
          const imgPath = getThumbnail(allData[branchIndex].images);
          circle.style.background = `url(${imgPath})`;
          circle.style.backgroundSize = "contain";
          circle.style.backgroundPosition = "center";
          newCircles.push(circle);
          overlay?.appendChild(circle);
        }
      }
    };
    draw(0, true);
    overlay?.addEventListener("scroll", (e: any) => {
      ctx?.clearRect(0, 0, width * 2, height * 2);
      circles.forEach((circle: any) => {
        circle.remove();
      });
      const scrollTop = e.target?.scrollTop || 0;
      draw(scrollTop);
    });
    return () => {
      ctx?.clearRect(0, 0, width * 2, height * 2);
      circles.forEach((circle: any) => {
        circle.remove();
      });
    };
  }, [supporterDetails]);
  return (
    <div className="h-[600px] relative" ref={containerRef}>
      <canvas ref={canvasRef} className=" rounded-xl"></canvas>
      <div
        id="overlay"
        className="overflow-scroll absolute top-0 w-full h-full"
      >
        <div id="overlayHeight"></div>
      </div>
    </div>
  );
};

const getThumbnail = (images: any[]) => {
  if (images.length == 0) {
    return "/assets/placeholder.svg";
  }
  const thumbnail = images.find((img) => img.type == "thumbnail");
  if (thumbnail) {
    return thumbnail.path;
  }
  return images[0].path || "/assets/placeholder.svg";
};
