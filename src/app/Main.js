/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileAttachment from 'material-ui/svg-icons/file/attachment';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: document.body.clientWidth > 990,
      docked: document.body.clientWidth > 990
    };
  }

  handleLeftIconButtonTouchTap = (event) => {
    this.setState({open: !this.state.open});
    console.log("clicked");
  }

  updateDimensions = function() {
    this.setState((prevState, props) => ({
      open: document.body.clientWidth > 990 ? true : prevState.open,
      docked: document.body.clientWidth > 990
    }));
  }
  componentWillMount = function() {
    this.updateDimensions();
  }
  componentDidMount = function() {
    window.addEventListener("resize", () => this.updateDimensions());
  }
  componentWillUnmount = function() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
          title="设计器"
          onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
          <Drawer
            docked={this.state.docked}
            width={260}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <AppBar title="AppBar" showMenuIconButton={false} />
            <List>
              <Subheader>Nested List Items</Subheader>
              <ListItem primaryText="表单"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="单据"
                    leftIcon={<FileFolder />}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      <ListItem key={1} primaryText="客户订单" leftIcon={<FileAttachment />}/>,
                      <ListItem key={2} primaryText="出库单" leftIcon={<FileAttachment  />}/>
                    ]}
                  />,
                  <ListItem
                    key={2}
                    primaryText="字典"
                    leftIcon={<FileFolder />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="报表"
                    leftIcon={<FileFolder />}
                  />
                ]}
              />
              <Divider />
              <ListItem primaryText="业务蓝图" leftIcon={<ContentDrafts />} />
              <Divider />
              <ListItem
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Starred"
                    leftIcon={<ActionGrade />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Sent Mail"
                    leftIcon={<ContentSend />}
                    disabled={true}
                    nestedItems={[
                      <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                    ]}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Inbox"
                    leftIcon={<ContentInbox />}
                    open={this.state.open}
                    onNestedListToggle={this.handleNestedListToggle}
                    nestedItems={[
                      <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                    ]}
                  />,
                ]}
              />
            </List>
          </Drawer>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default Main;
