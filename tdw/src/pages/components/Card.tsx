import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQueryDog } from "../../queries/queryDog"
import { useEffect, useState } from "react"
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
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="TINDER DOG"
                subheader={date}
            />
            <CardMedia
                component="img"
                height="194"
                image={data?.message}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">

                    🐾 ¡Hola! Soy tu enamorado, un {breed} lleno de energía y amor por la vida. Mis pasatiempos incluyen correr en el parque, jugar a buscar la pelota y recibir muchas caricias. Me encanta socializar y hacer nuevos amigos peludos. Estoy en busca de compañeros de juegos y aventuras. ¡Vamos a correr juntos y a explorar el mundo canino! 🐾
                </Typography>
            </CardContent>
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
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
