// Disable automatic scroll restoration on browser reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Smooth scroll for anchor links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    }
  });
});

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Gallery Modal Data & Interactions
const printDetails = {
  'benchy': {
    title: '3D Benchy Benchmark',
    tag: 'BENCHMARK & QUALITY TEST',
    desc: 'Industry-standard benchmark model to evaluate printer accuracy and surface finish.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for printing the 3D Benchy model."
  },
  'phone-stand': {
    title: 'Ergonomic Desk Phone Stand',
    tag: 'DESK ACCESSORY',
    desc: 'Dual-angle desktop stand with anti-slip cable slots for easy charging.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for printing a Desk Phone Stand."
  },
  'cable-organizer': {
    title: 'Modular Desk Cable Clip System',
    tag: 'ORGANIZATION',
    desc: 'Modular snap-fit cable routing organizer for tidy desk setups.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for printing Cable Organizers."
  },
  'planter': {
    title: 'Geometric Succulent Planter',
    tag: 'HOME DECOR',
    desc: 'Low-poly modern succulent pot with sharp geometric facets.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for printing a Geometric Planter."
  },
  'calibration-cube': {
    title: 'XYZ 20mm Calibration Cube',
    tag: 'PRECISION ENGINEERING',
    desc: '20mm test cube with crisp XYZ lettering for axis calibration and accuracy.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for precision engineering test prints."
  },
  'bracket': {
    title: 'Heavy-Duty Structural L-Bracket',
    tag: 'FUNCTIONAL PART',
    desc: 'Reinforced 90° structural bracket with countersunk M4 screw holes.',
    material: 'PLA',
    color: 'Lime Green',
    time: '1 hr 45 min',
    whatsappText: "Hi LayerLab! I'd like to get a quote for printing Structural Brackets."
  }
};

const modal = document.getElementById('gallery-modal');
const closeModalBtn = document.getElementById('modal-close-btn');
const closeModalAction = document.getElementById('modal-close-action');

function openModal(id, svgHTML) {
  const data = printDetails[id];
  if (!data) return;

  document.getElementById('modal-icon-container').innerHTML = svgHTML;
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('spec-material').textContent = data.material;
  document.getElementById('spec-color').textContent = data.color;
  document.getElementById('spec-time').textContent = data.time;

  const waBtn = document.getElementById('modal-whatsapp-btn');
  waBtn.href = `https://wa.me/60176679964?text=${encodeURIComponent(data.whatsappText)}`;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.print-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    const svg = card.querySelector('.print-icon').innerHTML;
    openModal(id, svg);
  });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (closeModalAction) closeModalAction.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});
