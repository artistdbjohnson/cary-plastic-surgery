"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Tx } from "@/components/tx";
import { LIVE_APPOINTMENT, PHONE_DISPLAY, PHONE_TEL } from "@/lib/nav";

const NOTE_EN =
  "This is an independent design study — your request was not sent. Please call 919-233-1933 or use the live form at caryplasticsurgery.com.";
const NOTE_PT =
  "Este é um estudo de design independente — o seu pedido não foi enviado. Por favor, telefone para o 919-233-1933 ou utilize o formulário ativo em caryplasticsurgery.com.";

const SMS =
  "By providing your phone number, you consent to receive SMS text messages from Cary Plastic Surgery for appointment reminders, marketing messages, and general two-way communication. Msg frequency varies. Msg & data rates may apply. Reply HELP for support. Reply STOP to opt out.";

function StudyNote() {
  return (
    <div className="mt-8 border-t border-gold pt-6 text-sm leading-relaxed" role="status">
      <p className="lang-en">
        This is an independent design study — your request was not sent. Please call{" "}
        <a className="prose-link" href={PHONE_TEL}>
          {PHONE_DISPLAY}
        </a>{" "}
        or use the live form at{" "}
        <a className="prose-link" href={LIVE_APPOINTMENT} target="_blank" rel="noopener noreferrer">
          caryplasticsurgery.com
        </a>
        .
      </p>
      <p className="lang-pt">
        Este é um estudo de design independente — o seu pedido não foi enviado. Por favor, telefone para o{" "}
        <a className="prose-link" href={PHONE_TEL}>
          {PHONE_DISPLAY}
        </a>{" "}
        ou utilize o formulário ativo em{" "}
        <a className="prose-link" href={LIVE_APPOINTMENT} target="_blank" rel="noopener noreferrer">
          caryplasticsurgery.com
        </a>
        .
      </p>
      <span className="sr-only">
        {NOTE_EN}
        {NOTE_PT}
      </span>
    </div>
  );
}

function Honeypot() {
  return (
    <p className="sr-only" aria-hidden="true">
      <label>
        <Tx text="Do not fill out this field" />
        <input tabIndex={-1} autoComplete="off" name="company" />
      </label>
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="caps text-muted">
        <Tx text={label} />
        {optional ? (
          <span className="ml-2 normal-case tracking-normal">
            <Tx text="(optional)" />
          </span>
        ) : null}
      </span>
      <input className="field" name={name} type={type} required={required} />
    </label>
  );
}

function Chips({ name, options, required = false }: { name: string; options: string[]; required?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((opt, i) => (
        <label key={opt} className="chip">
          <input className="sr-only" type="radio" name={name} value={opt} required={required && i === 0} />
          <Tx text={opt} />
        </label>
      ))}
    </div>
  );
}

function SmsNote() {
  return (
    <div className="text-sm text-muted">
      <p className="caps text-ink">
        <Tx text="Text Message Opt-In Disclaimer" />
      </p>
      <p className="mt-2">
        <Tx text={SMS} />
      </p>
      <p className="mt-2">
        <Link className="prose-link" href="/privacy-policy">
          <Tx text="Privacy Policy" />
        </Link>
        <span className="mx-2 text-muted">|</span>
        <Link className="prose-link" href="/terms-and-conditions">
          <Tx text="Terms & Conditions" />
        </Link>
      </p>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <form onSubmit={onSubmit} className="relative min-w-0 space-y-6" noValidate={false}>
      <Honeypot />
      <Field label="Name" name="name" required />
      <Field label="E-mail" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" required />
      <div>
        <p className="caps mb-3 text-muted">
          <Tx text="Preferred Contact Method" /> <Tx text="(optional)" />
        </p>
        <Chips name="contact-method" options={["Call", "Text", "E-mail"]} />
      </div>
      <SmsNote />
      <label className="block">
        <span className="caps text-muted">
          <Tx text="Message" />
        </span>
        <textarea className="field min-h-32" name="message" required />
      </label>
      <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm text-paper">
        <Tx text="Send" />
      </button>
      {sent ? <StudyNote /> : null}
    </form>
  );
}

export function AppointmentForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <form onSubmit={onSubmit} className="relative min-w-0 space-y-12">
      <Honeypot />
      <fieldset className="space-y-6">
        <legend className="caps mb-4 text-ink">
          <Tx text="Personal Information" />
        </legend>
        <Field label="Name" name="name" required />
        <Field label="E-mail" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="Preferred Contact Method" /> <Tx text="(optional)" />
          </p>
          <Chips name="contact-method" options={["Call", "Text", "E-mail"]} />
        </div>
        <SmsNote />
      </fieldset>
      <fieldset className="space-y-6">
        <legend className="caps mb-4 text-ink">
          <Tx text="Appointment Information" />
        </legend>
        <Field label="Preferred Date" name="date" type="date" optional />
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="Preferred Time" />
          </p>
          <Chips
            name="time"
            required
            options={["Whatever gets me in fastest", "Morning", "Afternoon", "Contact me to arrange"]}
          />
        </div>
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="I Am A" />
          </p>
          <Chips name="patient-type" required options={["New Patient", "Existing Patient"]} />
        </div>
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="Inquiring About" />
          </p>
          <Chips name="about" required options={["Breast", "Body", "Face", "Cosmetic", "Other"]} />
        </div>
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="Insurance Type" />
          </p>
          <Chips
            name="insurance"
            required
            options={["Contact me to arrange", "Self-pay / Out-of-pocket", "HMO", "PPO", "I'm not sure"]}
          />
        </div>
        <div>
          <p className="caps mb-3 text-muted">
            <Tx text="Referred By" /> <Tx text="(optional)" />
          </p>
          <Chips name="referred" options={["Web search", "Social Media", "Family member", "Friend", "Other"]} />
        </div>
      </fieldset>
      <fieldset className="space-y-6">
        <legend className="caps mb-4 text-ink">
          <Tx text="Message" />
        </legend>
        <textarea className="field min-h-32" name="message" required aria-label="Message" />
      </fieldset>
      <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm text-paper">
        <Tx text="Send" />
      </button>
      {sent ? <StudyNote /> : null}
    </form>
  );
}
