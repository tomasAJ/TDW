import {
    Alert,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQueryDog } from "../../queries/queryDog"
export default function Dog() {
    const [params, setParams] = useState({ value: true })
    const { data: data, isError: error } = useQueryDog(params)
    const regex = /breeds\/([^/]+)\//;
    const match = data?.message.match(regex);
    console.log(match)
    let breed = " "
    if (match && match[1]) {
        const breedName = match[1];
        breed = match[1]
        console.log(breedName); // Output: breed
    } else {
        console.log("No se encontró el nombre de la raza.");
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={4} xs={6}>
                    {error && <Alert severity="error">Error</Alert>}
                    <Card>
                        <CardMedia component="img" image={data?.message} />
                        <CardContent>
                            {breed}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} xs={6}>
                </Grid>

                <Grid item md={4} xs={6}>
                </Grid>
            </Grid >
        </>
    );
}