'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Edit, Eye, Trash2 } from 'lucide-react'

export function JobPostings() {
    const [jobPostings, setJobPostings] = useState([
        { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 45, status: 'Active' },
        { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', type: 'Full-time', applicants: 32, status: 'Active' },
        { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco', type: 'Contract', applicants: 28, status: 'Closed' },
        { id: 4, title: 'Marketing Specialist', department: 'Marketing', location: 'London', type: 'Part-time', applicants: 19, status: 'Active' },
    ])

    return (
        <div className="p-6 max-w-7xl mx-auto +-">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Job Postings</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New Job
                </Button>
            </div>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex space-x-4">
                        <div className="flex-grow">
                            <Input placeholder="Search job postings..." className="w-full" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobPostings.map((job) => (
                    <Card key={job.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {job.title}
                            </CardTitle>
                            <Badge 
                                variant="outline" 
                                style={{
                                    backgroundColor: job.status === 'Active' 
                                        ? 'rgba(46,204,113,0.2)' 
                                        : job.status === 'Closed'
                                        ? 'rgba(231,76,60,0.2)'
                                        : 'rgba(241,196,15,0.2)',
                                    color: job.status === 'Active'
                                        ? '#2ecc71'
                                        : job.status === 'Closed'
                                        ? '#e74c3c'
                                        : '#f1c40f',
                                    border: 'none'
                                }}
                            >
                                {job.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                <p>{job.department} • {job.location}</p>
                                <p>{job.type}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{job.applicants} applicants</span>
                                <div className="space-x-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
