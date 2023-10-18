import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dog, Hook } from "../../utils/interfaces";
import './Card.css';
import { useActionData } from 'react-router-dom';
import { Alert } from '@mui/material';
import { DoorFront, HotelOutlined, SettingsEthernet } from '@mui/icons-material';
import { doWhileStatement, isGenericTypeAnnotation } from '@babel/types';
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const RecipeReviewCard: React.FC<{ hook: Hook, dog: Dog }> = ({ hook, dog }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [likeIcon, setLikeIcon] = React.useState(false)

    const handleExpandClick = async () => {
        hook.setSeleccionado(dog)
        setExpanded(!expanded)
        console.log(hook.seleccionado)
    };
    React.useEffect(() => {

        if (hook.seleccionado !== dog)
            setExpanded(false)
        if (hook) {
            console.log(hook.currentDog?.name, hook.currentDog?.enable)
            hook.acceptedDogs.map((dog) => console.log(dog.name, dog.enable))
            hook.rejectedDogs.map((dog) => console.log(dog.name, dog.enable))
        }
    }, [hook, dog]);

    React.useEffect(() => {
        console.log("LIKE/DISLIKE")
        if (hook) {
            hook.rejectedDogs.includes(dog) ? (setLikeIcon(false)) : (setLikeIcon(true))
            hook.acceptedDogs.includes(dog) ? (setLikeIcon(true)) : (setLikeIcon(false))
        }
    }, [hook.acceptedDogs, hook.rejectedDogs, dog])


    const handleAction = async (action: String) => {
        try {
            if (action === "LIKE") {
                setLikeIcon(!likeIcon)
                //setExpanded(true)
                !likeIcon ? await hook.like(dog) : await hook.dislike(dog)


            }

            if (action === "DISLIKE") {
                //setExpanded(false)
                setLikeIcon(false)
                await hook.dislike(dog)
            }
        } catch (error) {
            console.error('Error al dar like/dislike al perro', error)
        }

    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        TD
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={dog?.name}
                subheader=" "
            />
            <CardMedia
                component="img"
                height="194"
                image={dog?.image}
                alt=""
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => (handleAction("LIKE"))}>

                    {likeIcon ? <FavoriteIcon /> : <FavoriteBorderIcon />

                    }

                </IconButton>
                <IconButton aria-label="share" onClick={() => (handleAction("DISLIKE"))}>
                    <HighlightOffIcon />
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
                    <Typography paragraph></Typography>
                    {dog?.description}
                    <Typography paragraph></Typography>
                    <Typography paragraph></Typography>
                    <Typography paragraph></Typography>
                    <Typography></Typography>
                </CardContent>
            </Collapse>
        </Card >
    );
}

export default RecipeReviewCard