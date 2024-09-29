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
    picture: string
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

interface UserMe {
    data: {
        answer: {
            progressOfRoute: {
                routeId: string
                status: string
                currentPointIdx: number
                currentPoint: {
                    title: string
                    description: string
                    lat: number
                    lng: number
                    question: string
                    answers: string[]
                }
            }
        }
    }
}

export type { Route, Person, Hero, Points, UserMe }