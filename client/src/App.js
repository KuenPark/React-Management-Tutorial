import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Tablerow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyle, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
})



class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      textBoxValue: "aaa"
    }
    this.onClickButton = this.onClickButton.bind(this);
  }

  componentDidMount(){

    this.timer = setInterval(this.progress, 20);

    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  onClickButton(params) {
    let value = this.setState.textBoxValue;
    this.setState({textBoxValue : value} );
  }  


  render(){

    const{ classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <Tablerow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </Tablerow>
            </TableHead>
            <TableBody>
              { this.state.customers ?
              this.state.customers.map(c=> { return( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ) })
              :
              <Tablerow>
                <TableCell colspan='6' align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </Tablerow> 
              }
            </TableBody>
          </Table>
        </Paper>
        <TextField id="standard-basic" label="Standard" value={this.state.textBoxValue} onChange={({ target: { value } }) => this.setState({textBoxValue: value})}/>
        <Button Click="onClick"  >전달</Button>
        <CustomerAdd cusmtomName={this.state.textBoxValue} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
