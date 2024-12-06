'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignupPageProps {
    onClose: () => void;
    onLoginClick: () => void;
}

// Liste des industries
const industries = [
    "Technology",
    "Finance",
    "Retail",
    "Healthcare",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Transportation",
    "Media",
    "Construction",
    "Agriculture",
    "Energy"
];

export function SignupPageComponent({ onClose, onLoginClick }: SignupPageProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        contact: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        companyIndustry: '',
        address: "",
        website: "",
    });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})


    // Gestion des changements de champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.companyName) newErrors.companyName = 'Company name is required'
        if (!formData.workEmail) newErrors.email = 'Email is required'
        if (!formData.workEmail.includes('@')) newErrors.email = 'Invalid email format'
        if (!formData.password) newErrors.password = 'Password is required'
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        if (!formData.companyIndustry) newErrors.companyIndustry = 'Please select an industry'
        if (!formData.address) newErrors.address = 'Company address is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
      }
    // Navigation entre les étapes
    const nextStep = () => {
        if (step === 1) {
            // Validation des champs de la première étape
            const newErrors: { [key: string]: string } = {};
            if (!formData.firstName) newErrors.firstName = 'Le nom est requis';
            if (!formData.lastName) newErrors.lastName = 'Le prénom est requis';
            if (!formData.workEmail) newErrors.email = 'L\'email est requis';
            if (!formData.workEmail.includes('@')) newErrors.email = 'Format d\'email invalide';
            if (!formData.contact) newErrors.contact = 'Le numéro de téléphone est requis';
            
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
                toast.error("Veuillez corriger les erreurs avant de continuer");
                return;
            }
        }

        if (step === 2) {
            // Validation des champs de la deuxième étape
            const newErrors: { [key: string]: string } = {};
            if (!formData.password) newErrors.password = 'Le mot de passe est requis';
            if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
                toast.error("Veuillez corriger les erreurs avant de continuer");
                return;
            }
        }

        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    // Soumission finale
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Veuillez corriger les erreurs avant de soumettre");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.workEmail,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.contact,
                    userType: "Company",
                    address: formData.address,
                    linkedin: "",
                    companyName: formData.companyName,
                    companyIndustry: formData.companyIndustry,
                    website: formData.website || ""
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de l\'inscription');
            }

            toast.success('Inscription réussie !');
            
            setTimeout(() => {
                onClose();
                onLoginClick();
            }, 1500);

        } catch (error) {
            console.error('Erreur détaillée:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    return (
        <div className="py-6 px-4 max-h-[80vh] overflow-y-auto">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Inscrivez-vous en quelques étapes !
                </h2>

                {/* Barre de progression */}
                <div className="flex items-center justify-between mb-8">
                    {["Informations personnelles", "Compte", "Informations entreprise"].map((label, index) => {
                        const isActive = step === index + 1;
                        const isCompleted = step > index + 1;

                        return (
                            <div key={index} className="flex items-center">
                                {/* Étape */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    ${isActive ? "bg-teal-600 text-white" : isCompleted ? "bg-green-600 text-white" : "bg-gray-300 text-gray-500"}`}
                                >
                                    {isCompleted ? "✓" : index + 1}
                                </div>
                                {/* Ligne de connexion */}
                                {index < 2 && (
                                    <div
                                        className={`w-12 h-1 ${step > index + 1 ? "bg-green-600" : "bg-gray-300"}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Étape 1 : Informations personnelles */}
                    {step === 1 && (
                        <>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.firstName ? 'border-red-500' : ''}`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.lastName ? 'border-red-500' : ''}`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    id="workEmail"
                                    name="workEmail"
                                    type="email"
                                    required
                                    value={formData.workEmail}
                                    onChange={handleChange}
                                    placeholder="exemple@domaine.com"
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                    Numéro de téléphone
                                </label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    type="tel"
                                    required
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="0700020103"
                                    pattern="[0-9]{10}"
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.contact ? 'border-red-500' : ''}`}
                                />
                                {errors.contact && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                                )}
                            </div>
                            <Button type="button" onClick={nextStep} className="w-full bg-teal-600 h-10 hover:bg-teal-700 rounded-md">
                                Suivant
                            </Button>
                        </>
                    )}

                    {/* Étape 2 : Compte */}
                    {step === 2 && (
                        <>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de Passe
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmer le mot de passe
                                </label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <Button type="button" onClick={prevStep} className="bg-gray-500 h-10 hover:bg-gray-600 rounded-md">
                                    Précédent
                                </Button>
                                <Button type="button" onClick={nextStep} className="bg-teal-600 h-10 hover:bg-teal-700 rounded-md">
                                    Suivant
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Étape 3 : Informations entreprise */}
                    {step === 3 && (
                        <>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                    Nom Entreprise
                                </label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    required
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.companyName ? 'border-red-500' : ''}`}
                                />
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="companyIndustry" className="block text-sm font-medium text-gray-700">
                                    Industrie
                                </label>
                                <Select 
                                    name="companyIndustry" 
                                    value={formData.companyIndustry}
                                    onValueChange={(value) => setFormData({ ...formData, companyIndustry: value })}
                                >
                                    <SelectTrigger className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.companyIndustry ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries.map((industry) => (
                                            <SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.companyIndustry && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyIndustry}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Adresse
                                </label>
                                <Input
                                    id="address"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`mt-1 h-10 rounded-md w-full bg-transparent ${errors.address ? 'border-red-500' : ''}`}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                    Site internet
                                </label>
                                <Input
                                    id="website"
                                    name="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://www.example.com"
                                    className="mt-1 h-10 rounded-md w-full bg-transparent"
                                />
                            </div>
                            <div className="flex justify-between">
                                <Button type="button" onClick={prevStep} className="bg-gray-500 h-10 hover:bg-gray-600 rounded-md">
                                    Précédent
                                </Button>
                                <Button type="submit" className="bg-teal-600 h-10 hover:bg-teal-700 rounded-md">
                                    S'inscrire
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
