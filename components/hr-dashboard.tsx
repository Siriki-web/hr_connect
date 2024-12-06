'use client'

import React from 'react'
import { Bell, ChevronDown, FileText, PieChart, Settings, Users, Plus, Edit, Eye, Send, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFieldArray, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

type FormData = {
    jobTitle: string
    department: string
    location: string
    employmentType: string
    experienceLevel: string
    skills: string
    jobDescription: string
    requirements: { requirement: string }[]
}

export function HrDashboard() {
    const form = useForm<FormData>({
        defaultValues: {
            jobTitle: "",
            department: "",
            location: "",
            employmentType: "",
            experienceLevel: "",
            skills: "",
            jobDescription: "",
            requirements: [{ requirement: "" }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "requirements"
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
        // Handle form submission
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-blue-600">Tableau de bord RH</h1>
                </div>
                <nav className="mt-6">
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100">
                        <PieChart className="w-5 h-5 mr-2" />
                        Vue d'ensemble
                    </a>
                    <Link href="/job-postings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FileText className="w-5 h-5 mr-2" />
                        Offres d'emploi
                    </Link>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Users className="w-5 h-5 mr-2" />
                        Candidats
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Settings className="w-5 h-5 mr-2" />
                        Paramètres
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">Aperçu du recrutement</h2>
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <div className="ml-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Job Overview Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aperçu des postes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Postes ouverts</span>
                                        <span className="font-semibold">12</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Candidatures totales</span>
                                        <span className="font-semibold">143</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Entretiens programmés</span>
                                        <span className="font-semibold">28</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Progress Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Progression des candidatures</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Présélection IA</span>
                                            <span>75%</span>
                                        </div>
                                        <Progress value={75} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Entretiens téléphoniques</span>
                                            <span>50%</span>
                                        </div>
                                        <Progress value={50} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Sélection finale</span>
                                            <span>25%</span>
                                        </div>
                                        <Progress value={25} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Insights Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Analyses IA</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>CV analysés par l'IA</span>
                                        <span className="font-semibold">98</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Entretiens IA réalisés</span>
                                        <span className="font-semibold">45</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Candidats recommandés par l'IA</span>
                                        <span className="font-semibold">15</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Job Offer Management Section */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Gestion des offres d'emploi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Créer une offre
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                        <DialogHeader>
                                            <DialogTitle>Créer une nouvelle offre d'emploi</DialogTitle>
                                            <DialogDescription>
                                            Renseignez les détails de votre offre d’emploi. Vous pouvez l’enregistrer en tant que brouillon ou le publier directement.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Card
                                            className="w-full max-w-6xl h-[600px] mx-auto overflow-y-auto border border-gray-300 shadow-lg"
                                        >
                                            <CardHeader>
                                                <CardTitle>Job Details</CardTitle>
                                            </CardHeader>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                                    <CardContent className="space-y-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="jobTitle"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Titre du poste*</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="ex: Développeur Frontend Senior" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="department"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Département*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Sélectionner un département" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="engineering">Ingénierie</SelectItem>
                                                                                <SelectItem value="design">Design</SelectItem>
                                                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                                                <SelectItem value="sales">Ventes</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="location"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Location</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g Abidjan" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="employmentType"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Type d'emploi*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Sélectionner un type" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="full-time">Temps plein</SelectItem>
                                                                                <SelectItem value="part-time">Temps partiel</SelectItem>
                                                                                <SelectItem value="contract">Contrat</SelectItem>
                                                                                <SelectItem value="internship">Stage</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="experienceLevel"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Niveau d'expérience*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Sélectionner un niveau" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="entry">Débutant</SelectItem>
                                                                                <SelectItem value="mid">Intermédiaire</SelectItem>
                                                                                <SelectItem value="senior">Senior</SelectItem>
                                                                                <SelectItem value="lead">Lead</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormField
                                                            control={form.control}
                                                            name="skills"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Compétences & Technologies</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Saisissez une compétence et appuyez sur Entrée" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="jobDescription"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Description du poste*</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Décrivez le rôle et les responsabilités..."
                                                                            className="min-h-[120px]"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <FormLabel>Exigences</FormLabel>
                                                                <Button type="button" variant="outline" size="sm" onClick={() => append({ requirement: "" })}>
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Ajouter une exigence
                                                                </Button>
                                                            </div>
                                                            {fields.map((field, index) => (
                                                                <div key={field.id} className="flex items-center gap-2">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`requirements.${index}.requirement`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex-1">
                                                                                <FormControl>
                                                                                    <Input placeholder="Ajouter une exigence" {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    {index > 0 && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="gap-4">
                                                        <Button type="button" variant="outline">
                                                            Enregistrer comme brouillon
                                                        </Button>
                                                        <Button type="submit">Publier l'offre</Button>
                                                    </CardFooter>
                                                </form>
                                            </Form>
                                        </Card>

                                        {/*<div className="flex justify-end space-x-2">
                                            <Button variant="outline">Save as Draft</Button>
                                            <Button>Publish</Button>
                                        </div>*/}
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" /> Voir les brouillons
                                </Button>
                            </div>
                            <Tabs defaultValue="active">
                                <TabsList>
                                    <TabsTrigger value="active">Offres actives</TabsTrigger>
                                    <TabsTrigger value="drafts">Brouillons</TabsTrigger>
                                </TabsList>
                                <TabsContent value="active">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Titre du poste</th>
                                                <th className="pb-2">Date de publication</th>
                                                <th className="pb-2">Candidatures</th>
                                                <th className="pb-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">Senior Developer</td>
                                                <td>2023-05-15</td>
                                                <td>78</td>
                                                <td>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">UX Designer</td>
                                                <td>2023-05-10</td>
                                                <td>45</td>
                                                <td>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TabsContent>
                                <TabsContent value="drafts">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Titre du poste</th>
                                                <th className="pb-2">Dernière modification</th>
                                                <th className="pb-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">Marketing Manager</td>
                                                <td>2023-05-18</td>
                                                <td>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">Data Analyst</td>
                                                <td>2023-05-16</td>
                                                <td>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Tabs for detailed information */}
                    <Tabs defaultValue="candidates" className="mt-6">
                        <TabsList>
                            <TabsTrigger value="candidates">Meilleurs candidats</TabsTrigger>
                            <TabsTrigger value="jobs">Performance des offres</TabsTrigger>
                            <TabsTrigger value="reports">Rapports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="candidates">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Meilleurs candidats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Nom</th>
                                                <th className="pb-2">Poste</th>
                                                <th className="pb-2">Score IA</th>
                                                <th className="pb-2">Statut</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">John Doe</td>
                                                <td>Développeur logiciel</td>
                                                <td>92%</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Recommandé
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">Jane Smith</td>
                                                <td>Chef de produit</td>
                                                <td>88%</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                                                        Entretien
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="jobs">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Performance des offres</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Titre du poste</th>
                                                <th className="pb-2">Vues</th>
                                                <th className="pb-2">Candidatures</th>
                                                <th className="pb-2">Statut</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">Développeur Senior</td>
                                                <td>1,245</td>
                                                <td>78</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Ouvert
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">Designer UX</td>
                                                <td>980</td>
                                                <td>45</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                                                        Fermé
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reports">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rapports de recrutement</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Button>Générer rapport de performance</Button>
                                        <Button>Exporter données des candidats</Button>
                                        <Button>Résumé des analyses IA</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
