"use client";

import { useState, useCallback } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";

const GitHubContributionGraph = ({ data = [], lifetimeTotal }) => {
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = useCallback((e, activity) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      date: activity.date,
      count: activity.count,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  if (!data.length) return null;

  return (
    <div className="relative">
      <ContributionGraph data={data} fontSize={11} blockSize={10} blockMargin={3} totalCount={lifetimeTotal}>
        <div className="w-[calc(95vw-2rem)] overflow-x-auto md:w-auto md:overflow-hidden">
          <div className="min-w-[700px]">
            <ContributionGraphCalendar>
              {({ activity, dayIndex, weekIndex }) => (
                <g
                  className="cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(e, activity)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              )}
            </ContributionGraphCalendar>
          </div>
        </div>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount className="text-[10px] text-muted-foreground md:text-xs" />
          <ContributionGraphLegend className="text-[10px] text-muted-foreground md:text-xs" />
        </ContributionGraphFooter>
      </ContributionGraph>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-background/95 px-3 py-1.5 text-xs shadow-lg backdrop-blur-sm"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <p className="font-semibold">{tooltip.date}</p>
          <p className="text-muted-foreground">{tooltip.count} contributions</p>
        </div>
      )}
    </div>
  );
};

export default GitHubContributionGraph;
