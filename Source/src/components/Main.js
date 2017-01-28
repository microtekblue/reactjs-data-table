require('styles/App.less');
require('es6-promise').polyfill();

import React from 'react';
import { Table, Form, FormGroup, FormControl, ButtonGroup, Button, Nav, NavItem, Pagination } from 'react-bootstrap';


const apiURL = 'https://gist.githubusercontent.com/apotapov/8c438bce39116e884892363b8cfcaad0/raw/06c647c129631cbf82a0a0e4480c97e2918b9172/secondary-levels.json';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {dataObj: []};
  }

  componentDidMount() {

    const obj = this;
    // console.log(this);
    fetch(apiURL)
      .then(
        function(response) {
          if (response.status !== 200) {
            /*console.log('Looks like there was a problem. Status Code: ' +
              response.status);*/
            return;
          }
          response.json().then(function(data) {
             //console.log(data.secondaryLevels, 'data array');
            obj.setState({
              dataObj: data.secondaryLevels
            });
          });
        }
      )
      .catch(function() {
       // console.log('Fetch Error', e);
      });
  }

  render() {

    //console.log(this.state.dataObj, 'data object state updated');

    const tableInstance = (
      <div className="">
      <Table className="table table-sm table-responsive" striped condensed hover>
        <thead>
          <tr>
            <th colSpan="5" className="rmvBrd"></th>
            <th colSpan="4" className="brdBtm black text-center">Spread vs.</th>
            <th colSpan="1" className="rmvBrd"></th>
          </tr>
          <tr className="blkBrd colHeadings">
          <th>Issuer</th>
          <th>Issue Description</th>
          <th className="text-left">Currency</th>
          <th className="text-center">Years Remaining</th>
          <th>Benchmark</th>

          <th className="text-center">Benchmark</th>
          <th className="text-center">GoC Curve</th>
          <th className="text-center">3M CDOR</th>
          <th className="text-center">3M USDL</th>

          <th className="text-center">Updated</th>
          <th className="rmvBrd"></th>
        </tr>
        </thead>
        <tbody>

        { this.state.dataObj.map(

          function(item, index){
            return <tr key={index}>
              <td className="blueLink">{item.securityName}</td>
              <td>{item.description}</td>
              <td className="text-left">{item.currency}</td>
              <td className="text-center">{item.yearsRemaining}</td>
              <td>{item.benchmarkSecurityDescription}</td>
              <td className="text-center">{item.bidSpreadVsBenchmark}</td>
              <td className="text-center">{item.bidSpreadVsGocCurve}</td>
              <td className="text-center">{item.bidSpreadVs3mCdor}</td>
              <td className="text-center">{item.bidSpreadVs3mUsdl}</td>
              <td className="text-center">{item.readableTimestamp}</td>
              <td><i className="fa fa-signal" aria-hidden="true"></i></td>
            </tr>
          }

            )
        }

        </tbody>
      </Table>
      </div>
    );

    const formInstance = (
      <Form className="col-lg-12 col-xs-12">
        <FormGroup controlId="formInlineName" className="col-lg-10 col-xs-12 input-group-sm input-group-xs">
          <FormControl type="text" placeholder="Select Issuer" className="col-lg-12 col-xs-12" />
        </FormGroup>
        <Button type="submit" className="col-lg-2 col-xs-12 btn-default btn-sm bgNone searchBtn">
          Filter
        </Button>
      </Form>
    );

    const buttonGroupInstance = (
      <ButtonGroup justified>
        <Button href="#" className="btn-sm bgNone col-xs-12"><i className="fa fa-upload" aria-hidden="true"></i>
           &nbsp; Upload</Button>
        <Button href="#" className="btn-sm bgNone col-xs-12"><i className="fa fa-download" aria-hidden="true"></i>
          &nbsp; Download</Button>
      </ButtonGroup>
    );

    const nav = (
      <Nav bsStyle="tabs" activeKey="1">
        <NavItem eventKey="1" href="" className="btn-sm">Secondary Levels</NavItem>
        <NavItem eventKey="2" className="btn-sm">New Issue Pricing Benchmarks - CAD</NavItem>
        <NavItem eventKey="3" className="btn-sm">New Issue Pricing Benchmarks - USD</NavItem>
        <NavItem eventKey="4" className="btn-sm">Swap Rates - CAD</NavItem>
        <NavItem eventKey="5" className="btn-sm">Swap Rates - USD</NavItem>
      </Nav>
    );

    const pagination = (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={20}
        maxButtons={5}
        activePage={this.state.activePage = 1}
        onSelect={this.handleSelect} />
    );

    return(
      <div className="container">
        <row>
          <section className="col-lg-12">
            <h1 className="col-lg-12 text-left">Market</h1>
            <header className="col-lg-12 mrgBtm20">{nav}</header>
          </section>
        </row>
        <row>
          <section className="col-lg-12">
            <div className="col-lg-3 col-xs-12 text-left"><h2>Secondary Levels</h2></div>
            <div className="col-lg-6 col-xs-12">{formInstance}</div>
            <div className="col-lg-3 col-xs-12">{buttonGroupInstance}</div>
          </section>
        </row>
        <row>
          <section className="col-lg-12">
            {tableInstance}
          </section>
        </row>
        <row>
          <section className="col-lg-12 text-center">
            {pagination}
          </section>
        </row>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
