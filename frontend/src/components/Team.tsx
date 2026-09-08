import React from 'react';
import { Users, Award, Code, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const Team: React.FC = () => {
  const members: TeamMember[] = [
    { name: 'Apolonio', role: 'Project Developer', image: '/public/team/APOLONIO.jpeg' },
    { name: 'Apuyan', role: 'Full Stack & UI', image: '/public/team/Apuyan.png' },
    { name: 'Cañete', role: 'Frontend Specialist', image: '/public/team/CAÑETE.jpeg' },
    { name: 'Jerez, Ayiza', role: 'System Architect', image: '/public/team/JEREZ, AYIZA.jpg' },
    { name: 'Obosa', role: 'Database Engineer', image: '/public/team/OBOSA.jpeg' },
    { name: 'Refalpa, Jona Mae', role: 'UI/UX Designer', image: '/public/team/Refalpa, Jona Mae_.jpg' },
    { name: 'Ricafranca', role: 'Quality Assurance', image: '/public/team/RICAFRANCA_.jpg' },
    { name: 'Rogel', role: 'Backend Developer', image: '/public/team/ROGEL.jpg' },
    { name: 'Toledo', role: 'System Documentation', image: '/public/team/TOLEDO.jpg' },
    { name: 'Vargas', role: 'Lead Developer', image: '/public/team/VARGAS.png' },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-amber/20 px-4 py-1 text-xs font-bold text-brand-brown">
          <Award className="h-4 w-4 text-brand-orange" />
          <span>BREWCODE &bull; GROUP 4</span>
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-brand-brown sm:text-4xl">
          Meet the Development Team
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          The passionate minds behind Mr. Boy SpecialTea's online ordering experience.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {members.map((member, idx) => (
          <Card 
            key={idx}
            className="group overflow-hidden rounded-2xl border border-brand-brown/10 bg-white transition-all hover:-translate-y-1.5 hover:shadow-lg text-center"
          >
            <div className="relative h-36 w-full overflow-hidden bg-brand-cream">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/images/IMG_2476.jpeg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-sm font-bold text-brand-brown line-clamp-1">
                {member.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 pt-0">
              <Badge variant="outline" className="text-[10px] font-semibold text-brand-coffee border-brand-coffee/20 px-2 py-0">
                {member.role}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Note Card */}
      <Card className="rounded-2xl border border-brand-brown/10 bg-gradient-to-r from-brand-coffee to-brand-brown p-6 text-white text-center shadow-md">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-200">
            <Code className="h-5 w-5" />
            <h3 className="font-display text-xl font-bold">Crafted with Precision &amp; Care</h3>
          </div>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Built as a comprehensive web project for Mr. Boy SpecialTea featuring MVC architecture, modern React + Tailwind + shadcn/ui components, and real-time order processing.
          </p>
          <div className="flex items-center justify-center gap-1 text-xs text-amber-200 font-semibold pt-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" />
            <span>by Group 4 &bull; 2026</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
