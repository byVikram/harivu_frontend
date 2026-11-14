"use client";

import React, { useState } from "react";
import { TrendingUp, Layers, ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";

export interface BarGraphItem {
  id: string;
  label: string;
  category?: string;
  currentValue: number;
  previousValue?: number;
  unit?: string;
  notes?: string;
  color?: string;
}

export interface BarGraphProps {
  title?: string;
  subtitle?: string;
  data: BarGraphItem[];
  mode?: "category" | "comparison" | "timeline";
  className?: string;
  hideModeToggle?: boolean;
}

export function BarGraph({
  title = "Stock & Inventory Bar Graph",
  subtitle = "Visual distribution of supplies and count comparison",
  data,
  mode: initialMode = "comparison",
  className = "",
  hideModeToggle = false,
}: BarGraphProps) {
  const [activeMode, setActiveMode] = useState<"category" | "comparison" | "timeline">(initialMode);
  const [hoveredItem, setHoveredItem] = useState<BarGraphItem | null>(null);

  // Group by category if in category mode
  const categoryMap: { [cat: string]: number } = {};
  data.forEach((item) => {
    const cat = item.category || "General";
    categoryMap[cat] = (categoryMap[cat] || 0) + item.currentValue;
  });

  const categoryData: BarGraphItem[] = Object.entries(categoryMap).map(([cat, total], idx) => {
    const prevTotal = data
      .filter((d) => (d.category || "General") === cat)
      .reduce((acc, curr) => acc + (curr.previousValue !== undefined ? curr.previousValue : curr.currentValue), 0);

    const colors = [
      "bg-indigo-600 hover:bg-indigo-700",
      "bg-emerald-600 hover:bg-emerald-700",
      "bg-amber-600 hover:bg-amber-700",
      "bg-blue-600 hover:bg-blue-700",
      "bg-purple-600 hover:bg-purple-700",
      "bg-teal-600 hover:bg-teal-700",
    ];
    return {
      id: `cat-${idx}`,
      label: cat,
      category: cat,
      currentValue: total,
      previousValue: prevTotal,
      unit: "units",
      color: colors[idx % colors.length],
    };
  });

  const displayData: BarGraphItem[] = activeMode === "category" ? categoryData : data;

  const totalUnits = displayData.reduce((acc, curr) => acc + curr.currentValue, 0);
  const latestItem = displayData[displayData.length - 1];

  const maxVal = Math.max(
    ...displayData.map((d) =>
      activeMode === "timeline" ? d.currentValue : Math.max(d.currentValue, d.previousValue || 0)
    ),
    1
  );

  // Nice round ceiling for chart Y-axis scale
  const chartCeiling = Math.ceil(maxVal * 1.15) || 10;

  return (
    <div className={`bg-white rounded-3xl border border-natural-border shadow-subtle p-6 space-y-6 ${className}`}>
      {/* Chart Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-natural-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                activeMode === "timeline"
                  ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                  : "bg-indigo-50 text-indigo-900 border-indigo-200"
              }`}
            >
              {activeMode === "timeline" ? "Single Candle Timeline" : "Interactive Analytics"}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-natural-text">
            {title}
          </h3>
          <p className="text-xs text-natural-muted mt-0.5">{subtitle}</p>
        </div>

        {/* Mode Switcher (hidden when timeline mode or hideModeToggle is set) */}
        {!hideModeToggle && activeMode !== "timeline" && (
          <div className="flex items-center bg-natural-surface p-1 rounded-2xl border border-natural-border shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveMode("comparison")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMode === "comparison"
                  ? "bg-white text-brand-950 shadow-xs"
                  : "text-natural-muted hover:text-natural-text"
              }`}
            >
              Yesterday vs Now
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("category")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMode === "category"
                  ? "bg-white text-brand-950 shadow-xs"
                  : "text-natural-muted hover:text-natural-text"
              }`}
            >
              Category Share
            </button>
          </div>
        )}
      </div>

      {/* Legend & Summary Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-natural-warmWhite/80 p-3.5 rounded-2xl border border-natural-border text-xs">
        <div className="flex flex-wrap items-center gap-4">
          {activeMode === "timeline" ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 border border-emerald-700" />
                <span className="font-bold text-natural-text">Recorded Stock Count</span>
              </div>
              <div className="flex items-center gap-1.5 text-natural-muted">
                <span className="inline-flex items-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                  <ArrowUpRight className="w-3 h-3 text-emerald-700 shrink-0 mr-0.5" />
                  +Qty
                </span>
                <span>Added</span>
              </div>
              <div className="flex items-center gap-1.5 text-natural-muted">
                <span className="inline-flex items-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-200">
                  <ArrowDownRight className="w-3 h-3 text-rose-700 shrink-0 mr-0.5" />
                  -Qty
                </span>
                <span>Used / Reduced</span>
              </div>
            </>
          ) : activeMode === "comparison" ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-indigo-200 border border-indigo-300" />
                <span className="font-medium text-natural-text">Previous / Yesterday Count</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 border border-emerald-700" />
                <span className="font-bold text-natural-text">Current / Now Count</span>
              </div>
            </>
          ) : (
            <div className="text-natural-muted">
              <span>Showing total physical units grouped across active farm & office categories</span>
            </div>
          )}
        </div>

        <div className="font-mono text-xs">
          {activeMode === "timeline" ? (
            <>
              <span className="text-natural-muted">Latest Stock: </span>
              <strong className="text-brand-950 text-sm font-extrabold">
                {latestItem?.currentValue ?? 0} {latestItem?.unit || "units"}
              </strong>
              <span className="text-natural-muted text-[11px] ml-1.5">
                ({displayData.length} records)
              </span>
            </>
          ) : (
            <>
              <span className="text-natural-muted">Total Stock in Chart: </span>
              <strong className="text-brand-950 text-sm font-extrabold">{totalUnits} units</strong>
            </>
          )}
        </div>
      </div>

      {/* Bar Chart Visualization Canvas */}
      <div className="relative pt-6 pb-2 overflow-x-auto">
        {displayData.length === 0 ? (
          <div className="text-center py-12 text-xs text-natural-muted">No data available to plot graph.</div>
        ) : (
          <div className="min-w-[500px]">
            {/* Gridlines & Vertical Bars */}
            <div className="relative h-64 border-b border-natural-border flex items-end justify-around gap-4 sm:gap-6 px-4">
              {/* Horizontal Reference Lines */}
              {[1, 0.75, 0.5, 0.25].map((ratio) => (
                <div
                  key={ratio}
                  className="absolute left-0 right-0 border-b border-dashed border-natural-border/70 pointer-events-none flex items-center justify-end pr-2 text-[10px] text-natural-muted font-mono"
                  style={{ bottom: `${ratio * 100}%` }}
                >
                  <span className="bg-white/80 px-1 rounded">{Math.round(chartCeiling * ratio)}</span>
                </div>
              ))}

              {/* Individual Bar Columns */}
              {displayData.map((item) => {
                const currentHeightPct = Math.min(100, Math.max(6, (item.currentValue / chartCeiling) * 100));
                const prevHeightPct =
                  item.previousValue !== undefined
                    ? Math.min(100, Math.max(6, (item.previousValue / chartCeiling) * 100))
                    : 0;

                const diff = item.previousValue !== undefined ? item.currentValue - item.previousValue : 0;
                const isHovered = hoveredItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer max-w-[120px]"
                  >
                    {/* Floating Value Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-14 z-20 bg-brand-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-elevated whitespace-nowrap animate-scale-in text-center pointer-events-none">
                        <div className="text-emerald-300 font-extrabold text-xs">
                          {item.currentValue} {item.unit || "units"}
                        </div>
                        <div className="text-natural-light/80 text-[10px] font-normal">
                          {item.label}
                        </div>
                        {item.previousValue !== undefined && diff !== 0 && (
                          <div className="text-indigo-200 text-[10px] font-normal mt-0.5">
                            {diff >= 0 ? `+${diff}` : diff} from previous ({item.previousValue})
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-[9px] text-amber-200/90 font-normal italic mt-0.5 max-w-[180px] truncate">
                            {item.notes}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bars Container */}
                    <div className="w-full flex items-end justify-center h-full">
                      {activeMode === "comparison" && item.previousValue !== undefined ? (
                        /* Paired Comparison Mode (Yesterday vs Now) */
                        <div className="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-full">
                          {/* Previous Value Bar */}
                          <div className="w-1/2 flex flex-col items-center justify-end h-full">
                            <span className="text-[10px] font-mono font-bold text-natural-muted mb-1 opacity-80 group-hover:opacity-100">
                              {item.previousValue}
                            </span>
                            <div
                              style={{ height: `${prevHeightPct}%` }}
                              className="w-full bg-indigo-200 group-hover:bg-indigo-300 rounded-t-xl transition-all duration-500 shadow-2xs border border-indigo-300"
                            />
                          </div>

                          {/* Current Value Bar */}
                          <div className="w-1/2 flex flex-col items-center justify-end h-full">
                            <span className="text-[11px] font-mono font-extrabold text-brand-950 mb-1 group-hover:scale-110 transition-transform">
                              {item.currentValue}
                            </span>
                            <div
                              style={{ height: `${currentHeightPct}%` }}
                              className="w-full rounded-t-xl transition-all duration-500 shadow-xs bg-emerald-600 group-hover:bg-emerald-700 border border-emerald-700"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Single Candle Mode (Timeline or Category) */
                        <div className="w-8 sm:w-11 flex flex-col items-center justify-end h-full">
                          <span className="text-[11px] font-mono font-extrabold text-brand-950 mb-1 group-hover:scale-110 transition-transform">
                            {item.currentValue}
                          </span>
                          <div
                            style={{ height: `${currentHeightPct}%` }}
                            className={`w-full rounded-t-xl transition-all duration-500 shadow-xs ${
                              activeMode === "category"
                                ? item.color || "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-emerald-600 group-hover:bg-emerald-700 border border-emerald-700"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels Axis Row */}
            <div className="flex justify-around gap-4 sm:gap-6 px-4 pt-3 text-center">
              {displayData.map((item) => {
                const diff = item.previousValue !== undefined ? item.currentValue - item.previousValue : 0;
                const isPositive = diff >= 0;

                return (
                  <div key={item.id} className="flex-1 max-w-[120px] space-y-1">
                    <span
                      className="text-[11px] font-bold text-natural-text block truncate"
                      title={item.label}
                    >
                      {item.label}
                    </span>

                    {/* Diff pill for comparison or timeline mode */}
                    {(activeMode === "comparison" || activeMode === "timeline") &&
                      item.previousValue !== undefined &&
                      diff !== 0 && (
                        <span
                          className={`inline-flex items-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                            isPositive
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                              : "bg-rose-100 text-rose-900 border border-rose-200"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3 h-3 text-emerald-700 shrink-0 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-rose-700 shrink-0 mr-0.5" />
                          )}
                          <span>{isPositive ? `+${diff}` : diff}</span>
                        </span>
                      )}

                    {/* Percentage share for category mode */}
                    {activeMode === "category" && totalUnits > 0 && (
                      <span className="text-[10px] text-natural-muted font-mono block">
                        {Math.round((item.currentValue / totalUnits) * 100)}% share
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
