"use client";

import { useState, useRef, useEffect } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  Image as ImageIcon,
  Download,
  Trash2,
  GripVertical,
  FileUp,
  Loader2,
  Info,
} from "lucide-react";
import Script from "next/script";
import { drawSmallAttribution } from "@/lib/utils";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export default function ImageToPDFPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scriptsLoaded, setScriptsLoaded] = useState({
    jspdf: false,
    sortable: false,
  });

  // PDF Options
  const [pageSize, setPageSize] = useState<"auto" | "a4" | "letter">("auto");
  const [orientation, setOrientation] = useState<"p" | "l">("p");
  const [margin, setMargin] = useState<0 | 10 | 20>(10);
  const [fit, setFit] = useState<"fill" | "original" | "fit">("fill");

  const listRef = useRef<HTMLDivElement>(null);

  const handleFiles = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent,
  ) => {
    let files: FileList | null = null;
    if ("files" in e.target) files = e.target.files;
    else if ("dataTransfer" in e) files = e.dataTransfer.files;

    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  useEffect(() => {
    if (scriptsLoaded.sortable && listRef.current && images.length > 0) {
      const sortable = new (window as any).Sortable(listRef.current, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: (evt: any) => {
          const updatedImages = [...images];
          const [movedItem] = updatedImages.splice(evt.oldIndex, 1);
          updatedImages.splice(evt.newIndex, 0, movedItem);
          setImages(updatedImages);
        },
      });
      return () => sortable.destroy();
    }
  }, [scriptsLoaded.sortable, images.length]);

  const convertToPDF = async () => {
    if (!scriptsLoaded.jspdf || images.length === 0) return;
    setIsProcessing(true);
    setProgress(0);

    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF(
      orientation,
      "mm",
      pageSize === "auto" ? "a4" : pageSize,
    );

    for (let i = 0; i < images.length; i++) {
      setProgress(Math.round(((i + 1) / images.length) * 100));

      if (i > 0)
        doc.addPage(pageSize === "auto" ? "a4" : pageSize, orientation);

      const img = images[i];
      const imgData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(img.file);
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const effectiveWidth = pageWidth - margin * 2;
      const effectiveHeight = pageHeight - margin * 2;

      // Simple fitting - auto sets height
      doc.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        effectiveWidth,
        effectiveHeight,
        undefined,
        "FAST",
      );
    }

    // Attribution (Level 2)
    drawSmallAttribution(doc);

    doc.save(
      `Images_to_PDF_AddInvoices_${new Date().toISOString().split("T")[0]}.pdf`,
    );
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setScriptsLoaded((p) => ({ ...p, jspdf: true }))}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js"
        onLoad={() => setScriptsLoaded((p) => ({ ...p, sortable: true }))}
      />

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-ad-secondary mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">Image to PDF</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Image to PDF Converter
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Convert JPG, PNG or WEBP images to PDF. Combine multiple images into
            one document.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Upload & Sorting Area */}
          <div className="lg:col-span-8 space-y-8">
            <div
              className={`bg-[#111111] border-2 border-dashed border-white/10 rounded-2xl p-16 text-center hover:border-blue-500/50 hover:bg-white/[0.02] transition-all cursor-pointer group ${images.length > 0 ? "p-10" : "p-20"}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e);
              }}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <div className="flex flex-col items-center gap-6">
                <ImageIcon className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                    Drop images here
                  </h4>
                  <p className="text-gray-500 text-sm">
                    JPG, PNG, WEBP · Max 20MB total
                  </p>
                </div>
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold [color-scheme:dark]">
                  Choose images
                </button>
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFiles}
                />
              </div>
            </div>

            {/* Thumbnails Grid */}
            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Images reorderable ({images.length})
                  </h4>
                  <p className="text-[10px] text-gray-600 italic">
                    Drag to reorder elements
                  </p>
                </div>
                <div
                  ref={listRef}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative group aspect-[3/4] bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
                    >
                      <img
                        src={img.preview}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute top-2 left-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold border border-white/10">
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <div className="flex gap-2">
                          <div className="drag-handle w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-move transition-colors">
                            <GripVertical className="w-5 h-5 text-white" />
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(img.id);
                            }}
                            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PDF Options Right */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-blue-500" />
                  PDF Export Options
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Page Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["auto", "a4", "letter"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setPageSize(s)}
                          className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                            pageSize === s
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-white/5 border-white/10 text-gray-500"
                          }`}
                        >
                          {s.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Orientation
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setOrientation("p")}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                          orientation === "p"
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        Portrait
                      </button>
                      <button
                        onClick={() => setOrientation("l")}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                          orientation === "l"
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        Landscape
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button
                    onClick={convertToPDF}
                    disabled={images.length === 0 || isProcessing}
                    className="w-full py-5 btn-ad-primary rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      `Convert to PDF (${images.length})`
                    )}
                  </button>
                  <p className="mt-3 text-[10px] text-gray-600 text-center leading-relaxed">
                    Your images are processed 100% locally. <br /> Never leaving
                    your browser.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip Card */}
            <div className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-6 flex gap-4">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <div className="space-y-1">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Did you know?
                </h5>
                <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                  Combine your scanned receipts into a single PDF to easily
                  track them as expenses in AddInvoices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO / Use Cases */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="text-white font-bold">Convert scanned receipts</h4>
            <p className="text-ad-secondary text-xs leading-loose">
              Turn photos of your physical receipts into a clean PDF document
              for bookkeeping or tax season compliance.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Combine photos</h4>
            <p className="text-ad-secondary text-xs leading-loose">
              Merge multiple progress shots, screenshots, or design concepts
              into a single professional PDF presentation.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Convert screenshots</h4>
            <p className="text-ad-secondary text-xs leading-loose">
              Easily document bug reports or UI examples by turning multiple
              screenshots into a portable PDF file.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Create a PDF portfolio</h4>
            <p className="text-ad-secondary text-xs leading-loose">
              Assemble your best visual works into a single high-quality PDF to
              share with potential clients and partners.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Converted a receipt? Now track it as an expense.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            AddInvoices lets you log and categorize expenses, attach receipts,
            and prepare for tax season automatically. No more shoeboxes of
            paper.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
          >
            Try AddInvoices free →
          </a>
        </div>
      </main>

      <ConventionalFooter />
    </div>
  );
}
