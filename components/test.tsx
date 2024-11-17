'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, ThumbsUp, Clock, Headset } from 'lucide-react'

export function LandingPageComponent() {
	const raisons = [
		{ icon: Clock, title: "Gain de temps", description: "Automatisation complète de la sélection de CV et des entretiens téléphoniques." },
		{ icon: User, title: "Candidats de qualité", description: "Sélection précise et personnalisée grâce à l'IA générative." },
		{ icon: ThumbsUp, title: "Facilité d'utilisation", description: "Navigation intuitive avec interface claire et conviviale." },
		{ icon: Headset, title: "Support client dédié", description: "Assistance 24h/24 et 7j/7 pour vous accompagner dans votre recrutement." }
	]
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				{/* Competitive Advantages */}
				<section className="bg-[#f3f3f3] py-16 px-4">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Les raisons de nous choisir</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{raisons.map((raison, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow duration-300 rounded-full w-64 h-64 flex flex-col items-center justify-center bg-white shadow-md"
								>
									<CardHeader>
										<raison.icon className="w-8 h-8 text-blue-500 mx-auto mb-0" />
									</CardHeader>
									<CardContent className="p-4 text-center">
										<CardTitle className="text-xl font-semibold mb-2 mt-0">{raison.title}</CardTitle>
										<p className="text-gray-600 text-sm mt-0">{raison.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
