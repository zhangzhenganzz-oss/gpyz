/**
 * 价值投资分析系统 - 巴菲特·芒格投资理念
 * Value Investing Analysis System
 */

// ==================== 数据定义 ====================

// 股票API实例（在stock-api.js中定义）
// let stockAPI = null;

// 所有A股股票列表
let allStocksList = [];

// 是否已加载全部A股
let isAllStocksLoaded = false;

// 模拟股票数据（作为备用和演示数据）
const stockDatabase = {
    '600519': {
        code: '600519',
        name: '贵州茅台',
        price: 1688.00,
        change: 2.35,
        // 财务指标
        roe: 25.3,
        roic: 18.7,
        grossMargin: 91.5,
        netMargin: 52.8,
        debtRatio: 19.5,
        fcf: 587,
        // 估值参数
        currentFCF: 587,
        growthRate: 12,
        terminalGrowth: 3,
        discountRate: 9,
        totalShares: 12.56,
        // 护城河评分
        moatScore: 85,
        moatType: {
            brand: { score: 45, max: 50, strength: 'strong' },
            switching: { score: 20, max: 30, strength: 'medium' },
            cost: { score: 15, max: 20, strength: 'weak' },
            network: { score: 5, max: 15, strength: 'weak' }
        },
        // 质量评分
        qualityScore: 92,
        qualityDetails: {
            profitability: 95,
            stability: 98,
            efficiency: 88,
            growth: 85,
            conservatism: 90
        },
        // 历史数据 (5年)
        history: {
            years: ['2021', '2022', '2023', '2024', '2025'],
            revenue: [106, 124, 147, 150, 162],
            profit: [52, 62, 74, 76, 82],
            roe: [24.5, 25.1, 26.2, 24.8, 25.3],
            fcf: [420, 485, 550, 565, 587]
        }
    },
    '000858': {
        code: '000858',
        name: '五粮液',
        price: 158.00,
        change: 1.85,
        roe: 22.1,
        roic: 16.5,
        grossMargin: 75.2,
        netMargin: 38.5,
        debtRatio: 22.3,
        fcf: 245,
        currentFCF: 245,
        growthRate: 10,
        terminalGrowth: 3,
        discountRate: 9,
        totalShares: 38.82,
        moatScore: 78,
        moatType: {
            brand: { score: 40, max: 50, strength: 'strong' },
            switching: { score: 15, max: 30, strength: 'medium' },
            cost: { score: 12, max: 20, strength: 'medium' },
            network: { score: 5, max: 15, strength: 'weak' }
        },
        qualityScore: 85,
        qualityDetails: {
            profitability: 88,
            stability: 90,
            efficiency: 82,
            growth: 80,
            conservatism: 85
        },
        history: {
            years: ['2021', '2022', '2023', '2024', '2025'],
            revenue: [66, 74, 83, 89, 95],
            profit: [23, 26, 30, 33, 36],
            roe: [21.5, 22.0, 22.8, 21.9, 22.1],
            fcf: [180, 205, 225, 238, 245]
        }
    },
    '000333': {
        code: '000333',
        name: '美的集团',
        price: 62.00,
        change: -0.52,
        roe: 18.5,
        roic: 12.3,
        grossMargin: 25.8,
        netMargin: 8.2,
        debtRatio: 42.5,
        fcf: 320,
        currentFCF: 320,
        growthRate: 8,
        terminalGrowth: 3,
        discountRate: 10,
        totalShares: 69.97,
        moatScore: 65,
        moatType: {
            brand: { score: 25, max: 50, strength: 'medium' },
            switching: { score: 10, max: 30, strength: 'weak' },
            cost: { score: 18, max: 20, strength: 'strong' },
            network: { score: 8, max: 15, strength: 'medium' }
        },
        qualityScore: 78,
        qualityDetails: {
            profitability: 75,
            stability: 82,
            efficiency: 80,
            growth: 75,
            conservatism: 78
        },
        history: {
            years: ['2021', '2022', '2023', '2024', '2025'],
            revenue: [343, 345, 373, 385, 402],
            profit: [28, 29, 33, 35, 37],
            roe: [19.2, 18.8, 19.5, 18.2, 18.5],
            fcf: [280, 295, 310, 318, 320]
        }
    }
};

// 投资组合数据
let portfolio = {
    holdings: [
        { code: '600519', name: '贵州茅台', amount: 100, costPrice: 1200 },
        { code: '000858', name: '五粮液', amount: 200, costPrice: 120 },
        { code: '000333', name: '美的集团', amount: 500, costPrice: 55 }
    ],
    cash: 500000
};

// 当前选中的股票
let currentStock = stockDatabase['600519'];

// 图表实例
let financialChart = null;
let moatRadarChart = null;
let moatTrendChart = null;
let sensitivityChart = null;
let sectorChart = null;
let moatDistributionChart = null;

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', function() {
    // stockAPI已在stock-api.js中初始化，直接使用即可
    
    initNavigation();
    initStockSearch();
    initDCFCalculator();
    initChecklist();
    initLoadAllStocks();
    loadStockData(currentStock.code);
    initCharts();
});

// ==================== 导航功能 ====================

function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const panels = document.querySelectorAll('.panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // 更新标签状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 更新面板显示
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab + 'Panel') {
                    panel.classList.add('active');
                }
            });
            
            // 如果切换到护城河面板，更新图表
            if (targetTab === 'moat' && moatRadarChart) {
                updateMoatCharts();
            }
        });
    });
}

function switchTab(tabName) {
    const tab = document.querySelector(`[data-tab="${tabName}"]`);
    if (tab) {
        tab.click();
    }
}

// ==================== 股票搜索功能 ====================

let searchTimeout = null;
let stockListLoaded = false;

function initStockSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('stockSearch');
    const recentList = document.getElementById('recentList');
    
    // 搜索按钮点击
    searchBtn.addEventListener('click', () => {
        const keyword = searchInput.value.trim();
        if (keyword) {
            performSearch(keyword);
        }
    });
    
    // 输入实时搜索（防抖）
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const keyword = e.target.value.trim();
        
        if (keyword.length >= 1) {
            searchTimeout = setTimeout(() => {
                performSearch(keyword);
            }, 200);
        } else {
            hideSearchResults();
        }
    });
    
    // 回车搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const keyword = searchInput.value.trim();
            if (keyword) {
                performSearch(keyword);
            }
        }
    });
    
    // 点击外部隐藏搜索结果
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) {
            hideSearchResults();
        }
    });
    
    // 最近分析列表点击
    recentList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const code = e.target.dataset.code;
            if (code) {
                loadStockByCode(code);
            }
        }
    });
    
    // 预加载股票列表（轻量级）
    preloadStockList();
}

// 预加载股票列表（只加载代码和名称）
async function preloadStockList() {
    if (stockListLoaded) return;
    
    try {
        if (stockAPI) {
            const stocks = await stockAPI.getStockList();
            allStocksList = stocks;
            stockListLoaded = true;
            
            // 更新UI
            const countEl = document.getElementById('stockCount');
            if (countEl) {
                countEl.textContent = `已加载 ${stocks.length} 只股票`;
            }
            
            console.log(`股票列表已加载: ${stocks.length} 只`);
        }
    } catch (error) {
        console.error('预加载股票列表失败:', error);
    }
}

// 执行搜索（优先本地搜索，无结果时调用API）
async function performSearch(keyword) {
    const searchResults = document.getElementById('searchResults');
    
    // 先尝试本地搜索
    if (stockListLoaded && allStocksList.length > 0) {
        const localResults = searchInLocalStocks(keyword);
        if (localResults.length > 0) {
            displaySearchResults(localResults);
            return;
        }
    }
    
    // 本地无结果，调用API搜索
    searchResults.innerHTML = '<div class="search-result-item"><span class="loading-spinner"></span>正在搜索...</div>';
    searchResults.classList.add('active');
    
    try {
        if (stockAPI) {
            const apiResults = await stockAPI.searchStocks(keyword);
            if (apiResults && apiResults.length > 0) {
                // 转换API结果格式
                const formattedResults = apiResults.map(item => ({
                    code: item.code,
                    name: item.name,
                    market: item.market || (item.code.startsWith('6') ? 'SH' : 'SZ'),
                    loaded: false
                }));
                displaySearchResults(formattedResults);
                
                // 同时添加到allStocksList缓存
                apiResults.forEach(item => {
                    if (!allStocksList.find(s => s.code === item.code)) {
                        allStocksList.push({
                            code: item.code,
                            name: item.name,
                            market: item.market || (item.code.startsWith('6') ? 'SH' : 'SZ')
                        });
                    }
                });
                return;
            }
        }
    } catch (error) {
        console.error('API搜索失败:', error);
    }
    
    // 都无结果
    displaySearchResults([]);
}

// 在本地股票列表中搜索
function searchInLocalStocks(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    let results = [];
    
    // 先从stockDatabase搜索（已加载详细数据的股票）
    const dbResults = Object.values(stockDatabase).filter(stock => 
        stock.code.includes(keyword) || 
        stock.name.toLowerCase().includes(lowerKeyword)
    ).map(stock => ({
        code: stock.code,
        name: stock.name,
        market: stock.code.startsWith('6') ? 'SH' : 'SZ',
        loaded: true // 标记已加载详细数据
    }));
    
    results = [...dbResults];
    
    // 再从allStocksList搜索
    if (allStocksList.length > 0) {
        const listResults = allStocksList.filter(stock => 
            stock.code.includes(keyword) || 
            stock.name.toLowerCase().includes(lowerKeyword)
        ).slice(0, 10);
        
        // 合并结果，去重
        const existingCodes = new Set(results.map(r => r.code));
        listResults.forEach(stock => {
            if (!existingCodes.has(stock.code)) {
                results.push({
                    ...stock,
                    loaded: false // 标记未加载详细数据
                });
            }
        });
    }
    
    return results.slice(0, 10);
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (!results || results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">未找到匹配的股票</div>';
        searchResults.classList.add('active');
        return;
    }
    
    searchResults.innerHTML = results.map(stock => {
        const isLoaded = stock.loaded || stockDatabase[stock.code];
        const loadedBadge = isLoaded ? '<span class="loaded-badge" title="已加载">✓</span>' : '';
        
        return `
        <div class="search-result-item" data-code="${stock.code}">
            <span class="search-result-code">${stock.code}</span>
            <span class="search-result-name">${stock.name} ${loadedBadge}</span>
            <span class="search-result-market">${stock.market || (stock.code.startsWith('6') ? 'SH' : 'SZ')}</span>
        </div>
    `}).join('');
    
    searchResults.classList.add('active');
    
    // 添加点击事件
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const code = item.dataset.code;
            loadStockByCode(code);
            hideSearchResults();
        });
    });
}

// 隐藏搜索结果
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.classList.remove('active');
}

// 根据代码加载股票（按需加载）
async function loadStockByCode(code) {
    // 先检查本地数据库（已加载的）
    if (stockDatabase[code]) {
        loadStockData(code);
        return;
    }
    
    // 从allStocksList查找基本信息
    const stockInfo = allStocksList.find(s => s.code === code);
    if (!stockInfo) {
        alert('未找到该股票');
        return;
    }
    
    // 显示加载状态
    showLoading(`正在加载 ${stockInfo.name}(${code}) 的数据...`);
    
    // 从API获取详细数据（按需加载）
    if (stockAPI) {
        try {
            const detail = await stockAPI.getStockDetail(code);
            
            if (detail) {
                // 添加到本地数据库
                stockDatabase[code] = createStockFromAPIData(detail);
                
                hideLoading();
                loadStockData(code);
                
                // 添加到最近分析列表
                addToRecentList(code, stockInfo.name);
                
                console.log(`股票 ${code} 数据已加载并缓存`);
            } else {
                hideLoading();
                alert('获取股票数据失败');
            }
        } catch (error) {
            hideLoading();
            console.error('加载股票详情失败:', error);
            alert('加载股票数据失败，请稍后重试');
        }
    } else {
        hideLoading();
        alert('API未初始化');
    }
}

// 从API数据创建股票对象
function createStockFromAPIData(apiData) {
    return {
        code: apiData.code,
        name: apiData.name,
        price: apiData.price || 0,
        change: apiData.change || 0,
        roe: apiData.roe || 15,
        roic: apiData.roic || 12,
        grossMargin: apiData.grossMargin || 30,
        netMargin: apiData.netMargin || 15,
        debtRatio: apiData.debtRatio || 40,
        fcf: apiData.fcf || 50,
        currentFCF: apiData.fcf || 50,
        growthRate: 8,
        terminalGrowth: 3,
        discountRate: 9,
        totalShares: 10,
        moatScore: calculateMoatScore(apiData),
        moatType: {
            brand: { score: 25, max: 50, strength: 'medium' },
            switching: { score: 15, max: 30, strength: 'medium' },
            cost: { score: 15, max: 20, strength: 'strong' },
            network: { score: 5, max: 15, strength: 'weak' }
        },
        qualityScore: calculateQualityScore(apiData),
        qualityDetails: {
            profitability: apiData.roe > 20 ? 90 : 70,
            stability: 75,
            efficiency: apiData.roic > 15 ? 85 : 65,
            growth: 70,
            conservatism: apiData.debtRatio < 50 ? 85 : 60
        },
        history: generateMockHistory()
    };
}

// 计算护城河评分（基于财务指标估算）
function calculateMoatScore(data) {
    let score = 50; // 基础分
    
    // 高ROE可能表示有护城河
    if (data.roe > 20) score += 15;
    else if (data.roe > 15) score += 10;
    else if (data.roe > 10) score += 5;
    
    // 高毛利率
    if (data.grossMargin > 50) score += 10;
    else if (data.grossMargin > 30) score += 5;
    
    // 稳定的净利率
    if (data.netMargin > 20) score += 10;
    else if (data.netMargin > 10) score += 5;
    
    // 低负债率表示财务稳健
    if (data.debtRatio < 30) score += 5;
    
    return Math.min(100, score);
}

// 计算质量评分
function calculateQualityScore(data) {
    let score = 60; // 基础分
    
    if (data.roe > 20) score += 15;
    else if (data.roe > 15) score += 10;
    else if (data.roe > 10) score += 5;
    
    if (data.roic > 15) score += 10;
    else if (data.roic > 10) score += 5;
    
    if (data.grossMargin > 40) score += 5;
    if (data.netMargin > 15) score += 5;
    if (data.debtRatio < 40) score += 5;
    
    return Math.min(100, score);
}

// 生成模拟历史数据
function generateMockHistory() {
    const years = ['2021', '2022', '2023', '2024', '2025'];
    return {
        years: years,
        revenue: [80, 90, 100, 110, 120],
        profit: [15, 18, 22, 25, 28],
        roe: [15, 16, 17, 16.5, 17],
        fcf: [12, 15, 18, 20, 22]
    };
}

// 添加到最近列表
function addToRecentList(code, name) {
    const recentList = document.getElementById('recentList');
    
    // 检查是否已存在
    const existingItem = recentList.querySelector(`[data-code="${code}"]`);
    if (existingItem) {
        // 移到最前面
        recentList.insertBefore(existingItem, recentList.firstChild);
        return;
    }
    
    // 创建新项
    const li = document.createElement('li');
    li.dataset.code = code;
    li.textContent = `${name} (${code})`;
    recentList.insertBefore(li, recentList.firstChild);
    
    // 限制数量
    while (recentList.children.length > 10) {
        recentList.removeChild(recentList.lastChild);
    }
}

// 初始化加载按钮（按需加载模式）
function initLoadAllStocks() {
    const loadBtn = document.getElementById('loadAllStocks');
    if (!loadBtn) return;
    
    // 更新按钮文字说明
    loadBtn.textContent = '刷新列表';
    
    loadBtn.addEventListener('click', async () => {
        loadBtn.disabled = true;
        loadBtn.innerHTML = '<span class="loading-spinner"></span>刷新中...';
        
        try {
            if (stockAPI) {
                // 清除缓存，强制重新加载
                stockAPI.stockListCache = null;
                stockAPI.stockListCacheTime = null;
                
                const stocks = await stockAPI.getStockList();
                allStocksList = stocks;
                stockListLoaded = true;
                
                document.getElementById('stockCount').textContent = `已加载 ${stocks.length} 只股票`;
                loadBtn.textContent = '刷新列表';
                
                console.log(`股票列表已刷新: ${stocks.length} 只`);
            }
        } catch (error) {
            console.error('刷新股票列表失败:', error);
            loadBtn.textContent = '刷新失败';
        } finally {
            loadBtn.disabled = false;
        }
    });
    
    // 检查localStorage缓存
    try {
        const cachedStocks = localStorage.getItem('stockListCache');
        const cachedTime = localStorage.getItem('stockListCacheTime');
        
        if (cachedStocks && cachedTime) {
            const age = Date.now() - parseInt(cachedTime);
            if (age < 24 * 60 * 60 * 1000) { // 24小时内
                allStocksList = JSON.parse(cachedStocks);
                stockListLoaded = true;
                document.getElementById('stockCount').textContent = `已加载 ${allStocksList.length} 只股票`;
                console.log(`从缓存恢复股票列表: ${allStocksList.length} 只`);
            }
        }
    } catch (e) {
        console.warn('读取缓存失败');
    }
}

// 显示加载提示
function showLoading(message) {
    // 可以添加一个全局加载遮罩
    console.log('Loading:', message);
}

function hideLoading() {
    console.log('Loading complete');
}

function loadStockData(code) {
    currentStock = stockDatabase[code];
    if (!currentStock) return;
    
    // 更新股票基本信息
    document.getElementById('stockName').textContent = currentStock.name;
    document.getElementById('stockCode').textContent = currentStock.code + '.SH';
    document.getElementById('currentPrice').textContent = '¥' + currentStock.price.toFixed(2);
    
    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = (currentStock.change >= 0 ? '+' : '') + currentStock.change + '%';
    changeEl.className = 'change ' + (currentStock.change >= 0 ? 'positive' : 'negative');
    
    // 更新仪表盘
    document.getElementById('qualityScore').textContent = currentStock.qualityScore;
    document.getElementById('moatScore').textContent = currentStock.moatScore;
    
    // 计算并更新安全边际
    const intrinsicValue = calculateDCF(currentStock);
    const margin = ((intrinsicValue - currentStock.price) / intrinsicValue * 100);
    document.getElementById('marginScore').textContent = margin.toFixed(1) + '%';
    document.getElementById('intrinsicValue').textContent = '¥' + intrinsicValue.toFixed(0);
    
    // 更新财务指标
    document.getElementById('roe').textContent = currentStock.roe + '%';
    document.getElementById('roic').textContent = currentStock.roic + '%';
    document.getElementById('grossMargin').textContent = currentStock.grossMargin + '%';
    document.getElementById('netMargin').textContent = currentStock.netMargin + '%';
    document.getElementById('debtRatio').textContent = currentStock.debtRatio + '%';
    document.getElementById('fcf').textContent = '¥' + currentStock.fcf + '亿';
    
    // 更新图表
    updateFinancialChart();
    updateMoatCharts();
    updateValuationPanel();
    
    // 更新时间
    document.getElementById('updateTime').textContent = new Date().toLocaleDateString('zh-CN');
}

// ==================== DCF估值计算 ====================

function calculateDCF(stock) {
    const fcf = stock.currentFCF; // 亿元
    const growthRate = stock.growthRate / 100;
    const terminalGrowth = stock.terminalGrowth / 100;
    const discountRate = stock.discountRate / 100;
    const shares = stock.totalShares; // 亿股
    
    // 10年预测期
    let presentValue = 0;
    let currentFCF = fcf;
    
    for (let year = 1; year <= 10; year++) {
        currentFCF *= (1 + growthRate);
        presentValue += currentFCF / Math.pow(1 + discountRate, year);
    }
    
    // 终值
    const terminalValue = currentFCF * (1 + terminalGrowth) / (discountRate - terminalGrowth);
    const terminalPV = terminalValue / Math.pow(1 + discountRate, 10);
    
    // 企业价值
    const enterpriseValue = presentValue + terminalPV;
    
    // 每股价值
    const valuePerShare = enterpriseValue / shares;
    
    return valuePerShare;
}

function initDCFCalculator() {
    const calculateBtn = document.getElementById('calculateDCF');
    calculateBtn.addEventListener('click', () => {
        // 更新当前股票的参数
        currentStock.currentFCF = parseFloat(document.getElementById('currentFCF').value);
        currentStock.growthRate = parseFloat(document.getElementById('growthRate').value);
        currentStock.terminalGrowth = parseFloat(document.getElementById('terminalGrowth').value);
        currentStock.discountRate = parseFloat(document.getElementById('discountRate').value);
        currentStock.totalShares = parseFloat(document.getElementById('totalShares').value);
        
        updateValuationPanel();
    });
}

function updateValuationPanel() {
    const intrinsicValue = calculateDCF(currentStock);
    const margin = ((intrinsicValue - currentStock.price) / intrinsicValue * 100);
    
    document.getElementById('dcfValue').textContent = '¥' + intrinsicValue.toFixed(0);
    document.getElementById('currentPriceVal').textContent = '¥' + currentStock.price.toFixed(0);
    document.getElementById('marginValue').textContent = margin.toFixed(1) + '%';
    
    // 更新建议
    const signalBox = document.querySelector('.signal-box');
    const signalText = signalBox.querySelector('.signal-text');
    const signalDesc = document.querySelector('.signal-desc');
    
    if (margin >= 30) {
        signalBox.className = 'signal-box buy';
        signalText.textContent = '买入';
        signalDesc.textContent = '安全边际充足，建议买入';
    } else if (margin >= 10) {
        signalBox.className = 'signal-box watch';
        signalText.textContent = '观望';
        signalDesc.textContent = '安全边际一般，建议等待更好的买入时机';
    } else {
        signalBox.className = 'signal-box sell';
        signalText.textContent = '高估';
        signalDesc.textContent = '当前价格高于内在价值，建议卖出或观望';
    }
    
    updateSensitivityChart();
}

// ==================== 图表初始化与更新 ====================

function initCharts() {
    updateFinancialChart();
    updateMoatCharts();
    updateValuationPanel();
    updatePortfolioCharts();
}

function updateFinancialChart() {
    const ctx = document.getElementById('financialChart');
    if (!ctx) return;
    
    if (financialChart) {
        financialChart.destroy();
    }
    
    financialChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: currentStock.history.years,
            datasets: [
                {
                    label: 'ROE (%)',
                    data: currentStock.history.roe,
                    borderColor: '#1a5f2a',
                    backgroundColor: 'rgba(26, 95, 42, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: '自由现金流 (亿元)',
                    data: currentStock.history.fcf,
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'ROE (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '自由现金流 (亿元)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

function updateMoatCharts() {
    // 雷达图
    const radarCtx = document.getElementById('moatRadarChart');
    if (radarCtx) {
        if (moatRadarChart) {
            moatRadarChart.destroy();
        }
        
        moatRadarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['品牌护城河', '转换成本', '成本优势', '网络效应', '监管壁垒'],
                datasets: [{
                    label: currentStock.name,
                    data: [
                        currentStock.moatType.brand.score,
                        currentStock.moatType.switching.score,
                        currentStock.moatType.cost.score,
                        currentStock.moatType.network.score,
                        0 // 监管壁垒暂设为0
                    ],
                    backgroundColor: 'rgba(26, 95, 42, 0.2)',
                    borderColor: '#1a5f2a',
                    pointBackgroundColor: '#1a5f2a',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#1a5f2a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            stepSize: 10
                        }
                    }
                }
            }
        });
    }
    
    // 趋势图
    const trendCtx = document.getElementById('moatTrendChart');
    if (trendCtx) {
        if (moatTrendChart) {
            moatTrendChart.destroy();
        }
        
        moatTrendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: '护城河评分',
                    data: [
                        currentStock.moatScore - 5,
                        currentStock.moatScore - 3,
                        currentStock.moatScore - 1,
                        currentStock.moatScore - 2,
                        currentStock.moatScore
                    ],
                    borderColor: '#1a5f2a',
                    backgroundColor: 'rgba(26, 95, 42, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100
                    }
                }
            }
        });
    }
}

function updateSensitivityChart() {
    const ctx = document.getElementById('sensitivityChart');
    if (!ctx) return;
    
    if (sensitivityChart) {
        sensitivityChart.destroy();
    }
    
    // 生成敏感性分析数据
    const growthRates = [8, 10, 12, 14, 16];
    const discountRates = [7, 8, 9, 10, 11];
    
    const datasets = discountRates.map((rate, index) => ({
        label: `折现率 ${rate}%`,
        data: growthRates.map(growth => {
            const tempStock = { ...currentStock, growthRate: growth, discountRate: rate };
            return calculateDCF(tempStock).toFixed(0);
        }),
        borderColor: `hsl(${120 + index * 30}, 70%, 40%)`,
        backgroundColor: `hsla(${120 + index * 30}, 70%, 40%, 0.1)`,
        tension: 0.4
    }));
    
    sensitivityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: growthRates.map(g => g + '%'),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '不同增长率和折现率下的内在价值'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '每股价值 (元)'
                    }
                }
            }
        }
    });
}

function updatePortfolioCharts() {
    // 行业分布图
    const sectorCtx = document.getElementById('sectorChart');
    if (sectorCtx) {
        sectorChart = new Chart(sectorCtx, {
            type: 'doughnut',
            data: {
                labels: ['白酒', '家电', '金融', '科技', '其他'],
                datasets: [{
                    data: [65, 20, 0, 0, 15],
                    backgroundColor: [
                        '#1a5f2a',
                        '#2196f3',
                        '#ff9800',
                        '#9c27b0',
                        '#757575'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // 护城河分布图
    const moatCtx = document.getElementById('moatDistributionChart');
    if (moatCtx) {
        moatDistributionChart = new Chart(moatCtx, {
            type: 'bar',
            data: {
                labels: portfolio.holdings.map(h => h.name),
                datasets: [{
                    label: '护城河评分',
                    data: portfolio.holdings.map(h => {
                        const stock = stockDatabase[h.code];
                        return stock ? stock.moatScore : 0;
                    }),
                    backgroundColor: '#1a5f2a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// ==================== 心理偏见检查清单 ====================

function initChecklist() {
    const checkboxes = document.querySelectorAll('#checklistPanel input[type="checkbox"]');
    const saveBtn = document.getElementById('saveDecision');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBiasScore);
    });
    
    saveBtn.addEventListener('click', saveDecision);
    
    // 加载历史决策
    loadDecisionHistory();
}

function updateBiasScore() {
    const checkboxes = document.querySelectorAll('#checklistPanel input[type="checkbox"]:checked');
    const totalCheckboxes = document.querySelectorAll('#checklistPanel input[type="checkbox"]').length;
    const checkedCount = checkboxes.length;
    
    const riskLevel = checkedCount / totalCheckboxes;
    const scoreEl = document.getElementById('biasScore');
    const adviceEl = document.getElementById('biasAdvice');
    
    if (riskLevel >= 0.7) {
        scoreEl.textContent = '低';
        scoreEl.style.color = '#d4edda';
        adviceEl.textContent = '您已通过大部分心理偏见检查，可以做出相对理性的投资决策。';
    } else if (riskLevel >= 0.4) {
        scoreEl.textContent = '中';
        scoreEl.style.color = '#fff3cd';
        adviceEl.textContent = '您还存在一些心理偏见风险，建议重新审视投资决策。';
    } else {
        scoreEl.textContent = '高';
        scoreEl.style.color = '#f8d7da';
        adviceEl.textContent = '您存在较高的心理偏见风险，强烈建议暂停投资，重新思考。';
    }
}

function saveDecision() {
    const note = document.getElementById('decisionNote').value.trim();
    if (!note) {
        alert('请先填写决策思考过程');
        return;
    }
    
    const decision = {
        date: new Date().toLocaleString('zh-CN'),
        stock: currentStock.name,
        note: note,
        price: currentStock.price
    };
    
    // 保存到本地存储
    let history = JSON.parse(localStorage.getItem('decisionHistory') || '[]');
    history.unshift(decision);
    localStorage.setItem('decisionHistory', JSON.stringify(history));
    
    // 清空输入
    document.getElementById('decisionNote').value = '';
    
    // 刷新历史记录
    loadDecisionHistory();
    
    alert('决策记录已保存');
}

function loadDecisionHistory() {
    const historyContainer = document.getElementById('decisionHistory');
    const history = JSON.parse(localStorage.getItem('decisionHistory') || '[]');
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p style="color: #999; text-align: center;">暂无决策记录</p>';
        return;
    }
    
    historyContainer.innerHTML = history.slice(0, 5).map(d => `
        <div class="decision-item" style="
            padding: 16px;
            background: var(--bg-light);
            border-radius: var(--radius);
            margin-bottom: 12px;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 13px;
                color: var(--text-secondary);
            ">
                <span>${d.stock} - ¥${d.price}</span>
                <span>${d.date}</span>
            </div>
            <p style="font-size: 14px; line-height: 1.6;">${d.note}</p>
        </div>
    `).join('');
}

// ==================== 工具函数 ====================

// 格式化数字
function formatNumber(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(2) + '亿';
    } else if (num >= 10000) {
        return (num / 10000).toFixed(2) + '万';
    }
    return num.toFixed(2);
}

// 计算复合年增长率 (CAGR)
function calculateCAGR(beginValue, endValue, years) {
    return (Math.pow(endValue / beginValue, 1 / years) - 1) * 100;
}

// 导出函数供全局使用
window.switchTab = switchTab;
