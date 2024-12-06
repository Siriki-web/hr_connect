'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BriefcaseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginPageComponent } from './login-page'
import { SignupPageComponent } from './signup-page'

export function Header() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)

    const openLoginModal = () => {
        setShowSignupModal(false)
        setShowLoginModal(true)
    }

    const openSignupModal = () => {
        setShowLoginModal(false)
        setShowSignupModal(true)
    }

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
                    <Button onClick={() => setShowLoginModal(true)}>
                        Espace Recruteur
                    </Button>
                </div>

                {/* Modales */}
                <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
                    <DialogContent className="sm:max-w-[500px]">
                        <LoginPageComponent 
                            onClose={() => setShowLoginModal(false)} 
                            onSignupClick={openSignupModal}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
                    <DialogContent className="sm:max-w-[800px]">
                        <SignupPageComponent 
                            onClose={() => setShowSignupModal(false)}
                            onLoginClick={openLoginModal}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}
