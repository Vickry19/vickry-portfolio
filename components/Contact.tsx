"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

type ContactSettings = {
  description: string | null;

  emailLabel: string | null;
  whatsappLabel: string | null;
  whatsappText: string | null;
  locationLabel: string | null;
  availabilityText: string | null;

  nameLabel: string | null;
  emailFieldLabel: string | null;
  subjectLabel: string | null;
  messageLabel: string | null;

  namePlaceholder: string | null;
  emailPlaceholder: string | null;
  subjectPlaceholder: string | null;
  messagePlaceholder: string | null;

  buttonText: string | null;
  sendingText: string | null;
  sentText: string | null;
  successMessage: string | null;
  errorMessage: string | null;
};

export default function Contact() {
  const { settings, sections } = useSite();

  const [contactSettings, setContactSettings] =
    useState<ContactSettings | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const section = sections.find(
    (item) => item.key === "contact"
  );

  /*
  |--------------------------------------------------------------------------
  | Fetch Contact Settings
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://127.0.0.1:8000/api";

        const response = await fetch(
          `${apiUrl}/contact-settings`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch contact settings."
          );
        }

        const result = await response.json();

        setContactSettings(result.data);
      } catch (error) {
        console.error(
          "Contact settings error:",
          error
        );
      }
    };

    fetchContactSettings();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Contact Information
  |--------------------------------------------------------------------------
  */

  const email = settings?.email || "your@email.com";
  const location = settings?.location || "Indonesia";

  const whatsappUrl = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`
    : "#";

  /*
  |--------------------------------------------------------------------------
  | Submit Form
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitted(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000/api";

      const response = await fetch(
        `${apiUrl}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const validationMessages = Object.values(
            result.errors
          ).flat();

          const firstError = validationMessages.find(
            (message): message is string =>
              typeof message === "string"
          );

          throw new Error(
            firstError ||
              result.message ||
              contactSettings?.errorMessage ||
              "Something went wrong. Please try again."
          );
        }

        throw new Error(
          result.message ||
            contactSettings?.errorMessage ||
            "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : contactSettings?.errorMessage ||
              "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-[#111111] px-6 py-24 lg:px-8 lg:py-28"
    >
      {/* Background Grid */}
      <div className="futuristic-grid pointer-events-none absolute inset-0 opacity-15" />

      {/* Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">
            {section?.number || "08"} —{" "}
            {section?.eyebrow || "Contact"}
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            {section?.title || "Let's build something meaningful."}
          </h2>

          {section?.subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/45">
              {section.subtitle}
            </p>
          )}
        </motion.div>

        {/* =========================
            CONTENT
        ========================== */}

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          {/* =========================
              LEFT
          ========================== */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >

            <p className="max-w-md text-base leading-7 text-white/55">
              {contactSettings?.description ||
                "Have a project, internship opportunity, or just want to connect? Feel free to reach out. I'm always open to discussing new ideas and opportunities."}
            </p>

            {/* Contact Info */}

            <div className="mt-9 space-y-4">

              {/* EMAIL */}

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#181818] p-4 transition-all duration-300 hover:border-white/25"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-colors group-hover:text-white">
                  <Mail size={17} />
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {contactSettings?.emailLabel ||
                      "Email"}
                  </p>

                  <p className="mt-1 truncate text-sm text-white/70">
                    {email}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
                />
              </a>

              {/* WHATSAPP */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#181818] p-4 transition-all duration-300 hover:border-white/25"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-colors group-hover:text-white">
                  <MessageCircle size={17} />
                </span>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {contactSettings?.whatsappLabel ||
                      "WhatsApp"}
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    {contactSettings?.whatsappText ||
                      "Let's connect"}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
                />
              </a>

              {/* LOCATION */}

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#181818] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/50">
                  <MapPin size={17} />
                </span>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {contactSettings?.locationLabel ||
                      "Location"}
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    {location}
                  </p>
                </div>
              </div>

            </div>

            {/* Availability */}

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>

              <span className="text-xs text-white/40">
                {contactSettings?.availabilityText ||
                  "Currently open to opportunities"}
              </span>
            </div>

          </motion.div>

          {/* =========================
              RIGHT — FORM
          ========================== */}

          <motion.form
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-[#181818] p-6 sm:p-8"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
                >
                  {contactSettings?.nameLabel ||
                    "Name"}
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={
                    contactSettings?.namePlaceholder ||
                    "Your name"
                  }
                  required
                  disabled={submitting}
                  className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
                >
                  {contactSettings?.emailFieldLabel ||
                    "Email"}
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={
                    contactSettings?.emailPlaceholder ||
                    "you@example.com"
                  }
                  required
                  disabled={submitting}
                  className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

            </div>

            {/* Subject */}

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
              >
                {contactSettings?.subjectLabel ||
                  "Subject"}
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder={
                  contactSettings?.subjectPlaceholder ||
                  "What would you like to discuss?"
                }
                required
                disabled={submitting}
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Message */}

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
              >
                {contactSettings?.messageLabel ||
                  "Message"}
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={
                  contactSettings?.messagePlaceholder ||
                  "Tell me about your project..."
                }
                required
                disabled={submitting}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Error */}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
  ? contactSettings?.sendingText ||
    "Sending..."
  : submitted
    ? contactSettings?.sentText ||
      "Message Sent"
    : contactSettings?.buttonText ||
      "Send Message"}

              <Send
                size={15}
                className={`transition-transform duration-300 ${
                  !submitting
                    ? "group-hover:translate-x-1"
                    : ""
                }`}
              />
            </button>

            {/* Success */}

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs leading-5 text-white/40"
              >
                {contactSettings?.successMessage ||
                  "Thanks! Your message has been received successfully. I'll get back to you soon."}
              </motion.p>
            )}

          </motion.form>

        </div>
      </div>
    </section>
  );
}