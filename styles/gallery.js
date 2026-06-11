/**
 * Gallery 功能脚本
 * 包含：搜索过滤、标签筛选、收藏、Lightbox、深色模式
 */

(function() {
  'use strict';

  // ========== 状态管理 ==========
  const state = {
    currentTag: 'all',
    searchQuery: '',
    showFavoritesOnly: false,
    favorites: JSON.parse(localStorage.getItem('galleryFavorites') || '[]'),
    theme: localStorage.getItem('galleryTheme') || 'light'
  };

  // ========== DOM 元素 ==========
  const elements = {
    searchInput: null,
    tagButtons: null,
    filterFavorites: null,
    themeToggle: null,
    galleryGrid: null,
    styleCards: null,
    lightbox: null,
    lightboxImg: null,
    lightboxClose: null
  };

  // ========== 初始化 ==========
  function init() {
    cacheElements();
    loadTheme();
    bindEvents();
    extractTags();
    renderTags();
  }

  function cacheElements() {
    elements.searchInput = document.getElementById('searchInput');
    elements.tagButtons = document.querySelectorAll('.tag-btn');
    elements.filterFavorites = document.getElementById('filterFavorites');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.galleryGrid = document.querySelector('.gallery-grid');
    elements.styleCards = document.querySelectorAll('.style-card');
    elements.lightbox = document.getElementById('lightbox');
    elements.lightboxImg = document.getElementById('lightboxImg');
    elements.lightboxClose = document.getElementById('lightboxClose');
  }

  // ========== 主题切换 ==========
  function loadTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('galleryTheme', state.theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (elements.themeToggle) {
      elements.themeToggle.textContent = state.theme === 'light' ? '🌙' : '☀️';
    }
  }

  // ========== 标签提取 ==========
  function extractTags() {
    const tagsMap = { all: 0 };
    
    elements.styleCards.forEach(card => {
      const cardTags = card.querySelectorAll('.card-tag');
      cardTags.forEach(tag => {
        const tagText = tag.textContent.trim();
        if (!tagsMap[tagText]) {
          tagsMap[tagText] = 0;
        }
        tagsMap[tagText]++;
      });
    });
    
    window.galleryTags = tagsMap;
  }

  function renderTags() {
    const tagsBar = document.querySelector('.tags-bar');
    if (!tagsBar) return;

    const tags = Object.entries(window.galleryTags || {});
    tags.sort((a, b) => b[1] - a[1]);

    let html = `
      <button class="tag-btn ${state.currentTag === 'all' ? 'active' : ''}" data-tag="all">
        全部
        <span class="tag-count">${tags.reduce((sum, t) => sum + t[1], 0)}</span>
      </button>
    `;

    tags.forEach(([tag, count]) => {
      html += `
        <button class="tag-btn ${state.currentTag === tag ? 'active' : ''}" data-tag="${tag}">
          ${tag}
          <span class="tag-count">${count}</span>
        </button>
      `;
    });

    tagsBar.innerHTML = html;
    
    // 重新绑定标签按钮事件
    document.querySelectorAll('.tag-btn').forEach(btn => {
      btn.addEventListener('click', handleTagClick);
    });
  }

  // ========== 事件处理 ==========
  function bindEvents() {
    // 搜索
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // 标签筛选
    elements.tagButtons.forEach(btn => {
      btn.addEventListener('click', handleTagClick);
    });

    // 收藏筛选
    if (elements.filterFavorites) {
      elements.filterFavorites.addEventListener('click', handleFavoriteFilter);
    }

    // 主题切换
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // 图片点击放大
    elements.styleCards.forEach(card => {
      const img = card.querySelector('.card-image');
      if (img) {
        img.addEventListener('click', () => openLightbox(img.src));
      }
    });

    // Lightbox 关闭
    if (elements.lightbox) {
      elements.lightbox.addEventListener('click', closeLightbox);
    }
    if (elements.lightboxClose) {
      elements.lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    // ESC 关闭 Lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });

    // 收藏按钮
    elements.styleCards.forEach(card => {
      const favBtn = card.querySelector('.favorite-btn');
      if (favBtn) {
        favBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleFavoriteToggle(card.dataset.id, favBtn);
        });
        // 初始化收藏按钮状态
        updateFavoriteButton(card.dataset.id, favBtn);
      }
    });
  }

  function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase().trim();
    filterCards();
  }

  function handleTagClick(e) {
    const btn = e.currentTarget;
    state.currentTag = btn.dataset.tag;
    
    // 更新按钮状态
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    filterCards();
  }

  function handleFavoriteFilter() {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    elements.filterFavorites.classList.toggle('active', state.showFavoritesOnly);
    filterCards();
  }

  function handleFavoriteToggle(cardId, btn) {
    const index = state.favorites.indexOf(cardId);
    if (index > -1) {
      state.favorites.splice(index, 1);
    } else {
      state.favorites.push(cardId);
    }
    localStorage.setItem('galleryFavorites', JSON.stringify(state.favorites));
    updateFavoriteButton(cardId, btn);
    if (state.showFavoritesOnly) {
      filterCards();
    }
  }

  function updateFavoriteButton(cardId, btn) {
    if (state.favorites.includes(cardId)) {
      btn.classList.add('active');
      btn.textContent = '❤️';
    } else {
      btn.classList.remove('active');
      btn.textContent = '🤍';
    }
  }

  // ========== 过滤逻辑 ==========
  function filterCards() {
    elements.styleCards.forEach(card => {
      const cardId = card.dataset.id;
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const cardTags = Array.from(card.querySelectorAll('.card-tag')).map(t => t.textContent.trim());
      
      let visible = true;

      // 标签筛选
      if (state.currentTag !== 'all') {
        visible = visible && cardTags.includes(state.currentTag);
      }

      // 搜索筛选
      if (state.searchQuery) {
        visible = visible && (
          title.includes(state.searchQuery) ||
          cardTags.some(tag => tag.toLowerCase().includes(state.searchQuery))
        );
      }

      // 收藏筛选
      if (state.showFavoritesOnly) {
        visible = visible && state.favorites.includes(cardId);
      }

      card.classList.toggle('hidden', !visible);
    });

    // 显示无结果提示
    const visibleCount = document.querySelectorAll('.style-card:not(.hidden)').length;
    let noResults = document.querySelector('.no-results');
    
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
          <div class="no-results-icon">🔍</div>
          <p>没有找到匹配的风格</p>
        `;
        elements.galleryGrid.appendChild(noResults);
      }
      noResults.style.display = 'block';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  }

  // ========== Lightbox ==========
  function openLightbox(src) {
    elements.lightboxImg.src = src;
    elements.lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    elements.lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ========== 工具函数 ==========
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ========== 启动 ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();