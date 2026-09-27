"use client";

import React, { useState } from "react";
import { submitContactMessage } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!formData.name.trim() || formData.phone.trim().length < 10 || formData.message.trim().length < 10) {
      setErrorMsg("Please fill in your name, a valid 10-digit phone number, and a message (at least 10 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setErrorMsg(res.message || "Could not send message. Please try again or reach out on WhatsApp.");
      }
    } catch {
      setErrorMsg("Failed to connect to server. Please try reaching out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-natural-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Connect with Harivu
          </h1>
          <p className="text-sm sm:text-base text-natural-muted">
            Have a question regarding our microgreen harvests, subscription inquiries, or restaurant/cafe supply? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Info & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-natural-cream/80 border border-natural-border/80 shadow-subtle space-y-6">
              <h2 className="font-serif text-xl font-bold text-brand-950 border-b border-natural-border pb-3">
                Contact Details
              </h2>

              <div className="space-y-4 text-sm text-natural-text">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-natural-muted block">
                      Cultivation Location
                    </span>
                    <span className="font-medium text-natural-text">
                      Bengaluru Urban, Karnataka, India
                    </span>
                    <p className="text-[11px] text-natural-muted mt-0.5">
                      Delivery across major Bengaluru residential & commercial zones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-natural-muted block">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:contact@harivu.in"
                      className="font-medium text-brand-900 hover:underline"
                    >
                      contact@harivu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-natural-muted block">
                      Harvest Schedule
                    </span>
                    <span className="font-medium text-natural-text">
                      Monday to Saturday (6:00 AM – 1:00 PM)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Connect Buttons */}
              <div className="pt-4 border-t border-natural-border space-y-2.5">
                <span className="text-xs font-bold uppercase text-natural-muted block">
                  Quick Connect Channels
                </span>

                <a
                  href="https://wa.me/919876543210?text=Hi%20Harivu%2C%20I%20would%20like%20to%20inquire%20about%20fresh%20microgreens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold">Chat on WhatsApp</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800">
                    Instant Response →
                  </span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white text-natural-text border border-natural-border hover:border-brand-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <span className="text-xs font-bold">Follow on Instagram</span>
                  </div>
                  <span className="text-[11px] text-natural-muted">
                    @harivu.in →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-6">
            <h2 className="font-serif text-2xl font-bold text-natural-text">
              Send Us a Message
            </h2>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Message Sent</p>
                  <p className="text-xs">{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Notice</p>
                  <p className="text-xs">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  label="Mobile Number"
                  required
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email (Optional)"
                  type="email"
                  placeholder="e.g. vikram@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <div className="w-full space-y-1.5">
                  <label className="block text-xs font-semibold text-natural-text uppercase tracking-wider">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-border bg-natural-warmWhite text-natural-text text-sm focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Subscription Harvest">Weekly Subscription</option>
                    <option value="Restaurant / Cafe Bulk Supply">Restaurant / Cafe Supply</option>
                    <option value="Custom Microgreen Variety Request">Custom Variety Request</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Your Message or Request"
                required
                rows={4}
                placeholder="Let us know how we can assist you..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full sm:w-auto"
              >
                <span>Submit Inquiry</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
