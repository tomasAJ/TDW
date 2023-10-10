import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQueryDog } from "../../queries/queryDog";
import { useEffect, useState } from "react";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);
    const [date, setDate] = useState('')
    useEffect(() => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setDate(formattedDate);
    }, []); // El segundo argumento de useEffect es un array vacío para que se ejecute solo una vez, después del montaje del componente.


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [params, setParams] = useState({ value: true })
    const { data: data, isError: error } = useQueryDog(params)
    const regex = /breeds\/([^/]+)\//;
    const match = data?.message.match(regex);
    // console.log(match)
    let breed = " "
    if (match && match[1]) {
        const breedName = match[1];
        breed = match[1]
        console.log(breedName); // Output: breed
    } else {
        console.log("No se encontró el nombre de la raza.");
    }
    let description = "🐾 ¡Hola! Soy tu enamorado, un {breed} lleno de energía y amor por la vida. Mis pasatiempos incluyen correr en el parque, jugar a buscar la pelota y recibir muchas caricias. Me encanta socializar y hacer nuevos amigos peludos. Estoy en busca de compañeros de juegos y aventuras. ¡Vamos a correr juntos y a explorar el mundo canino! 🐾"
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={breed}
                // subheader={date}
            />
            <CardMedia
                component="img"
                height="300"
                image={data?.message}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography variant="body2" color="text.secondary">

                    🐾 ¡Hola! Soy tu enamorado, un {breed} lleno de energía y amor por la vida. Mis pasatiempos incluyen correr en el parque, jugar a buscar la pelota y recibir muchas caricias. Me encanta socializar y hacer nuevos amigos peludos. Estoy en busca de compañeros de juegos y aventuras. ¡Vamos a correr juntos y a explorar el mundo canino! 🐾
                </Typography>
                </CardContent>
            </Collapse>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Button variant="contained" size="medium" color="error">Rechazar</Button>
            <Button variant="contained" size="medium" color="success">Aceptar</Button>
            </Grid>
            
        </Card>
    );
}
