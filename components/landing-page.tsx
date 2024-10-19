'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon, ClipboardCheckIcon, FileTextIcon, PhoneIcon, StarIcon, GroupIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Flux de navigation :
// 1. L'utilisateur clique sur un plan ou le bouton d'essai gratuit
// 2. Il est redirigé vers la page d'inscription (/signup)
// 3. Après l'inscription, l'utilisateur est invité à se connecter
// 4. Une fois connecté, l'utilisateur est redirigé vers le tableau de bord RH (/hr-dashboard)
// 5. Dans le tableau de bord, l'utilisateur peut créer des offres d'emploi
// 6. Les offres créées seront affichées dans la page des offres d'emploi (/job-offers)

export function LandingPageComponent() {
	const router = useRouter();
	const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
	const testimonials = [
		{ quote: "Since we started using this app, our recruitment process has become 30% faster, with much more qualified candidates.", company: "Company A" },
		{ quote: "Thanks to the AI, we've hired talent we would have never discovered on our own.", company: "Company B" },
		{ quote: "The automated interviews have saved us countless hours. It's revolutionary!", company: "Company C" },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonialIndex((prevIndex) =>
				(prevIndex + 1) % testimonials.length
			);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const [openFAQ, setOpenFAQ] = useState<number | null>(null);
	const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

	const toggleFAQ = (index: number) => {
		setOpenFAQ(openFAQ === index ? null : index);
	};

	useEffect(() => {
		answerRefs.current.forEach((ref, index) => {
			if (ref) {
				if (index === openFAQ) {
					ref.style.maxHeight = `${ref.scrollHeight}px`;
				} else {
					ref.style.maxHeight = '0px';
				}
			}
		});
	}, [openFAQ]);

	const particlesInit = async (engine: Engine) => {
		await loadFull(engine);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<Link href="/" className="flex items-center space-x-2">
						<BriefcaseIcon className="h-8 w-8 text-primary" />
						<span className="text-xl font-bold">TalentHub</span>
					</Link>
					<nav className="hidden md:flex space-x-4">
						<Link href="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
						<Link href="/job-offers" className="text-gray-600 hover:text-gray-900">Offres d'emploi</Link>
						<Link href="/features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</Link>
						<Link href="/pricing-components" className="text-gray-600 hover:text-gray-900">Tarifs</Link>
						<Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
					</nav>
					<div className="flex space-x-2">
						<Button variant="outline" asChild>
							<Link href="/espace-candidat">Espace Candidat</Link>
						</Button>
						<Button
							variant="default"
							onClick={() => router.push('/login')}
						>
							Espace Recruteur
						</Button>
					</div>
				</div>
			</header>

			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-[#00aaff] to-[#f0f4f8] text-[#333333] py-20 relative overflow-hidden">
					<Particles
						id="tsparticles"
						init={particlesInit}
						options={{
							fullScreen: { enable: false },
							background: {
								color: {
									value: "transparent",
								},
							},
							fpsLimit: 120,
							interactivity: {
								events: {
									onClick: {
										enable: true,
										mode: "push",
									},
									onHover: {
										enable: true,
										mode: "repulse",
									},
									resize: true,
								},
								modes: {
									push: {
										quantity: 4,
									},
									repulse: {
										distance: 200,
										duration: 0.4,
									},
								},
							},
							particles: {
								color: {
									value: "#ffffff",
								},
								links: {
									color: "#ffffff",
									distance: 150,
									enable: true,
									opacity: 0.5,
									width: 1,
								},
								move: {
									direction: "none",
									enable: true,
									outModes: {
										default: "bounce",
									},
									random: false,
									speed: 2,
									straight: false,
								},
								number: {
									density: {
										enable: true,
										area: 800,
									},
									value: 80,
								},
								opacity: {
									value: 0.5,
								},
								shape: {
									type: ["circle", "triangle", "square"],
								},
								size: {
									value: { min: 1, max: 5 },
								},
							},
							detectRetina: true,
						}}
						className="absolute inset-0"
					/>
					<div className="container mx-auto px-4 text-center relative z-10">
						<h1 className="text-4xl md:text-5xl font-bold mb-10 text-white">
							Révolutionnez votre processus de recrutement avec l'intelligence artificielle
						</h1>
						<p className="text-xl mb-12 text-white">
							Gagnez du temps, trouvez les meilleurs talents et améliorez votre productivité grâce à une solution automatisée et intelligente.
						</p>

						<div className="space-x-4">
							{/* Bouton Explorer Nos Offres */}
							<Button size="lg" className="bg-[#00aaff] hover:bg-[#008ecc] py-3 px-8 text-white transition-transform transform hover:scale-105 duration-300 ease-in-out" asChild>
								<Link href="/pricing-components">Explorer Nos Offres</Link>
							</Button>

							{/* Bouton Essai gratuit de 14 jours */}
							<Button size="lg" className="bg-[#ffaa00] hover:bg-[#e69500] py-3 px-8 text-white transition-transform transform hover:scale-105 duration-300 ease-in-out" variant="secondary" asChild>
								<Link href="/signup">Essai gratuit de 14 jours</Link>
							</Button>
						</div>
					</div>
				</section>


				{/* Key Features */}
				<section className="py-20 relative" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
					<div className="absolute top-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
						<svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
							<defs>
								<linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">  {/* Ligne horizontale */}
									<stop offset="0%" style={{ stopColor: '#00aaff', stopOpacity: 1 }} />
									<stop offset="100%" style={{ stopColor: '#f0f4f8', stopOpacity: 1 }} />
								</linearGradient>
							</defs>
							<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#myGradient)" />
						</svg>
					</div>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold text-center mb-12">Une solution tout-en-un pour simplifier le recrutement</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{ icon: <BriefcaseIcon className="h-8 w-8 text-[#007BFF]" />, title: "Publiez des offres d'emploi rapidement", description: "Publiez vos offres d'emploi en quelques clics grâce à une interface intuitive." },
								{ icon: <GroupIcon className="h-8 w-8 text-[#28A745]" />, title: "Sélection automatique des candidats", description: "Notre IA générative identifie les meilleurs profils pour chaque poste." },
								{ icon: <ClipboardCheckIcon className="h-8 w-8 text-[#FFC107]" />, title: "Processus de candidature simplifié", description: "Offrez aux candidats une expérience utilisateur fluide pour postuler directement via l'application." },
								{ icon: <FileTextIcon className="h-8 w-8 text-[#17A2B8]" />, title: "Structuration des données", description: "Structurez automatiquement les CV en données exploitables." },
								{ icon: <PhoneIcon className="h-8 w-8 text-[#6F42C1]" />, title: "Entretiens assistés par IA", description: "Organisez des entretiens téléphoniques automatisés grâce à notre IA, sans intervention humaine." },
								{ icon: <StarIcon className="h-8 w-8 text-[#FD7E14]" />, title: "Recommandation des meilleurs talents", description: "Laissez notre intelligence artificielle vous suggérer les candidats les plus adaptés." },
							].map((feature, index) => (
								<Card key={index}>
									<CardContent className="flex flex-col items-center text-center p-6 hover:transform hover:scale-105 transition duration-300 ease-in-out">
										{feature.icon}
										<h3 className="text-xl font-semibold mt-4 mb-4">{feature.title}</h3>
										<p className="text-muted-foreground">{feature.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
					<div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(1px)' }}>
						<svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
							<path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#eaf4fc"></path>
						</svg>
					</div>
				</section>

				{/* How It Works */}
				<section className="bg-[#eaf4fc] text-[#333333] py-20 relative">
					<div className="container mx-auto px-4">
						<h2 className="text-5xl font-bold text-center mb-16 fade-in">
							Comment ça fonctionne ?
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
							{[
								{ text: "Créez votre compte et souscrivez à une offre adaptée à vos besoins.", color: 'bg-custom-blue', hover: 'hover:bg-hover-blue' },
								{ text: "Publiez vos offres d'emploi directement depuis votre tableau de bord.", color: 'bg-custom-red', hover: 'hover:bg-hover-red' },
								{ text: "Laissez notre IA faire le travail : sélection, entretiens téléphoniques automatisés et recommandations personnalisées.", color: 'bg-custom-green', hover: 'hover:bg-hover-green' },
								{ text: "Choisissez le meilleur candidat et finalisez rapidement le processus de recrutement.", color: 'bg-custom-orange', hover: 'hover:bg-hover-orange' },
							].map((step, index) => (
								<div key={index} className="flex flex-col items-center text-center fade-in">
									<div
										className={`w-16 h-16 ${step.color} ${step.hover} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 transition duration-300`}
									>
										{index + 1}
									</div>
									<p className="text-lg font-medium">{step.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>



				{/* Testimonials */}
				<section className="py-20 bg-[#f9fafb]">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Des résultats impressionnants pour nos clients</h2>
						<div className="flex justify-center">
							<Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
								<CardContent className="p-8 bg-white rounded-lg">
									<p className="italic text-lg">"{testimonials[currentTestimonialIndex].quote}"</p>
									<p className="text-right font-bold mt-4">— {testimonials[currentTestimonialIndex].company}</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>


				{/* Competitive Advantages */}
				<section className="bg-[#f3f3f3] py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Les raisons de nous choisir</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							{[
								{ title: "Gain de temps", description: "Automatisation complète de la sélection de CV et des entretiens téléphoniques." },
								{ title: "Candidats de qualité", description: "Sélection précise et personnalisée grâce à l'IA générative." },
								{ title: "Facilité d'utilisation", description: "Interface claire et conviviale." },
								{ title: "Support client dédié", description: "Assistance 24h/24 et 7j/7 pour vous accompagner dans votre recrutement." },
							].map((advantage, index) => (
								<Card key={index} className="hover:shadow-lg transition-shadow duration-300">
									<CardContent className="p-6 bg-white rounded-lg shadow-md">
										<h3 className="text-2xl font-semibold mb-2 text-gray-800">{advantage.title}</h3>
										<p className="text-gray-600">{advantage.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>


				{/* Pricing */}
				<section className="py-20 bg-[#e0f7fa]">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">Solutions for Every Business</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{ name: "Offre Starter", description: "Pour les petites entreprises", features: ["Jusqu'à 10 offres d'emploi par mois"] },
								{ name: "Pro Plan", description: "For medium businesses", features: ["Up to 50 job offers per month", "Enhanced AI"] },
								{ name: "Enterprise Plan", description: "For large businesses", features: ["Unlimited job offers", "Priority support", "Premium AI"] },
							].map((plan, index) => (
								<Card key={index}>
									<CardContent className="p-6">
										<h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
										<p className="text-muted-foreground mb-4">{plan.description}</p>
										<ul className="list-disc list-inside mb-6">
											{plan.features.map((feature, featureIndex) => (
												<li key={featureIndex}>{feature}</li>
											))}
										</ul>
										<Button className="w-full" onClick={() => router.push('/signup')}>Souscrivez maintenant</Button>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="text-center mt-8">
							<Button size="lg" variant="outline" onClick={() => router.push('/signup')}>
								Subscribe Now and Access a 14-Day Free Trial
							</Button>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="bg-muted py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">Questions fréquemment posées</h2>
						<div className="space-y-4">
							{[
								{ question: "Comment l'IA sélectionne-t-elle les candidats ?", answer: "Notre IA utilise des algorithmes avancés pour analyser les CV et les faire correspondre aux exigences des postes." },
								{ question: "Comment puis-je personnaliser les critères de sélection ?", answer: "Vous pouvez définir des paramètres personnalisés et pondérer différentes compétences et expériences dans votre tableau de bord." },
								{ question: "Puis-je tester la solution avant de m'abonner ?", answer: "Oui, nous offrons un essai gratuit de 14 jours pour tous nos plans." },
							].map((faq, index) => (
								<Card key={index}>
									<CardContent className="p-4">
										<button
											className="flex justify-between items-center w-full text-left"
											onClick={() => toggleFAQ(index)}
										>
											<h3 className="text-xl font-semibold">{faq.question}</h3>
											{openFAQ === index ? (
												<ChevronDownIcon className="h-5 w-5 transition-transform duration-300" />
											) : (
												<ChevronRightIcon className="h-5 w-5 transition-transform duration-300" />
											)}
										</button>
										<div
											ref={el => answerRefs.current[index] = el}
											className="overflow-hidden transition-all duration-300 ease-in-out"
											style={{ maxHeight: '0px' }}
										>
											<p className="text-muted-foreground mt-4">{faq.answer}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<section className="call-to-action-section py-12 bg-[#fffde7] text-black text-center mt-10">
							<h2 className="text-3xl font-semibold mb-6">Prêt à transformer votre processus de recrutement ?</h2>
							<p className="text-lg mb-8">Inscrivez-vous dès aujourd'hui et découvrez la puissance du recrutement piloté par l'IA.</p>
							<Button className="bg-[#ffaa00] text-black font-semibold py-4 px-8 rounded-lg hover:bg-[#e69500] transition-colors">
								Commencer maintenant
							</Button>

						</section>
					</div>
				</section>

			</main>

			<footer className="bg-gray-800 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
							<ul className="space-y-2">
								<li><Link href="/contact">Contact</Link></li>
								<li><Link href="/about">About</Link></li>
								<li><Link href="/blog">Blog</Link></li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Legal</h3>
							<ul className="space-y-2">
								<li><Link href="/privacy-policy">Privacy Policy</Link></li>
								<li><Link href="/terms-of-service">Terms of Service</Link></li>
							</ul>
						</div>
						<div className="md:col-span-2">
							<h3 className="text-lg font-semibold mb-4">Join thousands of companies that are recruiting more effectively with our solution.</h3>
							<Button size="lg">Get Started Today</Button>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t border-gray-700 text-center">
						<p>&copy; 2024 TalentHub. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}