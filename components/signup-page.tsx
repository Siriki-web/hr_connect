'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function SignupPageComponent() {
    const features = [
        "Post jobs to 200+ job boards",
        "Schedule interviews & hire",
        "Track & manage candidates",
        "Build beautiful career pages",
        "Resume Parsing"
    ]

    const companies = ["GS2E", "CIE", "SODECI", "Orange"]

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-500 to-black-300 flex justify-evenly px-32">
            <div className="flex-1 flex flex-col justify-center px-1 sm:px-3 lg:px-1 py-4 bg-teal">
                <div className="w-full max-w-sm lg:w-25 ml-5">
                    <Image src="/placeholder.svg" alt="Talenthub Logo" width={150} height={40} className="mb-8" />

                    <h1 className="text-[24px] font-['Poppins-medium'] font-medium mt-10 mb-2">Supercharge your hiring with Talenthub</h1>
                    <p className="text-gray-600 mb-6">Used by the most ambitious businesses worldwide.</p>

                    <ul className="space-y-2 mb-8">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <CheckIcon className="h-5 w-5 text-white mr-2" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center space-x-4">
                        {companies.map((company, index) => (
                            <Image key={index} src="/placeholder.svg" alt={`${company} logo`} width={40} height={40} className="grayscale" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-2 sm:px-4 lg:px-12 xl:px-16 w-full max-w-2xl">
                <Card className="w-full">
                    <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">Start your trial, no credit card required.</h2>
                        <form className="space-y-2 max-w-md mx-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <Input id="firstName" name="firstName" required className="mt-1 h-8 rounded-none w-full" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <Input id="lastName" name="lastName" required className="mt-1 h-8 rounded-none w-full" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                <Input id="workEmail" name="workEmail" type="email" required className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de Passe</label>
                                <Input id="password" name="password" type="password" required className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirmer Votre Mot de Passe</label>
                                <Input id="password" name="password" type="password" required className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nom Entreprise</label>
                                <Input id="companyName" name="companyName" required className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                                <Input id="address" name="address" required className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Site internet</label>
                                <Input id="website" name="website" type="url" className="mt-1 h-8 rounded-none w-full" />
                            </div>
                            <div className="flex items-center">
                                <Checkbox id="recaptcha" />
                                <label htmlFor="recaptcha" className="ml-2 block text-sm text-gray-900">
                                    Je ne suis pas un robot
                                </label>
                            </div>
                            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 h-10 rounded-none">S'inscrire</Button>
                        </form>
                        <p className="mt-4 text-center text-xs text-gray-600">
                            By signing up, you agree to our <Link href="/terms" className="text-teal-600 hover:underline">terms of use</Link>
                        </p>
                        <p className="mt-4 text-center text-sm">
                            Already have a Talenthub account? <Link href="/login" className="text-teal-600 hover:underline">Se connecter</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}