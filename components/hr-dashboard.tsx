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
                        Overview
                    </a>
                    <Link href="/job-postings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FileText className="w-5 h-5 mr-2" />
                        Job Postings
                    </Link>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Users className="w-5 h-5 mr-2" />
                        Candidates
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Settings className="w-5 h-5 mr-2" />
                        Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">Recruitment Overview</h2>
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
                                <CardTitle>Job Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Open Positions</span>
                                        <span className="font-semibold">12</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Applications</span>
                                        <span className="font-semibold">143</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Interviews Scheduled</span>
                                        <span className="font-semibold">28</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Progress Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>AI Screening</span>
                                            <span>75%</span>
                                        </div>
                                        <Progress value={75} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Phone Interviews</span>
                                            <span>50%</span>
                                        </div>
                                        <Progress value={50} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Final Selection</span>
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
                                <CardTitle>AI Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>AI-Screened Resumes</span>
                                        <span className="font-semibold">98</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>AI Interview Conducted</span>
                                        <span className="font-semibold">45</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>AI Recommended Candidates</span>
                                        <span className="font-semibold">15</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Job Offer Management Section */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Job Offer Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Create Job Offer
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
                                                                    <FormLabel>Job Title*</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g Senior Frontend Developer" {...field} />
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
                                                                        <FormLabel>Department*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select department" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="engineering">Engineering</SelectItem>
                                                                                <SelectItem value="design">Design</SelectItem>
                                                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                                                <SelectItem value="sales">Sales</SelectItem>
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
                                                                        <FormLabel>Employment Type*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select type" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                                                <SelectItem value="contract">Contract</SelectItem>
                                                                                <SelectItem value="internship">Internship</SelectItem>
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
                                                                        <FormLabel>Experience Level*</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select level" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="entry">Entry Level</SelectItem>
                                                                                <SelectItem value="mid">Mid Level</SelectItem>
                                                                                <SelectItem value="senior">Senior Level</SelectItem>
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
                                                                    <FormLabel>Skills & Technologies</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Type a skill and press Enter" {...field} />
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
                                                                    <FormLabel>Job Description*</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Describe the role and responsibilities..."
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
                                                                <FormLabel>Requirements</FormLabel>
                                                                <Button type="button" variant="outline" size="sm" onClick={() => append({ requirement: "" })}>
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Add Requirement
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
                                                                                    <Input placeholder="Add a requirement" {...field} />
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
                                                            Save as Draft
                                                        </Button>
                                                        <Button type="submit">Publish Job</Button>
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
                                    <FileText className="mr-2 h-4 w-4" /> View Drafts
                                </Button>
                            </div>
                            <Tabs defaultValue="active">
                                <TabsList>
                                    <TabsTrigger value="active">Active Job Offers</TabsTrigger>
                                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                                </TabsList>
                                <TabsContent value="active">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Job Title</th>
                                                <th className="pb-2">Published Date</th>
                                                <th className="pb-2">Applications</th>
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
                                                <th className="pb-2">Job Title</th>
                                                <th className="pb-2">Last Modified</th>
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
                            <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
                            <TabsTrigger value="jobs">Job Performance</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="candidates">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Candidates</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Name</th>
                                                <th className="pb-2">Position</th>
                                                <th className="pb-2">AI Score</th>
                                                <th className="pb-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">John Doe</td>
                                                <td>Software Engineer</td>
                                                <td>92%</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Recommended
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">Jane Smith</td>
                                                <td>Product Manager</td>
                                                <td>88%</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                                                        Interview
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
                                    <CardTitle>Job Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="pb-2">Job Title</th>
                                                <th className="pb-2">Views</th>
                                                <th className="pb-2">Applications</th>
                                                <th className="pb-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2">Senior Developer</td>
                                                <td>1,245</td>
                                                <td>78</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Open
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">UX Designer</td>
                                                <td>980</td>
                                                <td>45</td>
                                                <td>
                                                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                                                        Closed
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
                                    <CardTitle>Recruitment Reports</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Button>Generate Performance Report</Button>
                                        <Button>Export Candidate Data</Button>
                                        <Button>AI Insights Summary</Button>
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
