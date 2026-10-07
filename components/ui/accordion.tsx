"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className = "", ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={`border-b border-line ${className}`} {...props} />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className = "", children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`group flex flex-1 items-center justify-between gap-6 py-4 text-left font-medium text-[17px] leading-snug ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden className="text-muted transition-transform duration-300 group-data-[state=open]:rotate-45">
        +
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className = "", children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[acc-up_0.28s_ease] data-[state=open]:animate-[acc-down_0.32s_ease]"
    {...props}
  >
    <div className={`pb-5 text-muted ${className}`}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
