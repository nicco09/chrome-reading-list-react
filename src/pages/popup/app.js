import React from 'react'
import { connect } from 'react-redux'
import Button from 'Components/Button'
import * as listActions from 'Shared/actions/listActions'
import { saveToReadingListAsync } from 'Utilities/chrome'

class App extends React.Component {
  async submitCurrentURL() {
    const { dispatch, lists } = this.props
    const activeListId = lists.activeId

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      arrayOfTabs => {
        const activeTab = arrayOfTabs[0]
        const url = activeTab.url
        const title = activeTab.title
        window.close()
      }
    )
  }

  listChanged(data) {
    const { dispatch } = this.props

    dispatch(listActions.setActive(data.value))
  }

  async handleSaveToReadingList() {
    await saveToReadingListAsync()
    window.close()
  }

  render() {
    return (
      <div>
        <div>
          <Button primary onClick={() => this.handleSaveToReadingList()}>
            Save to Reading List
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App)
