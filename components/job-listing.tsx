'use client'

import { useState, useEffect } from 'react'
import { useJobs } from '@/contexts/JobContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookmarkIcon, Clock, MapPin, Share, BriefcaseIcon, ChevronLeft, Building, FilePenLine, House, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface JobRecommendation {
    company: string
    logo: string
    title: string
    location: string
    jobType: string
    salary?: string
    postedTime: string
}

const jobRecommendations: JobRecommendation[] = [
    {
        company: "TOMORRO",
        logo: "/assets/images/sales_rep.webp",
        title: "Sales Development",
        location: "Paris",
        jobType: "CDI",
        salary: "40k à 55k",
        postedTime: "il y a 3 jours"
    },
    {
        company: "GS2E",
        logo: "/assets/images/strategist.webp",
        title: "Strategic Senior Business",
        location: "Man",
        jobType: "CDD",
        postedTime: "il y a 4 jours"
    }
]

export function JobListingComponent({ jobId }: { jobId: string }) {
    const { jobs } = useJobs()
    const job = jobs.find(j => j.id === parseInt(jobId))
    const [showFloatingDiv, setShowFloatingDiv] = useState(false)
    const [showApplicationForm, setShowApplicationForm] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingDiv(window.scrollY > 200)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!job) {
        return <div>Offre d'emploi non trouvée</div>
    }

    return (
        <div className="flex flex-col min-h-screen relative">
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
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Tarifs</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                    </nav>
                    {/*<Button variant="outline" className="rounded-none">Se connecter</Button>*/}
                </div>
            </header>

            {showFloatingDiv && (
                <div className="fixed top-0 left-0 right-0 bg-[#FFA500] shadow-md z-50 py-2 px-4 h-15">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <Image src={job.logo} alt={`${job.company} logo`} width={40} height={40} className="mr-4" />
                            <span className="font-bold text-white">{job.title}</span>
                        </div>
                        <Button onClick={() => setShowApplicationForm(true)} className="rounded-none bg-white text-[#FFA500]">
                            Postuler
                        </Button>
                    </div>
                </div>
            )}

            <div className="relative w-full h-[250px] bg-gradient-to-r from-[#00aaff] to-[#f0f4f8] text-[#333333]">
                <div className="container mx-auto p-6">
                    <Button variant="ghost" className="pl-2 font-semibold" asChild>
                        <Link href="/job-offers">
                            <ChevronLeft className="mr-2" />
                            Retour aux offres
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="container mx-auto flex flex-col md:flex-row gap-6 relative -mt-[125px]">
                {/* modalité offre */}
                <div className="w-full md:w-[30%]">
                    <Card className="rounded-none">
                        <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                                <Image src={job.logo} alt={`${job.company} logo`} width={100} height={40} className="mr-4" />
                                <span className="text-2xl font-bold">{job.company}</span>
                            </div>

                            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="font-semibold bg-[#f0f4f8] text-gray-800 px-3 py-1 rounded-sm border border-gray-400 text-sm flex items-center">
                                    <FilePenLine size={16} className="mr-2" />{job.type}
                                </span>
                                <span className="font-semibold bg-[#f0f4f8] text-gray-800 px-3 py-1 rounded-sm border border-gray-400 text-sm flex items-center">
                                    <MapPin size={16} className="mr-2" /> {job.location}
                                </span>
                                <span className="font-semibold bg-[#f0f4f8] text-gray-800 px-3 py-1 rounded-sm border border-gray-400 text-sm flex items-center">
                                    <House size={16} className="mr-2" />{job.remote}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4 mb-2">
                                <div className='flex gap-4'>
                                    <Button className="rounded-sm bg-[#FFA500]">Postuler <ExternalLink size={16} className="ml-2" /></Button>
                                    <Button variant="outline" className="rounded-sm">
                                        <BookmarkIcon size={16} className="mr-2" />
                                        Sauvegarder
                                    </Button>
                                </div>
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    {/*<span className="flex items-center">
                                        <Clock size={16} className="mr-1" /> {job.postedTime || "Récemment publié"}
                                    </span>  */}

                                    <Button variant="ghost" size="sm">
                                        <Share className="mr-2" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Div de partage de l'offre avec position sticky */}
                    <div className="mt-4 bg-white border border-purple-300 rounded-none sticky top-20">
                        <h3 className="text-center py-2 border-b border-purple-300 font-semibold">
                            Partager cette offre
                        </h3>
                        <div className="flex justify-center items-center space-x-4 p-4">
                            <Image src="/assets/images/tx.jpeg" alt="Twitter" width={32} height={32} />
                            <Image src="/assets/images/facebook.jpeg" alt="Facebook" width={32} height={32} />
                            <Image src="/assets/images/linkedin.jpeg" alt="LinkedIn" width={32} height={32} />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[70%] space-y-6">
                    <Card className="w-full rounded-none">
                        <CardHeader className="flex border-b border-[#FFA500]">
                            <div className="flex items-center">
                                <div className="w-6 h-1 bg-[#FFA500] mr-2"></div>
                                <h2 className="text-2xl font-bold">Le poste</h2>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                                    <p className="text-gray-700">
                                        {job.description}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold mb-2">Mission</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Tu souhaites faire partie d&apos;une équipe de professionnels internationaux qui regroupe 10 nationalités différentes et 15 langues vivantes ;</li>
                                        <li>Tu es intéressé à travailler avec des entreprises basées à l&apos;étranger ;</li>
                                        <li>Tu souhaites être l&apos;interlocuteur privilégié de clients qui ne sont pas familier avec l&apos;environnement comptable et fiscal français;</li>
                                        <li>Tu es prêt à améliorer tes compétences et apprendre des nouvelles méthodes de travail et de nouvelles expertises ;</li>
                                        <li>Tu souhaites utiliser des solutions logiciels de comptabilité et de fiscalité les plus avancées du marché.</li>
                                        <li>Tu penses que le monde de la comptabilité doit changer pour le mieux, et tu crois pouvoir nous aider à dynamiser la profession.</li>
                                        <li>Tu partages aussi nos valeurs de dépassement de soi, de courage, de dévouement et d&apos;esprit d&apos;équipe.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold mb-2">PROFIL</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Formation BAC +5</li>
                                        <li>Réunion en anglais</li>
                                        <li>Maîtrise de Word</li>
                                    </ul>
                                </section>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full rounded-none">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-2">
                                    <span className="text-gray-500 font-bold">LOGO</span>
                                </div>
                                <h2 className="text-2xl font-bold">{job.company}</h2>
                            </div>
                            <p className="text-center text-lg mb-6">Cette offre vous tente ?</p>
                            <div className="flex justify-center space-x-4">
                                <Button className="bg-[#FFA500] hover:bg-orange-500 text-white rounded-none">
                                    Postuler <ExternalLink size={16} className="ml-2" />
                                </Button>
                                <Button variant="outline" className="rounded-none">
                                    <BookmarkIcon className="mr-2 h-4 w-4" />
                                    Sauvegarder
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Nouvelle section pour les offres correspondantes */}
            <div className="w-full bg-muted mt-8 py-8">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold p-4 text-center">D&apos;autres offres vous correspondant !</h2>
                    <div className="flex flex-wrap justify-center gap-6 mb-4">
                        {jobRecommendations.map((job, index) => (
                            <Card key={index} className="overflow-hidden rounded-none w-full max-w-md">
                                <div className="flex">
                                    <div className="w-1/3">
                                        <Image
                                            src={job.logo}
                                            alt={`${job.company} logo`}
                                            width={150}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="w-2/3 p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                                        <span className="text-xs font-semibold">LOGO</span>
                                                    </div>
                                                    <h3 className="font-semibold">{job.company}</h3>
                                                </div>
                                                <p className="font-bold mb-3">{job.title}</p>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <BookmarkIcon className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <div className="space-y-4 text-sm text-gray-600">
                                            <div className="flex items-center rounded-none">
                                                <MapPin size={16} className="mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-none text-xs flex items-center">
                                                    <Building size={12} className="mr-1" />
                                                    {job.jobType}
                                                </span>
                                                {job.salary && (
                                                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-none text-xs">
                                                        {job.salary}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock size={16} className="mr-1" />
                                                {job.postedTime}
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {showApplicationForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Postuler pour {job.title}</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1">Nom complet</label>
                                <input type="text" id="name" className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input type="email" id="email" className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-1">Téléphone</label>
                                <input type="tel" id="phone" className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label htmlFor="resume" className="block mb-1">CV (PDF)</label>
                                <input type="file" id="resume" accept=".pdf" className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label htmlFor="coverLetter" className="block mb-1">Lettre de motivation</label>
                                <textarea id="coverLetter" rows={4} className="w-full border rounded p-2"></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button onClick={() => setShowApplicationForm(false)} variant="outline">Annuler</Button>
                                <Button type="submit">Envoyer</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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