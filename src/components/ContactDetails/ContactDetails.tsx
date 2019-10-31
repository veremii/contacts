import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { usersApi } from '../../api/general';
import {IPeople, IHeadPeopleCell} from "../../interfaces";
import {compare} from "../../utils";
import { withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core'

type dtProps = {
    // using `interface` is also ok
    message?: string;
    classes: any;
    rowsPerPage?: number;
    history?: any;
    location?: any;
    match?: any;
};
type dtState = {
    count?: number;
    users: IPeople[] ;
    orderBy: keyof IPeople;
    order: 'asc' | 'desc';
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sortByField: (property: keyof IPeople, type: 'asc'| 'desc', pureSort?: boolean) => void;
    loadContacts: (page: number, rowsPerPage: number)=> void;
    handleRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
};

const headPeopleCell: IHeadPeopleCell[] = [
    { id: 'avatar', numeric: false, label: 'Avatar'},
    { id: 'first_name', numeric: true, label: 'First name' },
    { id: 'last_name', numeric: true, label: 'Last name' },
    { id: 'email', numeric: true, label: 'Email' },
];

const styles = (theme: Theme) => ({
    table:{
        '@media (max-width: 500px)': {
            overflow: 'scroll'
        },

    }
});

class ContactsDetail extends React.Component<dtProps, dtState> {
    constructor(props: dtProps){
        super(props);
        this.state = {
            count: 0,
            page: 0,
            rowsPerPage: 5,
            users: [],
            orderBy: "first_name",
            order: "desc",
            loadContacts: (page: number, rowsPerPage: number) => {
                usersApi.getUsersList(page ? page : 1, rowsPerPage ? rowsPerPage : 5).then(e=> {
                    this.setState({users: e.data.data});
                    this.setState({count: e.data.total});
                    this.state.sortByField(this.state.orderBy, this.state.order, true)
                })
            },
            handleRowClick: (event: React.MouseEvent<unknown>, id: number) => {
                this.props.history.push(`about/${id}`)
            },
            handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({page: 0});
                this.setState({rowsPerPage: parseInt(event.target.value, 10)});
                this.state.loadContacts(1, parseInt(event.target.value, 10))
            },
            handleChangePage: (event: unknown, newPage: number) => {
                this.setState({page: newPage});
                this.state.loadContacts(newPage+1, this.state.rowsPerPage)
            },
            sortByField: (property: keyof IPeople, type: 'asc'| 'desc', pureSort?: boolean) => {
                let isDesc: boolean;
                if (!pureSort){
                    isDesc = this.state.orderBy === property && this.state.order === 'desc';
                    this.setState({order: isDesc ? 'asc' : 'desc'});
                    this.setState({orderBy: property});
                } else {
                    isDesc = this.state.orderBy === property && this.state.order === 'asc'
                }
                this.setState({users: this.state.users.sort((a,b) => compare(a,b, isDesc ? 'asc' : 'desc', property))})

            }
        }
    };

    componentDidMount(): void {
        this.state.loadContacts(this.state.page, this.state.rowsPerPage)
    }

    render (){
        const { classes } = this.props;
            return <div>
                <Typography color="inherit" variant="subtitle1">
                    iTechArt contacts
                </Typography>
                <div className={classes.table}>
                    <Table >
                        <TableHead>
                            <TableRow>

                                {headPeopleCell.map(headCell => (
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        padding={'default'}
                                        sortDirection={this.state.orderBy === headCell.id ? this.state.order : false}
                                    >
                                        { headCell.id === "avatar" ? <div>{headCell.label}</div>
                                            : <TableSortLabel
                                                active={this.state.orderBy === headCell.id}
                                                direction={this.state.order}
                                                onClick={(e)=> this.state.sortByField(headCell.id, this.state.order)}
                                            >
                                                {headCell.label}
                                                {this.state.orderBy === headCell.id ? (
                                                    <span hidden={true}>
                                          {this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                                ) : null}
                                            </TableSortLabel>}

                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { this.state.users === undefined || this.state.users.length > 0
                                ? this.state.users.map((item) => {
                                    return <TableRow
                                        hover
                                        onClick={(event)=> this.state.handleRowClick(event, item.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={item.email}
                                    >
                                        <TableCell component="th" scope="row" padding="none">
                                            <Avatar alt={item.first_name} src={item.avatar}/>
                                        </TableCell>
                                        <TableCell>{item.first_name}</TableCell>
                                        <TableCell>{item.last_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                    </TableRow>
                                })
                                :   <TableRow>
                                    <TableCell>
                                        Loading...
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ this.state.count || 0}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.state.handleChangePage}
                        onChangeRowsPerPage={this.state.handleChangeRowsPerPage}
                    />
                </div>


            </div>

        }
}

export default withStyles(styles)(ContactsDetail);