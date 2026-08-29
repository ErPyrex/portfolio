"use client";

import { Server, Monitor, Database, Bot } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";

interface SkillsProps {
  t: TranslationSchema;
}

export default function Skills({ t }: SkillsProps) {
  const skillCategories = [
    {
      title: t.stack_linux_title,
      subtitle: t.stack_linux_subtitle,
      icon: <Server className="h-6 w-6 text-orange-400" aria-hidden="true" />,
      items: [
        t.stack_linux_item1,
        t.stack_linux_item2,
        t.stack_linux_item3,
        t.stack_linux_item4,
      ],
      colorBorder: "hover:border-orange-500/40",
    },
    {
      title: t.stack_web_title,
      subtitle: t.stack_web_subtitle,
      icon: <Monitor className="h-6 w-6 text-indigo-400" aria-hidden="true" />,
      items: [
        t.stack_web_item1,
        t.stack_web_item2,
        t.stack_web_item3,
        t.stack_web_item4,
      ],
      colorBorder: "hover:border-indigo-500/40",
    },
    {
      title: t.stack_mobile_title,
      subtitle: t.stack_mobile_subtitle,
      icon: (
        <Database className="h-6 w-6 text-emerald-400" aria-hidden="true" />
      ),
      items: [
        t.stack_mobile_item1,
        t.stack_mobile_item2,
        t.stack_mobile_item3,
        t.stack_mobile_item4,
      ],
      colorBorder: "hover:border-emerald-500/40",
    },
    {
      title: t.stack_ai_title,
      subtitle: t.stack_ai_subtitle,
      icon: <Bot className="h-6 w-6 text-purple-400" aria-hidden="true" />,
      items: [
        t.stack_ai_item1,
        t.stack_ai_item2,
        t.stack_ai_item3,
        t.stack_ai_item4,
      ],
      colorBorder: "hover:border-purple-500/40",
    },
  ];

  return (
    <section id="stack" className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-indigo-400 font-mono text-xs uppercase tracking-wider block mb-1">
          {t.stack_title}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {t.stack_subtitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 transition-all duration-200 ${category.colorBorder}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center border border-zinc-800">
                {category.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                  {category.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                  {category.subtitle}
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-300">
              {category.items.map((item, itemIdx) => {
                const parts = item.split(" • ");
                return (
                  <li
                    key={itemIdx}
                    className="flex items-center justify-between font-mono py-0.5"
                  >
                    <span className="text-zinc-400">{parts[0]}</span>
                    {parts[1] && (
                      <span className="text-zinc-200 font-semibold text-right pl-2">
                        {parts[1]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
