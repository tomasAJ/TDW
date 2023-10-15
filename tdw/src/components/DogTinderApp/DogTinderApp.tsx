import {
    Button,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useBuscarInfoQuery } from "../../queries/queryEjemplo"
import { Link } from "react-router-dom";
import { handleRefresh, useQueryDog } from "../../services/api"
import { Dog, Hook, DogApiResponse } from "../../utils/interfaces"
import DogList from "../DogList/DogList"
import CandidateDog from "../CandidateDog/CandidateDog"
import { LinkedCamera } from "@mui/icons-material";
import useCustomHook from "../../hooks/hook";
import Box from '@mui/material/Box';
import { LoremIpsum } from "lorem-ipsum";
//const LoremIpsum = require("lorem-ipsum").LoremIpsum;

// const { data: data, isError: error } = useQueryDog()

function randomName(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomName = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }
    return randomName;
}

function getRandomNumber(min: number, max: number): number {
    // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
    const randomDecimal = Math.random();
    // Escala el número aleatorio al rango específico (min a max) y lo redondea
    const randomNumber = Math.floor(randomDecimal * (max - min + 1) + min);
    return randomNumber;
}

function randomDescription() {

    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: getRandomNumber(1, 100),
            min: 4
        },
        wordsPerSentence: {
            max: getRandomNumber(1, 100),
            min: 4
        }
    });
    return lorem.generateParagraphs(1);

}


export default function DogTinderApp() {
    const { data, isLoading, isError, refetch, status, isRefetching } = useQueryDog(true)
    const [isFetching, setIsFetching] = useState(true);
    // const [acceptedDogs, setAcceptedDogs] = useState<Dog[]>([])
    // const [rejectedDogs, setRejectedDogs] = useState<Dog[]>([])
    // const [currentDog, setCurrentDog] = useState<Dog>()

    useEffect(() => {
        const fetchDataWithDelay = async () => {
            setIsFetching(true);
            // Simula un retraso de 2 segundos antes de realizar la solicitud
            setTimeout(async () => {
                await refetch();
                setIsFetching(false);
            }, 200);
        };
        fetchDataWithDelay();
    }, [refetch]);
    const handleRefresh = () => {
        // refetch()
        setIsFetching(true);
        // Simula un retraso de 2 segundos antes de realizar la solicitud
        setTimeout(async () => {
            await refetch();
            setIsFetching(false);
        }, 200);

    }
    const customHook: Hook = useCustomHook(handleRefresh)


    useEffect(() => {
        if (status === 'success' && data) {
            // setCandidato(message)
            const dogName: string = randomName();
            const newDog: Dog = {
                name: dogName,
                description: randomDescription(),
                image: data?.message
            }
            // setCurrentDog(newDog)
            customHook.setCurrentDog(newDog)
        }
    }, [status, data]);

    // const handle = (action: String) => {

    //     // currentDog? action === "like" ? setAcceptedDogs([...acceptedDogs, currentDog])
    //     // : action === "dislike" ? setRejectedDogs([...rejectedDogs, currentDog]): null
    //     if (currentDog) {
    //         if (action === "like") {
    //             setAcceptedDogs([...acceptedDogs, currentDog])
    //         } else if (action == "dislike") {
    //             setRejectedDogs([...rejectedDogs, currentDog])
    //         }
    //     }
    // }
    if (isLoading || isFetching) {
        return <p>Cargando...</p>; // Puedes mostrar un mensaje de carga mientras se está realizando la solicitud
    }

    if (isError) {
        return <p>Error al cargar los datos de los canes.</p>;
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={4} xs={6}>
                    <Box sx={{ width: '100%' }}>
                        {/* COMPONENTE PERRO CANDIDATO */}
                        {< CandidateDog onRefresh={handleRefresh} hook={customHook} dog={customHook.currentDog}></CandidateDog >}
                    </Box>
                </Grid>

                <Grid item md={4} xs={6}>
                    <Box sx={{ width: '100%' }}>
                        {/* COMPONENTE PERRO ACEPTADO */}
                        {< DogList hook={customHook} list={customHook.acceptedDogs}></DogList >}
                    </Box>
                </Grid>

                <Grid item md={4} xs={6}>
                    <Box sx={{ width: '100%' }}>
                        {/* COMPONENTE PERRO RECHAZADO */}
                        {< DogList hook={customHook} list={customHook.rejectedDogs} ></DogList >}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
