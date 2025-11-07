"use client";

import dynamic from "next/dynamic";

type DynamicPdfPreviewProps = {
  url: string;
  onCancel: () => void;
};

const PdfModal = dynamic<DynamicPdfPreviewProps>(
  () => import("./pdf-preview"),
  {
    ssr: false,
  }
);

export default PdfModal;
