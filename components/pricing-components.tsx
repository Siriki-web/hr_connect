'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { BriefcaseIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Header } from './Header'


export function PricingComponentComponent() {
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
	const [isYearly, setIsYearly] = useState(false)
	const companies = [
		{ name: "GS2E", logo: "/assets/images/gs2e.jpg" },
		{ name: "CIE", logo: "/assets/images/Logo_CIE.jpg" },
		{ name: "SODECI", logo: "/assets/images/logo_sodeci.png" },
	]

	const faqItems = [
		{ question: "Do you offer a Free Trial?", answer: "Yes, we offer a 14-day free trial on all our plans." },
		{ question: "Do I need to enter my credit card details to sign up?", answer: "No, you don't need to enter your credit card details to sign up for our free trial." },
		{ question: "Proposez-vous des plans à prix réduit?", answer: "Oui, nous proposons des plans annuels à prix réduit qui peuvent vous faire économiser jusqu'à 20% par rapport à la facturation mensuelle." },
	]

	const plans = [
		{
			name: "Startup",
			description: "Maximisez le potentiel de recrutement de votre startup avec ce plan utilitaire",
			price: 99,
			features: ["10 offres d'empli actives", "10 utilisateurs d'entreprise"],
		},
		{
			name: "Growth",
			description: "Meilleur plan pour améliorer les capacités de recrutement des équipes en croissance",
			price: 149,
			features: ["20 Aoffres d'emploi actives", "50 utilisateurs d'entreprise"],
			bestValue: true,
		},
		{
			name: "Entreprise",
			description: "Maîtrisez le recrutement à grande échelle avec les fonctionnalités premium de TalendHub",
			price: 199,
			features: ["50 offres d'emploi actives", "100 utilisateurs d'entreprise"],
		},
	]

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="w-full">
				<div className="bg-gradient-to-t from-[#00aaff] to-[#f0f4f8] w-full py-24 relative">
					{/* Ajout d'un pseudo-élément pour créer la courbe */}
					<div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{
						clipPath: 'ellipse(50% 100% at 50% 100%)'
					}}></div>
					<div className="max-w-6xl mx-auto px-4 relative z-10">
						<h1 className="text-4xl font-bold text-center mb-8">Tarification simple et évolution</h1>
						<div className="flex items-center justify-center mb-12">
							<span className="mr-2">Par mois</span>
							<Switch
								checked={isYearly}
								onCheckedChange={setIsYearly}
							/>
							<span className="ml-2">Par année</span>
							<span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Economisez 28%</span>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{plans.map((plan, index) => (
								<div
									key={index}
									className={`rounded-lg overflow-hidden ${plan.name === "Growth"
										? 'bg-gray-900 text-white'
										: 'bg-white'
										}`}
								>
									<div className="p-8">
										{plan.bestValue && (
											<div className="bg-yellow-400 text-yellow-900 text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4">
												Meilleur valeur
											</div>
										)}
										<h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
										<p className="text-sm mb-6 opacity-75">{plan.description}</p>
										<div className="text-4xl font-bold mb-2">
											${isYearly ? plan.price * 12 * 0.72 : plan.price}
											<span className="text-lg font-normal">/Mois</span>
										</div>
										<p className="text-sm mb-6 opacity-75">Facturé annuellement</p>
										<Button
											className={`w-full ${plan.bestValue
												? 'bg-blue-500 hover:bg-blue-600'
												: 'bg-white text-blue-500 hover:bg-gray-100'
												}`}
										>
											Obtenez un essai gratuit de jours 
										</Button>
										{/*<p className="text-xs text-center mt-2 opacity-75">No credit card needed</p>*/}
									</div>
									<div className={`border-t ${plan.name === "Growth" ? 'border-gray-700' : 'border-gray-200'
										} p-8`}>
										<h3 className="font-bold mb-4">Fonctionnalités clés:</h3>
										<ul className="space-y-2">
											{plan.features.map((feature, featureIndex) => (
												<li key={featureIndex} className="flex items-center">
													<Check className="h-5 w-5 mr-2 text-green-500" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Question */}
				<div className="max-w-6xl mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
							<span className="text-yellow-400 mr-2">🌾</span>
							Système de suivi des candidatures fiables, utilisé par
							<br />les principales équipes de recrutement de talents
							<span className="text-yellow-400 ml-2">🌾</span>
						</h2>
						<div className="flex flex-wrap justify-center items-center gap-8 mt-8">
							{companies.map((company, index) => (
								<Image
									key={index}
									src={company.logo}
									alt={`${company.name} logo`}
									width={100}
									height={30}
									className="opacity-50 hover:opacity-100 transition-opacity"
								/>
							))}
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-start">
						<h2 className="text-4xl font-bold text-gray-900">
							Foire aux<br />
							Questions<br />
						</h2>
						<Accordion type="single" collapsible className="w-full">
							{faqItems.map((item, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="mb-4 border border-black rounded-lg overflow-hidden"
								>
									<AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 data-[state=open]:border-green-500 data-[state=open]:border-2">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="px-4 py-2">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
				{/* Testimonials */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">Des résultats impressionnants pour nos clients</h2>
						<div className="flex justify-center">
							<Card className="w-full max-w-2xl">
								<CardContent className="p-6">
									<p className="italic mb-4">"{testimonials[currentTestimonialIndex].quote}"</p>
									<p className="font-semibold">— {testimonials[currentTestimonialIndex].company}</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</div>
			<footer className="bg-gray-800 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
							<ul className="space-y-2">
								<li><Link href="/contact">Contact</Link></li>
								<li><Link href="/about">À propos</Link></li>
								<li><Link href="/blog">Blog</Link></li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Legal</h3>
							<ul className="space-y-2">
								<li><Link href="/privacy-policy">Politique de confidentialité</Link></li>
								<li><Link href="/terms-of-service">Conditions d'utilisation</Link></li>
							</ul>
						</div>
						<div className="md:col-span-2">
							<h3 className="text-lg font-semibold mb-4">Rejoignez des milliers d'entreprises qui recrutent plus efficacement avec notre solution.</h3>
							<Button size="lg">Commencez dès aujourd'hui</Button>
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
