"use client";

import { useState } from "react";
import BlogList from "./BlogList";

const TABS = [
  { id: "technical", label: "technical" },
  { id: "personal", label: "personal" },
];

export default function BlogTabs({ technical = [], personal = [] }) {
  const [active, setActive] = useState("technical");

  const activeList = active === "technical" ? technical : personal;
  const emptyMessage =
    active === "technical"
      ? "No technical articles published yet."
      : "No personal blogs published yet.";

  return (
    <div className="w-full">
      <div className="mb-6 flex gap-4 px-2 md:px-0">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative py-1 font-space-mono text-sm font-medium transition-colors ${
                isActive
                  ? "text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeList.length > 0 ? (
        <BlogList blogPosts={activeList} />
      ) : (
        <div className="py-8 px-2 md:px-0">
          <p className="font-space-mono text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}
