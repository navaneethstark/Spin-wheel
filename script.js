/* ================================ Labels ================================ */
const insuranceTypeLabels = {
  home: "Home Insurance",
  health: "Health Insurance",
  car: "Car Insurance",
  business: "Business Insurance"
};

/* ================================ Data (8 Partitions) ================================ */
// WE USE ALTERNATING SHADES to create 8 distinct visual slices.
const PALETTE = {
  home:    ['#a0522d', '#8a411f'], // Sienna, Darker Sienna
  health:  ['#0e6ba8', '#084d7a'], // Blue, Darker Blue
  car:     ['#2e7d32', '#1b5e20'], // Green, Darker Green
  business:['#8e24aa', '#6a1b9a']  // Purple, Darker Purple
};

const insuranceData = [
  {
    id: 1,
    type: 'home',
    objection: 'I already have adequate savings and emergency funds. Why should I pay premiums when I can self-insure my property?',
    response: 'While maintaining emergency funds demonstrates excellent financial discipline, home insurance provides coverage far beyond typical savings capacity. A single catastrophic event like fire or natural disaster can result in losses of ₹50 lakhs to several crores. Insurance also covers liability protection if someone is injured on your property, legal defense costs, and temporary accommodation expenses—risks that would severely deplete even substantial savings. Additionally, home loans mandate insurance, and it protects your family\'s largest asset without liquidating investments.',
    color: PALETTE.home[0]
  },
  {
    id: 2,
    type: 'home',
    objection: 'The premium seems high relative to the probability of a claim. What\'s the actual ROI on home insurance?',
    response: 'Home insurance shouldn\'t be evaluated purely on ROI like an investment product—it\'s risk transfer, not wealth creation. However, consider this: the average home insurance claim in India is ₹3-5 lakhs, while annual premiums typically range from ₹5,000-15,000. Even one claim provides 20-100x return. More importantly, IDFC FIRST Bank offers comprehensive coverage including structure, contents, valuable items, and liability protection. We also provide no-claim bonuses up to 50% premium reduction, add-on covers for specific risks, and 24/7 claim support, making it a cost-effective risk management tool.',
    color: PALETTE.home[1]
  },
  {
    id: 3,
    type: 'health',
    objection: 'I maintain a healthy lifestyle and have no family history of major illnesses. Isn\'t health insurance an unnecessary expense for me?',
    response: 'Health insurance is essential regardless of current health status because medical emergencies are unpredictable and treatment costs are escalating at 10-15% annually. Even healthy individuals face risks from accidents, infections, or sudden illnesses requiring hospitalization. More strategically, purchasing health insurance while young and healthy locks in lower premiums for life and avoids pre-existing disease exclusions. Waiting until you need it means higher costs, waiting periods, and potential coverage denials. IDFC FIRST Bank\'s health plans also include preventive care, annual health check-ups, and wellness benefits that support your healthy lifestyle.',
    color: PALETTE.health[0]
  },
  {
    id: 4,
    type: 'health',
    objection: 'My employer provides ₹5-10 lakh coverage. Why should I purchase additional personal health insurance?',
    response: 'Employer-provided coverage has critical limitations that sophisticated individuals should address. First, it\'s not portable—you lose coverage during job transitions, career breaks, or retirement when you\'re most vulnerable. Second, ₹5-10 lakhs is insufficient for serious illnesses; cancer treatment, organ transplants, or ICU stays can easily exceed ₹20-50 lakhs. Third, employer plans typically don\'t cover family members adequately. Personal health insurance from IDFC FIRST Bank ensures lifelong continuity, allows you to build no-claim bonuses, covers your entire family, and supplements employer coverage for comprehensive protection. It\'s a strategic safety net that protects your wealth and career flexibility.',
    color: PALETTE.health[1]
  },
  {
    id: 5,
    type: 'car',
    objection: 'I drive carefully and my car is parked in a secure location. Third-party coverage meets legal requirements—why pay extra for comprehensive insurance?',
    response: 'Comprehensive insurance protects your financial investment, not just legal compliance. Consider these scenarios: theft (₹5-20 lakhs loss), natural calamities like floods or storms (increasingly common), fire incidents, vandalism, or hit-and-run while parked. Third-party insurance covers none of these. Additionally, comprehensive coverage includes own damage repairs from accidents regardless of fault, depreciation protection, engine and gearbox coverage, and roadside assistance. For a vehicle worth ₹10-15 lakhs, the additional premium of ₹8,000-15,000 annually is minimal compared to potential out-of-pocket expenses. IDFC FIRST Bank also offers zero depreciation cover and consumables coverage for complete protection.',
    color: PALETTE.car[0]
  },
  {
    id: 6,
    type: 'car',
    objection: 'My car is aging and depreciating. Doesn\'t it make more financial sense to drop comprehensive coverage and just maintain third-party insurance?',
    response: 'This is a common misconception. While your car\'s market value decreases, repair costs actually increase with age due to parts availability, labor charges, and mechanical wear. An older car is more susceptible to breakdowns, electrical issues, and mechanical failures. Comprehensive insurance becomes more valuable, not less. Additionally, if your aging car is damaged beyond repair, the insured declared value (IDV) payout helps you purchase a replacement vehicle. IDFC FIRST Bank offers tailored coverage for older vehicles with flexible IDV options, engine protection add-ons, and return-to-invoice cover. The peace of mind and financial protection justify the premium, especially since older cars often require more frequent repairs.',
    color: PALETTE.car[1]
  },
  {
    id: 7,
    type: 'business',
    objection: 'I run a lean operation with minimal physical assets. Business insurance seems more relevant for large enterprises, not small businesses like mine.',
    response: 'Small businesses actually face disproportionately higher risk because they lack the financial reserves and diversification of large enterprises. A single liability lawsuit, fire incident, theft, or business interruption can permanently close a small business. Business insurance from IDFC FIRST Bank covers not just physical assets but also liability protection (customer injuries, product defects, professional errors), business interruption (lost income during closures), cyber risks (data breaches, digital fraud), and employee-related claims. For service-based businesses, professional indemnity and cyber insurance are critical. The premium is tax-deductible and typically costs 0.5-2% of revenue—minimal compared to the existential risk of operating uninsured.',
    color: PALETTE.business[0]
  },
  {
    id: 8,
    type: 'business',
    objection: 'Business insurance policies are complex with numerous exclusions and claim settlement is difficult. How can I be sure my claim will be honored when needed?',
    response: 'Your concern is valid, which is why choosing the right insurer and understanding your policy is crucial. IDFC FIRST Bank provides transparent, customized business insurance with clear policy wordings, dedicated relationship managers who explain coverage and exclusions upfront, and a streamlined digital claim process. We offer risk assessment consultations to identify your specific exposures and recommend appropriate coverage. Our claim settlement ratio is industry-leading, and we provide 24/7 claim support with minimal documentation requirements. We also conduct annual policy reviews to ensure coverage evolves with your business. The key is working with a trusted banking partner who understands your business needs and provides end-to-end support—not just selling a policy.',
    color: PALETTE.business[1]
  }
];

/* ================================ DOM ================================ */
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalObjection = document.getElementById("modal-objection");
const modalResponse = document.getElementById("modal-response");
const closeModalBtn = document.getElementById("closeModal");
const spinAgainBtn = document.getElementById("spinAgain");
const legend = document.getElementById("legend");

/* ================================ Wheel Setup ================================ */
let rotation = 0;
let isSpinning = false;
const sectionAngle = 360 / insuranceData.length; // 45 degrees

// 1. Background Slices WITH SEPARATORS
// We add a distinct 'steel' color line at the end of every slice to simulate spokes
wheel.style.background = `conic-gradient(
  from -${sectionAngle / 2}deg,
  ${insuranceData.map((item, i) => {
    const start = i * sectionAngle;
    const end = (i + 1) * sectionAngle;
    // The "end - 1deg" creates a small gap for the next color or a line
    return `${item.color} ${start}deg ${end - 1}deg, #444 ${end - 1}deg ${end}deg`
  }).join(", ")}
)`;

// 2. Add Text to Slices
insuranceData.forEach((item, index) => {
  const angle = index * sectionAngle;
  const label = document.createElement("div");
  label.className = "wheel-label";
  
  // Truncate text for the visual wheel
  const text = item.objection.length > 55
    ? item.objection.substring(0, 55) + "..." 
    : item.objection;

  label.innerHTML = `<div class="wheel-text-container">${text}</div>`;
  label.style.transform = `rotate(${angle}deg)`;

  wheel.appendChild(label);
});

/* ================================ Spin Logic ================================ */
spinBtn.onclick = () => {
  if (isSpinning) return;

  isSpinning = true;
  spinBtn.innerText = "🚂 Chugging...";
  spinBtn.style.background = "#555";

  const extraSpins = 5 + Math.random() * 5; 
  const stopAngle = Math.random() * 360;
  
  rotation += (extraSpins * 360) + stopAngle;

  wheel.style.transition = "transform 5s cubic-bezier(0.15, 0, 0.2, 1)"; 
  wheel.style.transform = `rotate(-${rotation}deg)`;

  setTimeout(() => {
    isSpinning = false;
    spinBtn.innerText = "🚂 Start Engine";
    spinBtn.style.background = "#333";
    determineWinner(rotation);
  }, 5000);
};

function determineWinner(totalRotation) {
  const actualRotation = totalRotation % 360;
  const winningIndex = Math.floor(
    ((actualRotation + sectionAngle / 2) % 360) / sectionAngle
  );
  
  const safeIndex = (winningIndex + insuranceData.length) % insuranceData.length;
  openModal(insuranceData[safeIndex]);
}

/* ================================ Modal & Legend ================================ */
function openModal(item) {
  modalTitle.innerText = insuranceTypeLabels[item.type].toUpperCase();
  // Match title bg to the winning color
  document.querySelector('.ticket-header').style.background = item.color;
  
  // Show FULL text in the modal
  modalObjection.innerText = item.objection;
  modalResponse.innerText = item.response;
  
  modal.classList.remove("hidden");
  
  // Reset scroll to top
  const modalBody = document.querySelector('.modal-body');
  if(modalBody) modalBody.scrollTop = 0;
}

closeModalBtn.onclick = () => modal.classList.add("hidden");
spinAgainBtn.onclick = () => {
  modal.classList.add("hidden");
  spinBtn.click();
};

// Legend (Only showing unique Types, using the base color)
Object.keys(insuranceTypeLabels).forEach(type => {
  const color = PALETTE[type][0]; // Use base color
  const item = document.createElement("div");
  item.className = "legend-item";
  item.innerHTML = `
    <div class="legend-color" style="background:${color}"></div>
    <span>${insuranceTypeLabels[type]}</span>
  `;
  legend.appendChild(item);
});