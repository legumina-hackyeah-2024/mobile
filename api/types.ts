interface Route {
    id: string
    title: string
    description: string
    icon: string
    distance: number
    difficulty: number
    lat: number
    lng: number
}

interface Person {
    id: string
    image: string
    name: string
    description: string
}


export type { Route, Person }