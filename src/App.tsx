<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Compliance Checker</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Load Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Define the Inter font family */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f9fafb;
        }
        /* Style for the Lucide icons to look like components */
        .icon {
            display: inline-block;
            vertical-align: middle;
        }
    </style>
</head>
<body>

    <div id="app-container" class="min-h-screen flex flex-col">
        <!-- Navigation Area (Will be populated by JS) -->
        <header id="navigation-bar"></header>

        <!-- Main Content Area (Will be populated by JS) -->
        <main id="main-content" class="flex-grow"></main>

        <!-- Footer Area (Will be populated by JS) -->
        <footer id="footer-area"></footer>
    </div>

    <script>
        // Use a simple global state object for the application logic
        let currentPage = 'intro';
        let answers = {};
        
        // --- Compliance Questions ---
        const questions = [
            {
                id: 1,
                text: 'Can you produce your TOMS (Technical & Organisational Measures) and all required data governance documents within 24 hours?',
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

        // --- Core Functions ---

        const setPage = (pageName) => {
            currentPage = pageName;
            renderApp();
        };

        const getStatus = () => {
            const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);
            const hasAnyNo = Object.values(answers).some(answer => answer === false);
            const allYes = allAnswered && !hasAnyNo;
            return { allAnswered, hasAnyNo, allYes };
        };

        const handleAnswer = (questionId, answer) => {
            answers[questionId] = answer;
            renderApp(); // Re-render to update the visual state
        };

        const handleProceed = () => {
            if (getStatus().allAnswered) {
                setPage('results');
            }
        };

        // Helper function for icon rendering
        const getIcon = (name, classes) => {
            return `<i data-lucide="${name}" class="icon ${classes}"></i>`;
        };

        // --- Component Rendering Functions ---

        const renderNavigation = () => {
            const navHtml = `
                <nav class="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
                    <div class="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                        <div class="flex items-center gap-3 cursor-pointer" onclick="setPage('intro')">
                            ${getIcon('shield', 'w-8 h-8 text-blue-900')}
                            <span class="text-2xl font-extrabold text-blue-900 tracking-tight">MyDataShield.org</span>
                        </div>
                        <div class="hidden sm:flex gap-8">
                            <a onclick="setPage('solution')" class="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentPage === 'solution' ? 'text-blue-900 border-b-2 border-blue-900' : ''}">Our Solution</a>
                            <a onclick="setPage('about')" class="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentPage === 'about' ? 'text-blue-900 border-b-2 border-blue-900' : ''}">About Us</a>
                            <a onclick="setPage('legal')" class="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm cursor-pointer ${currentPage === 'legal' ? 'text-blue-900 border-b-2 border-blue-900' : ''}">Legal Mandate</a>
                            <a href="#" class="text-gray-700 hover:text-blue-900 transition-colors font-semibold text-sm">Contact</a>
                        </div>
                    </div>
                </nav>
            `;
            document.getElementById('navigation-bar').innerHTML = navHtml;
            lucide.createIcons(); // Re-render icons
        };

        const renderFooter = () => {
            const footerHtml = `
                <footer class="border-t border-gray-100 mt-24 bg-white">
                    <div class="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
                        <p class="space-x-4">
                            <span>&copy; 2025 MyDataShield.org, a DPO Solutions Partner.</span>
                            <a href="#" class="hover:text-gray-700 transition-colors">Privacy Policy</a>
                            <a href="#" class="hover:text-gray-700 transition-colors">Terms of Service</a>
                        </p>
                    </div>
                </footer>
            `;
            document.getElementById('footer-area').innerHTML = footerHtml;
        };

        const renderIntro = () => {
            let isHovered = false; // Local hover state for button animation
            
            const content = `
                <div class="max-w-7xl mx-auto px-6 py-24">
                    <div class="text-center mb-16">
                        <h1 class="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                            IS YOUR MEDICAL LICENSE <span class="text-red-600">EXPOSED</span>?
                        </h1>
                        <p class="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
                            The Uncontrolled Use of Public AI Risks Your Clinic’s Future and Your Professional License.
                        </p>
                        <p class="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
                            The silent threat of staff using public Large Language Models (LLMs) for patient notes or administrative tasks is now an unauthorized <strong>cross-border data transfer</strong>, constituting a direct violation of two key federal mandates:
                        </p>
                    </div>
    
                    <div class="bg-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl shadow-gray-100 border border-gray-100">
                        <h2 class="text-3xl font-extrabold mb-8 text-blue-900 border-b border-gray-200 pb-4">The Stakes are Immediate:</h2>
                        <div class="grid md:grid-cols-3 gap-10 text-lg">
                            
                            <div class="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                ${getIcon('file-text', 'w-6 h-6 text-blue-900')}
                                <p class="font-bold text-lg text-blue-900">FEDERAL MANDATES</p>
                                <p class="text-gray-700 text-sm leading-relaxed"><strong>Federal Decree-Law No. 45/2021 (PDPL):</strong> Governing confidentiality and cross-border security of all Personal Data.</p>
                                <p class="text-gray-700 text-sm leading-relaxed"><strong>Federal Law No. 2 of 2019:</strong> Explicitly safeguarding the confidentiality and security of Electronic Health Data.</p>
                            </div>
                            
                            <div class="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                ${getIcon('briefcase', 'w-6 h-6 text-red-600')}
                                <p class="font-bold text-lg text-blue-900">FINANCIAL LIABILITY</p>
                                <p class="text-gray-700 text-sm leading-relaxed">Violations expose the clinic owner to administrative fines up to <strong>AED 1,000,000</strong>.</p>
                                <p class="text-gray-700 text-sm leading-relaxed">The transition to <strong>full PDPL enforcement in 2025</strong> means the window for achieving auditable compliance is closing.</p>
                            </div>
                            
                            <div class="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                ${getIcon('users', 'w-6 h-6 text-red-600')}
                                <p class="font-bold text-lg text-blue-900">CAREER RISK</p>
                                <p class="text-gray-700 text-sm leading-relaxed">The failure to implement necessary controls (Technical and Organizational Measures, or <strong>TOMS</strong>) risks suspension or withdrawal of the Medical Director’s license.</p>
                            </div>
                        </div>
                        
                        <p class="mt-10 text-base text-gray-500 italic font-medium border-t border-gray-100 pt-4">
                            <strong>A Contractual Ban Is Not Enough.</strong> Regulators require provable <strong>Technical and Organizational Measures (TOMS)</strong> to secure health data from digital leakage.
                        </p>
                    </div>
                    
                    <div class="text-center mt-16">
                        <button
                            id="start-check-btn"
                            class="inline-flex items-center justify-center gap-4 bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-xl 
                                   shadow-2xl shadow-blue-900/30 transition-all duration-300 
                                   hover:bg-blue-800 hover:shadow-blue-900/50 hover:-translate-y-1 transform
                                   w-full sm:w-auto uppercase tracking-wider"
                            onclick="setPage('questions')"
                        >
                            START YOUR 30-SECOND RISK CHECK
                            ${getIcon('arrow-right', 'w-6 h-6 transition-transform duration-300')}
                        </button>
                        <p class="text-sm text-gray-500 mt-5 font-normal">Answer 3 quick questions to instantly assess your clinic’s PDPL/AI exposure.</p>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons(); // Re-render icons
        };

        const renderQuestions = () => {
            const { allAnswered, allYes } = getStatus();

            const questionBlocks = questions.map((q, index) => {
                const isYes = answers[q.id] === true;
                const isNo = answers[q.id] === false;
                
                return `
                    <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 border
                        ${isNo ? 'border-red-500 ring-2 ring-red-100' : 
                          isYes ? 'border-emerald-600 ring-2 ring-emerald-100' : 
                          'border-gray-200 shadow-gray-50/50'}">
                        
                        <h3 class="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
                            <span class="text-blue-900 font-extrabold mr-2">${index + 1}.</span> ${q.text}
                        </h3>
                        <p class="text-xs text-gray-500 mb-6 font-mono bg-gray-50 p-3 rounded border border-gray-100">${q.regulation}</p>

                        <div class="flex gap-4 justify-start max-w-lg mx-auto">
                            <button
                                onclick="handleAnswer(${q.id}, true)"
                                class="flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
                                  ${isYes
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-300'
                                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-300'
                                  }"
                            >
                                Yes, We're Covered
                            </button>
                            <button
                                onclick="handleAnswer(${q.id}, false)"
                                class="flex-1 py-3 px-8 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base
                                  ${isNo
                                    ? 'bg-red-600 text-white shadow-md shadow-red-300'
                                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-300'
                                  }"
                            >
                                No, We Are Exposed
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            const proceedBlock = allAnswered ? `
                <div class="bg-gray-50 p-8 rounded-2xl shadow-inner mb-8 border border-gray-200">
                    ${allYes ? `
                        <div class="text-emerald-700 flex items-center justify-center gap-3">
                            ${getIcon('check-circle-2', 'w-8 h-8')}
                            <p class="font-bold text-xl">
                                Excellent! You show high compliance.
                            </p>
                        </div>
                    ` : `
                        <div class="text-red-700 flex items-center justify-center gap-3">
                            ${getIcon('x-circle', 'w-8 h-8')}
                            <p class="font-bold text-xl">
                                Risk Detected! You have critical areas of exposure.
                            </p>
                        </div>
                    `}
                    <p class="text-gray-600 mt-4 max-w-xl mx-auto">
                        Take the next step: our <strong>free, comprehensive audit</strong> details your specific vulnerabilities and provides an actionable compliance roadmap.
                    </p>
                </div>
            ` : '';

            const content = `
                <div class="max-w-4xl mx-auto px-6 py-20">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">The 30-Second Compliance Check</h1>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            Answer honestly to see your clinic's immediate risk profile regarding modern data security threats.
                        </p>
                    </div>

                    <div class="space-y-8 mb-12">
                        ${questionBlocks}
                    </div>

                    <div class="text-center pt-8">
                        ${proceedBlock}
                        <button
                            onclick="handleProceed()"
                            ${!allAnswered ? 'disabled' : ''}
                            class="inline-flex items-center gap-4 px-14 py-6 rounded-xl font-extrabold text-xl transition-all duration-300 w-full sm:w-auto uppercase tracking-wider
                                ${allAnswered
                                    ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xl shadow-blue-900/30 hover:-translate-y-1 transform'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }"
                        >
                            Book Your Free Compliance Audit
                            ${getIcon('arrow-right', 'w-6 h-6')}
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons(); // Re-render icons
        };

        const renderResults = () => {
            const { hasAnyNo } = getStatus();
            const icon = hasAnyNo ? getIcon('x-circle', 'w-10 h-10') : getIcon('check-circle-2', 'w-10 h-10');
            const borderColor = hasAnyNo ? 'border-red-400' : 'border-emerald-400';
            const bgColor = hasAnyNo ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600';
            const textClass = hasAnyNo ? 'text-red-700' : 'text-emerald-700';
            const title = hasAnyNo ? 'Immediate Action Recommended.' : 'Compliance Confirmed. Next Steps.';
            const message = hasAnyNo
                ? "Your 30-Second Check identified critical gaps in governance, staff training, or policy required by UAE law. Don't risk AED 2M fines."
                : "Your foundation is strong! Now, let's verify every detail and ensure you have the full documentation (TOMS) required for inspection.";

            const content = `
                <div class="max-w-4xl mx-auto px-6 py-32 text-center">
                    <div class="bg-gray-50 p-12 rounded-2xl shadow-xl border ${borderColor}">
                        <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${bgColor}">
                            ${icon}
                        </div>
                        <h2 class="text-3xl font-bold text-blue-900 mb-4">
                            ${title}
                        </h2>
                        <p class="text-lg text-gray-700 mb-8">
                            ${message}
                        </p>
                        
                        <button
                            class="inline-flex items-center gap-4 bg-blue-900 text-white px-14 py-6 rounded-xl font-extrabold text-xl 
                                   shadow-lg shadow-blue-900/40 transition-all duration-300 
                                   hover:bg-blue-800 hover:shadow-blue-900/60 hover:-translate-y-1 transform uppercase tracking-wider"
                        >
                            Book Your Free Compliance Audit
                            ${getIcon('arrow-right', 'w-6 h-6')}
                        </button>
                        <p class="text-sm text-gray-500 mt-4">Takes 15 minutes • Find your blindspots</p>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons(); // Re-render icons
        };

        const renderAbout = () => {
            const content = `
                <div class="max-w-4xl mx-auto px-6 py-20">
                    <div class="text-center mb-16">
                        <h1 class="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                            A Mission Built on Regulatory Defense
                        </h1>
                        <p class="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
                            We translate complex UAE data laws into simple, auditable technology solutions for healthcare leaders.
                        </p>
                    </div>

                    <div class="bg-white p-8 md:p-12 border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/70 space-y-10">
                        
                        <section>
                            <h2 class="flex items-center text-3xl font-bold text-blue-900 mb-4 border-b border-gray-200 pb-3">
                                ${getIcon('lightbulb', 'w-6 h-6 mr-3 text-blue-600')} Our Expertise
                            </h2>
                            <p class="text-lg text-gray-700 leading-relaxed">
                                MyDataShield.org was founded by data privacy experts and former healthcare compliance officers who recognized a critical gap: traditional IT security doesn't address the <strong>Strict Liability</strong> risks posed by modern AI and LLMs. Our focus is laser-targeted on the unique regulatory environment of the UAE.
                            </p>
                        </section>

                        <section>
                            <h2 class="flex items-center text-3xl font-bold text-blue-900 mb-4 border-b border-gray-200 pb-3">
                                ${getIcon('shield', 'w-6 h-6 mr-3 text-blue-600')} What We Provide
                            </h2>
                            <ul class="space-y-4 text-gray-700 list-disc list-inside ml-4">
                                <li><strong>Auditable TOMS (Technical & Organisational Measures):</strong> We deliver the provable technical controls required by law to prevent data leakage.</li>
                                <li><strong>AI Governance Frameworks:</strong> Custom policies and training modules tailored for NDHC and PDPL compliance.</li>
                                <li><strong>Risk Assessment and Auditing:</strong> A definitive audit trail that stands up to regulatory scrutiny, protecting your professional license.</li>
                            </ul>
                        </section>

                        <section class="bg-blue-50/50 p-6 rounded-xl border border-blue-200">
                            <p class="text-xl font-semibold text-gray-800 italic">
                                "Compliance is not a document you file. It's a technical mechanism you must prove."
                            </p>
                            <p class="text-sm text-blue-800 mt-2">— The MyDataShield.org Compliance Team</p>
                        </section>
                        
                        <div class="text-center pt-6">
                            <button
                                onclick="setPage('questions')"
                                class="inline-flex items-center gap-4 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                                   shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5"
                            >
                                Start Your Risk Assessment
                                ${getIcon('arrow-right', 'w-5 h-5')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons();
        };

        const renderLegal = () => {
            const content = `
                <div class="max-w-4xl mx-auto px-6 py-20">
                    <div class="text-center mb-16">
                        <h1 class="text-5xl font-extrabold text-red-600 mb-4 tracking-tight">
                            UAE Health Data: The Non-Negotiable Laws
                        </h1>
                        <p class="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
                            A review of the federal decrees that place <strong>Strict Liability</strong> on clinic owners and medical directors.
                        </p>
                    </div>

                    <div class="bg-white p-8 md:p-12 border border-red-100 rounded-3xl shadow-xl shadow-red-50/70 space-y-10">
                        
                        <div class="flex items-start gap-4">
                            ${getIcon('scale', 'w-10 h-10 text-red-600 flex-shrink-0 mt-1')}
                            <div>
                                <h2 class="text-2xl font-bold text-blue-900 mb-2">
                                    Federal Decree-Law No. 45/2021 (PDPL)
                                </h2>
                                <p class="text-lg text-gray-700">
                                    The primary federal law governing Personal Data (PD) protection, transfer, and processing within the UAE. Unauthorized use of public AI by staff constitutes a <strong>cross-border data transfer without consent</strong> or approved mechanism, placing the organization in direct violation.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            ${getIcon('zap', 'w-10 h-10 text-red-600 flex-shrink-0 mt-1')}
                            <div>
                                <h2 class="text-2xl font-bold text-blue-900 mb-2">
                                    Federal Law No. 2 of 2019
                                </h2>
                                <p class="text-lg text-gray-700">
                                    Explicitly mandates the <strong>confidentiality and security of Electronic Health Data (EHD)</strong>. This requires auditable technical controls to ensure patient records are not shared, even accidentally, with unauthorized third parties (like public LLMs).
                                </p>
                            </div>
                        </div>
                        
                        <div class="p-6 bg-red-50 rounded-xl border-l-4 border-red-500 shadow-inner">
                            <h3 class="text-2xl font-extrabold text-red-700 mb-3 flex items-center gap-2">
                                ${getIcon('briefcase', 'w-6 h-6')} The Penalty Threshold
                            </h3>
                            <p class="text-xl font-bold text-gray-800">
                                Administrative fines under PDPL can reach <strong>AED 1,000,000</strong>.
                            </p>
                            <p class="text-base text-gray-600 mt-2">
                                Beyond fines, compliance failure demonstrates gross negligence in data security, directly threatening the <strong>suspension or withdrawal of the Medical Director’s operating license</strong>.
                            </p>
                        </div>
                    </div>
                    
                    <div class="text-center pt-10">
                        <button
                            onclick="setPage('questions')"
                            class="inline-flex items-center gap-4 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                                   shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5"
                        >
                            See Our Compliance Solution
                            ${getIcon('arrow-right', 'w-5 h-5')}
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons();
        };

        const renderSolution = () => {
            const content = `
                <div class="max-w-7xl mx-auto px-6 py-20">
                    <div class="text-center mb-16">
                        <h1 class="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                            Beyond the Ban: What UAE Regulators Truly Demand
                        </h1>
                        <p class="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
                            Understanding the <strong>Strict Liability</strong> model: The question is not <em>if</em> your staff breached the rules, but <em>what you did</em> to prevent it.
                        </p>
                    </div>

                    <div class="bg-white p-8 md:p-12 max-w-5xl mx-auto border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/70">
                        <h2 class="text-3xl font-bold text-red-600 mb-8 border-b border-gray-200 pb-4">
                            The Regulatory Liability Trap
                        </h2>
                        <div class="text-gray-700 space-y-6 text-lg">
                            <p>
                                Under Federal Law and NDHC (National Unified Health Data System), medical facilities are held to a standard of <strong>Strict Liability</strong>. Your liability does not end by issuing a memo or a contractual ban on using public Large Language Models (LLMs).
                            </p>
                            <p class="font-semibold text-blue-900">
                                If a patient's data is transferred out of the country via an employee's LLM query, the regulator fines the <strong>clinic owner and Medical Director</strong>, not the employee. The defense requires <strong>provable, auditable controls</strong>.
                            </p>
                        </div>

                        <h2 class="text-3xl font-bold text-blue-900 mt-12 mb-8 border-b border-gray-200 pb-4">
                            The Three Non-Negotiable Pillars of Audit-Ready Compliance
                        </h2>

                        <div class="grid md:grid-cols-3 gap-8">
                            <div class="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                                ${getIcon('lock', 'w-8 h-8 text-blue-900')}
                                <p class="text-xl font-extrabold text-blue-900">1. Technical & Organisational Measures (TOMS)</p>
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    <strong>Requirement:</strong> Active technical measures to secure data.
                                    <br /><br />
                                    <strong>The Gap:</strong> Documentation showing you have mechanisms (e.g., redaction tools, sandboxed environments) to <strong>physically stop</strong> PHI/PII leakage into public AI tools, proving due diligence.
                                </p>
                            </div>

                            <div class="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                                ${getIcon('globe', 'w-8 h-8 text-blue-900')}
                                <p class="text-xl font-extrabold text-blue-900">2. Controlled Data Residency & Sovereignty</p>
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    <strong>Requirement:</strong> Explicit control over the storage location of health data.
                                    <br /><br />
                                    <strong>The Gap:</strong> Any use of public AI is an unauthorized <strong>cross-border data transfer</strong> because the data is processed on servers outside the UAE's jurisdiction, violating data sovereignty mandates.
                                </p>
                            </div>

                            <div class="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
                                ${getIcon('book-open', 'w-8 h-8 text-blue-900')}
                                <p class="text-xl font-extrabold text-blue-900">3. Auditable Staff Competency</p>
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    <strong>Requirement:</strong> Provable evidence that all staff understand the risks.
                                    <br /><br />
                                    <strong>The Gap:</strong> You must demonstrate not just that training occurred, but that competency was tracked and that staff understand the specific nuances of PDPL and NDHC on modern technology.
                                </p>
                            </div>
                        </div>

                        <div class="text-center mt-12 pt-6 border-t border-gray-200">
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">
                                We provide the necessary framework, tools, and documentation.
                            </h3>
                            <button
                                onclick="setPage('questions')"
                                class="inline-flex items-center gap-4 bg-blue-900 text-white px-10 py-5 rounded-xl font-extrabold text-lg 
                                       shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:-translate-y-0.5"
                            >
                                Assess Your Gaps Now
                                ${getIcon('arrow-right', 'w-5 h-5')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('main-content').innerHTML = content;
            lucide.createIcons();
        };


        // --- Main Application Render Loop ---
        const renderApp = () => {
            renderNavigation();
            renderFooter();
            
            // This acts as the router/switch statement
            switch (currentPage) {
                case 'intro':
                    renderIntro();
                    break;
                case 'questions':
                    renderQuestions();
                    break;
                case 'results':
                    renderResults();
                    break;
                case 'about':
                    renderAbout();
                    break;
                case 'legal':
                    renderLegal();
                    break;
                case 'solution':
                    renderSolution();
                    break;
                default:
                    document.getElementById('main-content').innerHTML = `
                        <div class="text-center py-32">
                            <h1 class="text-2xl font-bold text-red-600">Page Not Found</h1>
                            <p class="text-gray-600">The requested page does not exist or an error occurred.</p>
                            <button onclick="setPage('intro')" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</button>
                        </div>
                    `;
            }
            // Re-run lucide icon processing after any content update
            lucide.createIcons();
        };

        // Initial render when the script loads
        window.onload = renderApp;

    </script>
</body>
</html>


// import React, { useState, useMemo } from 'react';
// // Imported all necessary Lucide icons
// import { Shield, CheckCircle2, ArrowRight, XCircle, Briefcase, Users, FileText, Zap, BookOpen, Lock, Globe } from 'lucide-react';

// // --- Compliance Questions (Unchanged) ---
// const questions = [
//   {
//     id: 1,
//     text: 'Can you produce your TOMS (Technical & Organisational Measures) and all required data governance documents within 24 hours?',
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
//               The silent threat of staff using public Large Language Models (LLMs) for patient notes or administrative tasks is now an unauthorized **cross-border data transfer**, constituting a direct violation of two key federal mandates:
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
//                 <p className="text-gray-700 text-sm leading-relaxed">**Federal Decree-Law No. 45/2021 (PDPL):** Governing confidentiality and cross-border security of all Personal Data.</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">**Federal Law No. 2 of 2019:** Explicitly safeguarding the confidentiality and security of Electronic Health Data.</p>
//               </div>
              
//               {/* Column 2: Financial Risk */}
//               <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//                 <Briefcase className="w-6 h-6 text-red-600"/>
//                 <p className="font-bold text-lg text-blue-900">FINANCIAL LIABILITY</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">Violations expose the clinic owner to administrative fines up to **AED 1,000,000**.</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">The transition to **full PDPL enforcement in 2025** means the window for achieving auditable compliance is closing.</p>
//               </div>
              
//               {/* Column 3: Career Risk */}
//               <div className="space-y-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//                 <Users className="w-6 h-6 text-red-600"/>
//                 <p className="font-bold text-lg text-blue-900">CAREER RISK</p>
//                 <p className="text-gray-700 text-sm leading-relaxed">The failure to implement necessary controls (Technical and Organizational Measures, or **TOMS**) risks suspension or withdrawal of the Medical Director’s license.</p>
//               </div>
//             </div>
            
//             {/* Disclaimer/Contractual Ban Statement */}
//             <p className="mt-10 text-base text-gray-500 italic font-medium border-t border-gray-100 pt-4">
//               **A Contractual Ban Is Not Enough.** Regulators require provable **Technical and Organizational Measures (TOMS)** to secure health data from digital leakage.
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
//               Understanding the **Strict Liability** model: The question is not *if* your staff breached the rules, but *what you did* to prevent it.
//             </p>
//           </div>

//           {/* Core Liability and Governance Sections */}
//           <div className="bg-white p-8 md:p-12 max-w-5xl mx-auto border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/70">
//             <h2 className="text-3xl font-bold text-red-600 mb-8 border-b border-gray-200 pb-4">
//               The Regulatory Liability Trap
//             </h2>
//             <div className="text-gray-700 space-y-6 text-lg">
//               <p>
//                 Under Federal Law and NDHC (National Unified Health Data System), medical facilities are held to a standard of **Strict Liability**. Your liability does not end by issuing a memo or a contractual ban on using public Large Language Models (LLMs).
//               </p>
//               <p className="font-semibold text-blue-900">
//                 If a patient's data is transferred out of the country via an employee's LLM query, the regulator fines the **clinic owner and Medical Director**, not the employee. The defense requires **provable, auditable controls**.
//               </p>
//             </div>

//             <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-8 border-b border-gray-200 pb-4">
//               The Three Non-Negotiable Pillars of Audit-Ready Compliance
//             </h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               {/* Pillar 1: TOMS */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <Lock className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">1. Technical & Organisational Measures (TOMS)</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   **Requirement:** Active technical measures to secure data.
//                   <br /><br />
//                   **The Gap:** Documentation showing you have mechanisms (e.g., redaction tools, sandboxed environments) to **physically stop** PHI/PII leakage into public AI tools, proving due diligence.
//                 </p>
//               </div>

//               {/* Pillar 2: Data Residency */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <Globe className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">2. Controlled Data Residency & Sovereignty</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   **Requirement:** Explicit control over the storage location of health data.
//                   <br /><br />
//                   **The Gap:** Any use of public AI is an unauthorized **cross-border data transfer** because the data is processed on servers outside the UAE's jurisdiction, violating data sovereignty mandates.
//                 </p>
//               </div>

//               {/* Pillar 3: Auditable Competency */}
//               <div className="space-y-4 p-6 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
//                 <BookOpen className="w-8 h-8 text-blue-900"/>
//                 <p className="text-xl font-extrabold text-blue-900">3. Auditable Staff Competency</p>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   **Requirement:** Provable evidence that all staff understand the risks.
//                   <br /><br />
//                   **The Gap:** You must demonstrate not just that training occurred, but that competency was tracked and that staff understand the specific nuances of PDPL and NDHC on modern technology.
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
//                     Take the next step: our **free, comprehensive audit** details your specific vulnerabilities and provides an actionable compliance roadmap.
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
//                 : "Your foundation is strong! Now, let's verify every detail and ensure you have the full documentation (TOMS) required for inspection."
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




