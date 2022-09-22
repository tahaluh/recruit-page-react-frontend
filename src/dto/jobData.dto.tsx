import { companyDataDto } from "./companyData.dto";

export interface jobDataDto {
    office: string;
    description: string;
    skills: string;
    salary: number;
    end_date: Date;

    id?: number
    company?: companyDataDto
}