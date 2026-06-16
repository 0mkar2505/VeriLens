"use client";

import { ChevronRight } from "lucide-react";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqProItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

type FaqProProps = {
  className?: string;
  defaultOpenFirst?: boolean;
  items: FaqProItem[];
};

export function FaqPro({ className, defaultOpenFirst = false, items }: FaqProProps) {
  const defaultValue = defaultOpenFirst && items[0] ? items[0].id : undefined;

  return (
    <Accordion
      className={cn("faq-pro", className)}
      defaultValue={defaultValue}
      type="single"
      collapsible
    >
      {items.map((item) => (
        <AccordionItem className="faq-pro-item" key={item.id} value={item.id}>
          <AccordionTrigger className="faq-pro-trigger">
            <span>{item.question}</span>
            <ChevronRight aria-hidden="true" className="faq-pro-icon" />
          </AccordionTrigger>
          <AccordionContent className="faq-pro-content">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
