import React from 'react'
import { connect } from 'react-redux'
import ReadingList from 'Components/ReadingList'
import {
  getReadingListAsync,
  removeBookmarkAsync,
  openTabAsync
} from 'Utilities/chrome'

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      readingList: [],
    };

    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
    this.updateReadingList = this.updateReadingList.bind(this);
  }

  async componentDidMount() {
    await this.updateReadingList()
  }

  async updateReadingList() {
    const readingList = await getReadingListAsync()
    this.setState({ readingList })
  }

  async handleRemoveBookmark(id) {
    await removeBookmarkAsync(id)
    await this.updateReadingList()
  }

  async handleOpenTab(url) {
    await openTabAsync(url)
  }

  render() {
    return (
      <div className="App">
        <ReadingList
          list={this.state.readingList}
          open={this.handleOpenTab}
          remove={this.handleRemoveBookmark}
        />
      </div>
    )
  }
}

export default connect(null, null)(App)
