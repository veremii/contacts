import React from 'react';
import './App.scss';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ContactDetails from "../ContactDetails/ContactDetails";
import ContactCard from '../ContactCard/ContactCard'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: '100px',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
const testProp = {
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg",
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    id: 5,
    last_name: "Morris",
}

const App: React.FC = () => {
  const classes = useStyles();

  return (

        <div className={clsx(classes.root)}>
            <Router>
                <Switch>
                    <Route exact path="/" render={(props)=>(
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >

                            <Grid item xs={12} sm={10} md={8}>
                                <Paper className={classes.paper}>
                                    <ContactDetails {...props}/>
                                </Paper>

                            </Grid>
                        </Grid>

                    )}>

                    </Route>
                    <Route path="/about/:id" render={(props)=>(
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Paper>
                                    <ContactCard {...props} person={testProp}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}>

                    </Route>
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </Router>,
        </div>
  );
};

export default App;
