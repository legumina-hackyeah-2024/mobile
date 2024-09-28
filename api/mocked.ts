import {Person, Route} from "./types";

export const MOCKED_MARKERS: Route[] = [
    {
        id: "123",
        lat: 50.068639,
        lng: 19.991049,
        title: 'First marker',
        icon: 'map_pin',
        description: 'dsc',
        distance: 5,
        difficulty: 1,
    },
    {
        id: "1233",
        lat: 50.066980,
        lng: 19.990663,
        title: 'First marker2',
        icon: 'map_pin',
        description: 'dsc',
        distance: 5,
        difficulty: 1,
    }
]

export const MOCKED_PEOPLE: Person[] = [
    {
        id: 'id1',
        description: 'HALO HALO HALOOO',
        name: 'Jestem Abcd',
        image: 'person_mockup'
    },
    {
        id: 'id2',
        description: 'Przykladowe DEscriptionasd',
        name: 'Jestem NIEE',
        image: 'person_mockup'
    },
    {
        id: 'id3',
        description: 'Przykladowe DEscriptionasd',
        name: 'Jestem NIEE',
        image: 'person_mockup'
    }
]