/* ================================ Labels ================================ */
const insuranceTypeLabels = {
  home: "Home Insurance",
  health: "Health Insurance",
  car: "Car Insurance",
  business: "Business Insurance"
};

/* ================================ Data (8 Partitions) ================================ */
const COLORS = {
  home: "#a0522d",     // Brown
  health: "#0e6ba8",   // Blue
  car: "#1b5e20",      // Green
  business: "#6a1b9a"  // Purple
};

const insuranceData = [
  {
    type: "home",
    objection: "I already have adequate savings and emergency funds.",
    response: "A single catastrophic event like fire or natural disaster can result in losses of ₹50 lakhs to several crores, far exceeding typical savings.",
    color: COLORS.home
  },
  {
    type: "home",
    objection: "The premium seems high relative to the claim probability.",
    response: "Home insurance is risk transfer, not an investment. Even one claim can provide massive financial protection.",
    color: COLORS.home
  },
  {
    type: "health",
    objection: "I maintain a healthy lifestyle and have no family history.",
    response: "Medical emergencies are unpredictable. Accidents and new viral strains don't check family history.",
    color: COLORS.health
  },
  {
    type: "health",
    objection: "My employer provides ₹5-10 lakh coverage. Why buy more?",
    response: "Employer coverage stops when you leave the job. Personal cover ensures lifelong protection.",
    color: COLORS.health
  },
  {
    type: "car",
    objection: "I drive carefully and park in a secure location.",
    response: "You can't control other drivers, floods, theft, or falling trees. Comprehensive covers these external risks.",
    color: COLORS.car
  },
  {
    type: "car",
    objection: "My car is aging and depreciating. Why insure?",
    response: "Spare parts and labor costs rise with inflation regardless of car age. Third-party liability is also mandatory.",
    color: COLORS.car
  },
  {
    type: "business",
    objection: "I run a lean operation with minimal physical assets.",
    response: "A small fire or lawsuit can bankrupt a small business. Insurance ensures business continuity.",
    color: COLORS.business
  },
  {
    type: "business",
    objection: "Business insurance policies are complex.",
    response: "We offer simplified, transparent policies designed specifically for SMEs with quick claim settlement.",
    color: COLORS.business
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

// 1. Background Slices
// This applies the color to the "back side" of the slice as requested.
wheel.style.background = `conic-gradient(
  from -${sectionAngle / 2}deg,
  ${insuranceData.map((item, i) => 
    `${item.color} ${i * sectionAngle}deg ${(i + 1) * sectionAngle}deg`
  ).join(", ")}
)`;

// 2. Add Text to Slices
insuranceData.forEach((item, index) => {
  const angle = index * sectionAngle;
  const label = document.createElement("div");
  label.className = "wheel-label";
  
  // Truncate text
  const text = item.objection.length > 50
    ? item.objection.substring(0, 50) + "..." 
    : item.objection;

  // We simply put the text in a container. No background color on the container.
  label.innerHTML = `<div class="wheel-text-container">${text}</div>`;

  // Rotate entire label wrapper to point to the correct angle
  label.style.transform = `rotate(${angle}deg)`;

  wheel.appendChild(label);
});

/* ================================ Spin Logic ================================ */
spinBtn.onclick = () => {
  if (isSpinning) return;

  isSpinning = true;
  spinBtn.innerText = "🚂 Chugging...";
  spinBtn.style.background = "#555";

  // Spin Math
  const extraSpins = 5 + Math.random() * 5; 
  const stopAngle = Math.random() * 360;
  
  rotation += (extraSpins * 360) + stopAngle;

  // Transition
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
  modalTitle.innerText = insuranceTypeLabels[item.type];
  modalTitle.style.color = item.color;
  modalObjection.innerText = item.objection;
  modalResponse.innerText = item.response;
  modal.classList.remove("hidden");
}

closeModalBtn.onclick = () => modal.classList.add("hidden");
spinAgainBtn.onclick = () => {
  modal.classList.add("hidden");
  spinBtn.click();
};

// Legend
Object.keys(insuranceTypeLabels).forEach(type => {
  const color = COLORS[type];
  const item = document.createElement("div");
  item.className = "legend-item";
  item.innerHTML = `
    <div class="legend-color" style="background:${color}"></div>
    <span>${insuranceTypeLabels[type]}</span>
  `;
  legend.appendChild(item);
});