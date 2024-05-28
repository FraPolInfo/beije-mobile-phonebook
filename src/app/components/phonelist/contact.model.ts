export interface Contact {
    id: string,
    name: string,
    phoneNumber: string,
    internationalPf: internationalPf,
    validated?: boolean
}

export interface internationalPf {
    id: string
    country: string,
    prefix: string
}