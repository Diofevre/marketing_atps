"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { fadeInUpVariants, scaleInVariants, viewportSettings } from "@/lib/motion";

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

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
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

      toast.success("Message sent! Check your inbox for a confirmation.");
      setSuccess(true);
      form.reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const inputClass =
    "bg-[#F9F9F9] border-[#1b0c25]/10 focus-visible:ring-brand/20 focus-visible:border-[#1b0c25]/30 h-11 sm:h-12 rounded-[10px] text-sm sm:text-base";

  return (
    <div className="py-[120px] pb-20 max-lg:py-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute z-0 left-[-200px] top-[-100px] rounded-[600px] w-[500px] h-[400px] bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_31.09%,#fcab83_70.46%,#ff49d4_100%)] blur-[100px] opacity-[0.15] max-lg:hidden" />
      <div className="absolute z-0 right-[-100px] bottom-[100px] rounded-[600px] w-[500px] h-[400px] bg-[linear-gradient(145deg,#efe8f6_0%,#d588fb_60.83%,#ff49d4_100%)] blur-[100px] opacity-[0.15] max-lg:hidden" />

      <Container className="relative z-10 flex flex-col justify-center items-center gap-[60px] max-lg:gap-8">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center w-full max-w-[800px]"
        >
          <TitleSection title="Contact" />
          <h1 className="font-medium text-4xl sm:text-5xl lg:text-[60px] lg:leading-[60px] text-[#1b0c25]">
            Get in touch with our team
          </h1>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 w-full bg-white rounded-[24px] p-4 sm:p-6 lg:p-10 border border-[#1b0c25]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-8 lg:gap-12 lg:min-w-0 lg:flex-1 lg:max-w-[420px]">
            <div className="flex flex-col gap-6">
              <p className="font-medium text-base lg:text-[17px] leading-[28px] text-[#1b0c25]/80">
                Feel free to reach out - we'd love to connect.
              </p>
              <div className="flex flex-wrap gap-6 lg:gap-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b0c25]/5 flex items-center justify-center shrink-0">
                    <Mail className="text-[#1b0c25]" size={20} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-[15px] leading-[26px] text-[#1b0c25]">Email us</p>
                    <p className="font-normal text-[15px] leading-[26px] text-[#1b0c25]/60">
                      contact@myatps.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b0c25]/5 flex items-center justify-center shrink-0">
                    <LifeBuoy className="text-[#1b0c25]" size={20} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-[15px] leading-[26px] text-[#1b0c25]">Get support</p>
                    <p className="font-normal text-[15px] leading-[26px] text-[#1b0c25]/60">
                      Chat with us
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex flex-col gap-6 p-6 bg-[#F9F9F9] rounded-2xl">
              <blockquote className="text-lg lg:text-[20px] font-medium leading-[28px] text-[#1b0c25]">
                "MyATPS gave me the confidence to sit my ATPL exams. The AI
                tutor answered every question I had, and the ATC simulator
                is simply unmatched."
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/imageCont.png"
                  alt="Thomas L."
                  height={48}
                  width={48}
                  className="rounded-full shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="flex flex-col gap-0 min-w-0">
                  <p className="text-[14px] font-medium text-[#1b0c25] leading-tight">Thomas L.</p>
                  <p className="text-[13px] font-normal text-[#1b0c25]/60">
                    Commercial Pilot Student, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form / Success */}
          <div className="lg:flex-1 lg:min-w-0">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center gap-6 h-full min-h-[400px] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1b0c25]/5 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#1b0c25]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-[#1b0c25]">Message sent!</h2>
                  <p className="text-[15px] text-[#1b0c25]/60 max-w-[320px]">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                    Check your inbox for a confirmation email.
                  </p>
                </div>
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="h-11 px-6 rounded-[10px] text-[#1b0c25] border-[#1b0c25]/20 hover:bg-[#1b0c25] hover:text-white"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 sm:gap-5"
                >
                  {/* Row 1 — First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            First Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" className={inputClass} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" className={inputClass} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 2 — Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            Email <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className={inputClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 000 000 0000"
                              className={inputClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 3 — Profile & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="profile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            I am a
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={`${inputClass} w-full`}>
                                <SelectValue placeholder="Select your profile" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">Student Pilot</SelectItem>
                              <SelectItem value="school">Flight School / Aviation Academy</SelectItem>
                              <SelectItem value="instructor">Flight Instructor</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                            Subject
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={`${inputClass} w-full`}>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="billing">Subscription & Billing</SelectItem>
                              <SelectItem value="school">Flight School Partnership (Pro)</SelectItem>
                              <SelectItem value="demo">Demo Request</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-[15px] font-medium text-[#1b0c25]">
                          Message <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us how we can help you..."
                            className="bg-[#F9F9F9] border-[#1b0c25]/10 focus-visible:ring-brand/20 focus-visible:border-[#1b0c25]/30 min-h-[120px] rounded-[10px] text-sm sm:text-base resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="group w-full h-12 text-[16px] font-medium text-white bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[10px] overflow-hidden disabled:opacity-60"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <span className="flex flex-col items-center h-[26px] overflow-hidden">
                          <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                            Submit Message
                          </span>
                          <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                            Submit Message
                          </span>
                        </span>
                      )}
                    </Button>
                    <p className="text-[13px] font-normal text-[#1b0c25]/50 leading-[20px] text-center max-w-[320px]">
                      By submitting this form you agree to our friendly Privacy Policy
                    </p>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
