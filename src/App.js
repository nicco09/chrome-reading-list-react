import React from 'react';
import ReadingList from './components/ReadingList';
import Chrome from './utilities/chrome';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.chrome = new Chrome();
    this.state = {
      readingList: [],
    };

    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
    this.updateReadingList = this.updateReadingList.bind(this);
  }

  async componentDidMount() {
    await this.updateReadingList();
  }

  async updateReadingList() {
    const readingList = await this.chrome.getReadingListAsync();
    this.setState({ readingList })
  }

  async handleRemoveBookmark(id) {
    await this.chrome.removeBookmarkAsync(id);
    await this.updateReadingList();
  }

  async handleOpenTab(url) {
    await this.chrome.openTabAsync(url);
  }

  render() {
    return (
      <div className="App">
        <ReadingList
          list={this.state.readingList}
          open={this.handleOpenTab}
          remove={this.handleRemoveBookmark} />
      </div>
    );
  }
}

export default App;
