'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useJobs } from '@/contexts/JobContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    MapPinIcon, ClockIcon, BookmarkIcon, XIcon, InfoIcon, HomeIcon, SlidersIcon,
    SearchIcon, BriefcaseIcon, EyeIcon, BellIcon, LayoutGridIcon, ListIcon, ChevronLeft, ChevronRight, RotateCcwIcon, PenTool,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

// Update the Job type definition to include the sector property
type Job = {
    // ... other properties ...
    sector: string; // Add this line
    // ... other properties ...
}

export function JobOffersComponent() {
    const router = useRouter();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const textVariants = [
        { text: "l'environnement qui fait du bien", bgColor: "bg-blue-200" },
        { text: "des objectifs qui ont du sens", bgColor: "bg-purple-200" },
        { text: "le juste équilibre", bgColor: "bg-green-200" },
        { text: "le scope qui vous correspond", bgColor: "bg-purple-100" },
        { text: "de beaux challenges", bgColor: "bg-blue-100" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [textVariants.length]);

    const { jobs } = useJobs()
    const [filteredJobs, setFilteredJobs] = useState(jobs)
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('Abidjan')
    const [jobTypes, setJobTypes] = useState<string[]>([])
    const [isRemote, setIsRemote] = useState(false)
    const [profession, setProfession] = useState('')
    const [sector, setSector] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 9
    const [showProfessionModal, setShowProfessionModal] = useState(false)
    const [selectedProfessions, setSelectedProfessions] = useState<string[]>([])
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
    const [selectedSector, setSelectedSector] = useState<string>('')
    const [hasSelection, setHasSelection] = useState(false)

    useEffect(() => {
        const results = jobs.filter(job => {
            const matchesSearch = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase())
            const matchesJobType = jobTypes.length === 0 || jobTypes.includes(job.type)
            const matchesRemote = !isRemote || job.remote.toLowerCase().includes('télétravail')
            const matchesProfession = selectedProfessions.length === 0 || selectedProfessions.includes(job.profession)
            const matchesSector = sector === '' || job.sector === sector

            return matchesSearch && matchesLocation && matchesJobType && matchesRemote && matchesProfession && matchesSector
        })
        setFilteredJobs(results)
        setCurrentPage(1)
    }, [jobs, searchTerm, location, jobTypes, isRemote, selectedProfessions, sector])

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleJobTypeChange = (type: string) => {
        setJobTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const handleProfessionChange = (profession: string) => {
        setSelectedProfessions(prev =>
            prev.includes(profession) ? prev.filter(p => p !== profession) : [...prev, profession]
        )
    }

    const applyProfessionFilter = () => {
        setShowProfessionModal(false)
        // La mise à jour des jobs filtrés se fait automatiquement grâce à l'effet
    }

    const handleSectorChange = (value: string) => {
        setSelectedSector(value)
        setSector(value)
    }

    useEffect(() => {
        setHasSelection(
            isRemote ||
            selectedProfessions.length > 0 ||
            selectedSector !== '' ||
            jobTypes.length > 0
        )
    }, [isRemote, selectedProfessions, selectedSector, jobTypes])

    const resetAllFilters = () => {
        setIsRemote(false)
        setSelectedProfessions([])
        setSelectedSector('')
        setJobTypes([])
        setSector('')
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center space-x-2">
                        <BriefcaseIcon className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-gray-800">TalentHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Accueil</Link>
                        <Link href="/job-offers" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Offres d&apos;emploi</Link>
                        <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Fonctionnalités</Link>
                        <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Tarifs</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</Link>
                    </nav>

                    {/* Action Button */}
                    <Button variant="outline" className="rounded-none border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300" onClick={() => router.push('/login')}>
                        Se connecter
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button className="block md:hidden text-gray-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden">
                    <ul className="flex flex-col items-center space-y-4 mt-4">
                        <li><Link href="/" className="text-gray-700 hover:text-blue-600">Accueil</Link></li>
                        <li><Link href="/job-offers" className="text-gray-700 hover:text-blue-600">Offres d&apos;emploi</Link></li>
                        <li><Link href="/features" className="text-gray-700 hover:text-blue-600">Fonctionnalités</Link></li>
                        <li><Link href="/pricing" className="text-gray-700 hover:text-blue-600">Tarifs</Link></li>
                        <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="w-full bg-gradient-to-r from-[#00aaff] to-[#f0f4f8]">
                <div className="py-8">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-[1.3rem] font-bold">
                            Trouvez le job avec{' '}
                            <span className="relative inline-block align-middle">
                                <span
                                    className={`inline-block px-2 py-1 rounded-none transition-opacity transition-transform duration-500 ease-in-out opacity-100 whitespace-nowrap ${textVariants[currentTextIndex].bgColor}`}
                                    style={{ position: "absolute", top: -22, left: 0 }}
                                    key={currentTextIndex}
                                >
                                    {textVariants[currentTextIndex].text}
                                </span>
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center mb-4">
                        <div className="relative w-[60%]">
                            <Input
                                type="text"
                                placeholder="Recherchez par job, mot-clé ou entreprise"
                                className="pl-10 pr-10 rounded-none bg-white border-black border-opacity-50 w-full h-14"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <InfoIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <div className="relative w-[20%]">
                            <Input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Localisation"
                                className="pl-10 pr-10 rounded-none bg-white border-black border-opacity-50 w-full h-14"
                            />
                            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <XIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setLocation('')} />
                        </div>
                        <div className="w-[20%]">
                            <Select>
                                <SelectTrigger className="rounded-none w-full bg-white border-black border-opacity-50 h-14">
                                    <SelectValue placeholder="Type de job" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2">
                                        {['CDI', 'CDD', 'Stage', 'Freelance'].map((type) => (
                                            <div key={type} className="flex items-center space-x-2 mb-2 rounded-none">
                                                <Checkbox
                                                    id={`job-type-${type}`}
                                                    checked={jobTypes.includes(type)}
                                                    onCheckedChange={() => handleJobTypeChange(type)}
                                                />
                                                <label htmlFor={`job-type-${type}`}>{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2 w-[60%]">
                            <Button
                                variant={isRemote ? "default" : "outline"}
                                className="rounded-none bg-gray border border-black border-opacity-50 hover:shadow-lg transition-shadow duration-200 w-[15%]"
                                onClick={() => setIsRemote(!isRemote)}
                            >
                                <HomeIcon size={16} className="mr-2" />
                                Télétravail
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-none bg-gray border border-black border-opacity-50 hover:shadow-lg transition-shadow duration-200 w-[15%]"
                                onClick={() => setShowProfessionModal(true)}
                            >
                                Profession
                            </Button>
                            <Select value={sector} onValueChange={handleSectorChange}>
                                <SelectTrigger className="rounded-none bg-gray border border-black border-opacity-50 hover:shadow-lg transition-shadow duration-200 w-[15%]">
                                    <PenTool className="w-3 h-3" /><SelectValue placeholder="Secteur" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=" ">Tous les secteurs</SelectItem>
                                    <SelectItem value="tech">Tech</SelectItem>
                                    <SelectItem value="finance">Banque/Assurance/Finance</SelectItem>
                                    <SelectItem value="education">Education/Formation/Recrutement</SelectItem>
                                    <SelectItem value="health">Santé/Social/Environnement</SelectItem>
                                    <SelectItem value="public">Secteur Public et Administration</SelectItem>
                                    <SelectItem value="hospitality">Hôtellerie</SelectItem>
                                    <SelectItem value="legal">Droit</SelectItem>
                                    <SelectItem value="arts">Arts et Divertissement</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="secondary"
                                className="rounded-none bg-black text-white hover:shadow-lg hover:bg-yellow-500 transition-shadow duration-200">
                                <SlidersIcon size={16} className="text-white" />
                                Tous les filtres
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        {jobTypes.map(type => (
                            <span key={type} className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded">
                                {type}
                            </span>
                        ))}
                        {selectedProfessions.map(profession => (
                            <span key={profession} className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded">
                                {profession}
                            </span>
                        ))}
                        {selectedSector && (
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded">
                                {selectedSector}
                            </span>
                        )}
                        {hasSelection && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetAllFilters}
                                className="ml-2"
                            >
                                <RotateCcwIcon size={16} className="mr-2" />
                                Tout effacer
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Search and Filters */}
                <div className="space-y-6">
                    {/* Modal pour les professions */}
                    <Dialog open={showProfessionModal} onOpenChange={setShowProfessionModal}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Professions</DialogTitle>
                                <DialogDescription>
                                    Vos domaines de spécialité pour vous ouvrir à différents postes.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {['Développeur', 'Designer', 'Marketing', 'Ventes', 'Support'].map((profession) => (
                                    <div key={profession} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`profession-${profession}`}
                                            checked={selectedProfessions.includes(profession)}
                                            onCheckedChange={() => handleProfessionChange(profession)}
                                        />
                                        <Label htmlFor={`profession-${profession}`}>{profession}</Label>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowProfessionModal(false)}>Annuler</Button>
                                <Button onClick={applyProfessionFilter}>Appliquer</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Jobs Header */}
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                            <h2 className="text-2xl font-bold">Jobs</h2>
                            <span className="bg-yellow-400 rounded-full text-black font-bold px-2 py-1 text-sm">{filteredJobs.length}</span>
                            <div className="flex items-center gap-2">
                                <Checkbox id="titleOnly" className="rounded-none" />
                                <label htmlFor="titleOnly" className="text-sm text-gray-600">
                                    Rechercher uniquement dans le titre de l&apos;offre
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="default" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-none">
                                <BellIcon size={16} className="mr-2" />
                                Créer une alerte
                            </Button>
                            <Select defaultValue="relevance">
                                <SelectTrigger className="w-[200px] rounded-none">
                                    <SelectValue placeholder="Trier par pertinence" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Trier par pertinence</SelectItem>
                                    <SelectItem value="date">Trier par date</SelectItem>
                                    <SelectItem value="salary">Trier par salaire</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex border rounded-none">
                                <Button variant="ghost" size="icon" className="rounded-none">
                                    <LayoutGridIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-none border-l">
                                    <ListIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentJobs.map((job) => (
                            <Link href={`/job-offers/${job.id}`} key={job.id}>
                                <Card className="overflow-hidden rounded-none hover:shadow-lg transition-shadow duration-200">
                                    <Image
                                        src={job.image}
                                        alt={`${job.company} office`}
                                        width={400}
                                        height={200}
                                        className="w-full h-auto object-cover"
                                    />
                                    <CardContent className="p-6">
                                        {job.activelyRecruiting && (
                                            <div className="bg-yellow-400 text-black font-bold px-2 py-1 text-sm mb-2 inline-block">
                                                Recrute activement !
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image
                                                src={job.logo}
                                                alt={`${job.company} logo`}
                                                width={40}
                                                height={40}
                                                className="rounded-none"
                                            />
                                            <span className="font-semibold">{job.company}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <MapPinIcon size={16} />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-gray-200 text-gray-800 px-2 py-1 text-sm">
                                                {job.type}
                                            </span>
                                            {job.remote && (
                                                <span className="bg-gray-200 text-gray-800 px-2 py-1 text-sm">
                                                    {job.remote}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            {job.sponsored ? (
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <InfoIcon size={14} /> Sponsorisé
                                                </span>
                                            ) : job.postedTime ? (
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <ClockIcon size={14} /> {job.postedTime}
                                                </span>
                                            ) : (
                                                <span></span>
                                            )}
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" className="rounded-none">
                                                    <EyeIcon className="h-5 w-5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="rounded-none">
                                                    <BookmarkIcon className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    className="mx-1"
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            <Button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
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
