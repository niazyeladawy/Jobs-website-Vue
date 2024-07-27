export interface Company {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
}

export interface Job {
    id ?: number;
    title: string;
    type: string;
    description: string;
    location: string;
    salary: string;
    company: Company;
}




