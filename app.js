// ==================== 数据定义 ====================

// A股股票数据（包含上市价格和信息）- 扩展至100+只股票
const stocks = [
    // 白酒/消费
    { code: '600519', name: '贵州茅台', ipoPrice: 31.39, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 20.71, maxPrice: 2627.88 },
    { code: '000858', name: '五粮液', ipoPrice: 14.77, ipoYear: 1998, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.95, maxPrice: 357.19 },
    { code: '000568', name: '泸州老窖', ipoPrice: 5.83, ipoYear: 1994, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.83, maxPrice: 327.66 },
    { code: '600809', name: '山西汾酒', ipoPrice: 3.76, ipoYear: 1994, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.76, maxPrice: 503.99 },
    { code: '000596', name: '古井贡酒', ipoPrice: 8.48, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 8.48, maxPrice: 299.88 },
    
    // 金融
    { code: '601318', name: '中国平安', ipoPrice: 33.80, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 19.90, maxPrice: 149.28 },
    { code: '600036', name: '招商银行', ipoPrice: 7.30, ipoYear: 2002, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.86, maxPrice: 58.92 },
    { code: '601166', name: '兴业银行', ipoPrice: 15.98, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 8.60, maxPrice: 70.5 },
    { code: '601398', name: '工商银行', ipoPrice: 3.12, ipoYear: 2006, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.12, maxPrice: 7.41 },
    { code: '601288', name: '农业银行', ipoPrice: 2.68, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.68, maxPrice: 4.82 },
    { code: '601988', name: '中国银行', ipoPrice: 3.08, ipoYear: 2006, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.82, maxPrice: 5.43 },
    { code: '601628', name: '中国人寿', ipoPrice: 18.88, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 12.88, maxPrice: 75.98 },
    { code: '601601', name: '中国太保', ipoPrice: 30.00, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 8.92, maxPrice: 66.78 },
    { code: '601336', name: '新华保险', ipoPrice: 23.25, ipoYear: 2011, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 15.86, maxPrice: 64.88 },
    
    // 新能源
    { code: '300750', name: '宁德时代', ipoPrice: 25.14, ipoYear: 2018, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 30.17, maxPrice: 692 },
    { code: '601012', name: '隆基绿能', ipoPrice: 21.00, ipoYear: 2012, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.59, maxPrice: 125.68 },
    { code: '002594', name: '比亚迪', ipoPrice: 18.00, ipoYear: 2011, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 13.51, maxPrice: 416.98 },
    { code: '300274', name: '阳光电源', ipoPrice: 10.80, ipoYear: 2011, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 8.28, maxPrice: 180.16 },
    { code: '002812', name: '恩捷股份', ipoPrice: 6.65, ipoYear: 2016, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 6.65, maxPrice: 318.7 },
    { code: '300014', name: '亿纬锂能', ipoPrice: 18.00, ipoYear: 2009, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 7.02, maxPrice: 152.9 },
    { code: '603659', name: '璞泰来', ipoPrice: 16.53, ipoYear: 2017, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 16.53, maxPrice: 198.5 },
    
    // 家电/消费
    { code: '000333', name: '美的集团', ipoPrice: 18.00, ipoYear: 2013, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 16.31, maxPrice: 108 },
    { code: '000651', name: '格力电器', ipoPrice: 2.50, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.50, maxPrice: 70.56 },
    { code: '600690', name: '海尔智家', ipoPrice: 7.38, ipoYear: 1993, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.28, maxPrice: 35.95 },
    { code: '002032', name: '苏泊尔', ipoPrice: 12.21, ipoYear: 2004, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 6.60, maxPrice: 87.98 },
    
    // 医药
    { code: '600276', name: '恒瑞医药', ipoPrice: 11.98, ipoYear: 2000, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 11.98, maxPrice: 116.87 },
    { code: '603259', name: '药明康德', ipoPrice: 21.16, ipoYear: 2018, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 21.16, maxPrice: 188.28 },
    { code: '300760', name: '迈瑞医疗', ipoPrice: 48.80, ipoYear: 2018, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 48.80, maxPrice: 502.0 },
    { code: '600436', name: '片仔癀', ipoPrice: 8.55, ipoYear: 2003, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 8.55, maxPrice: 491.88 },
    { code: '000538', name: '云南白药', ipoPrice: 3.38, ipoYear: 1993, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.38, maxPrice: 159.38 },
    { code: '600196', name: '复星医药', ipoPrice: 7.15, ipoYear: 1998, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 7.15, maxPrice: 79.19 },
    { code: '300015', name: '爱尔眼科', ipoPrice: 28.00, ipoYear: 2009, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 28.00, maxPrice: 72.27 },
    { code: '300122', name: '智飞生物', ipoPrice: 37.98, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 37.98, maxPrice: 230.54 },
    
    // 科技/半导体
    { code: '600601', name: '方正科技', ipoPrice: 2.50, ipoYear: 1990, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 1.68, maxPrice: 15.88 },
    { code: '002371', name: '北方华创', ipoPrice: 33.00, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 33.00, maxPrice: 452.78 },
    { code: '603501', name: '韦尔股份', ipoPrice: 7.02, ipoYear: 2017, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 7.02, maxPrice: 345.0 },
    { code: '688981', name: '中芯国际', ipoPrice: 27.46, ipoYear: 2020, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 27.46, maxPrice: 95.5 },
    { code: '603986', name: '兆易创新', ipoPrice: 23.26, ipoYear: 2016, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 23.26, maxPrice: 305.0 },
    { code: '002049', name: '紫光国微', ipoPrice: 11.28, ipoYear: 2005, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 11.28, maxPrice: 236.88 },
    { code: '300782', name: '卓胜微', ipoPrice: 35.29, ipoYear: 2019, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 35.29, maxPrice: 718.0 },
    { code: '688008', name: '澜起科技', ipoPrice: 24.80, ipoYear: 2019, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 24.80, maxPrice: 128.0 },
    { code: '600584', name: '长电科技', ipoPrice: 4.30, ipoYear: 2003, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.30, maxPrice: 52.88 },
    { code: '002156', name: '通富微电', ipoPrice: 8.82, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.58, maxPrice: 35.66 },
    
    // 互联网/传媒
    { code: '002027', name: '分众传媒', ipoPrice: 14.19, ipoYear: 2004, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.82, maxPrice: 19.16 },
    { code: '300413', name: '芒果超媒', ipoPrice: 9.06, ipoYear: 2015, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 9.06, maxPrice: 92.88 },
    { code: '002555', name: '三七互娱', ipoPrice: 32.00, ipoYear: 2011, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.58, maxPrice: 50.78 },
    { code: '002624', name: '完美世界', ipoPrice: 28.00, ipoYear: 2016, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 7.88, maxPrice: 36.88 },
    
    // 电力/公用事业
    { code: '600900', name: '长江电力', ipoPrice: 4.30, ipoYear: 2003, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.54, maxPrice: 32.28 },
    { code: '601985', name: '中国核电', ipoPrice: 3.39, ipoYear: 2015, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.39, maxPrice: 12.88 },
    { code: '600011', name: '华能国际', ipoPrice: 7.95, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 12.88 },
    { code: '600886', name: '国投电力', ipoPrice: 5.60, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.88, maxPrice: 18.88 },
    
    // 石油/化工
    { code: '601857', name: '中国石油', ipoPrice: 16.70, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.04, maxPrice: 16.70 },
    { code: '600028', name: '中国石化', ipoPrice: 4.22, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 9.88 },
    { code: '600309', name: '万华化学', ipoPrice: 11.28, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 11.28, maxPrice: 151.88 },
    { code: '002460', name: '赣锋锂业', ipoPrice: 20.70, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 6.88, maxPrice: 224.4 },
    { code: '002466', name: '天齐锂业', ipoPrice: 30.00, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.88, maxPrice: 143.0 },
    
    // 房地产/基建
    { code: '000002', name: '万科A', ipoPrice: 1.00, ipoYear: 1991, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 1.00, maxPrice: 45.22 },
    { code: '600048', name: '保利发展', ipoPrice: 13.95, ipoYear: 2006, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 6.88, maxPrice: 18.70 },
    { code: '601668', name: '中国建筑', ipoPrice: 4.18, ipoYear: 2009, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 12.88 },
    { code: '601390', name: '中国中铁', ipoPrice: 4.80, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 15.88 },
    { code: '601186', name: '中国铁建', ipoPrice: 9.08, ipoYear: 2008, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.88, maxPrice: 16.88 },
    
    // 通信/运营商
    { code: '600050', name: '中国联通', ipoPrice: 2.30, ipoYear: 2002, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.19, maxPrice: 13.50 },
    { code: '600941', name: '中国移动', ipoPrice: 57.58, ipoYear: 2022, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 57.58, maxPrice: 103.00 },
    { code: '601728', name: '中国电信', ipoPrice: 4.53, ipoYear: 2021, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.53, maxPrice: 6.66 },
    { code: '000063', name: '中兴通讯', ipoPrice: 5.94, ipoYear: 1997, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.94, maxPrice: 56.50 },
    
    // 军工/航天
    { code: '600893', name: '航发动力', ipoPrice: 7.00, ipoYear: 1997, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.88, maxPrice: 88.88 },
    { code: '600760', name: '中航沈飞', ipoPrice: 14.88, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.88, maxPrice: 102.88 },
    { code: '000768', name: '中航西飞', ipoPrice: 6.15, ipoYear: 1997, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.88, maxPrice: 45.88 },
    { code: '600372', name: '中航电子', ipoPrice: 10.88, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 4.88, maxPrice: 35.88 },
    
    // 汽车/机械
    { code: '601633', name: '长城汽车', ipoPrice: 13.00, ipoYear: 2011, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.88, maxPrice: 69.80 },
    { code: '600104', name: '上汽集团', ipoPrice: 7.02, ipoYear: 1997, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 7.02, maxPrice: 33.58 },
    { code: '000625', name: '长安汽车', ipoPrice: 6.36, ipoYear: 1997, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 23.66 },
    { code: '601238', name: '广汽集团', ipoPrice: 9.09, ipoYear: 2012, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.88, maxPrice: 22.88 },
    { code: '600031', name: '三一重工', ipoPrice: 15.56, ipoYear: 2003, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.44, maxPrice: 50.30 },
    { code: '000425', name: '徐工机械', ipoPrice: 2.50, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.50, maxPrice: 12.88 },
    
    // 煤炭/有色
    { code: '601088', name: '中国神华', ipoPrice: 36.99, ipoYear: 2007, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 12.88, maxPrice: 44.88 },
    { code: '601225', name: '陕西煤业', ipoPrice: 4.00, ipoYear: 2014, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 3.88, maxPrice: 28.88 },
    { code: '601899', name: '紫金矿业', ipoPrice: 7.13, ipoYear: 2008, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 2.88, maxPrice: 22.88 },
    { code: '603993', name: '洛阳钼业', ipoPrice: 3.00, ipoYear: 2012, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 1.91, maxPrice: 9.88 },
    
    // 食品饮料
    { code: '600887', name: '伊利股份', ipoPrice: 5.95, ipoYear: 1996, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 5.95, maxPrice: 51.85 },
    { code: '603288', name: '海天味业', ipoPrice: 31.25, ipoYear: 2014, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 31.25, maxPrice: 219.58 },
    { code: '600298', name: '安琪酵母', ipoPrice: 11.88, ipoYear: 2000, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 11.88, maxPrice: 72.88 },
    { code: '002507', name: '涪陵榨菜', ipoPrice: 13.99, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 13.99, maxPrice: 56.24 },
    
    // 其他热门
    { code: '300059', name: '东方财富', ipoPrice: 40.58, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 0.58, maxPrice: 40.58 },
    { code: '002230', name: '科大讯飞', ipoPrice: 12.66, ipoYear: 2008, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 12.66, maxPrice: 81.88 },
    { code: '002415', name: '海康威视', ipoPrice: 68.00, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 26.10, maxPrice: 68.00 },
    { code: '000725', name: '京东方A', ipoPrice: 16.80, ipoYear: 2001, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 1.61, maxPrice: 7.55 },
    { code: '601888', name: '中国中免', ipoPrice: 11.78, ipoYear: 2009, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 11.78, maxPrice: 402.78 },
    { code: '300124', name: '汇川技术', ipoPrice: 60.36, ipoYear: 2010, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 60.36, maxPrice: 89.05 },
    { code: '002352', name: '顺丰控股', ipoPrice: 32.00, ipoYear: 2017, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 32.00, maxPrice: 124.70 },
    { code: '601021', name: '春秋航空', ipoPrice: 18.16, ipoYear: 2015, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 18.16, maxPrice: 81.00 },
    { code: '603288', name: '海天味业', ipoPrice: 31.25, ipoYear: 2014, currentIndex: 0, history: [], change: 0, changePercent: 0, minPrice: 31.25, maxPrice: 219.58 }
];

// 初始化用户数据
let userData = {
    balance: 100000.00,
    holdings: {},
    history: [],
    initialBalance: 100000.00,
    stopOrders: [],
    achievements: []
};

// 全局变量
let selectedStockCode = null;
let currentTradeType = 'buy';  // 当前交易类型：buy 或 sell
let priceChart = null;
let volumeChart = null;
let assetChart = null;
let updateInterval = null;
let assetHistory = [];
let pendingOrders = [];
let orderIdCounter = 1;
let currentSortField = 'code';
let activeIndicators = { price: true, ma: false, macd: false, vol: false };

// 模拟交易时间
let simYear = 2026;
let simMonth = 1;
let simDay = 1;
let isTradingTime = true;

// 成就定义
const achievementsList = [
    { id: 'first_trade', name: '初出茅庐', desc: '完成第一笔交易', icon: '🎯' },
    { id: 'first_profit', name: '首笔盈利', desc: '第一笔交易盈利', icon: '💰' },
    { id: 'profit_10k', name: '万元户', desc: '累计盈利达到1万', icon: '💎' },
    { id: 'profit_50k', name: '小有成就', desc: '累计盈利达到5万', icon: '🏆' },
    { id: 'double_assets', name: '资产翻倍', desc: '总资产达到初始2倍', icon: '🚀' },
    { id: 'trade_10', name: '交易达人', desc: '完成10笔交易', icon: '⚡' },
    { id: 'trade_50', name: '交易狂人', desc: '完成50笔交易', icon: '🔥' },
    { id: 'hold_5', name: '分散投资', desc: '同时持有5只股票', icon: '📊' },
    { id: 'stop_loss', name: '风险控制', desc: '成功执行止损', icon: '🛡️' },
    { id: 'take_profit', name: '见好就收', desc: '成功执行止盈', icon: '✅' }
];

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', function() {
    try {
        loadUserData();
        initializeStocks();
        renderStockList();
        updateAccountInfo();
        updateHoldings();
        updateOrders();
        updateStopOrders();
        updateTradeHistory();
        updateAchievements();
        initAssetChart();
    } catch (error) {
        console.error('初始化出错:', error);
    }
    
    // 确保价格更新定时器一定会被启动
    startPriceUpdates();
    
    updateClock();
    setInterval(updateClock, 1000);
    setupKeyboardShortcuts();
    updateSimDate();
    console.log('页面初始化完成！');
});

// ==================== 数据持久化 ====================

function loadUserData() {
    const saved = localStorage.getItem('stockGameData');
    if (saved) {
        try {
            const savedData = JSON.parse(saved);
            userData = savedData.userData || userData;
            
            // 确保必要的属性存在（兼容旧数据）
            if (!userData.stopOrders) userData.stopOrders = [];
            if (!userData.achievements) userData.achievements = [];
            if (!userData.holdings) userData.holdings = {};
            if (!userData.history) userData.history = [];
            
            pendingOrders = savedData.pendingOrders || [];
            orderIdCounter = savedData.orderIdCounter || 1;
            assetHistory = savedData.assetHistory || [];
        } catch (error) {
            console.error('加载用户数据失败:', error);
            // 使用默认数据
        }
    }
}

function saveUserData() {
    const dataToSave = {
        userData: userData,
        pendingOrders: pendingOrders,
        orderIdCounter: orderIdCounter,
        assetHistory: assetHistory.slice(-500)
    };
    localStorage.setItem('stockGameData', JSON.stringify(dataToSave));
}

// ==================== 股票历史数据生成 ====================

function initializeStocks() {
    stocks.forEach(stock => {
        const dataPoints = 2000;
        stock.history = [];
        // 使用阈值范围的中间值作为起始价格
        const midPrice = (stock.minPrice + stock.maxPrice) / 2;
        let price = midPrice;
        const now = Date.now();
        
        // 生成随机波动的价格序列，包含均值回归
        for (let i = 0; i < dataPoints; i++) {
            const time = now - (dataPoints - i) * 1000;
            
            // 均值回归：价格倾向于回归到中间值
            const meanReversion = (midPrice - price) * 0.01;
            const noise = (Math.random() - 0.5) * 2;
            
            let newPrice = price + meanReversion + noise;
            
            // 涨跌停限制
            const limitUp = price * 1.1;
            const limitDown = price * 0.9;
            newPrice = Math.max(limitDown, Math.min(limitUp, newPrice));
            
            // 使用股票设定的阈值范围
            newPrice = Math.max(stock.minPrice, Math.min(stock.maxPrice, newPrice));
            
            price = newPrice;
            stock.history.push({ time: time, price: price, volume: Math.floor(Math.random() * 1000000) + 100000 });
        }
        
        stock.currentIndex = 0;
        stock.price = stock.history[0].price;
        stock.change = 0;
        stock.changePercent = 0;
    });
}

// ==================== 功能1: 止损止盈 ====================

// 旧函数已删除，使用 executeOrder() 替代

function checkStopOrders() {
    // 确保 stopOrders 是数组
    if (!Array.isArray(userData.stopOrders)) {
        userData.stopOrders = [];
        return;
    }
    
    let hasExecution = false;
    
    userData.stopOrders = userData.stopOrders.filter(order => {
        const stock = stocks.find(s => s.code === order.stockCode);
        if (!stock) return true;
        
        let shouldSell = false;
        let reason = '';
        
        if (order.stopLoss && stock.price <= order.stopLoss) {
            shouldSell = true;
            reason = '止损';
        }
        if (order.takeProfit && stock.price >= order.takeProfit) {
            shouldSell = true;
            reason = '止盈';
        }
        
        if (shouldSell) {
            executeStopOrder(order, reason);
            hasExecution = true;
            return false;
        }
        return true;
    });
    
    if (hasExecution) {
        updateAccountInfo();
        updateHoldings();
        updateStopOrders();
    }
}

function executeStopOrder(order, reason) {
    const stock = stocks.find(s => s.code === order.stockCode);
    const totalValue = stock.price * order.amount;
    
    userData.balance += totalValue;
    const holding = userData.holdings[order.stockCode];
    holding.amount -= order.amount;
    holding.totalCost = holding.avgPrice * holding.amount;
    if (holding.amount === 0) delete userData.holdings[order.stockCode];
    
    userData.history.unshift({
        time: new Date().toLocaleString('zh-CN'),
        type: 'sell',
        stock: order.stockCode,
        name: order.stockName,
        amount: order.amount,
        price: stock.price,
        total: totalValue,
        isStopOrder: true,
        reason: reason
    });
    
    if (userData.history.length > 50) userData.history = userData.history.slice(0, 50);
    
    showNotification(`${reason}触发！已卖出 ${order.stockCode} ${order.amount}股，价格: ¥${stock.price.toFixed(2)}`);
    saveUserData();
    
    // 成就检查
    if (reason === '止损') checkAchievement('stop_loss');
    if (reason === '止盈') checkAchievement('take_profit');
}

function updateStopOrders() {
    const list = document.getElementById('stopOrdersList');
    if (userData.stopOrders.length === 0) {
        list.innerHTML = '<p class="empty">暂无设置</p>';
        return;
    }
    
    list.innerHTML = '';
    userData.stopOrders.forEach(order => {
        const stock = stocks.find(s => s.code === order.stockCode);
        const currentPrice = stock ? stock.price.toFixed(2) : '--';
        const item = document.createElement('div');
        item.className = 'order-item';
        item.innerHTML = `
            <div class="order-info">
                <span style="font-weight:bold;">${order.stockCode}</span>
                <span>${order.amount}股</span>
                ${order.stopLoss ? `<span style="color:#ff9800;">止损:¥${order.stopLoss.toFixed(2)}</span>` : ''}
                ${order.takeProfit ? `<span style="color:#4caf50;">止盈:¥${order.takeProfit.toFixed(2)}</span>` : ''}
                <span>当前:¥${currentPrice}</span>
            </div>
        `;
        list.appendChild(item);
    });
}

// ==================== 功能2: 资金曲线图 ====================

function initAssetChart() {
    const ctx = document.getElementById('assetChart').getContext('2d');
    const labels = assetHistory.map(h => h.time);
    const data = assetHistory.map(h => h.assets);
    
    assetChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '总资产',
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    ticks: { callback: v => '¥' + v.toFixed(0) }
                },
                x: {
                    ticks: { maxTicksLimit: 10, maxRotation: 0 }
                }
            }
        }
    });
}

function updateAssetHistory() {
    let totalAssets = userData.balance;
    Object.keys(userData.holdings).forEach(code => {
        const holding = userData.holdings[code];
        const stock = stocks.find(s => s.code === code);
        if (stock) totalAssets += stock.price * holding.amount;
    });
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    assetHistory.push({ time: timeStr, assets: totalAssets });
    if (assetHistory.length > 100) assetHistory = assetHistory.slice(-100);
    
    if (assetChart) {
        assetChart.data.labels = assetHistory.map(h => h.time);
        assetChart.data.datasets[0].data = assetHistory.map(h => h.assets);
        assetChart.update('none');
    }
}

// ==================== 功能3: 股票搜索/筛选 ====================

function filterStocks() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    renderStockList(keyword);
}

function sortStocks(field) {
    currentSortField = field;
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(field === 'code' ? '代码' : field === 'price' ? '价格' : '涨跌'));
    });
    renderStockList();
}

function renderStockList(keyword = '') {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = '';
    
    let filteredStocks = stocks.filter(s => 
        s.code.toLowerCase().includes(keyword) || 
        s.name.toLowerCase().includes(keyword)
    );
    
    // 排序
    filteredStocks.sort((a, b) => {
        if (currentSortField === 'code') return a.code.localeCompare(b.code);
        if (currentSortField === 'price') return b.price - a.price;
        if (currentSortField === 'change') return b.changePercent - a.changePercent;
    });
    
    filteredStocks.forEach(stock => {
        const item = document.createElement('div');
        item.className = 'stock-item' + (selectedStockCode === stock.code ? ' active' : '');
        item.onclick = () => selectStock(stock.code);
        
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSign = stock.change >= 0 ? '+' : '';
        const isLimitUp = stock.changePercent >= 9.9;
        const isLimitDown = stock.changePercent <= -9.9;
        
        item.innerHTML = `
            <div class="stock-header">
                <span class="stock-code">${stock.code}</span>
                <span class="stock-name">${stock.name}</span>
                ${isLimitUp ? '<span class="limit-badge up">涨停</span>' : ''}
                ${isLimitDown ? '<span class="limit-badge down">跌停</span>' : ''}
            </div>
            <div class="stock-price">¥${stock.price.toFixed(2)}</div>
            <div class="stock-change ${changeClass}">
                ${changeSign}${stock.change.toFixed(2)} (${changeSign}${stock.changePercent.toFixed(2)}%)
            </div>
        `;
        stockList.appendChild(item);
    });
}

// ==================== 功能4: 快捷键支持 ====================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const key = e.key.toLowerCase();
        
        // B: 买入
        if (key === 'b') {
            e.preventDefault();
            executeTrade('buy');
        }
        // S: 卖出
        else if (key === 's') {
            e.preventDefault();
            executeTrade('sell');
        }
        // 1-0: 快速选择股票
        else if (key >= '1' && key <= '9') {
            e.preventDefault();
            const index = parseInt(key) - 1;
            if (index < stocks.length) selectStock(stocks[index].code);
        }
        // 0: 选择第10只股票
        else if (key === '0') {
            e.preventDefault();
            if (stocks.length >= 10) selectStock(stocks[9].code);
        }
        // ESC: 清空选择
        else if (key === 'escape') {
            selectedStockCode = null;
            renderStockList();
            document.getElementById('selectedStock').textContent = '请选择股票';
        }
        // H: 显示快捷键帮助
        else if (key === 'h') {
            e.preventDefault();
            showShortcutHelp();
        }
    });
}

function showShortcutHelp() {
    alert('快捷键帮助:\nB - 买入\nS - 卖出\n1-9 - 选择股票\n0 - 第10只股票\nESC - 清空选择\nH - 显示此帮助');
}

// ==================== 功能5: 技术指标 ====================

function toggleIndicator(type) {
    activeIndicators[type] = !activeIndicators[type];
    document.querySelectorAll('.indicator-btn').forEach(btn => {
        const btnType = btn.textContent.toLowerCase();
        if (btnType.includes('价格') || btnType.includes('ma') || btnType.includes('macd') || btnType.includes('成交')) {
            const typeMap = { '价格': 'price', 'ma': 'ma', 'macd': 'macd', '成交': 'vol' };
            Object.keys(typeMap).forEach(k => {
                if (btn.textContent.toLowerCase().includes(k)) {
                    btn.classList.toggle('active', activeIndicators[typeMap[k]]);
                }
            });
        }
    });
    // 重新初始化图表以正确显示/隐藏指标
    if (selectedStockCode) initChart();
}

function calculateMA(prices, period) {
    const result = [];
    for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) {
            result.push(null);
        } else {
            let sum = 0;
            for (let j = 0; j < period; j++) sum += prices[i - j];
            result.push(sum / period);
        }
    }
    return result;
}

function calculateMACD(prices) {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const dif = ema12.map((v, i) => v - ema26[i]);
    const dea = calculateEMA(dif, 9);
    const macd = dif.map((v, i) => (v - dea[i]) * 2);
    return { dif, dea, macd };
}

function calculateEMA(prices, period) {
    const result = [];
    const k = 2 / (period + 1);
    result[0] = prices[0];
    for (let i = 1; i < prices.length; i++) {
        result[i] = prices[i] * k + result[i - 1] * (1 - k);
    }
    return result;
}

function initChart() {
    const stock = stocks.find(s => s.code === selectedStockCode);
    if (!stock) return;
    
    const ctx = document.getElementById('priceChart').getContext('2d');
    // 根据currentIndex获取对应的数据窗口
    const startIndex = Math.max(0, stock.currentIndex - 99);
    const endIndex = stock.currentIndex + 1;
    const recentHistory = stock.history.slice(startIndex, endIndex);
    
    const labels = recentHistory.map(h => {
        const date = new Date(h.time);
        return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    });
    const prices = recentHistory.map(h => h.price);
    
    const datasets = [{
        label: `${stock.code} 价格`,
        data: prices,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 2,
        fill: activeIndicators.price,
        tension: 0.4
    }];
    
    // MA指标
    if (activeIndicators.ma) {
        const ma5 = calculateMA(prices, 5);
        const ma10 = calculateMA(prices, 10);
        const ma20 = calculateMA(prices, 20);
        datasets.push({
            label: 'MA5',
            data: ma5,
            borderColor: '#ff9800',
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 0
        });
        datasets.push({
            label: 'MA10',
            data: ma10,
            borderColor: '#4caf50',
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 0
        });
        datasets.push({
            label: 'MA20',
            data: ma20,
            borderColor: '#f44336',
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 0
        });
    }
    
    if (priceChart) priceChart.destroy();
    
    // 计算Y轴合理范围
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.15 || maxPrice * 0.1;
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'top' } },
            scales: {
                y: {
                    beginAtZero: false,
                    min: minPrice - padding,
                    max: maxPrice + padding,
                    ticks: { callback: v => '¥' + v.toFixed(2) }
                }
            }
        }
    });
    
    // 成交量图
    const volumeCanvas = document.getElementById('volumeChart');
    if (activeIndicators.vol) {
        volumeCanvas.style.display = 'block';
        renderVolumeChart(recentHistory);
    } else {
        volumeCanvas.style.display = 'none';
        if (volumeChart) volumeChart.destroy();
    }
}

function renderVolumeChart(history) {
    const ctx = document.getElementById('volumeChart').getContext('2d');
    const volumes = history.map(h => h.volume || Math.floor(Math.random() * 1000000));
    const prices = history.map(h => h.price);
    const colors = prices.map((p, i) => {
        if (i === 0) return '#ccc';
        return p >= prices[i - 1] ? '#f44336' : '#4caf50';
    });
    
    if (volumeChart) volumeChart.destroy();
    volumeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: history.map((_, i) => i % 10 === 0 ? i.toString() : ''),
            datasets: [{
                data: volumes,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { display: false }
            }
        }
    });
}

function updateChartData() {
    const stock = stocks.find(s => s.code === selectedStockCode);
    if (!stock || !priceChart) return;
    
    // 获取最近的数据窗口（最多100个点）
    const endIndex = stock.currentIndex + 1;
    const startIndex = Math.max(0, endIndex - 100);
    const recentHistory = stock.history.slice(startIndex, endIndex);
    
    const labels = recentHistory.map(h => {
        const date = new Date(h.time);
        return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    });
    const prices = recentHistory.map(h => h.price);
    
    // 更新图表数据
    priceChart.data.labels = labels;
    priceChart.data.datasets[0].data = prices;
    
    // 动态更新Y轴范围：以当前价格为中心，显示固定百分比范围
    if (prices.length > 0) {
        const currentPrice = prices[prices.length - 1];
        const range = currentPrice * 0.15;  // 显示±15%的范围
        priceChart.options.scales.y.min = currentPrice - range;
        priceChart.options.scales.y.max = currentPrice + range;
    }
    
    // 更新MA
    if (activeIndicators.ma && priceChart.data.datasets.length > 1) {
        const ma5 = calculateMA(prices, 5);
        const ma10 = calculateMA(prices, 10);
        const ma20 = calculateMA(prices, 20);
        priceChart.data.datasets[1].data = ma5;
        priceChart.data.datasets[2].data = ma10;
        priceChart.data.datasets[3].data = ma20;
    }
    
    priceChart.update('none');
}

// ==================== 功能6: 涨跌停/交易时间 ====================

function isLimitUp(stock) {
    if (stock.history.length < 2) return false;
    const prevPrice = stock.history[stock.currentIndex - 1]?.price || stock.ipoPrice;
    const limitPrice = prevPrice * 1.1;
    return stock.price >= limitPrice * 0.995;
}

function isLimitDown(stock) {
    if (stock.history.length < 2) return false;
    const prevPrice = stock.history[stock.currentIndex - 1]?.price || stock.ipoPrice;
    const limitPrice = prevPrice * 0.9;
    return stock.price <= limitPrice * 1.005;
}

function updateSimDate() {
    // 每推进100个数据点 = 1天
    const totalPoints = stocks[0]?.currentIndex || 0;
    const daysPassed = Math.floor(totalPoints / 100);
    const simDate = new Date(simYear, simMonth - 1, simDay + daysPassed);
    document.getElementById('simDate').textContent = simDate.toISOString().split('T')[0];
}

// ==================== 核心交易逻辑 ====================

function selectStock(code) {
    selectedStockCode = code;
    renderStockList();
    updateTradePanel();
    initChart();
}

function updateTradePanel() {
    const stock = stocks.find(s => s.code === selectedStockCode);
    
    // 防御性检查：确保所有DOM元素都存在
    const selectedStockEl = document.getElementById('selectedStock');
    const currentPriceEl = document.getElementById('currentPrice');
    const totalCostEl = document.getElementById('totalCost');
    
    if (!stock) {
        if (selectedStockEl) selectedStockEl.textContent = '请选择股票';
        if (currentPriceEl) currentPriceEl.textContent = '--';
        if (totalCostEl) totalCostEl.textContent = '--';
        return;
    }
    
    if (selectedStockEl) selectedStockEl.textContent = `${stock.code} - ${stock.name}`;
    if (currentPriceEl) currentPriceEl.textContent = `¥${stock.price.toFixed(2)}`;
    updateTotalCost();
}

function updateTotalCost() {
    const stock = stocks.find(s => s.code === selectedStockCode);
    const amount = parseInt(document.getElementById('tradeAmount').value) || 0;
    if (stock && amount > 0) {
        document.getElementById('totalCost').textContent = `¥${(stock.price * amount).toFixed(2)}`;
    } else {
        document.getElementById('totalCost').textContent = '--';
    }
}

// ==================== 优化后的交易函数 ====================

// 切换买入/卖出标签
function switchTradeTab(type) {
    currentTradeType = type;
    const tabBuy = document.getElementById('tabBuy');
    const tabSell = document.getElementById('tabSell');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (type === 'buy') {
        tabBuy.classList.add('active');
        tabSell.classList.remove('active');
        confirmBtn.textContent = '确认买入';
        confirmBtn.className = 'btn btn-confirm';
    } else {
        tabBuy.classList.remove('active');
        tabSell.classList.add('active');
        confirmBtn.textContent = '确认卖出';
        confirmBtn.className = 'btn btn-confirm sell';
    }
    updateTotalCost();
}

// 设置市价
function setMarketPrice() {
    const stock = stocks.find(s => s.code === selectedStockCode);
    if (stock) {
        document.getElementById('tradePrice').value = stock.price.toFixed(2);
        updateTotalCost();
    }
}

// 设置快捷数量
function setAmount(amount) {
    if (amount === 'max') {
        const stock = stocks.find(s => s.code === selectedStockCode);
        if (!stock) return;
        if (currentTradeType === 'buy') {
            // 最大可买数量
            const maxAmount = Math.floor(userData.balance / (stock.price || 1) / 100) * 100;
            document.getElementById('tradeAmount').value = Math.max(100, maxAmount);
        } else {
            // 最大可卖数量
            const holding = userData.holdings[selectedStockCode];
            document.getElementById('tradeAmount').value = holding ? holding.amount : 0;
        }
    } else {
        document.getElementById('tradeAmount').value = amount;
    }
    updateTotalCost();
}

// 显示/隐藏条件单面板
function toggleCondition() {
    const checkbox = document.getElementById('enableCondition');
    const panel = document.getElementById('conditionPanel');
    panel.style.display = checkbox.checked ? 'block' : 'none';
}

// 执行订单（合并普通交易和条件委托）
function submitOrder() {
    if (!selectedStockCode) { alert('请先选择股票！'); return; }
    
    const stock = stocks.find(s => s.code === selectedStockCode);
    const amount = parseInt(document.getElementById('tradeAmount').value);
    const priceInput = document.getElementById('tradePrice').value;
    const isCondition = document.getElementById('enableCondition').checked;
    
    if (!amount || amount <= 0) { alert('请输入有效的交易数量！'); return; }
    
    // 如果是条件单
    if (isCondition) {
        const triggerPrice = parseFloat(document.getElementById('triggerPrice').value);
        const stopLoss = parseFloat(document.getElementById('stopLossPrice').value) || null;
        const takeProfit = parseFloat(document.getElementById('takeProfitPrice').value) || null;
        
        if (!triggerPrice || triggerPrice <= 0) { alert('请输入有效的触发价格！'); return; }
        
        // 创建条件委托
        const order = {
            id: orderIdCounter++,
            type: currentTradeType,
            stockCode: selectedStockCode,
            stockName: stock.name,
            targetPrice: triggerPrice,
            amount: amount,
            stopLoss: stopLoss,
            takeProfit: takeProfit,
            status: 'pending',
            createTime: new Date().toLocaleString('zh-CN'),
            frozen: currentTradeType === 'buy'
        };
        
        // 检查资金/持仓并冻结
        if (currentTradeType === 'buy') {
            const estimatedCost = triggerPrice * amount;
            if (estimatedCost > userData.balance) {
                alert('余额不足！'); return;
            }
            userData.balance -= estimatedCost;  // 冻结资金
        }
        if (currentTradeType === 'sell') {
            const holding = userData.holdings[selectedStockCode];
            if (!holding || holding.amount < amount) { alert('持仓不足！'); return; }
        }
        
        pendingOrders.push(order);
        saveUserData();
        updateAccountInfo();
        updateOrders();
        alert(`条件委托已设置！触发价: ¥${triggerPrice.toFixed(2)}`);
        
        // 清空输入
        document.getElementById('triggerPrice').value = '';
        document.getElementById('stopLossPrice').value = '';
        document.getElementById('takeProfitPrice').value = '';
        document.getElementById('enableCondition').checked = false;
        toggleCondition();
        return;
    }
    
    // ===== 普通交易 =====
    // 判断是市价单还是限价单
    if (!priceInput || priceInput === '') {
        // 市价单：按当前市价立即成交
        executeImmediateTrade(stock, amount, stock.price);
    } else {
        // 限价单：加入委托队列，等待价格触发
        const limitPrice = parseFloat(priceInput);
        if (limitPrice <= 0) { alert('请输入有效的委托价格！'); return; }
        
        // 创建限价委托
        const order = {
            id: orderIdCounter++,
            type: currentTradeType,
            stockCode: selectedStockCode,
            stockName: stock.name,
            targetPrice: limitPrice,
            amount: amount,
            stopLoss: null,
            takeProfit: null,
            status: 'pending',
            createTime: new Date().toLocaleString('zh-CN'),
            frozen: currentTradeType === 'buy',
            isLimitOrder: true  // 标记为限价单
        };
        
        // 检查资金/持仓并冻结
        if (currentTradeType === 'buy') {
            const estimatedCost = limitPrice * amount;
            if (estimatedCost > userData.balance) {
                alert('余额不足！'); return;
            }
            userData.balance -= estimatedCost;  // 冻结资金
        }
        if (currentTradeType === 'sell') {
            const holding = userData.holdings[selectedStockCode];
            if (!holding || holding.amount < amount) { alert('持仓不足！'); return; }
        }
        
        pendingOrders.push(order);
        saveUserData();
        updateAccountInfo();
        updateOrders();
        alert(`限价委托已设置！委托价: ¥${limitPrice.toFixed(2)}，等待价格触发...`);
    }
}

// 立即成交（市价单）
function executeImmediateTrade(stock, amount, tradePrice) {
    const totalCost = tradePrice * amount;
    
    if (currentTradeType === 'buy') {
        if (totalCost > userData.balance) { alert('余额不足！'); return; }
        
        userData.balance -= totalCost;
        if (!userData.holdings[stock.code]) {
            userData.holdings[stock.code] = { amount: 0, avgPrice: 0, totalCost: 0 };
        }
        const holding = userData.holdings[stock.code];
        holding.totalCost += totalCost;
        holding.amount += amount;
        holding.avgPrice = holding.totalCost / holding.amount;
    } else {
        const holding = userData.holdings[stock.code];
        if (!holding || holding.amount < amount) { alert('持仓不足！'); return; }
        
        const totalCost = tradePrice * amount;
        userData.balance += totalCost;
        holding.amount -= amount;
        holding.totalCost = holding.avgPrice * holding.amount;
        if (holding.amount === 0) delete userData.holdings[stock.code];
    }
    
    // 记录交易历史
    userData.history.unshift({
        time: new Date().toLocaleString('zh-CN'),
        type: currentTradeType,
        stock: stock.code,
        name: stock.name,
        amount: amount,
        price: tradePrice,
        total: tradePrice * amount
    });
    if (userData.history.length > 50) userData.history = userData.history.slice(0, 50);
    
    saveUserData();
    updateAccountInfo();
    updateHoldings();
    updateTradeHistory();
    updateTotalCost();
    updateAssetHistory();
    
    // 成就检查
    checkAchievement('first_trade');
    checkAchievement('trade_10');
    checkAchievement('trade_50');
    checkAchievement('hold_5');
    
    alert(`${currentTradeType === 'buy' ? '买入' : '卖出'}成功！成交价: ¥${tradePrice.toFixed(2)}`);
}

function executeTrade(type) {
    if (!selectedStockCode) { alert('请先选择股票！'); return; }
    
    const stock = stocks.find(s => s.code === selectedStockCode);
    const amount = parseInt(document.getElementById('tradeAmount').value);
    if (!amount || amount <= 0) { alert('请输入有效的交易数量！'); return; }
    
    const totalCost = stock.price * amount;
    
    if (type === 'buy') {
        if (totalCost > userData.balance) { alert('余额不足！'); return; }
        userData.balance -= totalCost;
        if (!userData.holdings[stock.code]) {
            userData.holdings[stock.code] = { amount: 0, avgPrice: 0, totalCost: 0 };
        }
        const holding = userData.holdings[stock.code];
        holding.totalCost += totalCost;
        holding.amount += amount;
        holding.avgPrice = holding.totalCost / holding.amount;
    } else if (type === 'sell') {
        const holding = userData.holdings[stock.code];
        if (!holding || holding.amount < amount) { alert('持仓不足！'); return; }
        userData.balance += totalCost;
        holding.amount -= amount;
        holding.totalCost = holding.avgPrice * holding.amount;
        if (holding.amount === 0) delete userData.holdings[stock.code];
    }
    
    userData.history.unshift({
        time: new Date().toLocaleString('zh-CN'),
        type: type,
        stock: stock.code,
        name: stock.name,
        amount: amount,
        price: stock.price,
        total: totalCost
    });
    if (userData.history.length > 50) userData.history = userData.history.slice(0, 50);
    
    saveUserData();
    updateAccountInfo();
    updateHoldings();
    updateTradeHistory();
    updateTotalCost();
    updateAssetHistory();
    
    // 成就检查
    checkAchievement('first_trade');
    checkAchievement('trade_10');
    checkAchievement('trade_50');
    checkAchievement('hold_5');
    
    alert(`${type === 'buy' ? '买入' : '卖出'}成功！`);
}

// ==================== 委托订单逻辑 ====================

// 旧函数已删除，使用 executeOrder() 替代

function cancelOrder(orderId) {
    const idx = pendingOrders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    if (pendingOrders[idx].status !== 'pending') { alert('该委托已执行或取消！'); return; }

    const order = pendingOrders[idx];

    // 返还冻结的资金（仅限新买入订单）
    if (order.type === 'buy' && order.frozen) {
        const frozenCost = order.targetPrice * order.amount;
        userData.balance += frozenCost;
    }

    order.status = 'cancelled';
    saveUserData();
    updateAccountInfo();
    updateOrders();
    alert('委托已取消！');
}

function checkOrders() {
    let hasExecution = false;
    pendingOrders.forEach((order, index) => {
        if (order.status !== 'pending') return;
        const stock = stocks.find(s => s.code === order.stockCode);
        if (!stock) return;
        
        let shouldExecute = false;
        if (order.type === 'buy' && stock.price <= order.targetPrice) shouldExecute = true;
        if (order.type === 'sell' && stock.price >= order.targetPrice) shouldExecute = true;
        
        if (shouldExecute) {
            executeOrder(order);
            hasExecution = true;
        }
    });
    if (hasExecution) {
        updateAccountInfo();
        updateHoldings();
        updateOrders();
    }
}

function executeOrder(order) {
    const stock = stocks.find(s => s.code === order.stockCode);
    if (!stock) return;
    const totalCost = stock.price * order.amount;

    if (order.type === 'buy') {
        // 买入：根据frozen标记判断资金状态
        if (order.frozen) {
            // 新订单：已冻结资金，只处理触发价与实际价的差额
            const frozenCost = order.targetPrice * order.amount;
            const difference = frozenCost - totalCost;
            if (difference !== 0) {
                userData.balance += difference;
            }
        } else {
            // 旧订单：未冻结资金，直接扣除
            userData.balance -= totalCost;
        }
        if (!userData.holdings[order.stockCode]) {
            userData.holdings[order.stockCode] = { amount: 0, avgPrice: 0, totalCost: 0 };
        }
        const holding = userData.holdings[order.stockCode];
        holding.totalCost += totalCost;
        holding.amount += order.amount;
        holding.avgPrice = holding.totalCost / holding.amount;

        // 如果设置了止损止盈，自动创建止损止盈单
        if (order.stopLoss || order.takeProfit) {
            userData.stopOrders.push({
                id: orderIdCounter++,
                stockCode: order.stockCode,
                stockName: order.stockName,
                amount: order.amount,
                stopLoss: order.stopLoss,
                takeProfit: order.takeProfit,
                createTime: new Date().toLocaleString('zh-CN')
            });
            updateStopOrders();
        }
    } else if (order.type === 'sell') {
        userData.balance += totalCost;
        const holding = userData.holdings[order.stockCode];
        holding.amount -= order.amount;
        holding.totalCost = holding.avgPrice * holding.amount;
        if (holding.amount === 0) delete userData.holdings[order.stockCode];
    }
    
    order.status = 'executed';
    userData.history.unshift({
        time: new Date().toLocaleString('zh-CN'),
        type: order.type,
        stock: order.stockCode,
        name: order.stockName,
        amount: order.amount,
        price: stock.price,
        total: totalCost,
        isOrder: true
    });
    if (userData.history.length > 50) userData.history = userData.history.slice(0, 50);
    
    saveUserData();
    showNotification(`委托已执行！${order.stockCode} ${order.type === 'buy' ? '买入' : '卖出'} ${order.amount}股`);
    checkAchievement('first_trade');
}

function updateOrders() {
    const list = document.getElementById('ordersList');
    const pending = pendingOrders.filter(o => o.status === 'pending');
    if (pending.length === 0) {
        list.innerHTML = '<p class="empty">暂无委托</p>';
        return;
    }
    list.innerHTML = '';
    pending.forEach(order => {
        const item = document.createElement('div');
        item.className = 'order-item';
        item.innerHTML = `
            <div class="order-info">
                <span style="font-weight:bold;color:${order.type === 'buy' ? '#f44336' : '#4caf50'}">${order.type === 'buy' ? '买入' : '卖出'}</span>
                <span>${order.stockCode} - ${order.amount}股</span>
                <span>触发价:¥${order.targetPrice.toFixed(2)}</span>
                ${order.stopLoss ? `<span style="color:#ff9800;font-size:12px;">止损:¥${order.stopLoss.toFixed(2)}</span>` : ''}
                ${order.takeProfit ? `<span style="color:#4caf50;font-size:12px;">止盈:¥${order.takeProfit.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn-cancel" onclick="cancelOrder(${order.id})">撤单</button>
        `;
        list.appendChild(item);
    });
}

// ==================== 功能7: 游戏化成就系统 ====================

function checkAchievement(id) {
    if (userData.achievements.includes(id)) return;
    
    const achievement = achievementsList.find(a => a.id === id);
    if (!achievement) return;
    
    let shouldUnlock = false;
    
    switch(id) {
        case 'first_trade':
            shouldUnlock = userData.history.length >= 1;
            break;
        case 'first_profit':
            shouldUnlock = userData.history.some(h => {
                if (h.type !== 'sell') return false;
                const holding = userData.holdings[h.stock];
                return holding && stock.price > h.price;
            });
            break;
        case 'profit_10k':
            shouldUnlock = (getTotalAssets() - userData.initialBalance) >= 10000;
            break;
        case 'profit_50k':
            shouldUnlock = (getTotalAssets() - userData.initialBalance) >= 50000;
            break;
        case 'double_assets':
            shouldUnlock = getTotalAssets() >= userData.initialBalance * 2;
            break;
        case 'trade_10':
            shouldUnlock = userData.history.length >= 10;
            break;
        case 'trade_50':
            shouldUnlock = userData.history.length >= 50;
            break;
        case 'hold_5':
            shouldUnlock = Object.keys(userData.holdings).length >= 5;
            break;
        case 'stop_loss':
        case 'take_profit':
            shouldUnlock = true;
            break;
    }
    
    if (shouldUnlock) {
        userData.achievements.push(id);
        saveUserData();
        showAchievementNotification(achievement);
        updateAchievements();
    }
}

function showAchievementNotification(achievement) {
    const notif = document.getElementById('achievementNotification');
    document.getElementById('achievementName').textContent = `${achievement.icon} ${achievement.name}: ${achievement.desc}`;
    notif.style.display = 'flex';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 3000);
}

function updateAchievements() {
    // 确保 achievements 是数组
    if (!Array.isArray(userData.achievements)) {
        userData.achievements = [];
    }
    
    const list = document.getElementById('achievementsList');
    if (userData.achievements.length === 0) {
        list.innerHTML = '<p class="empty">暂无成就</p>';
        return;
    }
    list.innerHTML = '';
    userData.achievements.forEach(id => {
        const ach = achievementsList.find(a => a.id === id);
        if (!ach) return;
        const item = document.createElement('div');
        item.className = 'achievement-item';
        item.innerHTML = `
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info">
                <div class="achievement-name">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

// ==================== 更新函数 ====================

function updateAccountInfo() {
    const totalAssets = getTotalAssets();
    const profit = totalAssets - userData.initialBalance;
    const profitRate = ((profit / userData.initialBalance) * 100).toFixed(2);
    
    document.getElementById('balance').textContent = `¥${userData.balance.toFixed(2)}`;
    document.getElementById('totalAssets').textContent = `¥${totalAssets.toFixed(2)}`;
    document.getElementById('totalProfit').textContent = `¥${profit.toFixed(2)}`;
    document.getElementById('profitRate').textContent = `${profit >= 0 ? '+' : ''}${profitRate}%`;
    
    document.getElementById('totalProfit').className = profit >= 0 ? 'positive' : 'negative';
    document.getElementById('profitRate').className = profit >= 0 ? 'positive' : 'negative';
}

function updateHoldings() {
    const list = document.getElementById('holdingsList');
    const codes = Object.keys(userData.holdings);
    if (codes.length === 0) {
        list.innerHTML = '<p class="empty">暂无持仓</p>';
        return;
    }
    list.innerHTML = '';
    codes.forEach(code => {
        const holding = userData.holdings[code];
        const stock = stocks.find(s => s.code === code);
        if (!stock) return;
        const currentValue = stock.price * holding.amount;
        const cost = holding.avgPrice * holding.amount;
        const profit = currentValue - cost;
        const profitPercent = ((profit / cost) * 100).toFixed(2);
        
        const item = document.createElement('div');
        item.className = 'holding-item';
        item.innerHTML = `
            <div class="holding-header">
                <span><strong>${code}</strong> - ${holding.amount}股</span>
            </div>
            <div class="holding-details">
                <div class="holding-row">
                    <span class="label">当前价:</span>
                    <span class="value">¥${stock.price.toFixed(2)}</span>
                </div>
                <div class="holding-row">
                    <span class="label">平均成本:</span>
                    <span class="value">¥${holding.avgPrice.toFixed(2)}</span>
                </div>
            </div>
            <div class="${profit >= 0 ? 'positive' : 'negative'} holding-profit">
                盈亏: ¥${profit.toFixed(2)} (${profit >= 0 ? '+' : ''}${profitPercent}%)
            </div>
        `;
        list.appendChild(item);
    });
}

function updateTradeHistory() {
    const list = document.getElementById('tradeHistory');
    if (userData.history.length === 0) {
        list.innerHTML = '<p class="empty">暂无记录</p>';
        return;
    }
    list.innerHTML = '';
    userData.history.slice(0, 20).forEach(record => {
        const item = document.createElement('div');
        item.className = 'history-item';
        const typeClass = record.isOrder || record.isStopOrder ? ' (委托)' : '';
        item.innerHTML = `
            <span class="type ${record.type}">${record.type === 'buy' ? '买入' : '卖出'}${typeClass}</span>
            <span>${record.stock}</span>
            <span>${record.amount}股</span>
            <span>¥${record.price.toFixed(2)}</span>
        `;
        list.appendChild(item);
    });
}

function getTotalAssets() {
    let total = userData.balance;
    Object.keys(userData.holdings).forEach(code => {
        const holding = userData.holdings[code];
        const stock = stocks.find(s => s.code === code);
        if (stock) total += stock.price * holding.amount;
    });
    return total;
}

// ==================== 价格更新 ====================

// 图表更新节流：记录上次图表更新时间
let lastChartUpdateTime = 0;
const CHART_UPDATE_INTERVAL = 60000; // 1分钟 = 60000毫秒

function startPriceUpdates() {
    console.log('开始价格更新定时器...');
    
    // 更新页面状态指示器
    const statusEl = document.getElementById('priceUpdateStatus');
    if (statusEl) {
        statusEl.textContent = '价格更新: 运行中';
        statusEl.style.background = '#4caf50';
    }
    
    updateInterval = setInterval(() => {
        try {
            updateStockPrices();
            checkOrders();
            checkStopOrders();
            renderStockList();
            
            if (selectedStockCode) {
                updateTradePanel();
                
                // 节流：图表最多1分钟更新一次
                const now = Date.now();
                if (now - lastChartUpdateTime >= CHART_UPDATE_INTERVAL) {
                    updateChartData();
                    lastChartUpdateTime = now;
                    console.log('图表已更新');
                }
            }
            
            updateAccountInfo();
            updateHoldings();
            updateSimDate();
            
            // 更新状态指示器的最后更新时间
            if (statusEl) {
                const now = new Date();
                statusEl.textContent = `价格更新: ${now.getSeconds()}秒`;
            }
        } catch (error) {
            console.error('价格更新出错:', error);
            if (statusEl) {
                statusEl.textContent = '价格更新: 出错';
                statusEl.style.background = '#f44336';
            }
        }
    }, 1000); // 改为1秒更新一次数据（原来200ms太快）
    
    console.log('定时器已启动，ID:', updateInterval);
}

function updateStockPrices() {
    // 调试输出：确认函数被调用
    if (Math.random() < 0.01) {  // 只在约1%的时间内输出，避免刷屏
        console.log('价格更新中...', stocks[0].code, stocks[0].price, 'index:', stocks[0].currentIndex);
    }
    
    stocks.forEach(stock => {
        // 计算该股票的价格中间值（用于均值回归）
        const midPrice = (stock.minPrice + stock.maxPrice) / 2;
        
        if (stock.currentIndex < stock.history.length - 1) {
            // 播放历史数据
            stock.currentIndex++;
            const historyPoint = stock.history[stock.currentIndex];
            const oldPrice = stock.price;
            stock.price = historyPoint.price;
            stock.change = stock.price - oldPrice;
            stock.changePercent = oldPrice !== 0 ? (stock.change / oldPrice) * 100 : 0;
        } else {
            // 随机生成新价格，使用均值回归模型
            const oldPrice = stock.price;
            
            // 均值回归力量（回归到该股票的阈值中间值）
            const meanReversionForce = (midPrice - oldPrice) * 0.01;
            
            // 随机波动
            const randomChange = (Math.random() - 0.5) * 2;
            
            let newPrice = oldPrice + meanReversionForce + randomChange;
            
            // 涨跌停限制
            const limitUp = oldPrice * 1.1;
            const limitDown = oldPrice * 0.9;
            newPrice = Math.max(limitDown, Math.min(limitUp, newPrice));
            
            // 使用股票设定的阈值范围
            newPrice = Math.max(stock.minPrice, Math.min(stock.maxPrice, newPrice));
            
            stock.price = newPrice;
            stock.change = stock.price - oldPrice;
            stock.changePercent = (stock.change / oldPrice) * 100;
            
            stock.history.push({ 
                time: Date.now(), 
                price: stock.price, 
                volume: Math.floor(Math.random() * 1000000) 
            });
        }
        
        // 限制history长度
        if (stock.history.length > 2000) {
            stock.history = stock.history.slice(-2000);
            stock.currentIndex = stock.history.length - 1;
        }
    });
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
}

// ==================== 通知 ====================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #4caf50; color: white;
        padding: 15px 20px; border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000; animation: slideIn 0.3s ease;
        max-width: 400px; font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// 监听输入
document.addEventListener('DOMContentLoaded', function() {
    const tradeAmountInput = document.getElementById('tradeAmount');
    if (tradeAmountInput) tradeAmountInput.addEventListener('input', updateTotalCost);
});
window.addEventListener('beforeunload', saveUserData);
