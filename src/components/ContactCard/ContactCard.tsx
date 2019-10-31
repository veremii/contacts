import React from 'react';
import Typography from '@material-ui/core/Typography';
import {IPeople, IHeadPeopleCell} from "../../interfaces";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { usersApi } from '../../api/general';
import LinearProgress from '@material-ui/core/LinearProgress';
import './ContactCard.scss'
import {match} from "react-router";


const styles = (theme: any) => ({
        card: {
            maxWidth: 345,
        },
        buttonBlock: {
            display: "flex",
            justifyContent: "space-between"
        },
        animated: {
            transition: 'all 0.5s linear'
        },
        hidedElem: {
            height: '0px',
        },
        displayElem: {
            height: '300px',

        }
});



interface Props {
    classes: any;
    person: IPeople;
    history?: any;
    location?: any;
    match?: any;
}

interface State {
    handleOpenEmail: (email: string) => void;
    person: IPeople
    loading: boolean
}
class ContactsCard extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            person: {
                first_name: '',
                last_name: '',
                id: 0,
                email: '',
                avatar: ''
            },
            loading: false,
            handleOpenEmail: (email: string) => {
                window.location.href=`mailto:${email}`;
            }
        }
    };
    componentDidMount(): void {
        this.setState({loading: true});
        usersApi.getUser(this.props.match.params.id).then(data=> {
            this.setState({person: data.data.data});
            process.nextTick(()=> this.setState({loading: false}))

        })

    }
    render(){
        const { classes } = this.props;
        let loader: any;
        if(this.state.loading){
            loader = <LinearProgress variant="query" value={10 } />
        } else {
            loader = <LinearProgress variant="determinate" value={100} />
        }
        let MediaArea: any;
        if (this.state.person.id === 0){

        } else {
            MediaArea = <CardMedia
                className={`${this.state.loading ? classes.hidedElem: classes.displayElem} ${classes.animated}`}
                component="img"
                alt="Just someone"
                image={this.state.person.avatar}
                title={this.state.person.first_name + ' ' + this.state.person.last_name}
            />
        }
        return (

            <Card className={classes.card}>
                <CardActionArea>
                    <div >
                        {MediaArea}
                    </div>
                    {loader}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.person.first_name} {this.state.person.last_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Just some random person which i found on the internel. Btw u can send and email or back to the list of same random persons :)
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.buttonBlock}>
                    <Button onClick={(e)=> this.props.history.push('/')} variant={"outlined"} size="small" color="primary">
                        Back to list
                    </Button>
                    <Button onClick={(e) => this.state.handleOpenEmail(this.state.person.email)} variant={"contained"} size="small" color="primary">
                        E-mail
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(ContactsCard);