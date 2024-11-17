'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'

export function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-black-300 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-center">
          <img src="/placeholder.svg" alt="TalentHUb Logo" className="h-8" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-6">Se connecter sur TalentHub</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" name="email" type="email" required className="mt-1 h-12 rounded-none w-full" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                   className="mt-1 h-12 rounded-none w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                    Mot de passe oublié?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-70 font-bold bg-teal-600 hover:bg-teal-700">
                Se connecter
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Don't have a Recooty account?{' '}
              <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                S'inscrire maintenant pour 15 jours gratuit
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <nav className="flex space-x-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">Home</Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link>
            <Link href="/support" className="text-sm text-gray-500 hover:text-gray-900">Support</Link>
          </nav>
          <p className="text-sm text-gray-500">© 2024, made with ❤️ by Recooty</p>
        </div>
      </footer>
    </div>
  )
}