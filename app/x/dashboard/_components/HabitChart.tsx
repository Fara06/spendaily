/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useGetHabits } from "@/query/dashboard";

export default function HabitCards() {
  const { data: habits = [], isLoading } = useGetHabits();

  const goodHabits = habits.filter((h) => h.habit_type === "good");
  const badHabits = habits.filter((h) => h.habit_type === "bad");

  if (isLoading) {
    return (
      <div className="col-span-12 text-center text-on-surface-variant py-8">
        Loading habits...
      </div>
    );
  }

  return (
    <>
      <HabitSection type="good" title="Good Habits" items={goodHabits} />
      <HabitSection type="bad" title="Bad Habits" items={badHabits} />
    </>
  );
}

function HabitSection({
  type,
  title,
  items,
}: {
  type: "good" | "bad";
  title: string;
  items: any[];
}) {
  const isGood = type === "good";

  return (
    <div
      className={`col-span-12 md:col-span-6 p-8 rounded-xl flex flex-col gap-6 ${
        isGood ? "bg-secondary-container/40" : "bg-primary-container/30"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isGood
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-primary-container text-on-primary-container"
          }`}
        >
          {isGood ? (
            <ThumbsUp size={20} fill="currentColor" />
          ) : (
            <ThumbsDown size={20} fill="currentColor" />
          )}
        </div>
        <h4 className="font-bold text-xl">{title}</h4>
      </div>

      {items.length === 0 ? (
        <p className="text-on-surface-variant text-sm text-center py-4">
          No {type} habits detected yet.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/60 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                    isGood
                      ? "bg-secondary-container/50 text-secondary"
                      : "bg-primary-container/50 text-primary"
                  }`}
                >
                  {item.score}
                </div>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}