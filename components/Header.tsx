import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BriefcaseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter();

    return (
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
    )
}
