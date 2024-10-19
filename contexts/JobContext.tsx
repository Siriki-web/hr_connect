'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  remote: string
  image: string
  logo: string
  activelyRecruiting: boolean
  sponsored: boolean
  postedTime?: string
  description: string
}

type JobContextType = {
  jobs: Job[]
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([
    { 
      id: 1,
      title: "Plombier", 
      company: "SODECI", 
      location: "Abidjan", 
      type: "CDI",
      remote: "Télétravail fréquent",
      image:"/assets/images/euris.webp",
      logo:"/assets/images/logo.webp",
      activelyRecruiting: true,
      sponsored: true,
      description: "Description détaillée du poste de Plombier chez SODECI..."
    },
    { 
        id: 2,
        title: "Développeur Web", 
        company: "GS2E", 
        location: "Abidjan", 
        type: "CDI",
        remote: "Sur site",
        image:"/assets/images/euris.webp",
        logo:"/assets/images/logo.webp",
        activelyRecruiting: true,
        sponsored: true,
        description: "Description détaillée du poste de Développeur Web chez GS2E..."
      },
      { 
        id: 3,
        title: "Assistant(e) RH", 
        company: "CIE", 
        location: "Abidjan", 
        type: "CDI",
        remote: "Sur site",
        image:"/assets/images/euris.webp",
        logo:"/assets/images/logo.webp",
        activelyRecruiting: true,
        sponsored: true,
        description: "Description détaillée du poste d'Assistant(e) RH chez CIE..."
      },
      { 
        id: 4,
        title: "Actuaire Junior", 
        company: "NSIA", 
        location: "Abidjan", 
        type: "CDI",
        remote: "Sur site",
        image:"/assets/images/euris.webp",
        logo:"/assets/images/logo.webp",
        activelyRecruiting: true,
        sponsored: true,
        description: "Description détaillée du poste d'Actuaire Junior chez NSIA..."
      },
      { 
        id: 5,
        title: "Lead Suivi évaluation", 
        company: "Save The Children", 
        location: "San-Pédro", 
        type: "CDI",
        remote: "Sur site",
        image:"/assets/images/euris.webp",
        logo:"/assets/images/logo.webp",
        activelyRecruiting: true,
        sponsored: true,
        description: "Description détaillée du poste de Lead Suivi évaluation chez Save The Children..."
      },
      { 
        id: 6,
        title: "Contrôleur de gestion", 
        company: "BAD", 
        location: "Abidjan", 
        type: "CDI",
        remote: "Télétravail fréquent",
        image:"/assets/images/euris.webp",
        logo:"/assets/images/logo.webp",
        activelyRecruiting: true,
        sponsored: true,
        description: "Description détaillée du poste de Contrôleur de gestion chez BAD..."
      },
      {
        id: 7,
        company: "TechInnovate",
        logo: "/assets/images/techinnovate_logo.png",
        image: "/assets/images/techinnovate_office.jpg",
        title: "Ingénieur DevOps",
        location: "Lyon",
        type: "CDI",
        remote: "Hybride",
        description: "Nous recherchons un ingénieur DevOps expérimenté pour rejoindre notre équipe d'innovation.",
        activelyRecruiting: true,
        sponsored: false,
        postedTime: "il y a 2 jours"
      },
      {
        id: 8,
        company: "GreenEnergy",
        logo: "/assets/images/greenenergy_logo.png",
        image: "/assets/images/greenenergy_office.jpg",
        title: "Ingénieur en Énergies Renouvelables",
        location: "Bordeaux",
        type: "CDI",
        remote: "Sur site",
        description: "Rejoignez notre équipe pour développer des solutions d'énergie durable pour l'avenir.",
        activelyRecruiting: false,
        sponsored: true,
        postedTime: "il y a 5 jours"
      },
      {
        id: 9,
        company: "FinTech Solutions",
        logo: "/assets/images/fintech_logo.png",
        image: "/assets/images/fintech_office.jpg",
        title: "Analyste Financier",
        location: "Paris",
        type: "CDD",
        remote: "Télétravail",
        description: "Nous cherchons un analyste financier talentueux pour rejoindre notre équipe en pleine croissance.",
        activelyRecruiting: true,
        sponsored: false,
        postedTime: "il y a 1 semaine"
      },
      {
        id: 10,
        company: "HealthCare Plus",
        logo: "/assets/images/healthcare_logo.png",
        image: "/assets/images/healthcare_office.jpg",
        title: "Infirmier(ère) en Chef",
        location: "Marseille",
        type: "CDI",
        remote: "Sur site",
        description: "Nous recherchons un(e) infirmier(ère) en chef expérimenté(e) pour diriger notre équipe de soins.",
        activelyRecruiting: true,
        sponsored: false,
        postedTime: "il y a 3 jours"
      },
      {
        id: 11,
        company: "EduTech",
        logo: "/assets/images/edutech_logo.png",
        image: "/assets/images/edutech_office.jpg",
        title: "Concepteur Pédagogique",
        location: "Toulouse",
        type: "CDI",
        remote: "Hybride",
        description: "Rejoignez notre équipe pour créer des contenus éducatifs innovants et engageants.",
        activelyRecruiting: false,
        sponsored: true,
        postedTime: "il y a 6 jours"
      },
      {
        id: 12,
        company: "AeroSpace Innovations",
        logo: "/assets/images/aerospace_logo.png",
        image: "/assets/images/aerospace_office.jpg",
        title: "Ingénieur Aérospatial",
        location: "Toulouse",
        type: "CDI",
        remote: "Sur site",
        description: "Nous recherchons un ingénieur aérospatial passionné pour travailler sur des projets de pointe.",
        activelyRecruiting: true,
        sponsored: false,
        postedTime: "il y a 1 jour"
      }
  ])

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  return context
}