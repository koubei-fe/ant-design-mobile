---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---


````jsx
import { List } from 'antd-mobile';
import classNames from 'classnames';

const Item = List.Item;
const Brief = Item.Brief;

class ListExample extends React.Component {
  state = {
    disabled: false,
    isLoading: true,
  }
  handleLongPress = (e) => {
    console.log('longpress toggled', e);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  }
  render() {
    const preloadCls = classNames({
      'am-list-preload': this.state.isLoading,
      'my-list': true,
    });
    const preloadThumb1 = this.state.isLoading? 'https://gw.alipayobjects.com/zos/rmsportal/AVcIFnjAUgNikZoqTfEi.jpg' : 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png';
    return (<div>
      <List renderHeader={() => 'Basic Style'} className={preloadCls}>
        <Item extra={'extra content'} onLongPress={this.handleLongPress} >Title</Item>
        <Item extra={'extra content'} onLongPress={this.handleLongPress} >Title</Item>
      </List>
      <List renderHeader={() => 'Subtitle'} className={preloadCls}>
        <Item arrow="horizontal" multipleLine>
          Title <Brief>subtitle</Brief>
        </Item>
        <Item arrow="horizontal" multipleLine>
          Title <Brief>subtitle</Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {}}
          platform="android"
        >
          ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
        </Item>
        <Item
          arrow="horizontal"
          thumb={preloadThumb1}
          multipleLine
          onClick={() => {}}
        >
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className={preloadCls}>
        <Item>Title</Item>
        <Item arrow="horizontal" onClick={() => {}}>Title</Item>
        <Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>
        <Item extra="10:30" align="top" thumb={preloadThumb1} multipleLine>
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Align Vertical Center'} className="my-list">
        <Item multipleLine extra="extra content">
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb={preloadThumb1}
          arrow="horizontal"
          onClick={() => {}}
        >My wallet</Item>
        <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">My Cost Ratio</Item>
      </List>
      <List renderHeader={() => 'Text Wrapping'} className="my-list">
        <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
        <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
        <Item extra="extra content" multipleLine align="top" wrap>
          Multiple line and long text will wrap. Long Text Long Text Long Text
        </Item>
        <Item extra="no arrow" arrow="empty" className="spe" wrap>
          In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
        </Item>
      </List>
      <List renderHeader={() => 'Other'} className="my-list">
        <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
        <Item>
          <select defaultValue="1">
            <option value="1">html select element</option>
            <option value="2" disabled>Unable to select</option>
            <option value="3">option 3</option>
          </select>
        </Item>
      </List>
    </div>);
  }
}

ReactDOM.render(<ListExample />, mountNode);
````

````css
.my-list .spe .am-list-extra {
  flex-basis: initial;
}
````
