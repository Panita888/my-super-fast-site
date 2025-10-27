import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  regulation: string;
  description: string;
}

const questions: Question =;

function App() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const = useState<'intro' | 'questions'>('intro');

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({...prev, [questionId]: answer }));
  };

  const allAnswered = questions.every(q => answers[q.id]!== undefined && answers[q.id]!== null);
  const hasAnyNo = Object.values(answers).some(answer => answer === false);
  const allYes = allAnswered &&!hasAnyNo;

  if (currentStep === 'intro') {
    // --- REVISED HOMEPAGE START (Problem Focus) ---
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <Shield className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">MyDataShield.org</span>
            </div>
            <div className="flex gap-8">
              <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">About</button>
              <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">Contact</button>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tighter">
              IS YOUR MEDICAL <span className="text-red-600">LICENSE EXPOSED</span>?
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              The silent threat of staff using public Large Language Models (LLMs) for patient data is an unauthorized **cross-border data transfer** violation.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 max-w-5xl mx-auto shadow-2xl shadow-slate-300/50">
            <h2 className="text-3xl font-bold mb-4 text-amber-300">The Regulatory Stakes Are Immediate:</h2>
            <div className="grid md:grid-cols-3 gap-8 text-lg font-medium">
              <div className="space-y-2">
                <p className="font-extrabold text-2xl text-red-400">AED 1M FINE</p>
                <p>Violation of **PDPL** risks administrative fines up to AED 1,000,000 for the clinic owner. [1]</p>
              </div>
              <div className="space-y-2">
                <p className="font-extrabold text-2xl text-red-400">LICENSE RISK</p>
                <p>Failure to implement **TOMS** risks suspension or withdrawal of the Medical Director’s operating license. [2]</p>
              </div>
              <div className="space-y-2">
                <p className="font-extrabold text-2xl text-red-400">FEDERAL LAW</p>
                <p>Compliance is mandated by **PDPL** (45/2021) and **Electronic Health Data Law** (2/2019). [3, 4]</p>
              </div>
            </div>
            <p className="mt-8 text-base text-slate-400 italic">
              A contractual ban on AI use is insufficient. Regulators demand provable **Technical and Organizational Measures (TOMS)**.
            </p>
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentStep('questions')}
              className="inline-flex items-center gap-3 bg-red-600 text-white px-12 py-6 rounded-2xl font-extrabold text-xl uppercase hover:bg-red-700 transition-all shadow-xl shadow-red-300/60 hover:-translate-y-1"
            >
              START YOUR 30-SECOND RISK CHECK
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-slate-500 mt-5">3 quick questions • Takes under 1 minute</p>
          </div>
        </main>

        <footer className="border-t border-slate-100 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
            <p>© 2025 MyDataShield.org • <button className="hover:text-slate-700 transition-colors">Privacy Policy</button> • <button className="hover:text-slate-700 transition-colors">Terms of Service</button></p>
          </div>
        </footer>
      </div>
    );
  }
  // --- REVISED HOMEPAGE END ---

  // --- QUESTIONS STEP (STEP 2) ---
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">MyDataShield.org</span>
          </div>
          <div className="flex gap-8">
            <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">About</button>
            <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">Contact</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">30-Second Compliance Check</h1>
          <p className="text-lg text-slate-600">These questions identify immediate gaps in your **TOMS (Technical & Organizational Measures)**.</p>
        </div>

        <div className="space-y-10 mb-12">
          {questions.map((question) => (
            <div key={question.id} className="text-center bg-slate-50 p-8 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-relaxed max-w-3xl mx-auto">
                {question.text}
              </h3>
              <p className="text-sm text-red-700 bg-red-50/50 p-2 rounded-lg mb-6 max-w-xl mx-auto">{question.regulation}</p>

              <div className="flex gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => handleAnswer(question.id, true)}
                  className={`flex-1 py-3.5 px-8 rounded-xl font-semibold transition-all ${
                    answers[question.id] === true
                     ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
                      : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-2 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(question.id, false)}
                  className={`flex-1 py-3.5 px-8 rounded-xl font-semibold transition-all ${
                    answers[question.id] === false
                     ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700'
                      : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-700 border-2 border-slate-200 hover:border-red-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div className="mb-12">
            {allYes? (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center">
                <p className="text-emerald-700 font-semibold text-lg">
                  **Initial Positive Assessment.** You appear compliant – complete your **Free Full Audit Checklist** to verify and maintain auditable records.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 text-center">
                <p className="text-red-700 font-semibold text-lg">
                  **Immediate Risk Identified.** You have flagged areas of critical compliance failure. Don't delay – proceed immediately to the **Free Full Audit Checklist** to identify next steps.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <button
            disabled={!allAnswered}
            className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all ${
              allAnswered
               ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-1'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Complete Free Audit Checklist
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <footer className="border-t border-slate-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
          <p>© 2025 MyDataShield.org • <button className="hover:text-slate-700 transition-colors">Privacy Policy</button> • <button className="hover:text-slate-700 transition-colors">Terms of Service</button></p>
        </div>
      </footer>
    </div>
  );
}

export default App;




// import { useState } from 'react';
// import { Shield, CheckCircle2, FileText, Lock, Users, ArrowRight } from 'lucide-react';

// interface Question {
//   id: number;
//   text: string;
//   regulation: string;
//   description: string;
// }

// const questions: Question[] = [
//   {
//     id: 1,
//     text: 'Can you produce your TOMS (Technical & Organisational Measures) within 24 hours?',
//     regulation: 'Regulation: Data Controllers must demonstrate compliance promptly under NDHC Article 5',
//     description: 'Technical and organizational measures that protect patient data'
//   },
//   {
//     id: 2,
//     text: "Can you guarantee your team aren't using unauthorised LLMs or recording devices?",
//     regulation: 'Regulation: Staff monitoring and security obligations under ADHICS & NDHC Article 9',
//     description: 'Preventing unauthorized AI tools and recording devices in clinical settings'
//   },
//   {
//     id: 3,
//     text: "Do your current policies and consent forms reflect today's AI and wearable technologies?",
//     regulation: 'Governance & accountability are key – lack of procedures is not a defence',
//     description: 'Updated consent processes for modern healthcare technology'
//   }
// ];

// function App() {
//   const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
//   const [currentStep, setCurrentStep] = useState<'intro' | 'questions'>('intro');

//   const handleAnswer = (questionId: number, answer: boolean) => {
//     setAnswers(prev => ({ ...prev, [questionId]: answer }));
//   };

//   const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);
//   const hasAnyNo = Object.values(answers).some(answer => answer === false);
//   const allYes = allAnswered && !hasAnyNo;

//   if (currentStep === 'intro') {
//     return (
//       <div className="min-h-screen bg-white">
//         <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//             <div className="flex items-center gap-2.5">
//               <Shield className="w-7 h-7 text-blue-600" />
//               <span className="text-xl font-bold text-slate-900">MyDataShield.org</span>
//             </div>
//             <div className="flex gap-8">
//               <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">About</button>
//               <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">Contact</button>
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-6xl mx-auto px-6 py-24">
//           <div className="text-center mb-20">
//             <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
//               Is Your Clinic Data <span className="text-blue-600">Compliant?</span>
//             </h1>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
//               AI tools, wearables, and new data laws mean medical directors must stay ahead – or risk penalties.
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-14 mb-16 border border-slate-100">
//             <div className="grid md:grid-cols-3 gap-10">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-5 shadow-sm">
//                   <FileText className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-3">NDHC Compliance</h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   UAE's National Data Health Compliance requirements for patient data protection
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-5 shadow-sm">
//                   <Lock className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-3">AI & LLM Safety</h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   Protect against unauthorized use of AI tools that may expose patient information
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-5 shadow-sm">
//                   <Users className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-3">Staff Governance</h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   Ensure your team follows proper protocols for handling sensitive medical data
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <button
//               onClick={() => setCurrentStep('questions')}
//               className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-1"
//             >
//               Start Compliance Check
//               <ArrowRight className="w-5 h-5" />
//             </button>
//             <p className="text-sm text-slate-500 mt-5">3 quick questions • Takes 2 minutes</p>
//           </div>
//         </main>

//         <footer className="border-t border-slate-100 mt-24">
//           <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
//             <p>© 2025 MyDataShield.org • <button className="hover:text-slate-700 transition-colors">Privacy Policy</button> • <button className="hover:text-slate-700 transition-colors">Terms of Service</button></p>
//           </div>
//         </footer>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//           <div className="flex items-center gap-2.5">
//             <Shield className="w-7 h-7 text-blue-600" />
//             <span className="text-xl font-bold text-slate-900">MyDataShield.org</span>
//           </div>
//           <div className="flex gap-8">
//             <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">About</button>
//             <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm">Contact</button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-4xl mx-auto px-6 py-16">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">Is Your Clinic Data Compliant?</h1>
//           <p className="text-lg text-slate-600">AI tools, wearables, and new data laws mean medical<br />directors must stay ahead – or risk penalties.</p>
//         </div>

//         <div className="space-y-10 mb-12">
//           {questions.map((question, index) => (
//             <div key={question.id} className="text-center">
//               <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-relaxed max-w-3xl mx-auto">
//                 {question.text}
//               </h3>
//               <p className="text-sm text-slate-600 mb-6">{question.regulation}</p>

//               <div className="flex gap-4 justify-center max-w-md mx-auto">
//                 <button
//                   onClick={() => handleAnswer(question.id, true)}
//                   className={`flex-1 py-3.5 px-8 rounded-xl font-semibold transition-all ${
//                     answers[question.id] === true
//                       ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
//                       : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border-2 border-slate-200 hover:border-emerald-300'
//                   }`}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => handleAnswer(question.id, false)}
//                   className={`flex-1 py-3.5 px-8 rounded-xl font-semibold transition-all ${
//                     answers[question.id] === false
//                       ? 'bg-red-500 text-white shadow-lg shadow-red-200'
//                       : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 border-2 border-slate-200 hover:border-red-300'
//                   }`}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {allAnswered && (
//           <div className="mb-12">
//             {allYes ? (
//               <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center">
//                 <p className="text-emerald-700 font-semibold text-lg">
//                   Congrats! You appear compliant – complete your free audit checklist to verify and keep records on file.
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-6 text-center">
//                 <p className="text-amber-700 font-semibold text-lg">
//                   You've marked areas of risk. Don't delay – complete your free audit checklist to identify next steps.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="text-center">
//           <button
//             disabled={!allAnswered}
//             className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all ${
//               allAnswered
//                 ? 'bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-300/50 hover:-translate-y-1'
//                 : 'bg-slate-200 text-slate-400 cursor-not-allowed'
//             }`}
//           >
//             Complete Free Audit
//             <ArrowRight className="w-5 h-5" />
//           </button>
//         </div>
//       </main>

//       <footer className="border-t border-slate-100 mt-24">
//         <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
//           <p>© 2025 MyDataShield.org • <button className="hover:text-slate-700 transition-colors">Privacy Policy</button> • <button className="hover:text-slate-700 transition-colors">Terms of Service</button></p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;
