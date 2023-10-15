export interface Dog {
    name: string;
    description: string;
    image: string;
}

export interface DogApiResponse {
    message: string;
    status: string;
}

export interface Candidate {
    dog: Dog | null
}

export interface Hook {
    like: () => void;
    dislike: () => void;
    currentDog: Dog | null;
    setCurrentDog: React.Dispatch<React.SetStateAction<Dog | undefined>>;
    acceptedDogs: Dog[];
    setAcceptedDogs: (value: React.SetStateAction<Dog[]>) => void;
    rejectedDogs: Dog[];
    setRejectedDogs: (value: React.SetStateAction<Dog[]>) => void;
}