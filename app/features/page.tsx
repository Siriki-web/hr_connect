import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, ClipboardCheckIcon, FileTextIcon, PhoneIcon, StarIcon, GroupIcon } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const features = [
  { icon: <BriefcaseIcon className="h-12 w-12 text-primary" />, title: "Publication d'offres rapide", description: "Publiez vos offres d'emploi en quelques clics grâce à notre interface intuitive." },
  { icon: <GroupIcon className="h-12 w-12 text-primary" />, title: "Sélection IA des candidats", description: "Notre IA générative identifie les meilleurs profils pour chaque poste." },
  { icon: <ClipboardCheckIcon className="h-12 w-12 text-primary" />, title: "Processus simplifié", description: "Offrez une expérience de candidature fluide directement via l'application." },
  { icon: <FileTextIcon className="h-12 w-12 text-primary" />, title: "Structuration des données", description: "Structurez automatiquement les CV en données exploitables." },
  { icon: <PhoneIcon className="h-12 w-12 text-primary" />, title: "Entretiens IA", description: "Organisez des entretiens téléphoniques automatisés grâce à notre IA." },
  { icon: <StarIcon className="h-12 w-12 text-primary" />, title: "Recommandations IA", description: "Laissez notre IA vous suggérer les candidats les plus adaptés." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">TalentHub</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Nos Fonctionnalités
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link href="/signup">Essayer Gratuitement</Link>
          </Button>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 TalentHub. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
