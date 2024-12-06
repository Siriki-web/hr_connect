'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
    onClose: () => void;
    onSignupClick: () => void;
}

interface LoginResponse {
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    token: string;
}

export function LoginPageComponent({ onClose, onSignupClick }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.email) newErrors.email = 'Email est requis';
        if (!formData.email.includes('@')) newErrors.email = 'Format email invalide';
        if (!formData.password) newErrors.password = 'Mot de passe requis';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Veuillez corriger les erreurs");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Échec de la connexion');
            }

            const data: LoginResponse = await response.json();
            
            // Sauvegarder le token dans le localStorage
            localStorage.setItem('token', data.token);
            
            // Afficher le message de succès
            toast.success(`Bienvenue ${data.user.firstName} ${data.user.lastName} !`);
            
            // Fermer le modal de connexion
            onClose();
            
            // Rediriger vers le dashboard
            router.push('/hr-dashboard');

        } catch (error) {
            console.error('Erreur de connexion:', error);
            toast.error(error instanceof Error ? error.message : 'Erreur lors de la connexion');
        }
    };

    return (
        <div className="py-6">
            <h2 className="text-2xl font-bold text-center mb-6">Bienvenue !</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input 
                        id="workEmail" 
                        name="workEmail" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
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
                            value={formData.password}
                            onChange={handleChange}
                            className={`h-10 rounded-md w-full bg-transparent ${errors.password ? 'border-red-500' : ''}`}
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
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
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
            
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Pas encore de compte ?{' '}
                    <button 
                        onClick={() => {
                            onClose();
                            onSignupClick();
                        }} 
                        className="font-medium text-teal-600 hover:text-teal-500"
                    >
                        S'inscrire maintenant
                    </button>
                </p>
            </div>
        </div>
    );
}