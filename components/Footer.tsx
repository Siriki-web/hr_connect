import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
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
    )
}
