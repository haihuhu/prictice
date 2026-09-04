'use client';

import React, { useState, useEffect } from 'react';

// --- 类型定义 ---
type TabType = 'basic' | 'regular';
type DisplayMode = 'year' | 'month';

interface TableRowData {
  period: number | string;
  principal?: number;
  profit: number;
  finalAmount: number;
  rateOfReturn?: string;
}

interface ResultData {
  totalProfit: number;
  finalAmount: number;
  totalInvested: number;
  tableData: TableRowData[];
}

export default function CompoundCalculator() {
  const [tab, setTab] = useState<TabType>('regular');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [tableDisplay, setTableDisplay] = useState<DisplayMode>('year'); // 表格展示按年还是按月

  // --- 表单状态 ---
  const [basic, setBasic] = useState({
    principal: '10000',
    periods: '20',
    rate: '5',
  });

  const [regular, setRegular] = useState({
    principal: '1000',
    monthly: '1000',
    term: '3',
    termUnit: 'year', // 'year' | 'month'
    rate: '5',
    rateUnit: 'year', // 'year' | 'month'
    compoundType: 'year',
  });

  // --- 结果状态 ---
  const [result, setResult] = useState<ResultData>({
    totalProfit: 0,
    finalAmount: 0,
    totalInvested: 0,
    tableData: [],
  });

  // --- 辅助函数 ---
  const formatMoney = (value: number) => {
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // --- 计算逻辑：基本复利 ---
  const calculateBasic = () => {
    const p = parseFloat(basic.principal) || 0;
    const n = parseFloat(basic.periods) || 0;
    const r = (parseFloat(basic.rate) || 0) / 100;

    const tableData: TableRowData[] = [];
    for (let i = 1; i <= n; i++) {
      const finalAmt = p * Math.pow(1 + r, i);
      const profit = finalAmt - p;
      const returnRate = ((profit / p) * 100).toFixed(2);

      tableData.push({
        period: i,
        profit,
        finalAmount: finalAmt,
        rateOfReturn: returnRate,
      });
    }

    setResult({
      totalProfit: tableData.length > 0 ? tableData[tableData.length - 1].profit : 0,
      finalAmount: tableData.length > 0 ? tableData[tableData.length - 1].finalAmount : 0,
      totalInvested: p,
      tableData,
    });
    setHasCalculated(true);
  };

  // --- 计算逻辑：定期定投 (强大的逐月推演算法，修复了单位切换和复利类型无响应的问题) ---
  const calculateRegular = (overrideDisplay?: DisplayMode) => {
    const displayMode = overrideDisplay || tableDisplay;

    const initP = parseFloat(regular.principal) || 0;
    const monthlyAdd = parseFloat(regular.monthly) || 0;
    const termValue = parseFloat(regular.term) || 0;
    const rateValue = parseFloat(regular.rate) || 0;

    // 1. 统一转换投资时长为"月"
    const isTermYear = regular.termUnit === 'year';
    const totalMonths = Math.floor(isTermYear ? termValue * 12 : termValue);

    // 2. 统一转换收益率为相关的标准率
    const isRateYear = regular.rateUnit === 'year';
    const annualRate = isRateYear ? rateValue / 100 : (rateValue * 12) / 100;
    const monthlyRate = annualRate / 12;
    const dailyRate = annualRate / 360; // 遵循金融算法 日复利 360/年

    let basePrincipal = initP;
    let accumulatedDeposits = 0;
    let accumulatedInterest = 0;
    let totalInvested = initP;
    let totalProfit = 0;

    let lastOutputTotalProfit = 0;
    const tableData: TableRowData[] = [];

    // 逐月推演模拟
    for (let t = 1; t <= totalMonths; t++) {
      // 规则：从第二个月开始追加本金
      const deposit = t > 1 ? monthlyAdd : 0;

      // === A. 计算当月利息与本金累加 ===
      if (regular.compoundType === 'day') {
        // 日复利：本金每天复滚（按每月30天计算）
        basePrincipal += deposit;
        const interestThisMonth = basePrincipal * (Math.pow(1 + dailyRate, 30) - 1);
        basePrincipal += interestThisMonth;

        totalInvested += deposit;
        totalProfit += interestThisMonth;
      } else {
        // 其他复利方式：判断复利周期（月）
        let C = 12; // 默认年复利 (12个月)
        if (regular.compoundType === 'half-year') C = 6;
        else if (regular.compoundType === 'quarter') C = 3;
        else if (regular.compoundType === 'month') C = 1;

        accumulatedDeposits += deposit;
        totalInvested += deposit;

        // 周期内单利计息
        const interestThisMonth = (basePrincipal + accumulatedDeposits) * monthlyRate;
        accumulatedInterest += interestThisMonth;
        totalProfit += interestThisMonth;

        // 若到达复利周期节点，或投资期结束，将利息和追加金结转为复利本金
        if (t % C === 0 || t === totalMonths) {
          basePrincipal += accumulatedDeposits + accumulatedInterest;
          accumulatedDeposits = 0;
          accumulatedInterest = 0;
        }
      }

      // === B. 处理表格输出逻辑 ===
      const currentFinalAmount =
        regular.compoundType === 'day'
          ? basePrincipal
          : basePrincipal + accumulatedDeposits + accumulatedInterest;

      let isEndOfDisplayPeriod = false;
      let periodLabel: string | number = '';

      if (displayMode === 'year') {
        if (t % 12 === 0) {
          isEndOfDisplayPeriod = true;
          periodLabel = t / 12; // 刚好满一年
        } else if (t === totalMonths) {
          isEndOfDisplayPeriod = true;
          periodLabel = `第${t}个月`; // 不满一年时的期末显示
        }
      } else {
        // 按月展示
        isEndOfDisplayPeriod = true;
        periodLabel = t;
      }

      if (isEndOfDisplayPeriod) {
        // 本期新增收益
        const periodProfit = totalProfit - lastOutputTotalProfit;
        // 本期本金 = 最终金额 - 本期新增收益
        const periodPrincipal = currentFinalAmount - periodProfit;

        tableData.push({
          period: periodLabel,
          principal: periodPrincipal,
          profit: periodProfit,
          finalAmount: currentFinalAmount,
        });

        lastOutputTotalProfit = totalProfit; // 更新标记
      }
    }

    const finalAmt =
      regular.compoundType === 'day'
        ? basePrincipal
        : basePrincipal + accumulatedDeposits + accumulatedInterest;

    setResult({
      totalProfit,
      finalAmount: finalAmt,
      totalInvested,
      tableData,
    });
    setHasCalculated(true);
  };

  // 处理表格展示维度的切换 (立刻刷新数据)
  const handleTableDisplayChange = (mode: DisplayMode) => {
    setTableDisplay(mode);
    calculateRegular(mode);
  };

  // 组件挂载时默认计算一次定投
  useEffect(() => {
    calculateRegular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden font-sans text-gray-800">
      {/* 顶部 Tab 切换 */}
      <div className="flex border-b text-center text-gray-600">
        <button
          onClick={() => setTab('basic')}
          className={`flex-1 py-4 cursor-pointer hover:bg-gray-50 focus:outline-none transition-colors ${
            tab === 'basic' ? 'text-teal-600 border-b-2 border-teal-600 font-bold' : ''
          }`}
        >
          基本
        </button>
        <button
          onClick={() => setTab('regular')}
          className={`flex-1 py-4 cursor-pointer hover:bg-gray-50 focus:outline-none transition-colors ${
            tab === 'regular' ? 'text-teal-600 border-b-2 border-teal-600 font-bold' : ''
          }`}
        >
          定期定投
        </button>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {tab === 'basic' ? '复利计算器' : '定期定投复利计算器'}
        </h1>

        {/* ================= 表单区域：基本 ================= */}
        {tab === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">初始本金 (¥)</label>
              <input
                type="number"
                value={basic.principal}
                onChange={(e) => setBasic({ ...basic, principal: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">投资期数 (n)</label>
              <input
                type="number"
                value={basic.periods}
                onChange={(e) => setBasic({ ...basic, periods: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">收益率 (%)</label>
              <input
                type="number"
                value={basic.rate}
                onChange={(e) => setBasic({ ...basic, rate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={calculateBasic}
              className="mt-4 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              计算
            </button>
          </div>
        )}

        {/* ================= 表单区域：定期定投 ================= */}
        {tab === 'regular' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">初始本金 (¥)</label>
              <input
                type="number"
                value={regular.principal}
                onChange={(e) => setRegular({ ...regular, principal: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                每月定投金额 (¥){' '}
                <span className="text-xs text-gray-400">* 从第二个月开始追加本金。</span>
              </label>
              <input
                type="number"
                value={regular.monthly}
                onChange={(e) => setRegular({ ...regular, monthly: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm whitespace-nowrap">投资期限</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="termUnit"
                    value="year"
                    checked={regular.termUnit === 'year'}
                    onChange={(e) => setRegular({ ...regular, termUnit: e.target.value })}
                    className="accent-teal-600"
                  />{' '}
                  年
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="termUnit"
                    value="month"
                    checked={regular.termUnit === 'month'}
                    onChange={(e) => setRegular({ ...regular, termUnit: e.target.value })}
                    className="accent-teal-600"
                  />{' '}
                  个月
                </label>
              </div>
            </div>
            <input
              type="number"
              value={regular.term}
              onChange={(e) => setRegular({ ...regular, term: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm whitespace-nowrap">收益率</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="rateUnit"
                    value="year"
                    checked={regular.rateUnit === 'year'}
                    onChange={(e) => setRegular({ ...regular, rateUnit: e.target.value })}
                    className="accent-teal-600"
                  />{' '}
                  年
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="rateUnit"
                    value="month"
                    checked={regular.rateUnit === 'month'}
                    onChange={(e) => setRegular({ ...regular, rateUnit: e.target.value })}
                    className="accent-teal-600"
                  />{' '}
                  月
                </label>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                value={regular.rate}
                onChange={(e) => setRegular({ ...regular, rate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">复利方式</label>
              <select
                value={regular.compoundType}
                onChange={(e) => setRegular({ ...regular, compoundType: e.target.value })}
                className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
              >
                <option value="year">年复利</option>
                <option value="half-year">半年复利</option>
                <option value="quarter">每季度复利</option>
                <option value="month">月复利</option>
                <option value="day">日复利 (360/年)</option>
              </select>
            </div>

            <button
              onClick={() => calculateRegular()}
              className="mt-4 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              计算
            </button>
          </div>
        )}

        {/* ================= 结果展示区域 ================= */}
        {hasCalculated && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {/* 汇总数据 */}
            <div className="grid grid-cols-2 gap-4 text-center mb-8">
              <div>
                <div className="text-gray-600 mb-1">总收益</div>
                <div className="text-3xl font-bold text-green-600">
                  ¥{formatMoney(result.totalProfit)}
                </div>
                {tab === 'regular' && (
                  <>
                    <div className="mt-4 text-gray-600 text-sm">总投资额</div>
                    <div className="text-xl text-gray-400">
                      ¥{formatMoney(result.totalInvested)}
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="text-gray-600 mb-1">最终金额</div>
                <div className="text-3xl font-bold text-orange-500">
                  ¥{formatMoney(result.finalAmount)}
                </div>
              </div>
            </div>

            {/* 定期定投的表格视图维度切换 (原图中表格上方的那组单选) */}
            {tab === 'regular' && (
              <div className="flex justify-center items-center gap-4 mb-3 text-sm text-gray-700">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    value="year"
                    checked={tableDisplay === 'year'}
                    onChange={() => handleTableDisplayChange('year')}
                    className="accent-teal-600"
                  />{' '}
                  年
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    value="month"
                    checked={tableDisplay === 'month'}
                    onChange={() => handleTableDisplayChange('month')}
                    className="accent-teal-600"
                  />{' '}
                  月
                </label>
              </div>
            )}

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                    <th className="py-2 px-3 text-center border-r border-gray-200 font-medium">
                      {tab === 'basic' ? '#' : tableDisplay === 'year' ? '年' : '月'}
                    </th>
                    {tab === 'regular' && <th className="py-2 px-3 font-medium">本金 (¥)</th>}
                    <th className="py-2 px-3 font-medium">收益 (¥)</th>
                    <th className="py-2 px-3 font-medium">
                      {tab === 'basic' ? '总额 (¥)' : '最终金额 (¥)'}
                    </th>
                    {tab === 'basic' && <th className="py-2 px-3 font-medium">收益率</th>}
                  </tr>
                </thead>
                <tbody>
                  {result.tableData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3 text-center border-r border-gray-200 bg-gray-100 font-bold text-gray-600 whitespace-nowrap">
                        {row.period}
                      </td>
                      {tab === 'regular' && (
                        <td className="py-2 px-3">{formatMoney(row.principal || 0)}</td>
                      )}
                      <td className="py-2 px-3 text-green-600">+{formatMoney(row.profit)}</td>
                      <td className="py-2 px-3 text-orange-500">{formatMoney(row.finalAmount)}</td>
                      {tab === 'basic' && <td className="py-2 px-3">{row.rateOfReturn}%</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 底部按钮 (Mock) */}
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-[#4fb993] hover:bg-[#3d9475] transition-colors text-white px-4 py-2 rounded shadow flex items-center gap-1 text-sm">
                分享 <span>→</span>
              </button>
              <button className="bg-[#4fb993] hover:bg-[#3d9475] transition-colors text-white px-4 py-2 rounded shadow flex items-center gap-1 text-sm">
                图片 <span>↓</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 用于隐藏数字输入框自带的上下箭头 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
      `,
        }}
      />
    </div>
  );
}
