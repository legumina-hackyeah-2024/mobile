interface Route {
    id: string
    title: string
    description: string
    icon: string
    distance: number
    difficulty: number
    lat: number
    lng: number
    points: Points[]
    hero: Hero
    facilities: string[]
}

interface Person {
    id: string
    image: string
    name: string
    description: string

}

interface Hero {
    name: string
    description: string
    picture: string
}

interface Points {
    title: string
    description: string
    lat: number
    lng: number
}

export type { Route, Person, Hero, Points }