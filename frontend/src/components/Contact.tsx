import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formPayload = new URLSearchParams();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('contact', formData.contact);
      formPayload.append('message', formData.message);

      const res = await fetch('/api/save_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formPayload.toString()
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', contact: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to server. Check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-bold tracking-tight text-brand-brown sm:text-4xl">
          Contact Us
        </h2>
        <p className="text-sm text-muted-foreground">
          Have a question, feedback, or catering inquiry? Send us a message!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <Card className="rounded-2xl border-brand-brown/10 bg-brand-coffee text-white shadow-md p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-amber-200">Get in Touch</h3>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              We'd love to hear from you. Drop by our store or send an online message.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
              <span>Dela Costa V, Burgos Montalban, Rodriguez Rizal</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brand-amber shrink-0" />
              <span>0917 888 4737</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brand-amber shrink-0" />
              <span>mrboyspecialteadelacosta@gmail.com</span>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="md:col-span-2 rounded-2xl border-brand-brown/10 bg-white shadow-md">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xl font-bold text-brand-brown">Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name">Your Name</Label>
                  <Input
                    id="c-name"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-email">Your Email</Label>
                  <Input
                    id="c-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-contact">Contact Number</Label>
                <Input
                  id="c-contact"
                  required
                  placeholder="0917 XXX XXXX"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-msg">Your Message</Label>
                <textarea
                  id="c-msg"
                  required
                  rows={4}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                disabled={isSubmitting}
                className="w-full gap-2 font-bold"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
