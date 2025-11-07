"use client";

import type { FC } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, Close } from "@public/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./Button";

type PdfPreviewProps = {
  url: string;
  onCancel: () => void;
};

const PdfPreview: FC<PdfPreviewProps> = ({ url, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Configure pdf.js worker to the exact version used by react-pdf's pdfjs
    const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, 15));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, 0.5));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "ArrowUp") {
        e.preventDefault();
        zoomIn();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        zoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel, zoomIn, zoomOut]);

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/45 p-4"
      onClick={onCancel}
    >
      <div
        ref={contentRef}
        className="relative h-[90vh] w-[90vw] max-w-[1600px] bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-0 top-0 z-2 flex items-center gap-2 p-2">
          <Button
            type="button"
            onClick={zoomIn}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur text-white hover:bg-white/20 cursor-pointer"
            aria-label="Zoom in"
          >
            <ZoomIn />
          </Button>
          <Button
            type="button"
            onClick={zoomOut}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur text-white hover:bg-white/20 cursor-pointer"
            aria-label="Zoom out"
          >
            <ZoomOut />
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur text-white hover:bg-white/20 cursor-pointer"
            aria-label="Close"
          >
            <Close />
          </Button>
        </div>

        <div className="pdf-scroll relative z-1 mx-auto h-full w-fit max-w-full overflow-auto">
          <Document
            file={url}
            loading={<div className="p-6 text-white">Загрузка PDF…</div>}
            onLoadSuccess={(doc) => setNumPages(doc.numPages)}
            onLoadError={() => setNumPages(0)}
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <div key={`page_${index + 1}`} className="mb-4">
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>

        <style jsx global>{`
          /* Custom scrollbar for the PDF scroll container */
          .pdf-scroll::-webkit-scrollbar {
            width: 16px; /* space for arrows + thumb */
            height: 12px;
          }

          /* Track */
          .pdf-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.08);
          }

          /* Thumb uses custom SVG via data-uri */
          .pdf-scroll::-webkit-scrollbar-thumb {
            background-color: transparent; /* thumb is drawn by SVG */
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='25' viewBox='0 0 8 25' fill='none'><rect width='8' height='25' rx='4' fill='%23FFFFFF'/></svg>");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 8px 25px;
            min-height: 25px;
            border: 4px solid transparent; /* breathing room inside the 16px gutter */
          }

          .pdf-scroll:hover::-webkit-scrollbar-thumb {
            filter: brightness(0.9);
          }

          /* Arrow buttons */
          .pdf-scroll::-webkit-scrollbar-button {
            height: 16px;
            background-color: rgba(255, 255, 255, 0.08);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 7px 7px;
          }

          .pdf-scroll::-webkit-scrollbar-button:vertical:decrement {
            /* Up arrow */
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='7' height='7' viewBox='0 0 7 7' fill='none'><path d='M7 5H0L3.5 1L7 5Z' fill='%23FFFFFF'/></svg>");
          }

          .pdf-scroll::-webkit-scrollbar-button:vertical:increment {
            /* Down arrow */
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='7' height='7' viewBox='0 0 7 7' fill='none'><path d='M0 2L7 2L3.5 6L0 2Z' fill='%23FFFFFF'/></svg>");
          }

          .pdf-scroll::-webkit-scrollbar-button:hover {
            background-color: rgba(255, 255, 255, 0.14);
          }

          /* Firefox */
          .pdf-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.08);
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
};

export default PdfPreview;
