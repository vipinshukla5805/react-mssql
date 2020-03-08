import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import tt from './Departments.json';
import "./App.css";
var store = {
  headerOffset: null
};

let data = [
  {
    Id: 1,
    FirstName: "Pravin",
    MiddleName: null,
    LastName: "Panchal",
    DOB: "1995-02-03T00:00:00.000Z",
    Designation: "Account",
    ReportingTo: "Ravi Kumar",
    Salary: 35000,
    DepID: 3
  },
  {
    Id: 2,
    FirstName: "Ravi",
    MiddleName: null,
    LastName: "Pande",
    DOB: "1992-02-03T00:00:00.000Z",
    Designation: "HR",
    ReportingTo: "Gajanan",
    Salary: 30000,
    DepID: 1
  },
  {
    Id: 3,
    FirstName: "Ishwar",
    MiddleName: null,
    LastName: "Bhadarge",
    DOB: "1988-02-03T00:00:00.000Z",
    Designation: "Software Developer",
    ReportingTo: "Vipin",
    Salary: 30000,
    DepID: 2
  },
  {
    Id: 4,
    FirstName: "Vipin",
    MiddleName: null,
    LastName: "Shukla",
    DOB: "1985-02-09T00:00:00.000Z",
    Designation: "Senior Software Developer",
    ReportingTo: "Rahul",
    Salary: 60000,
    DepID: 2
  }
];

let cols = [
  {
    icon: "",
    label: "Select"
  },
  {
    icon: "",
    label: "Id"
  },
  {
    icon: "",
    label: "Name"
  },
  {
    icon: "",
    label: "Account"
  },
  {
    icon: "",
    label: "Department"
  }
];

class RowItem extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      dep: []
    };
  }

  toggleRow(e) {
    
    let deps = this.getData();
    this.setState({ open: !this.state.open , dep: deps});
  }

   getData = ()=>{
    // let res = await axios.get(tt);
    debugger
    return tt;
  }

  render() {
    let classes = "";
    if (this.state.open) {
      classes = "open";
    }

    return (
      <li onClick={this.toggleRow.bind(this)} className={classes}>
        <div className="heading">
          <div className="col">
            <input type="checkbox" checked={this.props.selected} />
          </div>
          <div className="col">{this.props.Id}</div>
          <div className="col">{this.props.FirstName}</div>
          <div className="col">{this.props.Designation}</div>
          <div className="col">{this.props.DepID}</div>
        </div>
        <RowContent open={this.state.open} deps={this.state.dep} />
        {this.props.children}
      </li>
    );
  }
}

class RowContent extends React.Component {
  clicker() {
    console.log('hi......')
  }

  render() {
    let jsxhtml;
    if (this.props.open) {
      jsxhtml = (
        <div className="content open" onClick={this.clicker.bind(this)}>
          <table>
            <tr>
              <th>Id</th>
              <th>Dep Name</th>
            </tr>
            {
              this.props.deps.map(item => <tr>
                <td>{item.Id}</td>
              <td>{item.Name}</td>
              </tr>)
            }
          </table>
        </div>
      );
    }

    return <div>{jsxhtml}</div>;
  }
}

class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      headerOffset: null,
      headerFixed: true
    };
  }
  componentDidMount() {
    //   window.addEventListener('scroll', this.handleScroll.bind(this));
    // THIS SEEMS THE ONLY PLACE WE CAN PICK UP THE REF FOR THE HEADER
    console.log("reactdom: ", ReactDOM.findDOMNode(this.refs.header));

    store.headerOffset = ReactDOM.findDOMNode(
      this.refs.header
    ).getBoundingClientRect().top;

    console.log("store:", store.headerOffset);

    // this.setState({headerOffset:ReactDOM.findDOMNode(this.refs.header)});
  }

  selectAll = event => {
    this.setState({ allSelected: event.target.checked });
    this.props.data.map(item => {
      return (item.selected = event.target.checked);
    });
  };

  render() {
    let columns = this.props.columns.map((item, inx) => {
      if (inx === 0) {
        return (
          <div className="hcol" style={{ textAlign: "center" }}>
            Select All{" "}
            <input
              type="checkbox"
              checked={this.state.allSelected}
              onClick={this.selectAll}
            />
          </div>
        );
      }
      return <HeaderColumn label={item.label} />;
    });

    //go through the rows
    let rows = this.props.data.map((item, inx) => {
      return <RowItem {...item}></RowItem>;
    });

    let classes = "header";
    if (this.props.headerFixed) {
      classes = "header fixed";
    }

    return (
      <div className="table">
        {this.props.children}
        <div className={classes} ref="header">
          {columns}
          <div className="shadow"></div>
        </div>
        <ul>{rows}</ul>
      </div>
    );
  }
}

class HeaderColumn extends React.Component {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  render() {
    return <div className="hcol">{this.props.label}</div>;
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tableHeader: null,
      tableHeaderFixed: false
    };
  }

  handleScroll(e) {
    // console.log(e);
    let scrollTop = e.srcElement.body.scrollTop;

    //HOW DO WE GET THE REFS HERE FOR THE ITEM OFFSET?

    //itemTranslate = Math.min(0, scrollTop/3 - 60);
    console.log("app scroll...", scrollTop, store.headerOffset);
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
    console.log("app did mount");
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  render() {
    return (
      <div className="container">
        <Table
          data={data}
          columns={cols}
          headerFixed={this.state.tableHeaderFixed}
          scrollFn=""
        />
      </div>
    );
  }
}

export default App;
