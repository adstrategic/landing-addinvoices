"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Mic, Send, Download, Info, CheckCircle2 } from "lucide-react";
import Script from "next/script";
import ConversionModal from "@/components/conversion-modal";
import Watermark from "@/components/watermark";
import { drawSmallAttribution } from "@/lib/utils";

const EXAMPLES = [
  "Invoice John for web design, $2,500",
  "Bill Acme Corp for consulting services $4,000 due in 15 days",
  "Create a $350 invoice for Sarah for photography",
  "Send $1,800 to Mike's Agency for branding work",
  "Invoice for social media management, $600/month, to Digital Co.",
  "Quick bill to Carlos $250 for logo updates",
];

export default function InvoiceByVoicePage() {
  const [command, setCommand] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isJSPDFLoaded, setIsJSPDFLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [parsedData, setParsedData] = useState({
    clientName: "Client Name",
    service: "Professional Services",
    amount: 0,
    dueDays: 30,
  });

  const parseVoiceCommand = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Amount: search for $ followed by number or number followed by "dollars"
    const amountMatch = text.match(/\$\s?([\d,.]+)/) || text.match(/([\d,.]+)\s?dollars/i);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : 0;

    // Due days: "due in X days"
    const dueMatch = lowerText.match(/due in (\d+) days/);
    const dueDays = dueMatch ? parseInt(dueMatch[1]) : 30;

    // Client and Service (Regex heuristics)
    let clientName = "Client Name";
    let service = "Professional Services";

    // "Invoice [Client] for [Service]"
    const pattern1 = /invoice\s+(?:for\s+)?(.*?)\s+for\s+(.*?)(?:,|\$|due|$)/i;
    // "Bill [Client] [Amount] for [Service]"
    const pattern2 = /bill\s+(.*?)\s+(?:\$|[\d,.]+)\s+for\s+(.*?)(?:\$|due|$)/i;
    // "Send [Amount] to [Client] for [Service]"
    const pattern3 = /send\s+(?:\$|[\d,.]+)\s+to\s+(.*?)\s+for\s+(.*?)(?:\$|due|$)/i;

    const m1 = text.match(pattern1);
    const m2 = text.match(pattern2);
    const m3 = text.match(pattern3);

    if (m1) {
       clientName = m1[1].trim();
       service = m1[2].trim();
    } else if (m2) {
       clientName = m2[1].trim();
       service = m2[2].trim();
    } else if (m3) {
       clientName = m3[1].trim();
       service = m3[2].trim();
    }

    setParsedData({
      clientName: clientName.charAt(0).toUpperCase() + clientName.slice(1),
      service: service.charAt(0).toUpperCase() + service.slice(1),
      amount,
      dueDays,
    });
  };

  const handleGenerate = () => {
    if (!command.trim()) return;
    parseVoiceCommand(command);
  };

  const handleExampleClick = (txt: string) => {
    setCommand(txt);
    parseVoiceCommand(txt);
  };

  // Speech Recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser. Type your command instead.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommand(transcript);
      parseVoiceCommand(transcript);
    };
    recognition.start();
  };

  const downloadPDF = () => {
    if (!isJSPDFLoaded) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("VOICE INVOICE", 195, 20, { align: "right" });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`BILL TO: ${parsedData.clientName}`, 15, 50);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 195, 50, { align: "right" });
    
    doc.setFillColor(245, 245, 245);
    doc.rect(15, 70, 180, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, 77);
    doc.text("Amount", 175, 77);
    
    doc.setFont("helvetica", "normal");
    doc.text(parsedData.service, 20, 90);
    doc.text(`$${parsedData.amount.toLocaleString()}`, 175, 90);
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${parsedData.amount.toLocaleString()}`, 195, 120, { align: "right" });
    
    // Attribution (Level 2)
    drawSmallAttribution(doc);
    doc.save(`Invoice_Voice_${parsedData.clientName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">
      <Navbar />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
        onLoad={() => setIsJSPDFLoaded(true)}
      />

      <main className="relative z-10 pt-28 pb-48 md:pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-ad-secondary mb-8 text-center justify-center lg:justify-start">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">Invoice by Voice</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-500/20">
            Live Demo
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Create Invoices with Your Voice</h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Type a command in plain English. See your invoice appear instantly. This is how AddInvoices works.
          </p>
        </div>

        {/* Demo Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           {/* Input Left */}
           <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors" />
                 
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Mic className={`w-3 h-3 ${isListening ? "text-red-500" : "text-blue-500"}`} />
                          Try a command
                       </label>
                       {isListening && (
                         <div className="flex gap-1">
                           {[...Array(3)].map((_, i) => (
                             <div key={i} className="w-1 h-3 bg-blue-500 animate-pulse rounded-full" />
                           ))}
                         </div>
                       )}
                    </div>

                    <div className="relative">
                       <textarea 
                        value={command}
                        onChange={e => setCommand(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleGenerate())}
                        placeholder="e.g. Invoice John for web design $2500"
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg font-medium focus:border-blue-500/50 outline-none resize-none transition-all placeholder:text-gray-700 [color-scheme:dark]"
                       />
                       <button 
                        onClick={startListening}
                        className={`absolute bottom-6 right-6 p-4 rounded-full transition-all shadow-xl ${
                           isListening ? "bg-red-500 text-white scale-110" : "bg-blue-600 text-white hover:bg-blue-500"
                        }`}
                       >
                         <Mic className="w-5 h-5" />
                       </button>
                    </div>

                    <button 
                      onClick={handleGenerate}
                      className="w-full py-4 btn-ad-primary rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 transition-all"
                    >
                       <Send className="w-4 h-4" />
                       Generate Invoice
                    </button>
                 </div>
              </div>

              {/* Examples Grid */}
              <div className="space-y-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Example commands:</h3>
                 <div className="flex flex-wrap gap-2">
                    {EXAMPLES.map((ex, i) => (
                      <button 
                        key={i}
                        onClick={() => handleExampleClick(ex)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/50 transition-all text-left max-w-full [color-scheme:dark]"
                      >
                         {ex}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Preview Right */}
           <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-2xl relative overflow-hidden aspect-[1/1.414] p-12 text-gray-800">
                 <Watermark level={2} />
                 <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                 
                 <div className="flex justify-between mb-16 px-1">
                    <div className="text-3xl font-black italic tracking-tighter text-blue-600">ADINVOICES</div>
                    <div className="text-right">
                       <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Voice-Generated</div>
                       <div className="text-sm font-bold">SAMPLE INVOICE</div>
                    </div>
                 </div>

                 <div className="mb-20 space-y-8">
                    <div className="space-y-1">
                       <div className="text-[10px] font-bold text-blue-600 uppercase">Bill To:</div>
                       <div className="text-2xl font-black uppercase tracking-tight">{parsedData.clientName}</div>
                    </div>
                    
                    <div className="space-y-1">
                       <div className="text-[10px] font-bold text-blue-600 uppercase">Description:</div>
                       <div className="text-lg font-medium text-gray-600">{parsedData.service}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-10">
                       <div className="space-y-1">
                          <div className="text-[10px] font-bold text-blue-600 uppercase">Due Date:</div>
                          <div className="text-sm font-bold">{parsedData.dueDays} Days from now</div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-auto pt-16 border-t-4 border-gray-900 flex justify-between items-end">
                    <div>
                        <div className="text-[9px] uppercase font-bold text-gray-400 mb-1">Total Due</div>
                        <div className="text-5xl font-black tracking-tighter">${parsedData.amount.toLocaleString()}</div>
                    </div>
                    <div className="max-w-[200px] text-right">
                       <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-blue-500 transition-all shadow-md active:translate-y-0.5"
                       >
                          <Download className="w-3.5 h-3.5" /> Download PDF
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Mobile Actions (Sticky Bottom) */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/10 z-[100] flex lg:hidden gap-3 px-6 pb-8 md:pb-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-500">
           <button 
              onClick={handleGenerate}
              className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center transition-all text-xs active:scale-95 [color-scheme:dark]"
           >
             <Send className="w-4 h-4 mr-2 text-blue-400" />
             Generate
           </button>
           <button 
              onClick={() => setIsModalOpen(true)}
              disabled={!isJSPDFLoaded}
              className="flex-1 py-3.5 btn-ad-primary rounded-xl font-bold flex items-center justify-center shadow-lg transition-all disabled:opacity-50 text-xs active:scale-95"
           >
             <Download className="w-4 h-4 mr-2" />
             Download
           </button>
        </div>

        {/* Comparison Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-[#111111] border border-white/10 rounded-2xl p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6">This is just a demo.</h2>
              <div className="space-y-4">
                 {[
                   "Create invoices by voice",
                   "Add clients by voice",
                   "Log expenses by voice",
                   "Track everything automatically"
                 ].map((t, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      <span className="text-ad-secondary">{t}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-blue-600 rounded-2xl p-10 text-center flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                 <Mic className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready for the real thing?</h2>
              <p className="text-white/80 mb-8 max-w-md">
                 Transform your phone into a professional billing assistant.
              </p>
              <a
                href="https://app.addinvoicesai.com"
                className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all"
              >
                Try AddInvoices free →
              </a>
           </div>
        </div>
      </main>

      <ConversionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={downloadPDF}
        documentType="demo invoice"
      />
      <ConventionalFooter />
    </div>
  );
}
