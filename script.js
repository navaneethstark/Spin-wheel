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
    type: "home",
    objection: "I already have adequate savings and emergency funds.",
    response: "A single catastrophic event like fire or natural disaster can result in losses of ₹50 lakhs to several crores, far exceeding typical savings.",
    color: PALETTE.home[0] // Light shade
  },
  {
    type: "home",
    objection: "The premium seems high relative to the claim probability.",
    response: "Home insurance is risk transfer, not an investment. Even one claim can provide massive financial protection.",
    color: PALETTE.home[1] // Dark shade (Creates the separation!)
  },
  {
    type: "health",
    objection: "I maintain a healthy lifestyle and have no family history.",
    response: "Medical emergencies are unpredictable. Accidents and new viral strains don't check family history.",
    color: PALETTE.health[0]
  },
  {
    type: "health",
    objection: "My employer provides ₹5-10 lakh coverage. Why buy more?",
    response: "Employer coverage stops when you leave the job. Personal cover ensures lifelong protection.",
    color: PALETTE.health[1]
  },
  {
    type: "car",
    objection: "I drive carefully and park in a secure location.",
    response: "You can't control other drivers, floods, theft, or falling trees. Comprehensive covers these external risks.",
    color: PALETTE.car[0]
  },
  {
    type: "car",
    objection: "My car is aging and depreciating. Why insure?",
    response: "Spare parts and labor costs rise with inflation regardless of car age. Third-party liability is also mandatory.",
    color: PALETTE.car[1]
  },
  {
    type: "business",
    objection: "I run a lean operation with minimal physical assets.",
    response: "A small fire or lawsuit can bankrupt a small business. Insurance ensures business continuity.",
    color: PALETTE.business[0]
  },
  {
    type: "business",
    objection: "Business insurance policies are complex.",
    response: "We offer simplified, transparent policies designed specifically for SMEs with quick claim settlement.",
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
  
  const text = item.objection.length > 50
    ? item.objection.substring(0, 50) + "..." 
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
  
  modalObjection.innerText = item.objection;
  modalResponse.innerText = item.response;
  modal.classList.remove("hidden");
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
