import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
var store = {
  headerOffset: null
};

let data = [
  {
    id: 0,
    name: "name 0",
    details: "details 0",
    state: "live"
  },
  {
    id: 1,
    name: "name 1",
    details: "details 1",
    state: "live"
  },
  {
    id: 2,
    name: "name 2",
    details: "details 2",
    state: "draft"
  },
  {
    id: 3,
    name: "name 3",
    details: "details 3",
    state: "live"
  },
  {
    id: 4,
    name: "name 4",
    details: "details 4",
    state: "live"
  },
  {
    id: 5,
    name: "name 5",
    details: "details 5",
    state: "live"
  },
  {
    id: 6,
    name: "name 6",
    details: "details 6",
    state: "live"
  },
  {
    id: 7,
    name: "name 7",
    details: "details 7",
    state: "live"
  },
  {
    id: 8,
    name: "name 8",
    details: "details 8",
    state: "live"
  },
  {
    id: 9,
    name: "name 9",
    details: "details 9",
    state: "live"
  },
  {
    id: 10,
    name: "name 10",
    details: "details 10",
    state: "live"
  }                
];

let cols = [
  {
    icon: "",
    label: "Order Number"
  },
  {
    icon: "",
    label: "Name"
  },
  {
    icon: "",
    label: "Details"
  },
  {
    icon: "",
    label: "State"
  }  
]


class RowItem extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      open: false
    }
  }  
  
  toggleRow(e) {
    console.log('toggleRow');
    
    this.setState({open: !this.state.open});
  }
  
  
  render(){
    
    let classes = '';
    if (this.state.open) {
      classes = 'open';
    }
    
    return (
      <li onClick={this.toggleRow.bind(this)} className={classes}>
        <div className="heading">
          <div className="col">{this.props.id}</div>
          <div className="col">{this.props.name}</div>
          <div className="col">{this.props.details}</div>             <div className="col">{this.props.state}</div>     
        </div>
        <RowContent open={this.state.open}/>
        {this.props.children}
      </li>
    )
  }
  
};


class RowContent extends React.Component {
  
  clicker() {
    
  }
  
  render(){
    
    let jsxhtml = (<div className="content" onClick={this.clicker.bind(this)}>
        
        <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>

      </div>);
    
    if (this.props.open) {
      jsxhtml = (<div className="content open" onClick={this.clicker.bind(this)}>
        <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>

      </div>);
    }
    
    return (
      <div>
      {jsxhtml}
        </div>
    )
  }
  
};


class Table extends React.Component {
  constructor() {
    super();
    
    this.state = {
      headerOffset: null,
      headerFixed: true
    }
  }
  
//   handleScroll(e) {
    
//     let scrollTop = e.srcElement.body.scrollTop;
//     console.log('scroll...', scrollTop, this.state.headerOffset);
    
    
    
    
//     this.setState({
//       headerFixed: true
//     });
//   }
  
  componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
    // THIS SEEMS THE ONLY PLACE WE CAN PICK UP THE REF FOR THE HEADER
    console.log('reactdom: ', ReactDOM.findDOMNode(this.refs.header));
    
    store.headerOffset = ReactDOM.findDOMNode(this.refs.header).getBoundingClientRect().top;  
    
    
    console.log('store:', store.headerOffset);
    
    
    // this.setState({headerOffset:ReactDOM.findDOMNode(this.refs.header)});
  }
  
  render(){
    
    let columns = this.props.columns.map((item, inx) => {
      return (<HeaderColumn label={item.label}/>);
    });    
    
    //go through the rows
    let rows = this.props.data.map((item, inx) => {
      return (<RowItem {...item}></RowItem>);
    });
    
    let classes = 'header'; 
    if (this.props.headerFixed) {
      classes = 'header fixed';
    }
    
   return (<div className="table">
          {this.props.children} 
       <div className={classes} ref="header">{columns}<div className="shadow"></div></div>
          <ul>{rows}</ul>
         </div>); 
  }
  
}

class HeaderColumn extends React.Component {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  
  render(){
   return (<div className="hcol">{this.props.label}</div>); 
  }
  
}


class App extends React.Component{
  constructor() {
    super();
    
    this.state = {
      tableHeader: null,
      tableHeaderFixed: false
    }
    
  }
  
  handleScroll(e) {
    // console.log(e);
    let scrollTop = e.srcElement.body.scrollTop;
    
    //HOW DO WE GET THE REFS HERE FOR THE ITEM OFFSET?
    
        //itemTranslate = Math.min(0, scrollTop/3 - 60);
    console.log('app scroll...', scrollTop, store.headerOffset);
    // console.log('reactdom: ', ReactDOM.findDOMNode(this.refs.header), this.refs);
    // console.log(ReactDOM.findDOMNode(this.refs.header));
    
    if (scrollTop >= store.headerOffset) {
      this.setState({
        tableHeaderFixed: true
      });
    } else {
      this.setState({
        tableHeaderFixed: false
      });
    }
  }
  
  componentDidMount() {
    console.log('app did mount');
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }  
  
  
  render(){
     
    
    return (
      <div className="container">
        <Table data={data} columns={cols} headerFixed={this.state.tableHeaderFixed} scrollFn=''/>
      </div>
    )
  }
  
};

export default App;