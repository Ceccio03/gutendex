export interface BookDetail {
    id: number
    title: string
    authors: Authors[]
}

export interface Authors {
    name: string
    birth_year: number
    death_year: number
}