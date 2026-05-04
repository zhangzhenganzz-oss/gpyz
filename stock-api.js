/**
 * A股股票数据API模块 - 按需加载版
 * 支持多数据源：AKShare、Tushare、Eastmoney
 * 优化：只加载查询的股票数据，节省资源
 */

class StockAPI {
    constructor() {
        this.baseURL = 'https://stock.xueqiu.com/v5/stock';
        this.eastmoneyURL = 'https://push2.eastmoney.com/api';
        this.akshareURL = 'https://akshare.akfamily.xyz/api';
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5分钟缓存
        this.stockListCache = null; // 股票列表缓存（只存代码和名称）
        this.stockListCacheTime = null;
        this.stockListCacheExpiry = 24 * 60 * 60 * 1000; // 24小时
    }

    /**
     * 获取A股股票列表（轻量级，只包含代码和名称）
     */
    async getStockList() {
        // 检查缓存
        if (this.stockListCache && this.stockListCacheTime) {
            const age = Date.now() - this.stockListCacheTime;
            if (age < this.stockListCacheExpiry) {
                return this.stockListCache;
            }
        }

        try {
            // 使用东方财富API获取所有A股（只取必要字段）
            const response = await fetch(`${this.eastmoneyURL}/qt/clist/get?pn=1&pz=5000&po=1&np=1&fltt=2&invt=2&fid=f12&fs=m:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23&fields=f12,f14,f13`);
            const data = await response.json();
            
            if (data.data && data.data.diff) {
                const stocks = data.data.diff.map(item => ({
                    code: item.f12,
                    name: item.f14,
                    market: item.f13 === '1' ? 'SH' : 'SZ'
                }));
                
                // 缓存
                this.stockListCache = stocks;
                this.stockListCacheTime = Date.now();
                
                // 同时保存到localStorage
                try {
                    localStorage.setItem('stockListCache', JSON.stringify(stocks));
                    localStorage.setItem('stockListCacheTime', Date.now().toString());
                } catch (e) {
                    console.warn('localStorage缓存失败');
                }
                
                return stocks;
            }
        } catch (error) {
            console.error('获取股票列表失败:', error);
            // 尝试从localStorage恢复
            try {
                const cached = localStorage.getItem('stockListCache');
                if (cached) {
                    return JSON.parse(cached);
                }
            } catch (e) {
                console.warn('读取缓存失败');
            }
        }
        
        return this.getFallbackStockList();
    }

    /**
     * 获取单只股票详细信息
     */
    async getStockDetail(code) {
        const cacheKey = `stock_${code}`;
        if (this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            // 并行获取多个数据源
            const [basicInfo, financialData, klineData] = await Promise.all([
                this.getBasicInfo(code),
                this.getFinancialData(code),
                this.getKlineData(code)
            ]);

            const stockDetail = {
                ...basicInfo,
                ...financialData,
                kline: klineData
            };

            this.setCache(cacheKey, stockDetail);
            return stockDetail;
        } catch (error) {
            console.error(`获取股票${code}详情失败:`, error);
            return null;
        }
    }

    /**
     * 获取股票基本信息
     */
    async getBasicInfo(code) {
        const market = code.startsWith('6') ? 'SH' : 'SZ';
        const secid = market === 'SH' ? `1.${code}` : `0.${code}`;
        
        const response = await fetch(`${this.eastmoneyURL}/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f43,f44,f45,f46,f47,f48,f49,f50,f51,f52,f57,f58,f60,f61,f62,f63,f64,f65,f66,f67,f68,f69,f70,f71,f72,f73,f74,f75,f76,f77,f78,f79,f80,f81,f82,f83,f84,f85,f86,f87,f88,f89,f90,f91,f92,f93,f94,f95,f96,f97,f98,f99,f100,f101,f102,f103,f104,f105,f106,f107,f108,f109,f110,f111,f112,f113,f114,f115,f116,f117,f118,f119,f120,f121,f122,f123,f124,f125,f126,f127,f128,f129,f130,f131,f132,f133,f134,f135,f136,f137,f138,f139,f140,f141,f142,f143,f144,f145,f146,f147,f148,f149,f150,f151,f152,f153,f154,f155,f156,f157,f158,f159,f160,f161,f162,f163,f164,f165,f166,f167,f168,f169,f170,f171,f172,f173,f174,f175,f176,f177,f178,f179,f180,f181,f182,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f193,f194,f195,f196,f197,f198,f199,f200,f201,f202,f203,f204,f205,f206,f207,f208,f209,f210,f211,f212,f213,f214,f215,f216,f217,f218,f219,f220,f221,f222,f223,f224,f225,f226,f227,f228,f229,f230,f231,f232,f233,f234,f235,f236,f237,f238,f239,f240,f241,f242,f243,f244,f245,f246,f247,f248,f249,f250,f251,f252,f253,f254,f255,f256,f257,f258,f259,f260,f261,f262,f263,f264,f265,f266,f267,f268,f269,f270,f271,f272,f273,f274,f275,f276,f277,f278,f279,f280,f281,f282,f283,f284,f285,f286,f287,f288,f289,f290,f291,f292,f293,f294,f295,f296,f297,f298,f299,f300&secid=${secid}`);
        
        const data = await response.json();
        
        if (data.data) {
            const d = data.data;
            return {
                code: code,
                name: d.f58,
                price: d.f43 ? d.f43 / 100 : 0,
                change: d.f170 ? d.f170 / 100 : 0,
                changePercent: d.f170 ? d.f170 / 100 : 0,
                open: d.f46 ? d.f46 / 100 : 0,
                high: d.f44 ? d.f44 / 100 : 0,
                low: d.f45 ? d.f45 / 100 : 0,
                volume: d.f47,
                amount: d.f48,
                marketCap: d.f20,
                pe: d.f9,
                pb: d.f23,
                roe: d.f37,
                revenue: d.f40,
                profit: d.f45,
                grossMargin: d.f49,
                netMargin: d.f57,
                debtRatio: d.f57
            };
        }
        return null;
    }

    /**
     * 获取财务数据
     */
    async getFinancialData(code) {
        const market = code.startsWith('6') ? 'SH' : 'SZ';
        
        try {
            // 获取主要财务指标
            const response = await fetch(`https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/ZYFXListV2?code=${code}&type=3`);
            const data = await response.json();
            
            if (data.result && data.result.data) {
                const financials = data.result.data;
                return {
                    roe: this.parseFinancialValue(financials.jqjzcsyl),
                    roic: this.parseFinancialValue(financials.roe),
                    grossMargin: this.parseFinancialValue(financials.xsml),
                    netMargin: this.parseFinancialValue(financials.xsjll),
                    debtRatio: this.parseFinancialValue(financials.zcfzl),
                    revenueGrowth: this.parseFinancialValue(financials.yysrzzl),
                    profitGrowth: this.parseFinancialValue(financials.jlrzzl)
                };
            }
        } catch (error) {
            console.error('获取财务数据失败:', error);
        }
        
        return {};
    }

    /**
     * 获取K线数据
     */
    async getKlineData(code, period = 101, count = 500) {
        const market = code.startsWith('6') ? '1' : '0';
        
        try {
            const response = await fetch(`${this.eastmoneyURL}/qt/stock/kline/get?secid=${market}.${code}&fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=${period}&fqt=0&end=20500101&lmt=${count}`);
            const data = await response.json();
            
            if (data.data && data.data.klines) {
                return data.data.klines.map(line => {
                    const [date, open, close, high, low, volume, amount, amplitude, pctChange, changeAmount, turnover] = line.split(',');
                    return {
                        date,
                        open: parseFloat(open),
                        close: parseFloat(close),
                        high: parseFloat(high),
                        low: parseFloat(low),
                        volume: parseFloat(volume),
                        amount: parseFloat(amount),
                        changePercent: parseFloat(pctChange)
                    };
                });
            }
        } catch (error) {
            console.error('获取K线数据失败:', error);
        }
        
        return [];
    }

    /**
     * 搜索股票
     */
    async searchStocks(keyword) {
        if (!keyword || keyword.length < 2) return [];
        
        try {
            const response = await fetch(`https://searchapi.eastmoney.com/api/suggest/get?input=${encodeURIComponent(keyword)}&type=14&count=10`);
            const data = await response.json();
            
            if (data.QuotationCodeTable && data.QuotationCodeTable.Data) {
                return data.QuotationCodeTable.Data.map(item => ({
                    code: item.Code,
                    name: item.Name,
                    market: item.Market,
                    pinyin: item.PinYin
                }));
            }
        } catch (error) {
            console.error('搜索股票失败:', error);
        }
        
        return [];
    }

    /**
     * 获取行业分类
     */
    async getIndustryStocks(industryCode) {
        try {
            const response = await fetch(`${this.eastmoneyURL}/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f12&fs=b:${industryCode}&fields=f12,f13,f14,f20,f21,f23,f24,f25,f26,f33,f34,f35,f36,f37,f38,f39,f40,f41,f42,f43,f44,f45,f46,f47,f48,f49,f50,f51,f52`);
            const data = await response.json();
            
            if (data.data && data.data.diff) {
                return data.data.diff.map(item => ({
                    code: item.f12,
                    name: item.f14,
                    price: item.f43 ? item.f43 / 100 : 0,
                    change: item.f170 ? item.f170 / 100 : 0,
                    marketCap: item.f20,
                    pe: item.f9,
                    pb: item.f23
                }));
            }
        } catch (error) {
            console.error('获取行业股票失败:', error);
        }
        
        return [];
    }

    /**
     * 获取实时行情
     */
    async getRealtimeQuote(codes) {
        if (!Array.isArray(codes)) codes = [codes];
        
        const codeStr = codes.map(code => {
            const market = code.startsWith('6') ? '1' : '0';
            return `${market}.${code}`;
        }).join(',');
        
        try {
            const response = await fetch(`${this.eastmoneyURL}/qt/ulist.np/get?fltt=2&invt=2&fields=f12,f13,f14,f20,f21,f23,f24,f25,f26,f33,f34,f35,f36,f37,f38,f39,f40,f41,f42,f43,f44,f45,f46,f47,f48,f49,f50,f51,f52,f57,f58,f60,f61,f62,f63,f64,f65,f66,f67,f68,f69,f70,f71,f72,f73,f74,f75,f76,f77,f78,f79,f80,f81,f82,f83,f84,f85,f86,f87&secids=${codeStr}`);
            const data = await response.json();
            
            if (data.data && data.data.diff) {
                return data.data.diff;
            }
        } catch (error) {
            console.error('获取实时行情失败:', error);
        }
        
        return [];
    }

    // ==================== 缓存管理 ====================

    isCacheValid(key) {
        if (!this.cache.has(key)) return false;
        const cached = this.cache.get(key);
        return Date.now() - cached.timestamp < this.cacheExpiry;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
    }

    // ==================== 辅助方法 ====================

    parseFinancialValue(value) {
        if (value === null || value === undefined || value === '-') return null;
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    }

    /**
     * 备用股票列表（当API失败时使用）
     */
    getFallbackStockList() {
        return [
            { code: '600519', name: '贵州茅台', market: 'SH' },
            { code: '000858', name: '五粮液', market: 'SZ' },
            { code: '000333', name: '美的集团', market: 'SZ' },
            { code: '600036', name: '招商银行', market: 'SH' },
            { code: '601318', name: '中国平安', market: 'SH' },
            { code: '002594', name: '比亚迪', market: 'SZ' },
            { code: '300750', name: '宁德时代', market: 'SZ' },
            { code: '601012', name: '隆基绿能', market: 'SH' },
            { code: '601166', name: '兴业银行', market: 'SH' },
            { code: '600900', name: '长江电力', market: 'SH' }
        ];
    }
}

// 创建全局实例
const stockAPI = new StockAPI();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockAPI;
}
