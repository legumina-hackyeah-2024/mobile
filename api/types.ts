interface Marker {
    lat: number
    lon: number
    title: string
    icon: string,
    place: Place
}

interface Place {
    description: string
    length: number
    level: number,
}

export type { Marker }