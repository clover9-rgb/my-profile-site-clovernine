/* =========================================================
   권일 프로필 사이트 - 동작(JavaScript)
   1) 히어로 입체 타일 배경 만들기
   2) 통계 숫자 / 프로젝트 카드 / 기술 타일 그리기
   3) 모바일 메뉴 열기/닫기
   4) 현재 섹션에 맞춰 메뉴 강조
   5) 스크롤 시 헤더 배경 / 섹션 등장 효과
   6) 이메일 복사 버튼
   ========================================================= */

// ---------- 내용 데이터 ----------
// 글자를 바꾸고 싶을 때는 아래 세 목록만 고치면 됩니다.

// 숫자 통계 (예시 숫자입니다. 실제 수치로 바꿔 주세요)
const STATS = [
  { value: '3', title: '핵심 서비스', desc: '웹메시징 · 기프티콘 · 고객관리 프로그램을 직접 만들고 운영합니다.' },
  { value: '10+', title: '년 개발 경험', desc: '기획, 개발, 운영까지 한 사람이 끝까지 책임지는 방식으로 일해 왔습니다.' },
  { value: '100%', title: '직접 개발', desc: '외주 없이 직접 코드를 쓰기 때문에 요청사항을 빠르고 정확하게 반영합니다.' },
];

// 프로젝트 (Case Study)
const PROJECTS = [
  {
    title: '웹메시징 플랫폼',
    category: '메시징',
    description: '문자(SMS/LMS)와 카카오 알림톡을 한 화면에서 대량 발송하고, 결과와 통계를 실시간으로 확인하는 웹 서비스입니다.',
    tags: ['Node.js', 'MySQL', '알림톡 API'],
    metrics: [
      { value: '99.9%', label: '발송 성공률' },
      { value: '-40%', label: '발송 시간' },
    ],
    link: '', // 소개 페이지 주소가 있으면 넣으세요. 예: 'https://example.com'
  },
  {
    title: '기프티콘 발송 서비스',
    category: '커머스',
    description: '모바일 상품권을 고객에게 자동으로 발송하고, 사용 여부와 유효기간을 관리하는 기프티콘 솔루션입니다.',
    tags: ['PHP', '기프티콘 API', '결제 연동'],
    metrics: [
      { value: '+35%', label: '재구매율' },
      { value: '-60%', label: '운영 시간' },
    ],
    link: '',
  },
  {
    title: '고객관리(CRM) 프로그램',
    category: '업무 도구',
    description: '고객 정보, 상담 기록, 메시지 발송 이력을 한곳에 모아 소규모 비즈니스가 쉽게 고객을 관리하도록 만든 프로그램입니다.',
    tags: ['JavaScript', 'Tailwind CSS', 'Node.js'],
    metrics: [
      { value: '+21%', label: '응대 속도' },
      { value: '1곳', label: '통합 관리' },
    ],
    link: '',
  },
];

// 기술 타일. group 은 웹 기본(web) / 서버(server) / 메시징(api) 세 가지
const SKILLS = [
  { name: 'HTML', mark: 'H5', group: 'web' },
  { name: 'CSS', mark: 'C3', group: 'web' },
  { name: 'JavaScript', mark: 'JS', group: 'web' },
  { name: 'Tailwind CSS', mark: 'TW', group: 'web' },
  { name: 'Node.js', mark: 'N', group: 'server' },
  { name: 'PHP', mark: 'php', group: 'server' },
  { name: 'MySQL', mark: 'SQL', group: 'server' },
  { name: 'REST API', mark: 'API', group: 'server' },
  { name: '카카오 알림톡', mark: '톡', group: 'api' },
  { name: 'SMS / LMS', mark: 'SMS', group: 'api' },
  { name: '결제 연동', mark: '₩', group: 'api' },
  { name: '기프티콘 API', mark: '🎁', group: 'api' },
];

const GROUP_COLOR = {
  web: 'bg-primary-900',
  server: 'bg-primary-500',
  api: 'bg-primary-300',
};

// HTML 에 글자를 넣기 전에 특수문자를 안전하게 바꿔 줍니다.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------- 1) 히어로 입체 타일 ----------
function renderHeroTiles() {
  const container = document.getElementById('hero-tiles');
  if (!container) return;

  const total = 9 * 6; // 가로 9칸 × 세로 6줄 (모바일은 CSS 에서 6칸으로 줄어듦)
  const tiles = [];
  for (let i = 0; i < total; i += 1) {
    // 일정한 규칙으로 몇 개는 떠 있고, 몇 개는 눌린 느낌을 줍니다.
    let state = '';
    if (i % 7 === 2 || i % 11 === 5) state = 'is-raised';
    else if (i % 9 === 4) state = 'is-sunken';
    tiles.push(`<div class="hero-tile ${state}"></div>`);
  }
  container.innerHTML = tiles.join('');
}

// ---------- 2) 통계 / 프로젝트 / 기술 그리기 ----------
function renderStats() {
  const container = document.getElementById('stat-list');
  if (!container) return;

  container.innerHTML = STATS.map(
    (stat) => `
      <div class="grid items-start gap-4 sm:grid-cols-12">
        <p class="stat-value gradient-text sm:col-span-4">${escapeHtml(stat.value)}</p>
        <div class="sm:col-span-8">
          <h3 class="text-lg font-extrabold text-ink">${escapeHtml(stat.title)}</h3>
          <p class="mt-1 max-w-md text-sm leading-relaxed text-slate-500">${escapeHtml(stat.desc)}</p>
        </div>
      </div>
    `
  ).join('');
}

function createProjectCardHTML(project) {
  const tags = project.tags
    .map((tag) => `<li class="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">${escapeHtml(tag)}</li>`)
    .join('');

  const metrics = (project.metrics || [])
    .map(
      (m) => `
        <div>
          <p class="metric-value">${escapeHtml(m.value)}</p>
          <p class="text-xs text-slate-400">${escapeHtml(m.label)}</p>
        </div>`
    )
    .join('');

  const link = project.link
    ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">자세히 보기 →</a>`
    : `<a href="mailto:clover9@warmguys.com?subject=${encodeURIComponent(project.title + ' 문의')}" class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">문의하기 →</a>`;

  return `
    <article class="card project-card flex flex-col p-4">
      <div class="project-preview">
        <span class="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-soft">${escapeHtml(project.category)}</span>
        <div class="mock-window">
          <div class="mock-bar is-accent"></div>
          <div class="mock-bar"></div>
          <div class="mock-bar is-short"></div>
        </div>
      </div>
      <div class="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 class="text-lg font-extrabold text-ink">${escapeHtml(project.title)}</h3>
        <ul class="mt-3 flex flex-wrap gap-1.5">${tags}</ul>
        <p class="mt-4 flex-1 text-sm leading-relaxed text-slate-500">${escapeHtml(project.description)}</p>
        <div class="mt-5 flex gap-8 border-t border-slate-100 pt-5">${metrics}</div>
        ${link}
      </div>
    </article>
  `;
}

function renderProjects() {
  const container = document.getElementById('project-list');
  if (!container) return;
  container.innerHTML = PROJECTS.map(createProjectCardHTML).join('');
}

function renderSkills() {
  const container = document.getElementById('skill-grid');
  if (!container) return;

  container.innerHTML = SKILLS.map(
    (skill) => `
      <div class="card skill-tile">
        <span class="skill-mark ${GROUP_COLOR[skill.group] || 'bg-primary-500'}">${escapeHtml(skill.mark)}</span>
        <span class="skill-name">${escapeHtml(skill.name)}</span>
      </div>
    `
  ).join('');
}

// ---------- 3) 모바일 메뉴 ----------
function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };

  toggle.addEventListener('click', () => {
    setOpen(menu.classList.contains('hidden'));
  });

  // 메뉴 항목을 누르면 자동으로 닫힘
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  // 화면이 넓어지면(데스크톱) 모바일 메뉴는 항상 닫아 둠
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setOpen(false);
  });
}

// ---------- 4) 현재 섹션 메뉴 강조 ----------
function setupActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map((link) => document.getElementById(link.dataset.target))
    .filter(Boolean);
  if (sections.length === 0) return;

  const setActive = (id) => {
    links.forEach((link) => link.classList.toggle('is-active', link.dataset.target === id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    // 화면 가운데 띠를 지나는 섹션을 "현재 섹션"으로 봅니다.
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---------- 5) 헤더 배경 + 섹션 등장 효과 ----------
function setupScrollEffects() {
  const header = document.getElementById('site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // 한 번 나타나면 더 감시하지 않음
        }
      });
    },
    { threshold: 0.08 }
  );
  reveals.forEach((el) => observer.observe(el));
}

// ---------- 6) 이메일 복사 ----------
function setupCopyEmail() {
  const button = document.getElementById('copy-email');
  const label = document.getElementById('copy-email-label');
  if (!button || !label) return;

  const originalText = label.textContent;
  let timer = null;

  button.addEventListener('click', async () => {
    const email = button.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = '복사되었습니다!';
    } catch (err) {
      // 클립보드 사용이 막힌 환경(예: http 접속)에서는 직접 복사하도록 안내
      label.textContent = '복사 실패 - 직접 복사해 주세요';
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      label.textContent = originalText;
    }, 2000);
  });
}

// ---------- 시작 ----------
document.addEventListener('DOMContentLoaded', () => {
  renderHeroTiles();
  renderStats();
  renderProjects();
  renderSkills();
  setupMobileMenu();
  setupActiveNav();
  setupScrollEffects();
  setupCopyEmail();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
