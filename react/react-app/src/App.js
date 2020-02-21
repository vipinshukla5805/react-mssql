import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

class DetailComponent extends GridDetailRow {
    render() {
        const data = this.props.dataItem.details;
        if (data) {
            return (
                <Grid data={data}>
                    <Column field="ProductID" title="Product ID" width="120px" />
                    <Column field="ProductName" title="Product Name" />
                    <Column field="UnitPrice" title="Unit Price" format="{0:c}" />
                </Grid>
            );
        }
        return (
            <div style={{ height: "50px", width: '100%' }}>
                <div style={{ position: 'absolute', width: '100%' }}>
                    <div className="k-loading-image" />
                </div>
            </div>
        );
    }
}

export class App extends React.Component {
    baseUrl = 'https://demos.telerik.com/kendo-ui/service-v4/odata/';
    init = { method: 'GET', accept: 'application/json', headers: {} };

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.expandChange = this.expandChange.bind(this);
    }

    expandChange(event) {
        event.dataItem.expanded = event.value;
        let categoryID = event.dataItem.CategoryID;
        this.setState({ ...this.state });

        if (!event.value || event.dataItem.details) {
            return;
        }

        fetch(this.baseUrl + `Products?$filter=CategoryID%20eq%20` + categoryID, this.init)
            .then(response => response.json())
            .then(json => {
                let data = this.state.categories.slice();
                let index = data.findIndex(d => d.CategoryID === categoryID);
                data[index].details = json.value;
                this.setState({ categories: data });
            });
    }

    componentDidMount() {
        fetch(this.baseUrl + `Categories`, this.init)
            .then(response => response.json())
            .then(json => this.setState({ categories: json.value }));
    }

    render() {
        return (
            <div>
                <Grid
                    style={{ height: '550px' }}
                    data={this.state.categories}
                    detail={DetailComponent}
                    expandField="expanded"
                    onExpandChange={this.expandChange}
                >
                    <Column field="CategoryID" title="ID" width="50px" />
                    <Column field="CategoryName" width="200px" title="Category Name" />
                    <Column field="Description" />
                </Grid>
            </div>
        );
    }
}

