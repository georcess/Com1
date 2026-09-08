import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  PartyPopper, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Navigation, 
  Facebook, 
  Instagram, 
  MessageCircle,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

export const Contact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<string>('General Inquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // FAQ Accordion open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const inquiryOptions = [
    { id: 'general', label: 'General Inquiry', icon: MessageSquare },
    { id: 'catering', label: 'Bulk & Party Catering', icon: PartyPopper },
    { id: 'feedback', label: 'Customer Feedback', icon: Sparkles },
    { id: 'business', label: 'Franchise & Partner', icon: Utensils },
  ];

  const faqs = [
    {
      q: 'Do you accept bulk or party orders for school and corporate events?',
      a: 'Yes! We cater for birthdays, school events, sports festivals, and corporate meetings. We offer discounted bulk pricing for orders of 20 cups or more with customized cup stickers upon request.'
    },
    {
      q: 'Can I customize sugar levels and ice for my drinks?',
      a: 'Absolutely. You can request customized sweetness (0%, 25%, 50%, 75%, 100%) and ice preference upon ordering.'
    },
    {
      q: 'What are your operating hours and exact store location?',
      a: 'We are open 7 days a week from 9:00 AM to 10:00 PM. We are located at Dela Costa Homes V, Burgos, Montalban, Rodriguez, Rizal (near the Phase 1 Clubhouse).'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept GCash, Maya, Cash on Counter, and Online Bank Transfers for both in-store and advance pre-orders.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const fullMessage = `[Type: ${inquiryType}] ${formData.subject ? `Subject: ${formData.subject} - ` : ''}${formData.message}`;

      const res = await fetch('/api/save_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: fullMessage
        })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setSuccess(true);
        setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      // Fallback submission with form-urlencoded if JSON fails
      try {
        const formPayload = new URLSearchParams();
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('contact', formData.contact);
        formPayload.append('message', `[${inquiryType}] ${formData.message}`);

        const res2 = await fetch('/api/save_contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formPayload.toString()
        });

        if (res2.ok) {
          setSuccess(true);
          setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
        } else {
          setError('Failed to send message. Please try again.');
        }
      } catch (e2) {
        setError('Could not connect to server. Please check your connection or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-12 animate-in fade-in duration-300">
      
      {/* ── 1. Hero Header ─────────────────────────────────────────── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-amber/20 border border-brand-amber/40 px-4 py-1 text-xs font-bold text-brand-brown shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
          <span>WE&apos;D LOVE TO HEAR FROM YOU</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-brown">
          Let&apos;s Connect &amp; Celebrate <span className="text-brand-orange">SpecialTea</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have a question about our drinks, need bulk orders for your special events, or want to share your feedback? Reach out to our friendly Montalban team.
        </p>
      </div>

      {/* ── 2. Top Info Action Cards Grid ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Visit Us */}
        <Card className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-brand-coffee group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-xs">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-display text-lg font-bold text-brand-brown">Visit Store</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dela Costa Homes V, Burgos, Montalban, Rodriguez, Rizal 1860
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                <Clock className="h-3.5 w-3.5" />
                <span>Mon – Sun: 9:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: Call or Text */}
        <Card className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-brand-coffee group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-xs">
              <Phone className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-display text-lg font-bold text-brand-brown">Direct Hotline</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Call or SMS for advance pickups, bulk orders &amp; status.
              </p>
              <div className="pt-2 space-y-0.5">
                <a 
                  href="tel:09178884737" 
                  className="block text-xs font-bold text-brand-coffee hover:text-brand-orange transition-colors"
                >
                  📞 0917 888 4737
                </a>
                <a 
                  href="tel:09123456789" 
                  className="block text-xs font-bold text-brand-coffee hover:text-brand-orange transition-colors"
                >
                  📞 0912 345 6789
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 3: Online & Socials */}
        <Card className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-brand-coffee group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-xs">
              <Mail className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-display text-lg font-bold text-brand-brown">Email &amp; Socials</h3>
              <p className="text-xs text-muted-foreground truncate leading-relaxed">
                mrboyspecialteadelacosta@gmail.com
              </p>
              <div className="pt-2 flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-coffee hover:bg-brand-orange hover:text-white transition-colors shadow-xs"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-coffee hover:bg-brand-orange hover:text-white transition-colors shadow-xs"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://m.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-coffee hover:bg-brand-orange hover:text-white transition-colors shadow-xs"
                  title="Messenger"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* ── 3. Main Form & Side Info Section ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="rounded-3xl border border-brand-brown/10 bg-white shadow-xl overflow-hidden">
            <CardHeader className="bg-brand-coffee text-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Send className="h-5 w-5 text-brand-amber" />
                </div>
                <div>
                  <CardTitle className="font-display text-2xl font-bold text-white">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-amber-100/80 text-xs">
                    Fill in the details and our team will get back to you promptly.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {success ? (
                <div className="py-10 text-center space-y-4 animate-in zoom-in-95">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-bold text-brand-brown">
                      Message Sent Successfully! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for reaching out to Mr. Boy SpecialTea. We have received your inquiry and will respond as soon as possible.
                    </p>
                  </div>
                  <Button 
                    variant="brand" 
                    onClick={() => setSuccess(false)}
                    className="gap-2 font-bold px-6"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Another Message</span>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {error && (
                    <div className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Inquiry Topic Selector */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-brand-brown">
                      1. Select Inquiry Topic:
                    </Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {inquiryOptions.map((opt) => {
                        const IconComp = opt.icon;
                        const isSelected = inquiryType === opt.label;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setInquiryType(opt.label)}
                            className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                              isSelected 
                                ? 'bg-brand-coffee text-white border-brand-coffee shadow-md scale-102 ring-2 ring-brand-orange/30' 
                                : 'bg-slate-50 text-brand-brown hover:bg-slate-100 border-slate-200'
                            }`}
                          >
                            <IconComp className={`h-4 w-4 ${isSelected ? 'text-brand-amber' : 'text-brand-coffee'}`} />
                            <span className="text-[11px] text-center">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name" className="text-xs font-bold text-brand-brown">
                        Your Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        required
                        placeholder="e.g. Maria Santos"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-50/70 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email" className="text-xs font-bold text-brand-brown">
                        Your Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="maria@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-50/70 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-phone" className="text-xs font-bold text-brand-brown">
                        Phone / Mobile Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contact-phone"
                        required
                        placeholder="0917 XXX XXXX"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="bg-slate-50/70 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-subject" className="text-xs font-bold text-brand-brown">
                        Subject (Optional)
                      </Label>
                      <Input
                        id="contact-subject"
                        placeholder="e.g. Birthday Party 50 cups"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-slate-50/70 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="contact-msg" className="text-xs font-bold text-brand-brown">
                        Your Detailed Message <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      id="contact-msg"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-input bg-slate-50/70 p-3.5 text-sm focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber transition-colors"
                      placeholder="Tell us what you need (date of event, number of cups, flavor preferences, or special requests)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="brand"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2 font-bold py-6 text-base shadow-lg active:scale-98 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Sending Your Message...' : 'Submit Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Bulk Catering Banner & Location Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Party & Bulk Catering Highlight Card */}
          <Card className="rounded-3xl border border-brand-amber/40 bg-gradient-to-br from-brand-coffee to-brand-brown text-white p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="brand" className="bg-brand-amber text-brand-brown font-bold text-xs uppercase">
                🎉 Event Catering
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-amber-200 text-xs border-white/20">
                20+ Cups
              </Badge>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-2xl font-bold text-amber-100">
                Hosting a Party or School Event?
              </h3>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Make your celebration extra sweet! We offer packaged deals, scheduled batch preparations, and custom sticker labels for bulk orders.
              </p>
            </div>

            <div className="space-y-2 pt-1 text-xs text-amber-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-amber shrink-0" />
                <span>Special discounted rates on 20+ cups</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-amber shrink-0" />
                <span>Guaranteed freshly prepared on scheduled pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-amber shrink-0" />
                <span>Custom cup stickers for birthdays &amp; weddings</span>
              </div>
            </div>
          </Card>

          {/* Commute & Directions Guide */}
          <Card className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-brand-brown font-bold text-base">
              <Navigation className="h-5 w-5 text-brand-orange" />
              <span>How To Find Us &amp; Commute Tips</span>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <div className="rounded-2xl bg-brand-cream/60 p-3.5 border border-brand-brown/10 text-brand-brown">
                <strong className="block text-xs font-bold text-brand-coffee mb-1">
                  📍 Landmark:
                </strong>
                Located right near the Dela Costa Homes Phase 1 Clubhouse and Community Basketball Court in Burgos, Montalban.
              </div>

              <div className="space-y-1.5 pl-1">
                <p>
                  <strong>🛵 Via Tricycle:</strong> Take any tricycle from Burgos Market or Montalban Town Center and ask to be dropped off at <em>Dela Costa 5 Clubhouse / Mr. Boy SpecialTea</em> (approx. 5-7 mins).
                </p>
                <p>
                  <strong>🚗 Via Private Vehicle:</strong> Enter Dela Costa Homes V main gate from Burgos highway; ample street parking available in front of the shop.
                </p>
              </div>
            </div>
          </Card>

        </div>

      </div>

      {/* ── 4. Frequently Asked Questions (FAQ) Section ───────────── */}
      <div className="rounded-3xl bg-brand-cream/50 border border-brand-brown/10 p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-brown">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-muted-foreground">
            Quick answers to the most common customer questions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-brand-brown/10 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-brand-brown hover:text-brand-orange transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-brand-coffee">
                      {idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-brand-orange" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-slate-100 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
