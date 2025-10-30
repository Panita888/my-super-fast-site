import React, { useState, useMemo } from 'react';
// Imported all necessary Lucide icons
import { Shield, CheckCircle2, ArrowRight, XCircle, Briefcase, Users, FileText, Zap, BookOpen, Lock, Globe, Scale, FileWarning } from 'lucide-react';

// --- Compliance Questions (Unchanged) ---
const questions = [
  {
    id: 1,
    text: 'Can you produce your TOMs (Technical & Organisational Measures) and all required data governance documents within 24 hours?',
    regulation: 'Regulation: Demonstrating immediate compliance is mandatory under NDHC Article 5 and Federal Law No. 2 of 2019.',
  },
  {
    id: 2,
    text: "Can you guarantee your team aren't using unauthorised public LLMs or recording patient information with wearables?",
    regulation: 'Regulation: Staff monitoring and security obligations under ADHICS & NDHC Article 9. Unauthorized recording is against UAE law.',
  },
  {
    id: 3,
    text: "Do your current consent forms and staff policies explicitly cover the use of AI tools and personal recording technologies?",
    regulation: 'Governance & accountability are non-negotiable – lack of documented procedures is not a defense against fines.',
  }
];

// Main App Component
function App() {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState('intro');
  const [isHovered, setIsHovered] = useState(false);

  const { allAnswered, hasAnyNo, allYes } = useMemo(() => {
      const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);
      const hasAnyNo = Object.values(answers).some(answer => answer === false);
      const allYes = allAnswered && !hasAnyNo;
      return { allAnswered, hasAnyNo, allYes };
  }, [answers]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleProceed = () => {
    if (allAnswered) setCurrentStep('results');
  }

  // --- Shared Navigation ---
  const Navigation = () => (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentStep('intro')}>
          <Shield className="w-8 h-8 text-blue-900" />
          <span className="text-2xl font-extrabold text-blue-900 tracking-tight">MyDataShield.org</span>
        </div>
        <div className="hidden sm:flex gap-8">
          <a onClick={() => setCurrentStep('solution')} className={`text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentStep === 'solution' ? 'text-blue-900 border-b-2 border-blue-900' : ''}`}>Our Solution</a>
          <a onClick={() => setCurrentStep('about')} className={`text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentStep === 'about' ? 'text-blue-900 border-b-2 border-blue-900' : ''}`}>About</a>
          <a onClick={() => setCurrentStep('legal')} className={`text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentStep === 'legal' ? 'text-blue-900 border-b-2 border-blue-900' : ''}`}>Legal Mandate</a>
          <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm">Contact</a>
        </div>
      </div>
    </nav>
  );

  // --- Shared Footer ---
  const Footer = () => (
    <footer className="border-t border-gray-100 mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
        <p className="space-x-4">
          <span>© 2025 MyDataShield.org, a DPO Solutions Partner.</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );

  // --- INTRO SCREEN ---
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              IS YOUR MEDICAL LICENSE <span className="text-red-600">EXPOSED</span>?
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
              The Uncontrolled Use of Public AI Risks Your Clinic’s Future and Your Professional License.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              The silent threat of staff using public Large Language Models (LLMs) for patient notes or administrative tasks is now an unauthorized <strong>cross-border data transfer</strong>, constituting a direct violation of two key federal mandates:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl shadow-gray-100 border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-8 text-blue-900 border-b border-gray-200 pb-4">The Stakes are Immediate:</h2>
            <div className="grid md:grid-cols-3 gap-10 text-lg">
              <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <FileText className="w-6 h-6 text-blue-900"/>
                <p className="font-bold text-lg text-blue-900">FEDERAL MANDATES</p>
                <p className="text-gray-700 text-sm leading-relaxed"><strong>Federal Law No. 2 of 2019:</strong> The primary legal pillar safeguarding Electronic Health Data. Violation risks your ability to operate through <strong>NABIDH/Malaffi.</strong></p>
                <p className="text-gray-700 text-sm leading-relaxed"><strong>Federal Decree-Law No. 45/2021 (PDPL):</strong> Reinforces strict security controls, governing confidentiality and cross-border security over all Sensitive Personal Data, including health data.</p>
              </div>
              <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <Briefcase className="w-6 h-6 text-red-600"/>
                <p className="font-bold text-lg text-blue-900">FINANCIAL LIABILITY</p>
                <p className="text-gray-700 text-sm leading-relaxed">Violations expose the clinic owner to administrative fines up to <strong>AED 1,000,000</strong>, with personal liability possible.</p>
                <div className="h-4"></div>
                <p className="text-gray-700 text-sm leading-relaxed">The transition to <strong>full PDPL enforcement in 2025</strong> means the window for achieving auditable compliance is closing.</p>
              </div>
              <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <Users className="w-6 h-6 text-red-600"/>
                <p className="font-bold text-lg text-blue-900">CAREER & CLINICAL RISK</p>
                <p className="text-gray-700 text-sm leading-relaxed">The failure to implement necessary controls risks immediate administrative action, including the <strong>suspension or withdrawal of the Medical Director’s license</strong> by the DHA/DOH.</p>
                <p className="text-gray-700 text-sm leading-relaxed">Regulators require provable <strong>Technical and Organizational Measures (TOMs)</strong> - a contractual ban on staff using AI is not enough.</p>
              </div>
            </div>
            <p className="mt-10 text-base text-gray-500 italic font-medium border-t border-gray-100 pt-4">
              <strong>A Contractual Ban Is Not Enough.</strong> Regulators require provable <strong>Technical and Organizational Measures (TOMs)</strong> to secure health data from digital leakage.
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentStep('questions')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center justify-center gap-4 bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-xl 
                         shadow-2xl shadow-blue-900/30 transition-all duration-300 
                         hover:bg-blue-800 hover:shadow-blue-900/50 hover:-translate-y-1 transform
                         w-full sm:w-auto uppercase tracking-wider"
            >
              START YOUR 30-SECOND RISK CHECK
              <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
            <p className="text-sm text-gray-500 mt-5 font-normal">Answer 3 quick questions to instantly assess your clinic’s PDPL/AI exposure.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- SOLUTION SCREEN ---
  if (currentStep === 'solution') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
              Beyond the Ban: What UAE Regulators Truly Demand
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
              Understanding the <strong>Strict Liability</strong> model: The question is not *if* your staff breached the rules, but *what you did* to prevent it.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 max-w-5xl mx-auto border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/70">
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b border-gray-200 pb-4">
              The Regulatory Liability Trap
            </h2>
            <div className="text-gray-700 space-y-6 text-lg">
              <p>
                Under Federal Law and NDHC (National Unified Health Data System), medical facilities are held to a standard of <strong>Strict Liability</strong>. Your liability does not end by issuing a memo or a contractual ban on using public Large Language Models (LLMs).
              </p>
              <p className="font-semibold text-blue-900">
                If a patient's data is transferred out of the country via an employee's LLM query, the regulator fines the <strong>clinic owner and Medical Director</strong>, not the employee. The defense requires <strong>provable, auditable controls</strong>.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-8 border-b border-gray-200 pb-4">
              The Three Non-Negotiable Pillars of Audit-Ready Compliance
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                <Lock className="w-8 h-8 text-blue-900"/>
                <p className="text-xl font-extrabold text-blue-900">1. Technical & Organisational Measures (TOMs)</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Requirement:<strong> Active technical measures to secure data.
                  <br /><br />
                  </strong>The Gap:</strong> Documentation showing you have mechanisms (e.g., redaction tools, sandboxed environments) to <strong>physically stop</strong> PHI/PII leakage into public AI tools, proving due diligence.
                </p>
              </div>
              <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                <Globe className="w-8 h-8 text-blue-900"/>
                <p className="text-xl font-extrabold text-blue-900">2. Controlled Data Residency & Sovereignty</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Requirement:<strong> Explicit control over the storage location of health data.
                  <br /><br />
                  </strong>The Gap:</strong> Any use of public AI is an unauthorized <strong>cross-border data transfer</strong> because the data is processed on servers outside the UAE's jurisdiction, violating data sovereignty mandates.
                </p>
              </div>
              <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-900"/>
                <p className="text-xl font-extrabold text-blue-900">3. Auditable Staff Competency</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Requirement:<strong> Provable evidence that all staff understand the risks.
                  <br /><br />
                  </strong>The Gap:</strong> You must demonstrate not just that training occurred, but that competency was tracked and that staff understand the specific nuances of PDPL and NDHC on modern technology.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                We provide the necessary framework, tools, and documentation.
              </h3>
              <button
                onClick={() => setCurrentStep('questions')}
                className="inline-flex items-center gap-4 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                           shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5"
              >
                Assess Your Gaps Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- QUESTIONS SCREEN ---
  if (currentStep === 'questions') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">The 30-Second Compliance Check</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Answer honestly to see your clinic's immediate risk profile regarding modern data security threats.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {questions.map((question, index) => (
              <div 
                key={question.id} 
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 border
                            ${answers[question.id] === false ? 'border-red-500 ring-2 ring-red-100' : 
                              answers[question.id] === true ? 'border-emerald-600 ring-2 ring-emerald-100' : 
                              'border-gray-200 shadow-gray-50/50'}`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
                  <span className="text-blue-900 font-extrabold mr-2">{index + 1}.</span> {question.text}
                </h3>
                <p className="text-xs text-gray-500 mb-6 font-mono bg-gray-50 p-3 rounded border border-gray-100">{question.regulation}</p>

                <div className="flex gap-4 justify-start max-w-lg mx-auto">
                  <button
                    onClick={() => handleAnswer(question.id, true)}
                    className={`flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
                      ${answers[question.id] === true
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-300'
                        : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-300'
                    }`}
                  >
                    Yes, We're Covered
                  </button>
                  <button
                    onClick={() => handleAnswer(question.id, false)}
                    className={`flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
                      ${answers[question.id] === false
                      ? 'bg-red-600 text-white shadow-md shadow-red-300'
                        : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-300'
                    }`}
                  >
                    No, We Are Exposed
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            {allAnswered && (
              <div className="bg-gray-50 p-8 rounded-2xl shadow-inner mb-8 border border-gray-200">
                {allYes ? (
                  <div className="text-emerald-700 flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-8 h-8" />
                    <p className="font-bold text-xl">
                      Excellent! You show high compliance.
                    </p>
                  </div>
                ) : (
                  <div className="text-red-700 flex items-center justify-center gap-3">
                    <XCircle className="w-8 h-8" />
                    <p className="font-bold text-xl">
                      Risk Detected! You have critical areas of exposure.
                    </p>
                  </div>
                )}
                

                <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                  Take the next step: our <strong>free, comprehensive audit</strong> details your specific vulnerabilities and provides actionable guidance to close gaps before regulators intervene.
                </p>
              </div>
            )}
            {!allAnswered && (
              <p className="text-gray-500 italic">Answer all questions to see your risk profile.</p>
            )}
            {allAnswered && (
              <button
                onClick={() => setCurrentStep('results')}
                className="mt-6 bg-blue-900 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 transition-all"
              >
                View My Results
              </button>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- RESULTS SCREEN ---
  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navigation />
        <main className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">Your Compliance Risk Profile</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your answers, here is your clinic's current exposure to PDPL and NDHC compliance obligations.
            </p>
          </div>

          <div className="space-y-8">
            {hasAnyNo ? (
              <div className="bg-red-50 border border-red-200 p-8 rounded-3xl shadow-md text-red-700">
                <h2 className="text-3xl font-bold mb-4">⚠ Critical Risks Detected</h2>
                <p className="text-lg">You have areas of non-compliance that require immediate attention. Without corrective action, your clinic could face regulatory fines or license issues.</p>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl shadow-md text-emerald-700">
                <h2 className="text-3xl font-bold mb-4">✅ All Systems Go</h2>
                <p className="text-lg">Your clinic demonstrates strong compliance controls. Keep documentation updated and continue monitoring staff AI usage.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentStep('intro')}
              className="bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-lg shadow-lg hover:bg-blue-800 transition-all"
            >
              Re-Assess My Clinic
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

// --- ABOUT PAGE ---
  if (currentStep === 'about') {
    return (
      <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
        <Navigation />
        <main className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
              A Mission Built on Regulatory Defense
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
              We translate complex UAE data laws into simple, auditable technology solutions for healthcare leaders.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-gray-100 border border-gray-100">

            {/* Our Expertise Section */}
            <div className="mb-12">
              <div className="flex items-start sm:items-center gap-4 mb-4">
                <Zap className="w-8 h-8 text-blue-900 flex-shrink-0 mt-1 sm:mt-0" />
                <h2 className="text-3xl font-extrabold text-blue-900">Our Expertise</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed pl-0 sm:pl-12">
                MyDataShield.org was founded by data privacy experts and former healthcare compliance officers who recognized a critical gap: traditional IT security doesn’t address the <strong>Strict Liability</strong> risks posed by modern AI and LLMs. Our focus is laser-targeted on the unique regulatory environment of the UAE.
              </p>
            </div>

            {/* What We Provide Section */}
            <div className="mb-12">
              <div className="flex items-start sm:items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-blue-900 flex-shrink-0 mt-1 sm:mt-0" />
                <h2 className="text-3xl font-extrabold text-blue-900">What We Provide</h2>
              </div>
              <div className="space-y-6 text-lg text-gray-700 pl-0 sm:pl-12">
                <p>
                  <strong className="font-bold text-gray-900">Auditable TOMs (Technical & Organisational Measures):</strong> We deliver the provable technical controls required by law to prevent data leakage.
                </p>
                <p>
                  <strong className="font-bold text-gray-900">AI Governance Frameworks:</strong> Custom policies and training modules tailored for NDHC and PDPL compliance.
                </p>
                <p>
                  <strong className="font-bold text-gray-900">Risk Assessment and Auditing:</strong> A definitive audit trail that stands up to regulatory scrutiny, protecting your professional license.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="bg-gray-100/70 border border-gray-200 text-center p-8 rounded-2xl my-12">
              <p className="text-2xl font-semibold text-gray-800 italic leading-snug">
                “Compliance is not a document you file. It's a technical mechanism you must prove.”
              </p>
              <p className="text-sm text-gray-600 mt-4 tracking-wide">— The MyDataShield.org Compliance Team</p>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => setCurrentStep('questions')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex items-center justify-center gap-3 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                           shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5 transform"
              >
                Start Your Risk Assessment
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

// --- LEGAL MANDATE PAGE ---
  if (currentStep === 'legal') {
    return (
      <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
        <Navigation />
        <main className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight">
              UAE Health Data: The Non-Negotiable Laws
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
              A review of the federal decrees that place <strong className="font-bold text-gray-900">Strict Liability</strong> on clinic owners and medical directors.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl shadow-gray-100/80 border border-gray-200">
            <div className="space-y-10">

              {/* Federal Decree-Law No. 45/2021 (PDPL) */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Scale className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-blue-900 mb-2">
                    Federal Decree-Law No. 45/2021 (PDPL)
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The primary federal law governing Personal Data (PD) protection, transfer, and processing within the UAE. Unauthorized use of public AI by staff constitutes a <strong className="font-semibold text-gray-800">cross-border data transfer without consent</strong> or approved mechanism, placing the organization in direct violation.
                  </p>
                </div>
              </div>

              {/* Federal Law No. 2 of 2019 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Zap className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-blue-900 mb-2">
                    Federal Law No. 2 of 2019
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Explicitly mandates the <strong className="font-semibold text-gray-800">confidentiality and security of Electronic Health Data (EHD)</strong>. This requires auditable technical controls to ensure patient records are not shared, even accidentally, with unauthorized third parties (like public LLMs).
                  </p>
                </div>
              </div>

              {/* The Penalty Threshold */}
              <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-xl mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <FileWarning className="w-8 h-8 text-red-700 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-red-800 mb-2">The Penalty Threshold</h3>
                    <p className="text-base text-red-900/90 font-medium">
                      Administrative fines under PDPL can reach <strong className="font-bold">AED 1,000,000.</strong>
                    </p>
                    <p className="text-sm text-red-900/80 mt-2">
                      Beyond fines, compliance failure demonstrates gross negligence in data security, directly threatening the <strong className="font-semibold">suspension or withdrawal of the Medical Director’s operating license.</strong>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentStep('questions')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center justify-center gap-3 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                         shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5 transform"
            >
              Start Your Risk Assessment
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}

export default App;


                  








// import React, { useState, useMemo } from 'react';
// // Imported all necessary Lucide icons
// import { Shield, CheckCircle2, ArrowRight, XCircle, Briefcase, Users, FileText, Zap, BookOpen, Lock, Globe } from 'lucide-react';

// // --- Compliance Questions (Unchanged) ---
// const questions = [
//   {
//     id: 1,
//     text: 'Can you produce your TOMs (Technical & Organisational Measures) and all required data governance documents within 24 hours?',
//     regulation: 'Regulation: Demonstrating immediate compliance is mandatory under NDHC Article 5 and Federal Law No. 2 of 2019.',
//   },
//   {
//     id: 2,
//     text: "Can you guarantee your team aren't using unauthorised public LLMs or recording patient information with wearables?",
//     regulation: 'Regulation: Staff monitoring and security obligations under ADHICS & NDHC Article 9. Unauthorized recording is against UAE law.',
//   },
//   {
//     id: 3,
//     text: "Do your current consent forms and staff policies explicitly cover the use of AI tools and personal recording technologies?",
//     regulation: 'Governance & accountability are non-negotiable – lack of documented procedures is not a defense against fines.',
//   }
// ];

// // Main App Component
// function App() {
//   // Robust state initialization
//   const [answers, setAnswers] = useState({});
//   const [currentStep, setCurrentStep] = useState('intro');
//   const [isHovered, setIsHovered] = useState(false);

//   // Logic for quiz status, memoized for efficiency and safety
//   const { allAnswered, hasAnyNo, allYes } = useMemo(() => {
//       const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);
//       const hasAnyNo = Object.values(answers).some(answer => answer === false);
//       const allYes = allAnswered && !hasAnyNo;
//       return { allAnswered, hasAnyNo, allYes };
//   }, [answers]);

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({ ...prev, [questionId]: answer }));
//   };

//   const handleProceed = () => {
//     if (allAnswered) {
//       setCurrentStep('results');
//     }
//   }

//   // --- Shared Navigation (Clean White/Navy) ---
//   const Navigation = () => (
//     <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//         <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentStep('intro')}>
//           <Shield className="w-8 h-8 text-blue-900" />
//           <span className="text-2xl font-extrabold text-blue-900 tracking-tight">MyDataShield.org</span>
//         </div>
//         <div className="hidden sm:flex gap-8">
//           {/* Updated link to navigate to the new Solution page */}
//           <a onClick={() => setCurrentStep('solution')} className={`text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentStep === 'solution' ? 'text-blue-900 border-b-2 border-blue-900' : ''}`}>Our Solution</a>
//           <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm">Legal Mandate</a>
//           <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm">Contact</a>
//         </div>
//       </div>
//     </nav>
//   );

//   // --- Shared Footer ---
//   const Footer = () => (
//     <footer className="border-t border-gray-100 mt-24 bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
//         <p className="space-x-4">
//           <span>© 2025 MyDataShield.org, a DPO Solutions Partner.</span>
//           <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
//           <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
//         </p>
//       </div>
//     </footer>
//   );
  
//   // --- INTRO SCREEN ---
//   if (currentStep === 'intro') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-gray-900">
//         <Navigation />

//         <main className="max-w-7xl mx-auto px-6 py-24">
          
//           {/* Main Hero Section: Full Approved Copy */}
//           <div className="text-center mb-16">
//             <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
//               IS YOUR MEDICAL LICENSE <span className="text-red-600">EXPOSED</span>?
//             </h1>
//             <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
//               The Uncontrolled Use of Public AI Risks Your Clinic’s Future and Your Professional License.
//             </p>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
//               The silent threat of staff using public Large Language Models (LLMs) for patient notes or administrative tasks is now an unauthorized <strong>cross-border data transfer</strong>, constituting a direct violation of two key federal mandates:
//             </p>
//           </div>

//           {/* Regulatory Stakes Block - Structured to show mandates and risks */}
//           <div className="bg-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl shadow-gray-100 border border-gray-100">
//             <h2 className="text-3xl font-extrabold mb-8 text-blue-900 border-b border-gray-200 pb-4">The Stakes are Immediate:</h2>
//             <div className="grid md:grid-cols-3 gap-10 text-lg">
              
//               {/* Column 1: Mandates */}
//               <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//                 <FileText className="w-6 h-6 text-blue-900"/>
//                 <p className="font-bold text-lg text-blue-900">FEDERAL MANDATES</p>
//                 <p className="text-gray-700 text-sm leading-relaxed"><strong>Federal Decree-Law No. 45/2021 (PDPL):</strong> Governing confidentiality and cross-border security of all Personal Data.</p>
//                 <p className="text-gray-700 text-sm leading-relaxed"><strong>Federal Law No. 2 of 2019:</strong> Explicitly safeguarding the confidentiality and security of Electronic Health Data.</p>
//               </div>
              
//               {/* Column 2: Financial Risk */}
//               <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//                 <Briefcase className="w-6 h-6 text-red-600"/>
//                 <p className="font-bold text-lg text-blue-900">FINANCIAL LIABILITY</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">Violations expose the clinic owner to administrative fines up to <strong>AED 1,000,000</strong>.</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">The transition to <strong>full PDPL enforcement in 2025</strong> means the window for achieving auditable compliance is closing.</p>
//               </div>
              
//               {/* Column 3: Career Risk */}
//               <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//                 <Users className="w-6 h-6 text-red-600"/>
//                 <p className="font-bold text-lg text-blue-900">CAREER RISK</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">The failure to implement necessary controls (Technical and Organizational Measures, or <strong>TOMs</strong>) risks suspension or withdrawal of the Medical Director’s license.</p>
//               </div>
//             </div>
            
//             {/* Disclaimer/Contractual Ban Statement */}
//             <p className="mt-10 text-base text-gray-500 italic font-medium border-t border-gray-100 pt-4">
//               <strong>A Contractual Ban Is Not Enough.</strong> Regulators require provable <strong>Technical and Organizational Measures (TOMs)</strong> to secure health data from digital leakage.
//             </p>
//           </div>
          
//           {/* CTA Button */}
//           <div className="text-center mt-16">
//             <button
//               onClick={() => setCurrentStep('questions')}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               className="inline-flex items-center justify-center gap-4 bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-xl 
//                          shadow-2xl shadow-blue-900/30 transition-all duration-300 
//                          hover:bg-blue-800 hover:shadow-blue-900/50 hover:-translate-y-1 transform
//                          w-full sm:w-auto uppercase tracking-wider"
//             >
//               START YOUR 30-SECOND RISK CHECK
//               <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
//             </button>
//             <p className="text-sm text-gray-500 mt-5 font-normal">Answer 3 quick questions to instantly assess your clinic’s PDPL/AI exposure.</p>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     );
//   }

//   // --- SOLUTION SCREEN (New Page for Governance and Liability) ---
//   if (currentStep === 'solution') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-gray-900">
//         <Navigation />

//         <main className="max-w-7xl mx-auto px-6 py-20">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
//               Beyond the Ban: What UAE Regulators Truly Demand
//             </h1>
//             <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
//               Understanding the <strong>Strict Liability</strong> model: The question is not *if* your staff breached the rules, but *what you did* to prevent it.
//             </p>
//           </div>

//           {/* Core Liability and Governance Sections */}
//           <div className="bg-white p-8 md:p-12 max-w-5xl mx-auto border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/70">
//             <h2 className="text-3xl font-bold text-red-600 mb-8 border-b border-gray-200 pb-4">
//               The Regulatory Liability Trap
//             </h2>
//             <div className="text-gray-700 space-y-6 text-lg">
//               <p>
//                 Under Federal Law and NDHC (National Unified Health Data System), medical facilities are held to a standard of <strong>Strict Liability</strong>. Your liability does not end by issuing a memo or a contractual ban on using public Large Language Models (LLMs).
//               </p>
//               <p className="font-semibold text-blue-900">
//                 If a patient's data is transferred out of the country via an employee's LLM query, the regulator fines the <strong>clinic owner and Medical Director</strong>, not the employee. The defense requires <strong>provable, auditable controls</strong>.
//               </p>
//             </div>

//             <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-8 border-b border-gray-200 pb-4">
//               The Three Non-Negotiable Pillars of Audit-Ready Compliance
//             </h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               {/* Pillar 1: TOMs */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <Lock className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">1. Technical & Organisational Measures (TOMs)</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   <strong>Requirement:</strong> Active technical measures to secure data.
//                   <br /><br />
//                   <strong>The Gap:</strong> Documentation showing you have mechanisms (e.g., redaction tools, sandboxed environments) to <strong>physically stop</strong> PHI/PII leakage into public AI tools, proving due diligence.
//                 </p>
//               </div>

//               {/* Pillar 2: Data Residency */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <Globe className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">2. Controlled Data Residency & Sovereignty</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   <strong>Requirement:</strong> Explicit control over the storage location of health data.
//                   <br /><br />
//                   <strong>The Gap:</strong> Any use of public AI is an unauthorized <strong>cross-border data transfer</strong> because the data is processed on servers outside the UAE's jurisdiction, violating data sovereignty mandates.
//                 </p>
//               </div>

//               {/* Pillar 3: Auditable Competency */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <BookOpen className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">3. Auditable Staff Competency</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   <strong>Requirement:</strong> Provable evidence that all staff understand the risks.
//                   <br /><br />
//                   <strong>The Gap:</strong> You must demonstrate not just that training occurred, but that competency was tracked and that staff understand the specific nuances of PDPL and NDHC on modern technology.
//                 </p>
//               </div>
//             </div>

//             <div className="text-center mt-12 pt-6 border-t border-gray-200">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 We provide the necessary framework, tools, and documentation.
//               </h3>
//               <button
//                 onClick={() => setCurrentStep('questions')}
//                 className="inline-flex items-center gap-4 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
//                            shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5"
//               >
//                 Assess Your Gaps Now
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     );
//   }

//   // --- QUESTIONS SCREEN (Clean and Focused) ---
//   if (currentStep === 'questions') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-gray-900">
//         <Navigation />

//         <main className="max-w-4xl mx-auto px-6 py-20">
//           <div className="text-center mb-16">
//             <h1 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">The 30-Second Compliance Check</h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Answer honestly to see your clinic's immediate risk profile regarding modern data security threats.
//             </p>
//           </div>

//           <div className="space-y-8 mb-12">
//             {questions.map((question, index) => (
//               <div 
//                 key={question.id} 
//                 className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 border
//                             ${answers[question.id] === false ? 'border-red-500 ring-2 ring-red-100' : 
//                               answers[question.id] === true ? 'border-emerald-600 ring-2 ring-emerald-100' : 
//                               'border-gray-200 shadow-gray-50/50'}`}
//               >
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
//                   <span className="text-blue-900 font-extrabold mr-2">{index + 1}.</span> {question.text}
//                 </h3>
//                 {/* Regulation details are clean and clearly separated */}
//                 <p className="text-xs text-gray-500 mb-6 font-mono bg-gray-50 p-3 rounded border border-gray-100">{question.regulation}</p>

//                 <div className="flex gap-4 justify-start max-w-lg mx-auto">
//                   <button
//                     onClick={() => handleAnswer(question.id, true)}
//                     className={`flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
//                       ${answers[question.id] === true
//                       ? 'bg-emerald-600 text-white shadow-md shadow-emerald-300'
//                         : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-300'
//                     }`}
//                   >
//                     Yes, We're Covered
//                   </button>
//                   <button
//                     onClick={() => handleAnswer(question.id, false)}
//                     className={`flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
//                       ${answers[question.id] === false
//                       ? 'bg-red-600 text-white shadow-md shadow-red-300'
//                         : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-300'
//                     }`}
//                   >
//                     No, We Are Exposed
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center pt-8">
//             {allAnswered && (
//               <div className="bg-gray-50 p-8 rounded-2xl shadow-inner mb-8 border border-gray-200">
//                 {allYes ? (
//                   <div className="text-emerald-700 flex items-center justify-center gap-3">
//                     <CheckCircle2 className="w-8 h-8" />
//                     <p className="font-bold text-xl">
//                       Excellent! You show high compliance.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="text-red-700 flex items-center justify-center gap-3">
//                     <XCircle className="w-8 h-8" />
//                     <p className="font-bold text-xl">
//                       Risk Detected! You have critical areas of exposure.
//                     </p>
//                   </div>
//                 )}
                
//                 <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//                     Take the next step: our <strong>free, comprehensive audit</strong> details your specific vulnerabilities and provides an actionable compliance roadmap.
//                 </p>
//               </div>
//             )}

//             <button
//               onClick={handleProceed}
//               disabled={!allAnswered}
//               className={`inline-flex items-center gap-4 px-14 py-6 rounded-xl font-extrabold text-xl transition-all duration-300 w-full sm:w-auto uppercase tracking-wider
//                 ${allAnswered
//                 ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xl shadow-blue-900/30 hover:-translate-y-1 transform'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               Book Your Free Compliance Audit
//               <ArrowRight className="w-6 h-6" />
//             </button>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     );
//   }

//   // --- RESULTS SCREEN (Updated Aesthetic) ---
//   if (currentStep === 'results') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-gray-900">
//         <Navigation />
//         <main className="max-w-4xl mx-auto px-6 py-32 text-center">
//           <div className={`bg-gray-50 p-12 rounded-2xl shadow-xl border ${hasAnyNo ? 'border-red-400' : 'border-emerald-400'}`}>
//             <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 
//                             ${hasAnyNo ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
//               {hasAnyNo ? <XCircle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
//             </div>
//             <h2 className="text-3xl font-bold text-blue-900 mb-4">
//               {hasAnyNo ? 'Immediate Action Recommended.' : 'Compliance Confirmed. Next Steps.'}
//             </h2>
//             <p className="text-lg text-gray-700 mb-8">
//               {hasAnyNo
//               ? "Your 30-Second Check identified critical gaps in governance, staff training, or policy required by UAE law. Don't risk AED 2M fines."
//                 : "Your foundation is strong! Now, let's verify every detail and ensure you have the full documentation (TOMs) required for inspection."
//               }
//             </p>
            
//             <button
//               className="inline-flex items-center gap-4 bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-xl 
//                          shadow-lg shadow-blue-900/40 transition-all duration-300 
//                          hover:bg-blue-800 hover:shadow-blue-900/60 hover:-translate-y-1 transform uppercase tracking-wider"
//             >
//               Book Your Free Compliance Audit
//               <ArrowRight className="w-6 h-6" />
//             </button>
//             <p className="text-sm text-gray-500 mt-4">Takes 15 minutes • Find your blindspots</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }
  
//   // This is the absolute final fallback, guaranteed to render if a state-checking error occurs.
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
//       <Zap className="w-12 h-12 text-blue-600 animate-pulse mb-4" />
//       <h1 className="text-xl font-semibold text-gray-700">Initializing Application...</h1>
//       <p className="text-sm text-gray-500 mt-2">If this screen persists, please refresh.</p>
//     </div>
//   );
// }

// export default App;




