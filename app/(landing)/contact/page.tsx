"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Mail, LifeBuoy, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUpVariants, staggerContainer, viewportSettings } from "@/lib/motion";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  profile: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

/* ── Floating Input ─────────────────────────────── */
function FloatingInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || !!value;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <label
          className={`absolute left-3 pointer-events-none transition-all duration-200 ease-out ${
            floating
              ? "-top-2 text-[11px] bg-white px-1 text-[#1b0c25]/50 z-10"
              : "top-3.5 text-sm text-[#1b0c25]/30"
          }`}
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          className={`w-full border rounded-lg bg-white h-12 px-3 text-sm text-[#1b0c25] outline-none transition-colors ${
            error
              ? "border-red-300 focus:border-red-400"
              : "border-[#1b0c25]/15 focus:border-[#1b0c25]/40"
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
}

/* ── Floating Textarea ─────────────────────────── */
function FloatingTextarea({
  label,
  required,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || !!value;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <label
          className={`absolute left-3 pointer-events-none transition-all duration-200 ease-out ${
            floating
              ? "-top-2 text-[11px] bg-white px-1 text-[#1b0c25]/50 z-10"
              : "top-3.5 text-sm text-[#1b0c25]/30"
          }`}
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          rows={4}
          className={`w-full border rounded-lg bg-white px-3 pt-4 pb-3 text-sm text-[#1b0c25] outline-none resize-none transition-colors ${
            error
              ? "border-red-300 focus:border-red-400"
              : "border-[#1b0c25]/15 focus:border-[#1b0c25]/40"
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
}

/* ── Floating Select ───────────────────────────── */
function FloatingSelect({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  const floating = !!value;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <label
          className={`absolute pointer-events-none transition-all duration-200 ease-out z-10 ${
            floating
              ? "-top-2 left-3 text-[11px] bg-white px-1 text-[#1b0c25]/50"
              : "top-1/2 left-3 -translate-y-1/2 text-sm text-[#1b0c25]/30"
          }`}
        >
          {label}
        </label>
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger
            className={`w-full border rounded-lg bg-white h-12 px-3 text-sm text-[#1b0c25] outline-none focus:ring-0 transition-colors ${
              error ? "border-red-300" : "border-[#1b0c25]/15 focus:border-[#1b0c25]/40"
            }`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
}

/* ── Page ──────────────────────────────────────── */
export default function Contact() {
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profile: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }
      toast.success("Message sent!");
      setSuccess(true);
      reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="pt-32 pb-20">
      <Container className="flex flex-col gap-16 lg:gap-20">

        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-3 max-w-xl"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
              Contact
            </span>
          </div>
          <h1 className="text-[30px] lg:text-[40px] font-medium leading-[30px] lg:leading-[40px] text-[#1b0c25]">
            Get in touch with our team
          </h1>
          <p className="text-[15px] leading-[26px] text-[#1b0c25]/50 max-w-sm">
            We typically respond within 24 hours. Fill in the form and we&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20"
        >
          {/* Left — Info */}
          <motion.div variants={fadeInUpVariants} className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#1b0c25]/5 flex items-center justify-center shrink-0">
                  <Mail className="text-[#1b0c25]" size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-medium text-[#1b0c25]">Email</p>
                  <p className="text-[14px] text-[#1b0c25]/50">contact@myatps.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#1b0c25]/5 flex items-center justify-center shrink-0">
                  <LifeBuoy className="text-[#1b0c25]" size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-medium text-[#1b0c25]">Support</p>
                  <p className="text-[14px] text-[#1b0c25]/50">Chat with us in-app</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex flex-col gap-4 border-l-2 border-[#1b0c25]/10 pl-5">
              <p className="text-[15px] font-medium leading-[26px] text-[#1b0c25]">
                &ldquo;MyATPS gave me the confidence to sit my ATPL exams. The explanations are simply unmatched.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/imageCont.png"
                  alt="Thomas L."
                  height={36}
                  width={36}
                  className="rounded-full shrink-0 grayscale"
                />
                <div>
                  <p className="text-[13px] font-medium text-[#1b0c25]">Thomas L.</p>
                  <p className="text-[12px] text-[#1b0c25]/40">Commercial Pilot Student, France</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={fadeInUpVariants}>
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center gap-6 py-20 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#1b0c25]/5 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-[#1b0c25]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-[#1b0c25]">Message sent!</h2>
                  <p className="text-[14px] text-[#1b0c25]/50 max-w-[300px]">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm font-medium text-[#1b0c25] underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FloatingInput
                        label="First Name"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.firstName?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <FloatingInput
                        label="Last Name"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.lastName?.message}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FloatingInput
                        label="Email"
                        required
                        type="email"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FloatingInput
                        label="Phone"
                        type="tel"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.phone?.message}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Controller
                    control={control}
                    name="profile"
                    render={({ field }) => (
                      <FloatingSelect
                        label="I am a"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        options={[
                          { value: "student", label: "Student Pilot" },
                          { value: "school", label: "Flight School / Academy" },
                          { value: "instructor", label: "Flight Instructor" },
                          { value: "other", label: "Other" },
                        ]}
                        error={errors.profile?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="subject"
                    render={({ field }) => (
                      <FloatingSelect
                        label="Subject"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        options={[
                          { value: "general", label: "General Inquiry" },
                          { value: "support", label: "Technical Support" },
                          { value: "billing", label: "Subscription & Billing" },
                          { value: "school", label: "Flight School Partnership" },
                          { value: "demo", label: "Demo Request" },
                          { value: "other", label: "Other" },
                        ]}
                        error={errors.subject?.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <FloatingTextarea
                      label="Message"
                      required
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.message?.message}
                    />
                  )}
                />

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-[14px] font-medium text-white bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[10px] cursor-pointer disabled:opacity-60 transition-opacity flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Message"
                    )}
                  </button>
                  <p className="text-[12px] text-[#1b0c25]/40 text-center">
                    By submitting you agree to our{" "}
                    <a href="/privacy" className="underline underline-offset-2 hover:opacity-60 transition-opacity">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
