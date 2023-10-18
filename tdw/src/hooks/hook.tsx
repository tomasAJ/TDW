import { useEffect, useState } from 'react'
import { Dog, Hook } from "../utils/interfaces"
import { handleRefresh } from "../services/api"
const useCustomHook = (handleRefresh: () => void) => {

    const [acceptedDogs, setAcceptedDogs] = useState<Dog[]>([])
    const [rejectedDogs, setRejectedDogs] = useState<Dog[]>([])
    const [currentDog, setCurrentDog] = useState<Dog>()
    const [seleccionado, setSeleccionado] = useState<Dog>()
    const [description, setDescription] = useState<boolean>(false)
    const like = (dog: Dog) => {

        if (!acceptedDogs.includes(dog)) {
            if (rejectedDogs.includes(dog)) {
                const update: Dog[] = rejectedDogs.filter(item => item !== dog)
                setRejectedDogs(update)
                setAcceptedDogs([dog, ...acceptedDogs])
            }
            else {
                setAcceptedDogs([dog, ...acceptedDogs])
                handleRefresh()
            }
        }
    }

    const dislike = (dog: Dog) => {
        if (!rejectedDogs.includes(dog)) {
            if (acceptedDogs.includes(dog)) {
                const update: Dog[] = acceptedDogs.filter(item => item !== dog)
                setAcceptedDogs(update)
                setRejectedDogs([dog, ...rejectedDogs])
            } else {
                setRejectedDogs([dog, ...rejectedDogs])
                handleRefresh()
            }
        }




        console.log("DISLIKE")

    }


    return { seleccionado, setSeleccionado, description, setDescription, like, dislike, currentDog, setCurrentDog, acceptedDogs, setAcceptedDogs, rejectedDogs, setRejectedDogs }

}
export default useCustomHook