"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Users,
  Lock,
  Download,
  AlertCircle,
} from "lucide-react";
import Script from "next/script";
import ConversionModal from "@/components/conversion-modal";
import Watermark from "@/components/watermark";
import { drawWatermark } from "@/lib/utils";

type ContractType = "freelance" | "services" | "nda";

export default function ContractGeneratorPage() {
  const [contractType, setContractType] = useState<ContractType>("freelance");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJSPDFLoaded, setIsJSPDFLoaded] = useState(false);

  // Form State
  const [yourName, setYourName] = useState("");
  const [yourAddress, setYourAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [scope, setScope] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [governingState, setGoverningState] = useState("New York");

  const downloadPDF = () => {
    if (!isJSPDFLoaded) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    drawWatermark(doc);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(contractType.toUpperCase() + " AGREEMENT", 105, 20, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const intro = `This agreement is made on ${new Date().toLocaleDateString()} between ${yourName || "[Provider]"} ("Contractor") and ${clientName || "[Client]"} ("Client").`;
    const splitIntro = doc.splitTextToSize(intro, 180);
    doc.text(splitIntro, 15, 35);

    const clauses = [
      {
        t: "1. SERVICES",
        c: `Contractor agrees to provide ${projectName || "the services"} as described: ${scope || "Professional services as required"}.`,
      },
      {
        t: "2. COMPENSATION",
        c: `Client agrees to pay Contractor the sum of ${amount || "$0.00"} for the services described above.`,
      },
      {
        t: "3. TERM",
        c: `The project will commence on ${startDate} and continue until completion or termination.`,
      },
      {
        t: "4. CONFIDENTIALITY",
        c: "Both parties agree to protect and keep confidential any proprietary information shared during the course of this project.",
      },
      {
        t: "5. GOVERNING LAW",
        c: `This agreement shall be governed by the laws of the State of ${governingState}.`,
      },
    ];

    let y = 50;
    clauses.forEach((cl) => {
      doc.setFont("helvetica", "bold");
      doc.text(cl.t, 15, y);
      doc.setFont("helvetica", "normal");
      const splitC = doc.splitTextToSize(cl.c, 180);
      doc.text(splitC, 15, y + 5);
      y += 10 + splitC.length * 5;
    });

    // Attribution (Level 1) handled at start
    doc.save(`Contract_${contractType}_${clientName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setIsJSPDFLoaded(true)}
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
          <span className="text-white font-medium">Contract Generator</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-500/20">
            Free Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Free Contract Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Generate professional freelance or services agreements in minutes.
          </p>
        </div>

        {/* Contract Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            {
              id: "freelance",
              icon: FileText,
              label: "Freelance Agreement",
              desc: "For independent projects",
            },
            {
              id: "services",
              icon: Users,
              label: "Services Agreement",
              desc: "For ongoing retainer work",
            },
            {
              id: "nda",
              icon: Lock,
              label: "NDA",
              desc: "For confidential info",
            },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setContractType(type.id as ContractType)}
              className={`p-6 rounded-2xl border text-left transition-all ${
                contractType === type.id
                  ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-[#111111] border-white/10 hover:border-white/10"
              }`}
            >
              <type.icon
                className={`w-6 h-6 mb-4 ${contractType === type.id ? "text-blue-400" : "text-gray-500"}`}
              />
              <h3 className="text-white font-bold text-sm mb-1">
                {type.label}
              </h3>
              <p className="text-gray-500 text-xs">{type.desc}</p>
            </button>
          ))}
        </div>

        {/* Main Form + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Editor */}
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 space-y-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                  Contracting Parties
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    placeholder="Your Name / Business"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Client Name / Company"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                  Project Details
                </h4>
                <div className="space-y-4">
                  <input
                    placeholder="Project Name (e.g. Website Redesign)"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <textarea
                    placeholder="Scope of work..."
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none resize-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                    Payment
                  </h4>
                  <input
                    placeholder="Amount (e.g. $5,000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                    Start Date
                  </h4>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                  Governing Law
                </h4>
                <select
                  value={governingState}
                  onChange={(e) => setGoverningState(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none appearance-none [color-scheme:dark]"
                >
                  <option value="New York" className="bg-[#111111]">
                    New York
                  </option>
                  <option value="California" className="bg-[#111111]">
                    California
                  </option>
                  <option value="Texas" className="bg-[#111111]">
                    Texas
                  </option>
                  <option value="Florida" className="bg-[#111111]">
                    Florida
                  </option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 btn-ad-primary rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Contract PDF
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-2xl relative overflow-hidden aspect-[1/1.414] p-12 text-gray-800 text-[10px] leading-relaxed">
            <Watermark level={1} />
            <div className="text-center font-bold text-lg mb-8 uppercase tracking-widest border-b-2 border-gray-900 pb-4">
              {contractType} Agreement
            </div>

            <div className="mb-6">
              This Agreement is made as of {new Date().toLocaleDateString()} by
              and between <strong>{yourName || "[Provider Name]"}</strong>{" "}
              ("Contractor") and{" "}
              <strong>{clientName || "[Client Name]"}</strong> ("Client").
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-bold uppercase mb-1">1. Services</div>
                <p>
                  Contractor agrees to perform the following services for
                  Client: {projectName || "[Project Name]"}. Scope:{" "}
                  {scope || "[Details of work to be performed]"}.
                </p>
              </div>
              <div>
                <div className="font-bold uppercase mb-1">2. Compensation</div>
                <p>
                  In consideration for the services, Client shall pay Contractor{" "}
                  {amount || "[Amount]"}. Payment terms apply as per invoices
                  issued.
                </p>
              </div>
              <div>
                <div className="font-bold uppercase mb-1">3. Term</div>
                <p>
                  The term of this project shall begin on {startDate} and shall
                  continue until the services are completed or this Agreement is
                  terminated.
                </p>
              </div>
              <div>
                <div className="font-bold uppercase mb-1">
                  4. Confidentiality
                </div>
                <p>
                  Each party agrees that it will not disclose to any third party
                  any confidential information of the other party without prior
                  written consent.
                </p>
              </div>
              <div>
                <div className="font-bold uppercase mb-1">5. Governing Law</div>
                <p>
                  This Agreement shall be construed and enforced in accordance
                  with the laws of the State of {governingState}.
                </p>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-20">
              <div className="border-t border-gray-900 pt-2">
                <div className="font-bold">Contractor Signature</div>
                <div className="text-[8px] mt-4">Date: ________________</div>
              </div>
              <div className="border-t border-gray-900 pt-2">
                <div className="font-bold">Client Signature</div>
                <div className="text-[8px] mt-4">Date: ________________</div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-500/80 leading-relaxed italic">
            <strong>Legal Disclaimer:</strong> This contract template is
            provided for reference purposes only and does not constitute legal
            advice. AddInvoices is not a law firm. For legally binding
            agreements, we recommend consulting with a licensed attorney in your
            jurisdiction.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-[#111111] rounded-3xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Connect contracts to invoices.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            With AddInvoices, your contracts and invoices live in the same
            place. Create a contract, collect a signature, and get paid.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.addinvoicesai.com"
              className="px-10 py-5 btn-ad-primary rounded-2xl font-bold transition-all shadow-lg hover:-translate-y-1"
            >
              Try AddInvoices free →
            </a>
            <a
              href="https://www.addinvoicesai.com/#features"
              className="px-8 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all [color-scheme:dark]"
            >
              See how it works
            </a>
          </div>
        </div>
      </main>

      <ConversionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={downloadPDF}
        documentType="contract"
      />
      <ConventionalFooter />
    </div>
  );
}
