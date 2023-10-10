import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Card from "./components/Card"
export default function Home() {


    
    return (
         <>
         <Grid container spacing={1}>
           <Grid item md={4} xs={6}>
           <Box sx={{ width: '100%' }}>
                <Card></Card>
            </Box>
           </Grid>
   
           <Grid item md={4} xs={6}>
           <Box sx={{ width: '100%' }}>
                <Card></Card>
            </Box>
           </Grid>
   
           <Grid item md={4} xs={6}>
           <Box sx={{ width: '100%' }}>
                <Card></Card>
            </Box>
           </Grid>
         </Grid>
       </>
    )
}

